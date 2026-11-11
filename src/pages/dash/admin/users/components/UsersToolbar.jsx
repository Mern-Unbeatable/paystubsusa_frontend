import React from "react";
import { RotateCcw, Search, X } from "lucide-react";
import {
  EMAIL_VERIFIED_OPTIONS,
  SORT_OPTIONS,
  STATUS_OPTIONS,
  SUBSCRIPTION_OPTIONS,
} from "../utils/userFormat";

const selectClass =
  "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 sm:w-auto cursor-pointer";

const UsersToolbar = ({ search, onSearchChange, filters, onFilterChange, onReset }) => {
  const hasFilters = Boolean(
    search ||
      filters.status ||
      filters.subscription ||
      filters.emailVerified ||
      filters.sort !== SORT_OPTIONS[0].value,
  );
  const selects = [
    { key: "status", label: "Filter by status", options: STATUS_OPTIONS },
    { key: "subscription", label: "Filter by subscription", options: SUBSCRIPTION_OPTIONS },
    { key: "emailVerified", label: "Filter by email verification", options: EMAIL_VERIFIED_OPTIONS },
    { key: "sort", label: "Sort users", options: SORT_OPTIONS },
  ];

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-sm">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or email"
          aria-label="Search users by name or email"
          maxLength={100}
          className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-9 text-sm text-slate-700 placeholder:text-slate-400 transition focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 [&::-webkit-search-cancel-button]:hidden"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
        {selects.map(({ key, label, options }) => (
          <select
            key={key}
            value={filters[key]}
            onChange={(e) => onFilterChange(key, e.target.value)}
            aria-label={label}
            className={selectClass}
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        ))}
        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default UsersToolbar;
