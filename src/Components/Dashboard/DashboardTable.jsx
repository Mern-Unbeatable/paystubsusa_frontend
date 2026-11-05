import React from 'react';

export const DashboardPagination = ({
  currentPage = 1,
  totalPages = 1,
  totalRecords = 0,
  onPageChange,
  pages = [1, 2, 3],
  label,
}) => {
  const displayLabel =
    label ||
    `Page ${currentPage} of ${totalPages} (${totalRecords} matching records)`;

  return (
    <div className="p-4 sm:p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
      <span className="text-slate-400 font-medium text-xs">
        {displayLabel}
      </span>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange && onPageChange(Math.max(1, currentPage - 1))}
          className="px-3 py-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs disabled:opacity-40 transition cursor-pointer disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {pages.map((page) => {
          const isActive = currentPage === page;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange && onPageChange(page)}
              className={`w-8 h-8 rounded text-xs font-bold transition cursor-pointer flex items-center justify-center ${
                isActive
                  ? 'bg-[#009BFB] text-white shadow-xs'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() =>
            onPageChange && onPageChange(Math.min(totalPages, currentPage + 1))
          }
          className="px-3 py-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs disabled:opacity-40 transition cursor-pointer disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export const DashboardStatusBadge = ({ status = 'Completed' }) => {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      <span>{status}</span>
    </span>
  );
};

const DashboardTable = ({
  title,
  subtitle,
  headerAction,
  columns = [],
  data = [],
  renderRow,
  minWidth = 'min-w-[700px]',
  emptyMessage = 'No matching records found.',
  pagination,
  children,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
      {/* Header if title/subtitle/headerAction present */}
      {(title || subtitle || headerAction) && (
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            {title && (
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto">
        {children ? (
          children
        ) : (
          <table className={`w-full text-left border-collapse ${minWidth}`}>
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className={`py-3 px-6 ${
                      col.align === 'right'
                        ? 'text-right'
                        : col.align === 'center'
                        ? 'text-center'
                        : 'text-left'
                    } ${col.headerClassName || ''}`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {data.map((row, rowIdx) =>
                renderRow ? (
                  renderRow(row, rowIdx)
                ) : (
                  <tr
                    key={row.id || rowIdx}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    {columns.map((col, colIdx) => (
                      <td
                        key={colIdx}
                        className={`py-4 px-6 ${
                          col.align === 'right'
                            ? 'text-right'
                            : col.align === 'center'
                            ? 'text-center'
                            : 'text-left'
                        } ${col.cellClassName || ''}`}
                      >
                        {col.render
                          ? col.render(row, rowIdx)
                          : col.key
                          ? row[col.key]
                          : null}
                      </td>
                    ))}
                  </tr>
                )
              )}

              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length || 1}
                    className="py-8 text-center text-xs text-slate-400"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Footer */}
      {pagination && (
        React.isValidElement(pagination) ? (
          pagination
        ) : (
          <DashboardPagination {...pagination} />
        )
      )}
    </div>
  );
};

export default DashboardTable;
