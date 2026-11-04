const DEFAULT_API_TIMEOUT_MS = 15000;

function parseTimeout(rawTimeout) {
  const timeout = Number(rawTimeout);

  if (!Number.isFinite(timeout) || timeout <= 0) {
    return DEFAULT_API_TIMEOUT_MS;
  }

  return timeout;
}

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL;
const useDemoAuthFlag = import.meta.env.VITE_USE_DEMO_AUTH;

export const ENV_CONFIG = Object.freeze({
  apiBaseUrl: configuredBaseUrl || "/api",
  apiTimeoutMs: parseTimeout(import.meta.env.VITE_API_TIMEOUT_MS),
  apiWithCredentials: import.meta.env.VITE_API_WITH_CREDENTIALS !== "false",
  refreshEndpoint: import.meta.env.VITE_API_REFRESH_ENDPOINT || "/auth/refresh",
  useDemoAuth:
    useDemoAuthFlag === "true" ||
    (useDemoAuthFlag !== "false" && !configuredBaseUrl),
});

