import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";

/** Template, priced lines and total, shared by the package and checkout pages. */
const OrderSummaryLines = ({ templateTitle, lines, total }) => (
  <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 space-y-3 text-[14px]">
    <div className="flex items-center justify-between gap-3 text-slate-500">
      <span>Template</span>
      <span className="font-semibold text-slate-800 text-right">{templateTitle}</span>
    </div>
    {lines.map((line) => (
      <div key={line.key} className="flex items-center justify-between gap-3 text-slate-500">
        <span>{line.label}</span>
        <span className="font-semibold text-slate-800">
          {formatCurrency(line.amount)}
          {line.suffix && (
            <span className="text-[12px] font-normal text-slate-400">{line.suffix}</span>
          )}
        </span>
      </div>
    ))}
    <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
      <span className="text-[16px] font-bold text-slate-900">Total</span>
      <span className="text-2xl font-bold text-[#1E60F2]">{formatCurrency(total)}</span>
    </div>
  </div>
);

export default OrderSummaryLines;
