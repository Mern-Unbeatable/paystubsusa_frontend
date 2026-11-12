import React from "react";
import { DashboardFilterToolbar } from "../../../../../Components/Dashboard";
import {
  EMAIL_VERIFIED_OPTIONS,
  SORT_OPTIONS,
  STATUS_OPTIONS,
  SUBSCRIPTION_OPTIONS,
} from "../utils/customerFormat";

const SELECTS = [
  { key: "status", label: "Filter by status", options: STATUS_OPTIONS },
  { key: "subscription", label: "Filter by subscription", options: SUBSCRIPTION_OPTIONS },
  { key: "emailVerified", label: "Filter by email verification", options: EMAIL_VERIFIED_OPTIONS },
  { key: "sort", label: "Sort users", options: SORT_OPTIONS },
];

const UsersToolbar = (props) => (
  <DashboardFilterToolbar {...props} searchPlaceholder="Search by name or email" selects={SELECTS} />
);

export default UsersToolbar;
