import React from 'react';

const DashboardHeader = ({
  title,
  description,
  badge,
  action,
  children,
  className = '',
}) => {
  const actionContent = action || children;

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${className}`}
    >
      <div>
        {badge && <div className="mb-1.5">{badge}</div>}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {description}
          </p>
        )}
      </div>

      {actionContent && (
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {actionContent}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
