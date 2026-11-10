import { refreshSession } from "../../api/axiosInstance";
import { normalizeHttpError } from "../../api/errorNormalizer";
import { clearAccessToken, getAccessToken } from "../../api/tokenManager";
import {
  forgotPasswordApi,
  loginApi,
  logoutApi,
  registerApi,
  resendVerificationApi,
  resetPasswordApi,
  restoreSessionApi,
  verifyEmailApi,
} from "./authApi";

/**
 * After a page load the access token (memory only) is gone, so trade the HttpOnly refresh
 * cookie for a new one first; that avoids a guaranteed-401 /me round trip.
 */
async function restoreSession(options = {}) {
  if (!getAccessToken()) {
    try {
      await refreshSession();
    } catch (error) {
      throw normalizeHttpError(error);
    }
  }

  return restoreSessionApi(options);
}

async function logout(options = {}) {
  try {
    await logoutApi(options);
  } catch (error) {
    if (error.status !== 401 && error.status !== 403) {
      throw error;
    }
  } finally {
    clearAccessToken();
  }
}

export const authService = {
  login: loginApi,
  register: registerApi,
  restoreSession,
  logout,
  clearClientAuthState: clearAccessToken,
  forgotPassword: forgotPasswordApi,
  resetPassword: resetPasswordApi,
  resendVerification: resendVerificationApi,
  verifyEmail: verifyEmailApi,
};
