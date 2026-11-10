import React from "react";
import { Check, FileText } from "lucide-react";

const FEATURES = [
  "Professionally formatted PDF",
  "Instant PDF download",
  "Copy sent to your email",
];

const DocumentOrderSummary = ({
  title,
  subtitle,
  priceLabel,
  className = "",
}) => (
  <div
    className={`bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden ${className}`}
  >
    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
      <h3 className="font-bold text-lg text-[#092258]">Order summary</h3>
      <span className="text-[12px] font-semibold text-slate-500 bg-slate-100 rounded-full px-2.5 py-0.5">
        1 item
      </span>
    </div>

    <div className="p-6 space-y-5">
      <div className="flex items-start gap-3.5">
        <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-50 text-secondary flex items-center justify-center">
          <FileText className="w-5 h-5 stroke-[2]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[15px] text-slate-900">{title}</p>
          {subtitle && (
            <p className="text-slate-500 text-[13px] mt-0.5 truncate">
              {subtitle}
            </p>
          )}
        </div>
        <span className="font-semibold text-[15px] text-slate-900">
          {priceLabel}
        </span>
      </div>

      <ul className="space-y-2.5 rounded-xl bg-slate-50 border border-slate-100 p-4">
        {FEATURES.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2.5 text-[13.5px] text-slate-600"
          >
            <Check className="w-4 h-4 shrink-0 text-emerald-500 stroke-[2.6]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-2 text-[14px]">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Subtotal</span>
          <span className="text-slate-700">{priceLabel}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Taxes & fees</span>
          <span className="text-slate-700">$0.00</span>
        </div>
      </div>

      <div className="border-t border-dashed border-slate-200" />

      <div className="flex items-end justify-between">
        <div>
          <span className="block font-bold text-slate-900 text-lg leading-none">
            Total
          </span>
          <span className="text-[12px] text-slate-400">One-time payment</span>
        </div>
        <span className="font-bold text-secondary text-[28px] leading-none">
          {priceLabel}
        </span>
      </div>
    </div>
  </div>
);

export default DocumentOrderSummary;
