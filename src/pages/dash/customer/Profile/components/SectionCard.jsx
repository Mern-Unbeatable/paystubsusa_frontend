import React from "react";

const SectionCard = ({ icon: Icon, title, description, action, children, className = "" }) => (
  <section
    className={`bg-white rounded-2xl border border-slate-200/80 shadow-xs ${className}`}
  >
    <header className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-start gap-3">
        {Icon && (
          <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
        )}
        <div>
          <h2 className="text-[15px] font-bold text-slate-900">{title}</h2>
          {description && (
            <p className="mt-0.5 text-[13px] leading-relaxed text-slate-500">
              {description}
            </p>
          )}
        </div>
      </div>
      {action && <div className="flex flex-shrink-0 items-center gap-2">{action}</div>}
    </header>
    <div className="px-5 py-5 sm:px-6">{children}</div>
  </section>
);

export default SectionCard;
