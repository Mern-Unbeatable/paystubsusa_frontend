import { ENV_CONFIG } from "../../../../../config/env";

/** The API returns the avatar path relative to its base URL. */
export function avatarSrc(user) {
  return user?.avatarUrl ? `${ENV_CONFIG.apiBaseUrl}${user.avatarUrl}` : null;
}

export function getInitials(name, email) {
  const source = (name || "").trim() || (email || "").split("@")[0] || "";
  const parts = source.split(/\s+/).filter(Boolean);
  const letters =
    parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : source.slice(0, 2);
  return letters.toUpperCase() || "?";
}

/** `jordan@example.com` → `j****n@example.com` */
export function maskEmail(email) {
  if (!email || !email.includes("@")) return email || "";
  const [local, domain] = email.split("@");
  if (local.length <= 2) return `${local[0]}*@${domain}`;
  return `${local[0]}${"*".repeat(Math.min(local.length - 2, 6))}${local.at(-1)}@${domain}`;
}

export function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatRole(role) {
  if (!role) return "Customer";
  return role.charAt(0).toUpperCase() + role.slice(1);
}

export function secondsUntil(isoTime) {
  const target = new Date(isoTime).getTime();
  if (Number.isNaN(target)) return 0;
  return Math.max(0, Math.ceil((target - Date.now()) / 1000));
}

/** Network failures carry no status; give them a message the user can act on. */
export function describeRequestError(error, fallback) {
  if (error?.isNetworkError) {
    return "We couldn't reach the server. Check your connection and try again.";
  }
  const fieldMessage = Object.values(error?.fieldErrors || {}).flat()[0];
  return fieldMessage || error?.message || fallback;
}
