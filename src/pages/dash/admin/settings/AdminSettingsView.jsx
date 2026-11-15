import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { DashboardHeader } from "../../../../Components/Dashboard";
import { PATHS } from "../../../../config/paths";
import { systemTableIcon } from "./data/systemTableIcons";
import { SYSTEM_TABLES } from "./data/systemTables";

const AdminSettingsView = () => (
  <div className="space-y-6">
    <DashboardHeader
      title="Settings"
      description="Inspect system database tables used for auditing, background jobs, entitlements, email, verification, and webhooks."
    />

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {SYSTEM_TABLES.map((table) => {
        const Icon = systemTableIcon(table.slug);
        return (
          <Link
            key={table.slug}
            to={PATHS.ADMIN.settingsTable(table.slug)}
            className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition hover:border-secondary/30 hover:shadow-[0_8px_24px_rgba(0,155,251,0.08)]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary ring-1 ring-secondary/15">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <ChevronRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-secondary" />
            </div>
            <h2 className="mt-4 text-base font-bold tracking-tight text-slate-900">
              {table.title}
            </h2>
            <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
              {table.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              {table.description}
            </p>
          </Link>
        );
      })}
    </div>
  </div>
);

export default AdminSettingsView;
