import React from "react";
import { Download, Eye } from "lucide-react";

const DocumentActionButtons = ({ doc, onView, onDownload }) => (
  <div className="inline-flex items-center gap-2">
    <button
      type="button"
      onClick={() => onView(doc)}
      className="w-7 h-7 rounded border border-slate-200 text-slate-500 hover:text-[#009BFB] hover:border-[#009BFB] hover:bg-sky-50/40 flex items-center justify-center transition cursor-pointer"
      title="View Document"
      aria-label={`View ${doc.name}`}
    >
      <Eye className="w-3.5 h-3.5" />
    </button>
    <button
      type="button"
      onClick={() => onDownload(doc.name)}
      className="w-7 h-7 rounded border border-slate-200 text-slate-500 hover:text-[#009BFB] hover:border-[#009BFB] hover:bg-sky-50/40 flex items-center justify-center transition cursor-pointer"
      title="Download Document"
      aria-label={`Download ${doc.name}`}
    >
      <Download className="w-3.5 h-3.5" />
    </button>
  </div>
);

export default DocumentActionButtons;
