import React, { useEffect, useState } from "react";
import { Download, FileText, X } from "lucide-react";
import { formatDateTime } from "../../../../dash/admin/orders/utils/orderFormat";
import DocumentStatusPill from "./DocumentStatusPill";

const Meta = ({ label, children, mono = false }) => (
  <div className="min-w-0">
    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
    <span className={`block text-sm sm:text-[15px] font-semibold text-slate-900 mt-1 break-words ${mono ? "font-mono" : ""}`}>
      {children}
    </span>
  </div>
);

/** Shows the real rendered PDF; documents that aren't ready yet show their status instead. */
const DocumentPreviewModal = ({ doc, downloading, getPreviewUrl, onDownload, onClose }) => {
  const ready = doc?.status === "ready";
  const [preview, setPreview] = useState({ id: null, src: null, failed: false });

  useEffect(() => {
    if (!doc?.id || !ready) return undefined;
    let active = true;
    let created = null;
    getPreviewUrl(doc.id)
      .then((src) => {
        created = src;
        if (active) setPreview({ id: doc.id, src, failed: false });
        else URL.revokeObjectURL(src);
      })
      .catch(() => active && setPreview({ id: doc.id, src: null, failed: true }));
    return () => {
      active = false;
      if (created) URL.revokeObjectURL(created);
    };
  }, [doc?.id, ready, getPreviewUrl]);

  if (!doc) return null;
  const current = preview.id === doc.id ? preview : null;

  let body;
  if (!ready) {
    body = (
      <p className="text-sm text-slate-500 text-center px-6">
        {doc.status === "failed"
          ? "We couldn't generate this PDF. Please contact support."
          : "This PDF is still being prepared. Check back in a moment."}
      </p>
    );
  } else if (current?.src) {
    body = <iframe title={`Preview of ${doc.title}`} src={current.src} className="w-full h-[55vh] min-h-[320px] rounded-lg bg-white border border-slate-200" />;
  } else if (current?.failed) {
    body = <p className="text-sm text-slate-500 text-center px-6">Preview unavailable. You can still download the PDF.</p>;
  } else {
    body = <span className="w-6 h-6 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" aria-label="Loading preview" />;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="find-doc-title"
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 pb-3">
          <h3 id="find-doc-title" className="font-extrabold text-slate-900 text-xl sm:text-2xl tracking-tight">
            Document Details
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-[#EEF6FF] rounded-2xl p-3 sm:p-4 flex items-center justify-center min-h-[200px] my-4 overflow-hidden border border-blue-50/50">
          {body}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mt-5 px-1">
          <Meta label="Document name">
            <span className="inline-flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-secondary flex-shrink-0" />
              {doc.title}
            </span>
          </Meta>
          <Meta label="Created">{formatDateTime(doc.createdAt)}</Meta>
          <Meta label="Document ID" mono>
            {doc.documentNumber}
          </Meta>
          <Meta label="Status">
            <DocumentStatusPill status={doc.status} />
          </Meta>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-6 mt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition cursor-pointer"
          >
            Back to Documents
          </button>
          <button
            type="button"
            onClick={() => onDownload(doc)}
            disabled={!ready || downloading}
            className="px-6 py-2.5 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-sm transition shadow-sm inline-flex items-center justify-center gap-2 active:scale-98 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>{downloading ? "Preparing..." : "Download PDF"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;
