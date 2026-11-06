import { AUTH_STORAGE_KEYS, DEMO_USERS } from "./auth.constants";

const DEMO_SESSION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function isBrowserEnvironment() {
  return typeof document !== "undefined";
}

function shouldUseSecureCookie() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.location?.protocol === "https:";
}

function buildCookieAttributes(maxAgeSeconds) {
  const attributes = ["Path=/", "SameSite=Lax"];

  if (shouldUseSecureCookie()) {
    attributes.push("Secure");
  }

  if (Number.isFinite(maxAgeSeconds)) {
    attributes.push(`Max-Age=${Math.max(0, Math.floor(maxAgeSeconds))}`);
  }

  return attributes.join("; ");
}

function readCookieValue(name) {
  if (!isBrowserEnvironment()) {
    return null;
  }

  const cookiePrefix = `${name}=`;
  const allCookies = document.cookie ? document.cookie.split("; ") : [];

  for (const cookiePart of allCookies) {
    if (cookiePart.startsWith(cookiePrefix)) {
      return cookiePart.slice(cookiePrefix.length);
    }
  }

  return null;
}

function writeCookieValue(name, value, options = {}) {
  if (!isBrowserEnvironment()) {
    return false;
  }

  document.cookie = `${name}=${value}; ${buildCookieAttributes(
    options.maxAgeSeconds,
  )}`;

  return readCookieValue(name) === value;
}

function clearCookieValue(name) {
  if (!isBrowserEnvironment()) {
    return;
  }

  const expires = "Expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = `${name}=; ${buildCookieAttributes(0)}; ${expires}`;
}

export function readDemoSession() {
  const userKey = readCookieValue(AUTH_STORAGE_KEYS.demoSessionUser);

  if (!userKey || !DEMO_USERS[userKey]) {
    clearCookieValue(AUTH_STORAGE_KEYS.demoSessionUser);
    return null;
  }

  return DEMO_USERS[userKey];
}

export function writeDemoSession(userKey, options = {}) {
  if (!DEMO_USERS[userKey]) {
    throw new Error(`Unknown demo user: ${userKey}`);
  }

  const rememberMe = options.rememberMe === true;
  const wasPersisted = writeCookieValue(AUTH_STORAGE_KEYS.demoSessionUser, userKey, {
    maxAgeSeconds: rememberMe ? DEMO_SESSION_COOKIE_MAX_AGE_SECONDS : undefined,
  });

  if (!wasPersisted) {
    throw new Error("Unable to persist demo authentication cookie.");
  }

  return DEMO_USERS[userKey];
}

export function clearDemoSession() {
  clearCookieValue(AUTH_STORAGE_KEYS.demoSessionUser);
}
