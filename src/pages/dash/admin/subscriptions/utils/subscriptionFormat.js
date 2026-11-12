export const SUBSCRIPTION_STATUS = {
  active: { label: "Active", className: "bg-emerald-50 text-emerald-700 ring-emerald-100" },
  past_due: { label: "Past due", className: "bg-amber-50 text-amber-700 ring-amber-100" },
  incomplete: { label: "Incomplete", className: "bg-sky-50 text-sky-700 ring-sky-100" },
  unpaid: { label: "Unpaid", className: "bg-rose-50 text-rose-700 ring-rose-100" },
  canceled: { label: "Canceled", className: "bg-slate-100 text-slate-600 ring-slate-200" },
};

export const SUBSCRIPTION_STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  ...Object.entries(SUBSCRIPTION_STATUS).map(([value, { label }]) => ({ value, label })),
];

// A period-end cancel can still be turned into an immediate one.
export const canCancel = (s) => s.status !== "canceled";
