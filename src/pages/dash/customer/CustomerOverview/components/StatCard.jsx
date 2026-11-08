import React from "react";

const StatCard = ({ title, value, change, icon }) => {
  const IconComponent = icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-5 flex flex-col justify-between hover:border-slate-200 transition-colors">
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold text-slate-500">{title}</span>
      <div className="w-7 h-7 rounded bg-[#EBF5FF] text-[#009BFB] flex items-center justify-center">
        <IconComponent className="w-3.5 h-3.5" />
      </div>
    </div>
    <div className="mt-3">
      <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
        {value}
      </div>
      <div className="text-[11px] text-slate-400 font-medium mt-1">{change}</div>
    </div>
    </div>
  );
};

export default StatCard;
