import { DUMMY_USERS, DUMMY_SESSION_KEY } from "./dummyUsers";

export function readSession() {
  try {
    const userKey = localStorage.getItem(DUMMY_SESSION_KEY);
    if (!userKey || !DUMMY_USERS[userKey]) return null;
    return DUMMY_USERS[userKey];
  } catch {
    return null;
  }
}

export function writeSession(userKey) {
  if (!DUMMY_USERS[userKey]) {
    throw new Error(`Unknown demo user: ${userKey}`);
  }

  localStorage.setItem(DUMMY_SESSION_KEY, userKey);
  return DUMMY_USERS[userKey];
}

export function clearSession() {
  localStorage.removeItem(DUMMY_SESSION_KEY);
}
