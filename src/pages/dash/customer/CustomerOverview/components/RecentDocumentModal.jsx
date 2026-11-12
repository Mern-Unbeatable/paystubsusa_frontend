import React from "react";
import { Download, FileText, X } from "lucide-react";
import { DashboardStatusBadge } from "../../../../../layouts";
import { formatCents } from "../../../../../utils/format";
import { DOCUMENT_TYPE_LABELS, formatDateTime } from "../../../admin/orders/utils/orderFormat";
import { documentStatusLabel } from "../utils/overviewFormat";

const Field = ({ label, children }) => (
  <div className="min-w-0">
    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">{label}</span>
    <div className="font-bold text-slate-900 text-sm mt-0.5 break-words">{children}</div>
  </div>
);

const RecentDocumentModal = ({ doc, downloading, onClose, onDownload }) => {
  if (!doc) return null;
  const ready = doc.status === "ready";

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="recent-document-title"
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded bg-[#EBF5FF] text-[#009BFB] flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <h3 id="recent-document-title" className="text-lg font-bold text-slate-900 truncate">
              {doc.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center transition cursor-pointer flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs">
          <Field label="Document number">
            <span className="font-mono text-xs">{doc.documentNumber}</span>
          </Field>
          <Field label="Status">
            <DashboardStatusBadge status={documentStatusLabel(doc.status)} />
          </Field>
          <Field label="Type">{DOCUMENT_TYPE_LABELS[doc.type] ?? doc.type}</Field>
          <Field label="Created">{formatDateTime(doc.createdAt)}</Field>
          <Field label="Employer">{doc.employerName || "—"}</Field>
          <Field label="Employee">{doc.recipientName || "—"}</Field>
          <Field label="Amount">{doc.amountCents == null ? "—" : formatCents(doc.amountCents)}</Field>
          <Field label="Order">{doc.orderNumber}</Field>
        </div>

        <div className="px-6 pb-6 pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm transition cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onDownload(doc)}
            disabled={!ready || downloading}
            className="px-6 py-2.5 rounded bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? "Preparing..." : ready ? "Download PDF" : "PDF not ready yet"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentDocumentModal;
