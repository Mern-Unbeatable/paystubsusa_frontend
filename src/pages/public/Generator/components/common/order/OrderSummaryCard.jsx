import React from "react";
import { Lock } from "lucide-react";
import OrderSummaryLines from "./OrderSummaryLines";
import TemplateDocumentPreview from "../preview/TemplateDocumentPreview";

/** Order summary with the paystub preview, used beside the package and checkout steps. */
const OrderSummaryCard = ({
  template,
  formData,
  calculations,
  lines,
  total,
  action,

  className = "",
}) => (
  <div className={`${className}`}>
    <OrderSummaryLines
      templateTitle={template.title}
      lines={lines}
      total={total}
      note="Secure payment by Stripe. Final price confirmed at checkout."
    />

    <div className="border-t border-slate-100 mt-4">
      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-400">
          preview
        </p>
        {action && <div className="ml-auto">{action}</div>}
      </div>
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
