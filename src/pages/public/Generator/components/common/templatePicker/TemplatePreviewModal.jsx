<<<<<<< HEAD
import React, { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Landmark, X } from "lucide-react";
import TemplatePagePreview from "../preview/TemplatePagePreview";
import { useBodyScrollLock } from "../../../../../../hooks/useBodyScrollLock";

/**
 * Full-size preview of a single template with a fixed header and action footer.
 * `footer` replaces the default "Use This Template" action.
 */
const TemplatePreviewModal = ({ template, onClose, onUseTemplate, footer }) => {
  const titleId = useId();
  const open = Boolean(template);
  const [showDepositSlip, setShowDepositSlip] = useState(false);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return undefined;
    setShowDepositSlip(false);
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, template?.id, onClose]);

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
        <div className="shrink-0 flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-slate-200/80">
          <h3
            id={titleId}
            className="min-w-0 truncate text-base sm:text-[17px] font-bold text-slate-900"
          >
            {template.title} preview
          </h3>
          <div className="flex shrink-0 items-center gap-2">
            {template?.document !== "check-statement" ? (
              <button
                type="button"
                role="switch"
                aria-checked={showDepositSlip}
                aria-label="Deposit slip"
                onClick={() => setShowDepositSlip((v) => !v)}
                className="inline-flex items-center gap-2 rounded-lg px-1.5 py-1 text-[13px] font-semibold text-slate-600 cursor-pointer"
              >
                <Landmark className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Deposit slip preview</span>
                <span
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    showDepositSlip ? "bg-[#1E60F2]" : "bg-slate-300"
                  }`}
                  aria-hidden="true"
                >
                  <span
                    className={`inline-block h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      showDepositSlip
                        ? "translate-x-[22px]"
                        : "translate-x-[3px]"
                    }`}
                  />
                </span>
              </button>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 -mr-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-6 py-5">
          <TemplatePagePreview
            template={template}
            showDepositSlip={showDepositSlip}
          />
        </div>

        {/* Footer */}
        <div className="shrink-0 px-5 sm:px-6 py-4 border-t border-slate-200/80 bg-white">
          {footer ?? (
            <button
              type="button"
              onClick={() => onUseTemplate(template.id)}
              className="w-full py-3 rounded-lg bg-[#009BFB] hover:bg-[#0089e0] active:bg-[#007cc7] text-white font-semibold text-[15px] shadow-sm transition cursor-pointer text-center"
            >
              Use This Template
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default TemplatePreviewModal;
=======
import React, { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import TemplatePagePreview from "../preview/TemplatePagePreview";
import { useBodyScrollLock } from "../../../../../../hooks/useBodyScrollLock";

/**
 * Full-size preview of a single template with a fixed header and action footer.
 * `footer` replaces the default "Use This Template" action.
 */
const TemplatePreviewModal = ({ template, onClose, onUseTemplate, footer }) => {
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
          {footer ?? (
            <button
              type="button"
              onClick={() => onUseTemplate(template.id)}
              className="w-full py-3 rounded-lg bg-[#009BFB] hover:bg-[#0089e0] active:bg-[#007cc7] text-white font-semibold text-[15px] shadow-sm transition cursor-pointer text-center"
            >
              Use This Template
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default TemplatePreviewModal;
>>>>>>> 925e0dca3d6ce63aa3b5108ff89adee725836e25
