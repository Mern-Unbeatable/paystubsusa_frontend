import axios from "axios";
import { ENV_CONFIG } from "../config/env";
import { API_ENDPOINTS } from "./endpoints";
import { clearAccessToken, getAccessToken, setAccessToken } from "./tokenManager";

const authExcludedEndpoints = new Set([
  API_ENDPOINTS.AUTH.LOGIN,
  API_ENDPOINTS.AUTH.REGISTER,
  API_ENDPOINTS.AUTH.REFRESH,
  API_ENDPOINTS.AUTH.LOGOUT,
]);

const baseConfig = {
  baseURL: ENV_CONFIG.apiBaseUrl,
  timeout: ENV_CONFIG.apiTimeoutMs,
  withCredentials: ENV_CONFIG.apiWithCredentials,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // The API's CSRF guard for cookie-authenticated routes (refresh, logout).
    "X-Requested-With": "XMLHttpRequest",
  },
};

const axiosInstance = axios.create(baseConfig);
const refreshClient = axios.create(baseConfig);

let refreshPromise = null;
let onAuthFailure = null;

function extractTokenFromPayload(data) {
  return data?.accessToken || data?.token || data?.data?.accessToken || null;
}

function hasAbsoluteUrl(url = "") {
  return /^https?:\/\//i.test(url);
}

function toRelativeUrl(url = "") {
  if (!url) return "";
  if (!hasAbsoluteUrl(url)) return url;

  try {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname;
  } catch {
    return url;
  }
}

function shouldSkipRefresh(url) {
  const normalizedUrl = toRelativeUrl(url);

  if (!normalizedUrl) return true;

  if (normalizedUrl === ENV_CONFIG.refreshEndpoint) {
    return true;
  }

  return authExcludedEndpoints.has(normalizedUrl);
}

async function refreshAccessToken() {
  const response = await refreshClient.post(ENV_CONFIG.refreshEndpoint);
  const refreshedToken = extractTokenFromPayload(response.data);

  if (!refreshedToken) {
    throw new Error("Refresh endpoint did not return an access token.");
  }

  setAccessToken(refreshedToken);
  return refreshedToken;
}

/**
 * Single-flight refresh: concurrent callers share one request. Two parallel refreshes with
 * the same cookie would look like token reuse to the API, which revokes the whole session.
 */
export function refreshSession() {
  refreshPromise ??= refreshAccessToken().finally(() => {
    refreshPromise = null;
  });
  return refreshPromise;
}

function notifyAuthFailure() {
  if (typeof onAuthFailure === "function") {
    onAuthFailure();
  }
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token && !config.headers?.Authorization && !config.skipAuth) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error || {};
    const status = response?.status;
    const originalRequest = config;

    const usedGuestToken = String(
      originalRequest?.headers?.Authorization || "",
    ).startsWith("Guest ");

    if (
      status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      usedGuestToken ||
      shouldSkipRefresh(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const refreshedToken = await refreshSession();

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${refreshedToken}`,
      };

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      clearAccessToken();
      notifyAuthFailure();
      return Promise.reject(refreshError);
    }
  },
);

export function setAuthFailureHandler(handler) {
  onAuthFailure = handler;
}

export { axiosInstance };

