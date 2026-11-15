import React from "react";
import OrderSummaryLines from "../../../../Generator/components/common/order/OrderSummaryLines";
import DocumentLivePreview from "../../../../shared/documentFlow/components/DocumentLivePreview";
import Nec1099FormDocument from "../../../templates/Nec1099FormDocument";

const Nec1099OrderSummaryCard = ({
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
        <Nec1099FormDocument formData={formData} />
      </DocumentLivePreview>
    </div>
  </div>
);

export default Nec1099OrderSummaryCard;
