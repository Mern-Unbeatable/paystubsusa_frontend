import { getSafeRedirectPath } from "../../../../router/routes/safeRedirect";

// Stripe always returns to /customer/subscription; this remembers where the customer started.
const KEY = "subscription.returnTo";

export function rememberSubscriptionReturn(path) {
  try {
    sessionStorage.setItem(KEY, path);
  } catch {
    // Storage disabled: the customer can still navigate back manually.
  }
}

export function readSubscriptionReturn() {
  try {
    const path = getSafeRedirectPath(sessionStorage.getItem(KEY), null);
    return path;
  } catch {
    return null;
  }
}

export function clearSubscriptionReturn() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
