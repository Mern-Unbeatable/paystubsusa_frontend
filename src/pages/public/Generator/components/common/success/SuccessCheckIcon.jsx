import React from "react";

const SuccessCheckIcon = () => (
  <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
    {/* Pulsing rings */}
    <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
    <span className="absolute inset-2 rounded-full bg-emerald-400/20 animate-pulse" />

    {/* Pop-in circle with checkmark */}
    <div className="relative w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center animate-[successPop_0.6s_cubic-bezier(0.34,1.56,0.64,1)_forwards] shadow-[0_0_0_0_rgba(16,185,129,0.4)] animate-[successPop_0.6s_cubic-bezier(0.34,1.56,0.64,1)_forwards,successGlow_2s_ease-out_0.6s_infinite]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10"
      >
        <path
          d="M20 6L9 17l-5-5"
          className="[stroke-dasharray:24] [stroke-dashoffset:24] animate-[drawCheck_0.5s_ease-out_0.4s_forwards]"
        />
      </svg>
    </div>
  </div>
);

export default SuccessCheckIcon;
