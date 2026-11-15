import React from "react";

/** Step title used at the top of each W-2 form step. */
const StepHeader = ({ title, subtitle }) => (
  <div className="pb-2">
    <h2 className="text-xl sm:text-2xl font-bold text-[#092258]">{title}</h2>
    <p className="text-slate-400 text-[14px] mt-0.5">{subtitle}</p>
  </div>
);

export default StepHeader;
