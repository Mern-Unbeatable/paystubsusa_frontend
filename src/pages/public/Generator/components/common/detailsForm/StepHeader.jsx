import React from "react";

const StepHeader = ({ title }) => (
  <div>
    <h2 className="text-2xl sm:text-[26px] font-bold text-[#092258]">{title}</h2>
    <p className="text-slate-400 text-[13px] mt-0.5">
      Fields marked <span className="text-rose-500">*</span> are required.
    </p>
  </div>
);

export default StepHeader;
