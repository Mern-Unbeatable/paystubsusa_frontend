import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Eye, RefreshCw } from "lucide-react";
import {
  DashboardFilterToolbar,
  DashboardHeader,
  DashboardPagination,
  DashboardTable,
} from "../../../../Components/Dashboard";
import { PATHS } from "../../../../config/paths";
import { useUrlFilters } from "../../../../hooks/useUrlFilters";
import { describeRequestError } from "../../customer/Profile/utils/profileFormat";
import SystemRecordDetailsModal from "./components/SystemRecordDetailsModal";
import {
  SYSTEM_TABLE_BY_SLUG,
  SYSTEM_TABLE_COLUMNS,
} from "./data/systemTables";
import { useAdminSystemTable } from "./hooks/useAdminSystemTable";
import {
  formatCellValue,
  recordIdOf,
  truncateCell,
} from "./utils/systemTableFormat";

/** Must be module-level: a fresh `{}` each render retriggers useUrlFilters and refetches forever. */
const URL_SELECTS = {};
const TOOLBAR_SELECTS = [];

const AdminSystemTableView = () => {
  const { table: tableSlug } = useParams();
  const table = SYSTEM_TABLE_BY_SLUG[tableSlug];
  const {
    records,
    meta,
    loading,
    error,
    loadRecords,
  } = useAdminSystemTable();
  const { filters, setFilter, resetFilters: resetUrlFilters } =
    useUrlFilters(URL_SELECTS);
  const [search, setSearch] = useState(filters.q);
  const [urlQ, setUrlQ] = useState(filters.q);
  const [reloadKey, setReloadKey] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  if (urlQ !== filters.q) {
    setUrlQ(filters.q);
    if (search.trim() !== filters.q) setSearch(filters.q);
  }

  useEffect(() => {
    const trimmed = search.trim();
    if (trimmed === filters.q) return undefined;
    const timer = setTimeout(() => setFilter("q", trimmed), 300);
    return () => clearTimeout(timer);
  }, [search, filters.q, setFilter]);

  useEffect(() => {
    if (!table) return undefined;
    const request = loadRecords({
      table: table.slug,
      q: filters.q || undefined,
      page: filters.page,
      pageSize: filters.pageSize,
    });
    return () => request.abort();
  }, [
    table,
    filters.q,
    filters.page,
    filters.pageSize,
    reloadKey,
    loadRecords,
  ]);

  useEffect(() => {
    if (!loading && meta.totalPages > 0 && filters.page > meta.totalPages) {
      setFilter("page", meta.totalPages, { replace: true });
    }
  }, [loading, meta.totalPages, filters.page, setFilter]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  const resetFilters = () => {
    setSearch("");
    resetUrlFilters();
  };

  const columnKeys = SYSTEM_TABLE_COLUMNS[table?.slug] ?? ["id"];

  const columns = useMemo(
    () => [
      ...columnKeys.map((key) => ({
        header: key,
        // DashboardTable reads `render` (or `key`), not `cell`.
        render: (row) => (
          <span
            className="font-mono text-xs text-slate-700"
            title={formatCellValue(key, row[key])}
          >
            {truncateCell(formatCellValue(key, row[key]))}
          </span>
        ),
      })),
      {
        header: "Actions",
        align: "right",
        render: (row) => {
          const id = recordIdOf(row);
          return (
            <button
              type="button"
              onClick={() => setSelectedId(id)}
              disabled={!id}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5" />
              View Details
            </button>
          );
        },
      },
    ],
    [columnKeys],
  );

  if (!table) {
    return <Navigate to={PATHS.ADMIN.settings} replace />;
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={table.title}
        description={table.description}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={PATHS.ADMIN.settings}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Settings
            </Link>
            <button
              type="button"
              onClick={reload}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        }
      />

      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
        Table · {table.name}
      </p>

      {error && !loading && (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {describeRequestError(error, "Couldn't load this table.")}
        </div>
      )}

      <DashboardTable
        title={`${table.title} records`}
        minWidth="min-w-[880px]"
        loading={loading}
        columns={columns}
        data={records}
        emptyMessage={
          filters.q
            ? "No records match your search."
            : "No records in this table yet."
        }
        rowKey={(row, index) => recordIdOf(row) || index}
        toolbar={
          <DashboardFilterToolbar
            search={search}
            onSearchChange={setSearch}
            filters={filters}
            onFilterChange={setFilter}
            selects={TOOLBAR_SELECTS}
            searchPlaceholder={`Search ${table.name}…`}
            onReset={resetFilters}
          />
        }
        footer={
          !error && (
            <DashboardPagination
              page={meta.page}
              pageSize={meta.pageSize}
              totalItems={meta.totalItems}
              totalPages={meta.totalPages}
              onPageChange={(page) => setFilter("page", page)}
              onPageSizeChange={(size) => setFilter("pageSize", size)}
              disabled={loading}
            />
          )
        }
        renderMobileRow={(row) => {
          const id = recordIdOf(row);
          return (
            <div className="space-y-3">
              <div className="space-y-1.5">
                {columnKeys.slice(0, 4).map((key) => (
                  <div key={key} className="flex justify-between gap-3 text-sm">
                    <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
                      {key}
                    </span>
                    <span className="max-w-[60%] truncate text-right font-mono text-xs text-slate-700">
                      {truncateCell(formatCellValue(key, row[key]), 36)}
                    </span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(id)}
                disabled={!id}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
              >
                <Eye className="h-3.5 w-3.5" />
                View Details
              </button>
            </div>
          );
        }}
      />

      {selectedId && (
        <SystemRecordDetailsModal
          table={table.slug}
          recordId={selectedId}
          title={table.title}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
};

export default AdminSystemTableView;
