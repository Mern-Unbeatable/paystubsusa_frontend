import { AUTH_STORAGE_KEYS, DEMO_USERS } from "./auth.constants";

export function readDemoSession() {
  try {
    const userKey = localStorage.getItem(AUTH_STORAGE_KEYS.demoSessionUser);

    if (!userKey || !DEMO_USERS[userKey]) {
      return null;
    }

    return DEMO_USERS[userKey];
  } catch {
    return null;
  }
}

export function writeDemoSession(userKey) {
  if (!DEMO_USERS[userKey]) {
    throw new Error(`Unknown demo user: ${userKey}`);
  }

  localStorage.setItem(AUTH_STORAGE_KEYS.demoSessionUser, userKey);
  return DEMO_USERS[userKey];
}

export function clearDemoSession() {
  localStorage.removeItem(AUTH_STORAGE_KEYS.demoSessionUser);
}
