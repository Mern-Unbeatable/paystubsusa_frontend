import React from "react";
import { DashboardFilterToolbar } from "../../../../../Components/Dashboard";
import { DOCUMENT_TYPE_OPTIONS, ORDER_STATUS_OPTIONS } from "../utils/orderFormat";

const SELECTS = [
  { key: "status", label: "Filter by status", options: ORDER_STATUS_OPTIONS },
  { key: "documentType", label: "Filter by document type", options: DOCUMENT_TYPE_OPTIONS },
];

const OrdersToolbar = (props) => (
  <DashboardFilterToolbar {...props} searchPlaceholder="Search by order number or email" selects={SELECTS} />
);

export default OrdersToolbar;
