import { writeDemoSession, readDemoSession, clearDemoSession } from "./auth.session";
import { DEMO_CREDENTIALS } from "./auth.constants";

const DEMO_LOGIN_ERROR = "Invalid demo credentials.";

function resolveDemoUserKeyByCredentials(email, password) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const normalizedPassword = String(password || "");

  const matchedUser = Object.entries(DEMO_CREDENTIALS).find(([, credentials]) => {
    return (
      credentials.email.toLowerCase() === normalizedEmail &&
      credentials.password === normalizedPassword
    );
  });

  return matchedUser?.[0] || null;
}

export function loginDemoByEmailAndPassword(email, password) {
  const userKey = resolveDemoUserKeyByCredentials(email, password);

  if (!userKey) {
    const error = new Error(DEMO_LOGIN_ERROR);
    error.code = "INVALID_DEMO_CREDENTIALS";
    error.status = 401;
    throw error;
  }

  return writeDemoSession(userKey);
}

export function registerDemoUser() {
  return writeDemoSession("customer");
}

export function loginDemoUser(userKey) {
  return writeDemoSession(userKey);
}

export function restoreDemoSession() {
  return readDemoSession();
}

export function clearDemoAuthState() {
  clearDemoSession();
}
