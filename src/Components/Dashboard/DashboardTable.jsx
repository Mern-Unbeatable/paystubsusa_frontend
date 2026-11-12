import React from "react";

const SKELETON_ROWS = 5;

/**
 * `toolbar` renders under the title, `footer` replaces the built-in pagination,
 * `renderMobileRow` switches to stacked cards below `md`, and `loading` shows skeleton rows.
 */
const DashboardTable = ({
  title,
  minWidth = "min-w-[600px]",
  headerAction,
  toolbar,
  columns = [],
  data = [],
  pagination,
  footer,
  loading = false,
  renderMobileRow,
  rowKey = (row, index) => row.id || index,
  emptyMessage = "No records found.",
}) => {
  const hasPagination = Boolean(pagination) && !footer;
  const isEmpty = !loading && data.length === 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
      {(title || headerAction) && (
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 sm:px-5 py-3.5">
          {title && (
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">
              {title}
            </h2>
          )}
          {headerAction}
        </div>
      )}

      {toolbar && (
        <div className="border-b border-slate-100 px-4 sm:px-5 py-3.5">{toolbar}</div>
      )}

      {renderMobileRow && (
        <ul className="divide-y divide-slate-100 md:hidden" aria-busy={loading}>
          {loading ? (
            Array.from({ length: SKELETON_ROWS }, (_, i) => (
              <li key={i} className="px-4 py-4">
                <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
              </li>
            ))
          ) : isEmpty ? (
            <li className="px-4 py-10 text-center text-sm text-slate-500">{emptyMessage}</li>
          ) : (
            data.map((row, index) => (
              <li key={rowKey(row, index)} className="px-4 py-4">
                {renderMobileRow(row)}
              </li>
            ))
          )}
        </ul>
      )}

      <div className={`overflow-x-auto ${renderMobileRow ? "hidden md:block" : ""}`}>
        <div className={minWidth}>
          <table className="w-full border-collapse" aria-busy={loading}>
            <thead className="bg-slate-50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={column.header || index}
                    scope="col"
                    className={`px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500 ${
                      column.align === "right" ? "text-right" : ""
                    } ${column.headerClassName || ""}`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                Array.from({ length: SKELETON_ROWS }, (_, i) => (
                  <tr key={i} className="border-t border-slate-100">
                    {columns.map((column, columnIndex) => (
                      <td key={columnIndex} className="px-4 py-4">
                        <div className="h-4 animate-pulse rounded bg-slate-100" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : isEmpty ? (
                <tr>
                  <td
                    colSpan={columns.length || 1}
                    className="px-4 py-10 text-center text-sm text-slate-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((row, rowIndex) => (
                  <tr
                    key={rowKey(row, rowIndex)}
                    className="border-t border-slate-100 transition hover:bg-slate-50/60"
                  >
                    {columns.map((column, columnIndex) => {
                      const cellValue = column.render
                        ? column.render(row)
                        : row[column.key];

                      return (
                        <td
                          key={`${rowKey(row, rowIndex)}-${column.header || columnIndex}`}
                          className={`px-4 py-3 text-sm ${
                            column.cellClassName || "text-slate-600"
                          } ${column.align === "right" ? "text-right" : ""}`}
                        >
                          {cellValue}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {footer && <div className="border-t border-slate-100">{footer}</div>}

      {hasPagination && (
        <div className="border-t border-slate-100 px-4 sm:px-5 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[11px] text-slate-500">
            {pagination.label ||
              `Page ${pagination.currentPage} of ${pagination.totalPages}`}
          </div>

          <div className="flex items-center gap-2">
            {pagination.pages?.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => pagination.onPageChange?.(page)}
                className={`min-w-[2rem] px-2.5 py-1.5 rounded text-xs font-semibold transition ${
                  pagination.currentPage === page
                    ? "bg-[#009BFB] text-white"
                    : "border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTable;
