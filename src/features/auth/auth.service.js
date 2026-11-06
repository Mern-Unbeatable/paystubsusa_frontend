import { ENV_CONFIG } from "../../config/env";
import { clearAccessToken } from "../../api/tokenManager";
import { loginApi, logoutApi, registerApi, restoreSessionApi } from "./authApi";
import {
  clearDemoAuthState,
  loginDemoByEmailAndPassword,
  loginDemoUser,
  registerDemoUser,
  restoreDemoSession,
} from "./authDemo";

async function login(credentials, options = {}) {
  if (ENV_CONFIG.useDemoAuth) {
    const user = loginDemoByEmailAndPassword(
      credentials?.email,
      credentials?.password,
      { rememberMe: credentials?.rememberMe === true },
    );
    return { user };
  }

  return loginApi(credentials, options);
}

async function register(payload, options = {}) {
  if (ENV_CONFIG.useDemoAuth) {
    return { user: registerDemoUser({ rememberMe: payload?.rememberMe === true }) };
  }

  return registerApi(payload, options);
}

async function loginAsDemoUser(userKey, options = {}) {
  return { user: loginDemoUser(userKey, options) };
}

async function restoreSession(options = {}) {
  if (ENV_CONFIG.useDemoAuth) {
    return { user: restoreDemoSession() };
  }

  return restoreSessionApi(options);
}

async function logout(options = {}) {
  try {
    if (!ENV_CONFIG.useDemoAuth) {
      await logoutApi(options);
    }
  } catch (error) {
    if (error.status !== 401 && error.status !== 403) {
      throw error;
    }
  } finally {
    clearAccessToken();
    clearDemoAuthState();
  }
}

function clearClientAuthState() {
  clearAccessToken();
  clearDemoAuthState();
}

export const authService = {
  login,
  register,
  loginAsDemoUser,
  restoreSession,
  logout,
  clearClientAuthState,
};
