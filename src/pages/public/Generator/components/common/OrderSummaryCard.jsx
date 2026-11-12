import React from "react";
import { Lock } from "lucide-react";
import OrderSummaryLines from "./OrderSummaryLines";
import TemplateDocumentPreview from "./TemplateDocumentPreview";

/** Order summary with the paystub preview, used beside the package and checkout steps. */
const OrderSummaryCard = ({
  template,
  formData,
  calculations,
  lines,
  total,
  eyebrow,
  action,
  className = "",
}) => (
  <div
    className={`bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm lg:sticky lg:top-24 ${className}`}
  >
    <div className="flex items-center justify-between gap-3 mb-4">
      <div>
        {eyebrow && (
          <p className="text-[#1E60F2] font-bold text-[12px] uppercase tracking-wider mb-0.5">
            {eyebrow}
          </p>
        )}
        <h3 className="text-xl font-bold text-slate-900">Order summary</h3>
      </div>
      {action}
    </div>

    <OrderSummaryLines templateTitle={template.title} lines={lines} total={total} />

    <p className="mt-2.5 flex items-center justify-center gap-1.5 text-slate-400 text-[12px]">
      <Lock className="w-3.5 h-3.5" />
      <span>Secure payment by Stripe. Final price confirmed at checkout.</span>
    </p>

    <div className="mt-5 pt-5 border-t border-slate-100">
      <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
        Your paystub preview
      </p>
      <div className="overflow-hidden">
        <TemplateDocumentPreview
          template={template}
          formData={formData}
          calculations={calculations}
        />
      </div>
    </div>
  </div>
);

export default OrderSummaryCard;
