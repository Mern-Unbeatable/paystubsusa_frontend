import React, { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import TemplatePagePreview from "./TemplatePagePreview";
import { useBodyScrollLock } from "../../../../../hooks/useBodyScrollLock";

/** Full-size preview of a single template with a fixed header and action footer. */
const TemplatePreviewModal = ({ template, onClose, onUseTemplate }) => {
  const titleId = useId();
  const open = Boolean(template);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-xl sm:max-w-2xl max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 select-none"
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-slate-200/80">
          <h3 id={titleId} className="text-base sm:text-[17px] font-bold text-slate-900">
            {template.title} preview
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 -mr-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-6 py-5">
          <TemplatePagePreview template={template} />
        </div>

        {/* Footer */}
        <div className="shrink-0 px-5 sm:px-6 py-4 border-t border-slate-200/80 bg-white">
          <button
            type="button"
            onClick={() => onUseTemplate(template.id)}
            className="w-full py-3 rounded-lg bg-[#009BFB] hover:bg-[#0089e0] active:bg-[#007cc7] text-white font-semibold text-[15px] shadow-sm transition cursor-pointer text-center"
          >
            Use This Template
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default TemplatePreviewModal;
