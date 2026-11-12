import React from "react";

const TONES = {
  default: { card: "bg-white border-slate-100 hover:border-slate-200", icon: "bg-[#EBF5FF] text-[#009BFB]", value: "text-slate-900" },
  success: { card: "bg-emerald-50 border-emerald-100 hover:border-emerald-200", icon: "bg-emerald-100 text-emerald-600", value: "text-emerald-700" },
  warning: { card: "bg-amber-50 border-amber-100 hover:border-amber-200", icon: "bg-amber-100 text-amber-600", value: "text-amber-700" },
  danger: { card: "bg-rose-50 border-rose-100 hover:border-rose-200", icon: "bg-rose-100 text-rose-600", value: "text-rose-700" },
  neutral: { card: "bg-slate-50 border-slate-100 hover:border-slate-200", icon: "bg-slate-100 text-slate-500", value: "text-slate-700" },
};

const StatCard = ({ title, value, change, icon, tone = "default" }) => {
  const IconComponent = icon;
  const t = TONES[tone] ?? TONES.default;

  return (
    <div className={`rounded-2xl border shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-5 flex flex-col justify-between transition-colors ${t.card}`}>
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold text-slate-500">{title}</span>
      <div className={`w-7 h-7 rounded flex items-center justify-center ${t.icon}`}>
        <IconComponent className="w-3.5 h-3.5" />
      </div>
    </div>
    <div className="mt-3">
      <div className={`text-2xl sm:text-3xl font-black tracking-tight ${t.value}`}>
        {value}
      </div>
      <div className="text-[11px] text-slate-400 font-medium mt-1">{change}</div>
    </div>
    </div>
  );
};

export default StatCard;
