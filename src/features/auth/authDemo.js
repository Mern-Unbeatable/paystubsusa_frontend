import { writeDemoSession, readDemoSession, clearDemoSession } from "./auth.session";

export function loginDemoByEmail(email) {
  const normalizedEmail = String(email || "").toLowerCase();
  const role = normalizedEmail.includes("admin") ? "admin" : "customer";
  return writeDemoSession(role);
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
