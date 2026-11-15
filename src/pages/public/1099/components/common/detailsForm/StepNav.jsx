import React from "react";
import { ArrowRight } from "lucide-react";

const NEXT_BTN =
  "bg-secondary hover:bg-[#0089e0] text-white font-semibold text-[15px] px-6 py-3.5 rounded-xl shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer active:scale-98";

const BACK_BTN =
  "px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium text-[14.5px] hover:bg-slate-50 transition cursor-pointer";

const StepNav = ({
  onBack,
  onNext,
  nextLabel = "Save & Continue",
  showBack = true,
}) => (
  <div
    className={`flex items-center pt-6 ${showBack ? "justify-between" : ""}`}
  >
    {showBack ? (
      <button type="button" onClick={onBack} className={BACK_BTN}>
        &lt; Back
      </button>
    ) : null}
    <button type="button" onClick={onNext} className={NEXT_BTN}>
      <span>{nextLabel}</span>
      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
    </button>
  </div>
);

export default StepNav;
