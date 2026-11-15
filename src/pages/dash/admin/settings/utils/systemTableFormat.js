const DATE_KEYS = new Set([
  "createdAt",
  "updatedAt",
  "expiresAt",
  "consumedAt",
  "sentAt",
  "runAt",
  "lockedAt",
  "receivedAt",
  "processedAt",
  "windowStart",
]);

export const formatCellValue = (key, value) => {
  if (value == null || value === "") return "—";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (DATE_KEYS.has(key) || (typeof value === "string" && looksLikeIsoDate(value))) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
};

export const truncateCell = (text, max = 48) => {
  const value = String(text ?? "");
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1)}…`;
};

export const recordIdOf = (record) =>
  record?.id ?? record?.key ?? null;

const looksLikeIsoDate = (value) =>
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value);
