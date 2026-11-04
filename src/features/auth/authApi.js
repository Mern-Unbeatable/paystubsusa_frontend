import { API_ENDPOINTS } from "../../api/endpoints";
import { httpClient } from "../../api/httpClient";
import { setAccessToken } from "../../api/tokenManager";

function normalizeRole(roleValue) {
  const normalized = String(roleValue || "")
    .trim()
    .toLowerCase();

  if (!normalized) {
    return null;
  }

  if (
    normalized === "admin" ||
    normalized === "super_admin" ||
    normalized === "superadmin"
  ) {
    return "admin";
  }

  if (
    normalized === "customer" ||
    normalized === "user" ||
    normalized === "client"
  ) {
    return "customer";
  }

  return normalized;
}

function normalizeUserPayload(user) {
  if (!user || typeof user !== "object") {
    return null;
  }

  const resolvedRole = normalizeRole(user.role || user.userType || user.type);

  return {
    ...user,
    role: resolvedRole || user.role || user.userType || user.type || null,
  };
}

function resolveUserPayload(responseData) {
  const userCandidate =
    responseData?.user ||
    responseData?.data?.user ||
    responseData?.profile ||
    responseData?.data ||
    null;

  return normalizeUserPayload(userCandidate);
}

function resolveAccessToken(responseData) {
  return (
    responseData?.accessToken ||
    responseData?.token ||
    responseData?.data?.accessToken ||
    null
  );
}

export async function loginApi(credentials, options = {}) {
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

export async function registerApi(payload, options = {}) {
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

export async function restoreSessionApi(options = {}) {
  const response = await httpClient.get(API_ENDPOINTS.AUTH.PROFILE, options);
  const user = resolveUserPayload(response.data);
  const accessToken = resolveAccessToken(response.data);

  if (accessToken) {
    setAccessToken(accessToken);
  }

  return { user };
}

export async function logoutApi(options = {}) {
  await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT, null, options);
}
