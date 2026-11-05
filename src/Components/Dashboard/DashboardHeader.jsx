import React from "react";

const DashboardHeader = ({ title, description, badge, action }) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          {title}
        </h1>
        {badge}
      </div>
      {description && (
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>

    {action && <div className="flex flex-wrap items-center gap-2">{action}</div>}
  </div>
);

export default DashboardHeader;
