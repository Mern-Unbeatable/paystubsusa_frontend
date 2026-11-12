import { DOCUMENT_TYPE_OPTIONS } from "../../orders/utils/orderFormat";

export { DOCUMENT_TYPE_LABELS } from "../../orders/utils/orderFormat";

export const DOCUMENT_STATUS = {
  ready: { label: "Ready", className: "bg-emerald-50 text-emerald-700 ring-emerald-100" },
  queued: { label: "Queued", className: "bg-sky-50 text-sky-700 ring-sky-100" },
  rendering: { label: "Rendering", className: "bg-sky-50 text-sky-700 ring-sky-100" },
  awaiting_payment: { label: "Awaiting payment", className: "bg-amber-50 text-amber-700 ring-amber-100" },
  failed: { label: "Failed", className: "bg-rose-50 text-rose-700 ring-rose-100" },
  revoked: { label: "Revoked", className: "bg-slate-100 text-slate-600 ring-slate-200" },
};

export const DOCUMENT_STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  ...Object.entries(DOCUMENT_STATUS).map(([value, { label }]) => ({ value, label })),
];

export const DOCUMENT_TYPE_FILTER_OPTIONS = DOCUMENT_TYPE_OPTIONS;

export const DOCUMENT_SORT_OPTIONS = [
  { value: "-createdAt", label: "Newest first" },
  { value: "createdAt", label: "Oldest first" },
  { value: "title", label: "Title A–Z" },
  { value: "-title", label: "Title Z–A" },
];

/** The server only re-renders documents of paid orders that still have their form data. */
export const canRegenerate = (doc) => doc.status === "ready" || doc.status === "failed";
