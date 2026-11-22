import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NEXT_STYLES = {
  default:
    "px-6 py-2.5 rounded-lg bg-[#1E60F2] text-white font-semibold text-[14px] shadow-sm hover:bg-[#1550cf] transition inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
  final:
    "px-7 py-3 rounded-lg bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-[15px] shadow-sm transition inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "px-6 py-3.5 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-[15px] shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed",
};

const BACK_STYLES = {
  default:
    "px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-[14px] hover:bg-slate-50 transition cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed",
  final:
    "px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-[14px] hover:bg-slate-50 transition cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium text-[14.5px] hover:bg-slate-50 transition cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed",
};

/**
 * Shared Back / Next controls for multi-step document flows.
 * Mobile: fixed to the bottom of the viewport (no in-card spacer gap).
 * Desktop (sm+): sits in normal document flow after the form fields.
 */
const DocumentStepNav = ({
  onBack,
  onNext,
  backLabel = "Back",
  nextLabel = "Continue",
  showBack = true,
  nextDisabled = false,
  backDisabled = false,
  variant = "default",
  stickyOnMobile = true,
  className = "",
}) => {
  const nextClass = NEXT_STYLES[variant] ?? NEXT_STYLES.default;
  const backClass = BACK_STYLES[variant] ?? BACK_STYLES.default;
  const justify = showBack ? "justify-between" : "justify-end";

  const buttons = (
    <>
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          disabled={backDisabled || !onBack}
          className={backClass}
        >
          <ChevronLeft className="w-4 h-4" />
          {backLabel}
        </button>
      ) : null}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled || !onNext}
        className={nextClass}
      >
        <span>{nextLabel}</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </>
  );

  if (!stickyOnMobile) {
    return (
      <div className={`flex items-center ${justify} ${className}`}>
        {buttons}
      </div>
    );
  }

  // Single wrapper so parent `space-y-*` only applies once on desktop.
  // Mobile: fixed bar is out of flow + `max-sm:!mt-0` kills leftover space-y gap;
  // page shells add pb so content can scroll clear of the bar.
  return (
    <div className={`max-sm:!mt-0 ${className}`}>
      <div
        className={`flex items-center ${justify} border-t border-slate-200/80 sm:border-t-0 fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur-sm px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(15,23,42,0.08)] sm:static sm:inset-auto sm:z-auto sm:bg-transparent sm:backdrop-blur-none sm:px-0 sm:pb-0 sm:pt-0 sm:shadow-none`}
      >
        {buttons}
      </div>
    </div>
  );
};

export default DocumentStepNav;
