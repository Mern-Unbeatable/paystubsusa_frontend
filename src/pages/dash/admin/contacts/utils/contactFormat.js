export const CONTACT_STATUS = {
  new: { label: "New", className: "bg-red-100 text-red-700 ring-red-200" },
  handled: {
    label: "Handled",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  },
};

export const CONTACT_STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  ...Object.entries(CONTACT_STATUS).map(([value, { label }]) => ({
    value,
    label,
  })),
];

const dateTime = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function formatReceived(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : dateTime.format(date);
}

export const nextStatus = (m) => (m.status === "new" ? "handled" : "new");
