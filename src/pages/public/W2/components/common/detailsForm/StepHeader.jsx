import React from "react";

/** Numbered step title used at the top of each W-2 form step. */
const StepHeader = ({ step, title, subtitle }) => (
  <div className="flex items-start gap-3.5 pb-2">
    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-50 text-secondary font-bold text-[13px] tracking-wide mt-0.5">
      {String(step).padStart(2, "0")}
    </span>
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-[#092258]">{title}</h2>
      <p className="text-slate-400 text-[14px] mt-0.5">{subtitle}</p>
    </div>
  </div>
);

export default StepHeader;
