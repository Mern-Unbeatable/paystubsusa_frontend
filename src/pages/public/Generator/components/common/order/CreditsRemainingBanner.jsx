import React from "react";

const CreditsRemainingBanner = ({
  creditsRemaining,
  onUseCredit,
  description = "Already paid. Fill in the next one at no extra cost.",
  actionLabel = "Create Next Paystub",
  className = "",
}) => (
  <div className={`p-4 rounded-xl border border-blue-100 bg-blue-50/60 text-left flex items-center justify-between gap-3 animate-[dropIn_0.6s_cubic-bezier(0.34,1.56,0.64,1)_0.5s_both] ${className}`}>
    <div className="text-[13px]">
      <p className="font-bold text-slate-800">
        {creditsRemaining} paystub{creditsRemaining === 1 ? "" : "s"} left in
        your package
      </p>
      <p className="text-slate-500">{description}</p>
    </div>
    <button
      type="button"
      onClick={onUseCredit}
      className="flex-shrink-0 px-4 py-2 rounded-lg bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-[13px] transition cursor-pointer"
    >
      {actionLabel}
    </button>
  </div>
);

export default CreditsRemainingBanner;
