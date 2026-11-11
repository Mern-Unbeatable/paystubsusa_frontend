import React, { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible dialog: traps focus, restores it on close, locks page scroll.
 * `dismissible={false}` blocks Escape, overlay clicks and the close button
 * while a request is in flight.
 */
const ProfileModal = ({
  open,
  onClose,
  title,
  description,
  icon: Icon,
  dismissible = true,
  footer,
  size = "md",
  children,
}) => {
  const panelRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const initial =
      panel?.querySelector("[data-autofocus]") ||
      panel?.querySelector(FOCUSABLE);
    initial?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      if (dismissible) onClose();
      return;
    }
    if (event.key !== "Tab") return;

    const nodes = [...panelRef.current.querySelectorAll(FOCUSABLE)];
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      onKeyDown={handleKeyDown}
    >
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
        aria-hidden="true"
        onClick={dismissible ? onClose : undefined}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={`relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-2xl sm:rounded-2xl ${
          size === "lg" ? "sm:max-w-2xl" : "sm:max-w-md"
        }`}
      >
        <div
          className={`flex shrink-0 items-start justify-between gap-4 px-6 pt-6 ${
            footer ? "border-b border-slate-100 pb-4" : ""
          }`}
        >
          <div className="flex items-start gap-3">
            {Icon && (
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
            )}
            <div>
              <h2 id={titleId} className="text-lg font-bold text-slate-900">
                {title}
              </h2>
              {description && (
                <p
                  id={descriptionId}
                  className="mt-1 text-sm leading-relaxed text-slate-500"
                >
                  {description}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={!dismissible}
            aria-label="Close dialog"
            className="-mr-2 -mt-1 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div
          className={`min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 ${footer ? "py-5" : "pb-6 pt-5"}`}
        >
          {children}
        </div>
        {footer && (
          <div className="shrink-0 border-t border-slate-100 bg-slate-50/60 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default ProfileModal;
