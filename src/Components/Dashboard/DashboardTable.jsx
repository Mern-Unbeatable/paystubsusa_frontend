import React from "react";

const DashboardTable = ({
  title,
  minWidth = "min-w-[600px]",
  headerAction,
  columns = [],
  data = [],
  pagination,
  emptyMessage = "No records found.",
}) => {
  const hasPagination = Boolean(pagination);

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

      <div className="overflow-x-auto">
        <div className={minWidth}>
          <table className="w-full border-collapse">
            <thead className="bg-slate-50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={column.header || index}
                    className={`px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500 ${
                      column.align === "right" ? "text-right" : ""
                    }`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
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
                    key={row.id || rowIndex}
                    className="border-t border-slate-100"
                  >
                    {columns.map((column, columnIndex) => {
                      const cellValue = column.render
                        ? column.render(row)
                        : row[column.key];

                      return (
                        <td
                          key={`${row.id || rowIndex}-${column.header || columnIndex}`}
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
