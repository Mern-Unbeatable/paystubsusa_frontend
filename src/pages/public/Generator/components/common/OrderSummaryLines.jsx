import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { Receipt, ShieldCheck, Lock } from "lucide-react";

/** Template, priced lines and total, shared by the package and checkout pages. */
const OrderSummaryLines = ({ templateTitle, lines, total, note }) => (
  <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
    {/* Header */}
    <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200 flex items-center gap-2">
      <Receipt className="w-4 h-4 text-slate-400" />
      <h3 className="text-[14px] font-bold text-slate-700 uppercase tracking-wide">
        Order Summary
      </h3>
    </div>

    {/* Body */}
    <div className="p-5 space-y-4">
      {/* Template Info */}
      <div className="flex flex-col gap-1 pb-4 border-b border-slate-100/80">
        <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">
          Selected Template
        </span>
        <span className="font-semibold text-slate-800 text-[15px] leading-snug">
          {templateTitle}
        </span>
      </div>

      {/* Priced Lines */}
      <div className="space-y-3">
        {lines.map((line) => (
          <div
            key={line.key}
            className="flex items-center justify-between gap-3 group"
          >
            <span className="text-slate-500 text-[14px] group-hover:text-slate-700 transition-colors">
              {line.label}
            </span>
            <span className="font-semibold text-slate-800 text-[14px]">
              {formatCurrency(line.amount)}
              {line.suffix && (
                <span className="text-[12px] font-normal text-slate-400 ml-0.5">
                  {line.suffix}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Total Block */}
      <div className="mt-2 pt-4 border-t border-slate-200">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[15px] font-bold text-slate-900">
              Total Due
            </span>
            <span className="text-[12px] text-slate-400 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Secure
              checkout
            </span>
          </div>
          <span className="text-3xl font-extrabold text-[#1E60F2] tracking-tight">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      <div className="text-right bg-green-50/80 p-2 rounded-b-xl">
        <p className="flex items-center justify-end gap-1.5 text-green-500 text-[12px]">
          <Lock className="w-3.5 h-3.5" />
          <span>{note}</span>
        </p>
      </div>
    </div>
  </div>
);

export default OrderSummaryLines;
