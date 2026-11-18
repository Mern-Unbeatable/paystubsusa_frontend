import React, { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { Pencil, Star, X } from "lucide-react";
import { useBodyScrollLock } from "../../../../../hooks/useBodyScrollLock";
import DocumentTemplatePreview from "./DocumentTemplatePreview";

/** Full-page preview of a catalog template with admin actions in the footer. */
const TemplateDetailsModal = ({ template, onClose, onEdit, onSetDefault }) => {
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

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-6 py-5">
          <DocumentTemplatePreview template={template} mode="page" />
        </div>

        <div className="shrink-0 border-t border-slate-200/80 px-5 sm:px-6 py-4">
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 cursor-pointer"
            >
              Close
            </button>
            {template.isActive && !template.isDefault && (
              <button
                type="button"
                onClick={() => onSetDefault(template)}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 cursor-pointer"
              >
                <Star className="h-4 w-4" />
                Make default
              </button>
            )}
            <button
              type="button"
              onClick={() => onEdit(template)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-secondary px-4 text-sm font-semibold text-white transition hover:bg-secondary/90 cursor-pointer"
            >
              <Pencil className="h-4 w-4" />
              Edit template
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default TemplateDetailsModal;
