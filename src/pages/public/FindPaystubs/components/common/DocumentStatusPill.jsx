import React from "react";

const STYLES = {
  ready: { label: "Completed", pill: "bg-emerald-50 text-emerald-600 border-emerald-200/60", dot: "bg-emerald-500" },
  failed: { label: "Failed", pill: "bg-rose-50 text-rose-600 border-rose-200/60", dot: "bg-rose-500" },
  revoked: { label: "Revoked", pill: "bg-slate-100 text-slate-500 border-slate-200", dot: "bg-slate-400" },
};
const PROCESSING = { label: "Processing", pill: "bg-amber-50 text-amber-600 border-amber-200/60", dot: "bg-amber-500" };

const DocumentStatusPill = ({ status }) => {
  const style = STYLES[status] ?? PROCESSING;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style.pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {style.label}
    </span>
  );
};

export default DocumentStatusPill;
