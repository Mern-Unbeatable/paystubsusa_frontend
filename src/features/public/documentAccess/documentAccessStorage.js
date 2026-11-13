// Only the typed email is remembered for the tab session (prefill after a refresh).
// The guest token and codes stay in memory: they must never reach localStorage/sessionStorage.
const EMAIL_KEY = "findPaystubs.email";

export function readRememberedEmail() {
  try {
    return window.sessionStorage.getItem(EMAIL_KEY) ?? "";
  } catch {
    return "";
  }
}

export function rememberEmail(email) {
  try {
    window.sessionStorage.setItem(EMAIL_KEY, email);
  } catch {
    /* storage unavailable (private mode, quota): prefill is best-effort */
  }
}

export function forgetRememberedEmail() {
  try {
    window.sessionStorage.removeItem(EMAIL_KEY);
  } catch {
    /* ignore */
  }
}
