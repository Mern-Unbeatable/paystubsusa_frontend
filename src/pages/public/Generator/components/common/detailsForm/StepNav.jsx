import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NEXT_STYLES = {
  default:
    "px-6 py-2.5 rounded-lg bg-[#1E60F2] text-white font-semibold text-[14px] shadow-sm hover:bg-[#1550cf] transition flex items-center gap-1.5 cursor-pointer",
  final:
    "px-7 py-3 rounded-lg bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-[15px] shadow-sm transition flex items-center gap-1.5 cursor-pointer",
};

/** Back / Continue row at the bottom of each form step. */
const StepNav = ({ onBack, onNext, nextLabel = "Continue", variant = "default", className = "pt-5" }) => (
  <div className={`flex items-center justify-between border-t border-slate-100 ${className}`}>
    <button
      type="button"
      onClick={onBack}
      className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-[14px] hover:bg-slate-50 transition cursor-pointer inline-flex items-center gap-1.5"
    >
      <ChevronLeft className="w-4 h-4" /> Back
    </button>
    <button type="button" onClick={onNext} className={NEXT_STYLES[variant]}>
      <span>{nextLabel}</span>
      <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);

export default StepNav;
