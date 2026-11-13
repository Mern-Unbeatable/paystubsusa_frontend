import React from "react";

/** Diagonal corner ribbon; the parent card must be `relative overflow-hidden` with extra top padding. */
const StepRibbon = ({ children }) => (
  <span className="absolute top-4 -left-9 w-32 -rotate-45 bg-[#1E60F2] py-1 text-center text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
    {children}
  </span>
);

export default StepRibbon;
