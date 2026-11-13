import React from "react";
import { formatCurrency } from "../../../utils/formatCurrency";

const DetailRow = ({ label, children }) => (
  <div className="flex justify-between">
    <span className="text-slate-500">{label}</span>
    <span className="font-bold text-slate-800 text-right">{children}</span>
  </div>
);

const OrderDetailsCard = ({ order }) => {
  const { grandTotal, packageName, orderNumber, checkoutEmail } = order;

  return (
    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-[13px] space-y-1.5 animate-[dropIn_0.6s_cubic-bezier(0.34,1.56,0.64,1)_0.4s_both]">
      {orderNumber && <DetailRow label="Order Number">#{orderNumber}</DetailRow>}
      <DetailRow label="Order Total">{formatCurrency(grandTotal)}</DetailRow>
      <DetailRow label="Document Package">{packageName}</DetailRow>
      <DetailRow label="Delivery Email">
        {checkoutEmail || "Delivered to your email"}
      </DetailRow>
    </div>
  );
};

export default OrderDetailsCard;
