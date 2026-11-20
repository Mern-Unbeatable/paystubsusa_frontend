import React from "react";

/** Card with a gray title bar used across paystub form steps. */
const SectionCard = ({
  icon: Icon,
  title,
  description,
  headerRight,
  bodyClassName = "p-5 space-y-4",
  children,
}) => (
  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
    <div
      className={`px-5 py-3 bg-slate-100 border-b border-slate-200 ${
        headerRight ? "flex items-start justify-between gap-3" : ""
      }`}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-[#1E60F2] shrink-0" />}
          <h3 className="font-semibold text-slate-800 text-[15px]">{title}</h3>
        </div>
        {description && (
          <p className={`text-[12px] text-slate-500 mt-0.5 ${Icon ? "pl-6" : ""}`}>
            {description}
          </p>
        )}
      </div>
      {headerRight}
    </div>
    <div className={bodyClassName}>{children}</div>
  </div>
);

export default SectionCard;
