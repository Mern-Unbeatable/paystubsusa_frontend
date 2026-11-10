import React, { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import TemplateCard from "./TemplateCard";
import { TEMPLATES } from "./PaystubThumbnail";
import { useBodyScrollLock } from "../../../../../hooks/useBodyScrollLock";

/**
 * Reusable "Choose a Template" dialog. Selection is a draft until the user
 * confirms; `onConfirm(templateId)` only fires for a valid, changed choice
 * (confirming the current template just closes the modal).
 */
const TemplateSelectionModal = ({
  open,
  selectedTemplateId,
  onClose,
  onConfirm,
  templates = TEMPLATES,
  title = "Choose a Template",
  description = "Pick a layout for your paystub. Your entered details are kept.",
  confirmLabel = "Select Template",
}) => {
  const titleId = useId();
  const [draftId, setDraftId] = useState(selectedTemplateId);

  // Re-sync the draft each time the modal opens.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setDraftId(selectedTemplateId);
  }

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

  const draftTemplate = templates.find((t) => t.id === draftId) ?? null;

  const handleConfirm = () => {
    if (!draftTemplate) return;
    if (draftTemplate.id === selectedTemplateId) onClose();
    else onConfirm(draftTemplate.id);
  };

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
        className="bg-white rounded-2xl w-full max-w-5xl h-full max-h-[min(900px,calc(100dvh-1.5rem))] sm:max-h-[min(900px,calc(100dvh-3rem))] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 select-none"
      >
        {/* Header */}
        <div className="shrink-0 flex items-start justify-between gap-4 px-5 sm:px-7 py-4 sm:py-5 border-b border-slate-200/80">
          <div>
            <h2 id={titleId} className="text-lg sm:text-xl font-bold text-[#092258]">
              {title}
            </h2>
            {description && (
              <p className="mt-0.5 text-slate-500 text-[13px] sm:text-[14px]">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 -mr-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            aria-label="Close template selection"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain bg-[#F0F5FA] px-4 sm:px-7 py-5 sm:py-6">
          <div
            role="radiogroup"
            aria-label="Paystub templates"
            className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pt-1.5 pr-1.5"
          >
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={draftId === template.id}
                onSelect={setDraftId}
                showSelectButton={false}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 px-5 sm:px-7 py-3.5 sm:py-4 border-t border-slate-200/80 bg-white">
          <p className="text-[13px] sm:text-[14px] text-slate-500 text-center sm:text-left">
            {draftTemplate ? (
              <>
                Selected:{" "}
                <strong className="text-slate-800">{draftTemplate.title}</strong>
                <span className="text-slate-400"> · {draftTemplate.subtitle}</span>
              </>
            ) : (
              "No template selected"
            )}
          </p>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium text-[14px] hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!draftTemplate}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-[#1E60F2] hover:bg-[#1550cf] text-white font-semibold text-[14px] shadow-sm transition cursor-pointer disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default TemplateSelectionModal;
