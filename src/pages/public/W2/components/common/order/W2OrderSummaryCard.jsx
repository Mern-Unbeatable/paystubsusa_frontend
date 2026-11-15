import React from "react";
import OrderSummaryLines from "../../../../Generator/components/common/order/OrderSummaryLines";
import DocumentLivePreview from "../../../../shared/documentFlow/components/DocumentLivePreview";
import W2FormDocument from "../../../templates/W2FormDocument";

/** Order lines + live W-2 preview beside checkout (Generator OrderSummaryCard pattern). */
const W2OrderSummaryCard = ({
  templateTitle,
  formData,
  lines,
  total,
  action,
  className = "",
}) => (
  <div className={className}>
    <OrderSummaryLines
      templateTitle={templateTitle}
      lines={lines}
      total={total}
      note="Secure payment by Stripe. Final price confirmed at checkout."
    />

    <div className="border-t border-slate-100 mt-4">
      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-400">
          preview
        </p>
        {action ? <div className="ml-auto">{action}</div> : null}
      </div>
      <DocumentLivePreview>
        <W2FormDocument formData={formData} />
      </DocumentLivePreview>
    </div>
  </div>
);

export default W2OrderSummaryCard;
