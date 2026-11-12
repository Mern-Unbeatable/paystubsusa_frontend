const DEFAULT_API_TIMEOUT_MS = 15000;

function parseTimeout(rawTimeout) {
  const timeout = Number(rawTimeout);

  if (!Number.isFinite(timeout) || timeout <= 0) {
    return DEFAULT_API_TIMEOUT_MS;
  }

  return timeout;
}

export const ENV_CONFIG = Object.freeze({
  // Same-origin by default (Vite proxies /api in dev) so the HttpOnly refresh cookie just works.
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  apiTimeoutMs: parseTimeout(import.meta.env.VITE_API_TIMEOUT_MS),
  apiWithCredentials: import.meta.env.VITE_API_WITH_CREDENTIALS !== "false",
  refreshEndpoint: import.meta.env.VITE_API_REFRESH_ENDPOINT || "/auth/refresh",
  // Publishable (pk_) key only; checkout shows an error when it is missing.
  stripePublishableKey: /^pk_(test|live)_/.test(import.meta.env.STRIPE_PUBLISHABLE_KEY || "")
    ? import.meta.env.STRIPE_PUBLISHABLE_KEY
    : "",
});
