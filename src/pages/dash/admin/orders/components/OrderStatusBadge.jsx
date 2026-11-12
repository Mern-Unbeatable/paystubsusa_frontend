import React from "react";
import { ORDER_STATUS, humanize } from "../utils/orderFormat";

const OrderStatusBadge = ({ status }) => {
  const config = ORDER_STATUS[status];
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${
        config?.className ?? "bg-slate-100 text-slate-600 ring-slate-200"
      }`}
    >
      {config?.label ?? humanize(status)}
    </span>
  );
};

export default OrderStatusBadge;
