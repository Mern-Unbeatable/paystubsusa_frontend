import { API_ENDPOINTS } from "../../api/endpoints";
import { httpClient } from "../../api/httpClient";
import { setAccessToken } from "../../api/tokenManager";

function resolveUserPayload(responseData) {
  return responseData?.user || responseData?.data?.user || responseData?.profile || null;
}

function resolveAccessToken(responseData) {
  return responseData?.accessToken || responseData?.token || responseData?.data?.accessToken || null;
}

export async function loginApi(credentials, options = {}) {
  const response = await httpClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials, options);
  const user = resolveUserPayload(response.data);
  const accessToken = resolveAccessToken(response.data);

  if (accessToken) {
    setAccessToken(accessToken);
  }

  return { user };
}

export async function registerApi(payload, options = {}) {
  const response = await httpClient.post(API_ENDPOINTS.AUTH.REGISTER, payload, options);
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
