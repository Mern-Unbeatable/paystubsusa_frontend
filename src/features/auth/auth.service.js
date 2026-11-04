import { ENV_CONFIG } from "../../config/env";
import { API_ENDPOINTS } from "../../api/endpoints";
import { httpClient } from "../../api/httpClient";
import { clearAccessToken, setAccessToken } from "../../api/tokenManager";
import {
  clearDemoSession,
  readDemoSession,
  writeDemoSession,
} from "./auth.session";

function resolveUserPayload(responseData) {
  return (
    responseData?.user ||
    responseData?.data?.user ||
    responseData?.profile ||
    null
  );
}

function resolveAccessToken(responseData) {
  return (
    responseData?.accessToken ||
    responseData?.token ||
    responseData?.data?.accessToken ||
    null
  );
}

function loginDemoUserByEmail(email) {
  const normalizedEmail = String(email || "").toLowerCase();
  const role = normalizedEmail.includes("admin") ? "admin" : "customer";
  return writeDemoSession(role);
}

async function login(credentials, options = {}) {
  if (ENV_CONFIG.useDemoAuth) {
    const user = loginDemoUserByEmail(credentials?.email);
    return { user };
  }

  const response = await httpClient.post(
    API_ENDPOINTS.AUTH.LOGIN,
    credentials,
    options,
  );
  const user = resolveUserPayload(response.data);
  const accessToken = resolveAccessToken(response.data);

  if (accessToken) {
    setAccessToken(accessToken);
  }

  return { user };
}

async function register(payload, options = {}) {
  if (ENV_CONFIG.useDemoAuth) {
    const user = writeDemoSession("customer");
    return { user };
  }

  const response = await httpClient.post(
    API_ENDPOINTS.AUTH.REGISTER,
    payload,
    options,
  );
  const user = resolveUserPayload(response.data);
  const accessToken = resolveAccessToken(response.data);

  if (accessToken) {
    setAccessToken(accessToken);
  }

  return { user };
}

async function loginAsDemoUser(userKey) {
  const user = writeDemoSession(userKey);
  return { user };
}

async function restoreSession(options = {}) {
  if (ENV_CONFIG.useDemoAuth) {
    const user = readDemoSession();
    return { user };
  }

  const response = await httpClient.get(API_ENDPOINTS.AUTH.PROFILE, options);
  const user = resolveUserPayload(response.data);
  const accessToken = resolveAccessToken(response.data);

  if (accessToken) {
    setAccessToken(accessToken);
  }

  return { user };
}

async function logout(options = {}) {
  try {
    if (!ENV_CONFIG.useDemoAuth) {
      await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT, null, options);
    }
  } catch (error) {
    if (error.status !== 401 && error.status !== 403) {
      throw error;
    }
  } finally {
    clearAccessToken();
    clearDemoSession();
  }
}

function clearClientAuthState() {
  clearAccessToken();
  clearDemoSession();
}

export const authService = {
  login,
  register,
  loginAsDemoUser,
  restoreSession,
  logout,
  clearClientAuthState,
};
