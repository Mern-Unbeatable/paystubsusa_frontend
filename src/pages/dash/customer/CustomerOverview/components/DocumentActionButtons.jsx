import React from "react";
import { Download, Eye } from "lucide-react";

const DocumentActionButtons = ({ doc, onView, onDownload, canDownload = true }) => (
  <div className="inline-flex items-center gap-2">
    <button
      type="button"
      onClick={() => onView(doc)}
      className="w-7 h-7 rounded border border-slate-200 text-slate-500 hover:text-[#009BFB] hover:border-[#009BFB] hover:bg-sky-50/40 flex items-center justify-center transition cursor-pointer"
      title="View Document"
      aria-label={`View ${doc.title}`}
    >
      <Eye className="w-3.5 h-3.5" />
    </button>
    <button
      type="button"
      onClick={() => onDownload(doc)}
      disabled={!canDownload}
      className="w-7 h-7 rounded border border-slate-200 text-slate-500 hover:text-[#009BFB] hover:border-[#009BFB] hover:bg-sky-50/40 flex items-center justify-center transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-slate-500 disabled:hover:border-slate-200 disabled:hover:bg-transparent"
      title={canDownload ? "Download Document" : "PDF is still being prepared"}
      aria-label={`Download ${doc.title}`}
    >
      <Download className="w-3.5 h-3.5" />
    </button>
  </div>
);

export default DocumentActionButtons;
