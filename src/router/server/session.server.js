import {
  clearDemoSession,
  readDemoSession,
  writeDemoSession,
} from "../../features/auth/auth.session";

export function readSession() {
  return readDemoSession();
}

export function writeSession(userKey) {
  return writeDemoSession(userKey);
}

export function clearSession() {
  clearDemoSession();
}
