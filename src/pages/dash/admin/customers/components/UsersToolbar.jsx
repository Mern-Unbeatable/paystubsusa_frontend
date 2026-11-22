import React, { useMemo } from "react";
import { DashboardFilterToolbar } from "../../../../../Components/Dashboard";
import {
  EMAIL_VERIFIED_OPTIONS,
  SORT_OPTIONS,
  STATUS_OPTIONS,
  SUBSCRIPTION_OPTIONS,
} from "../utils/customerFormat";

const UsersToolbar = ({ showSubscriptionFilter = true, ...props }) => {
  const selects = useMemo(() => {
    const all = [
      { key: "status", label: "Filter by status", options: STATUS_OPTIONS },
      { key: "subscription", label: "Filter by subscription", options: SUBSCRIPTION_OPTIONS },
      { key: "emailVerified", label: "Filter by email verification", options: EMAIL_VERIFIED_OPTIONS },
      { key: "sort", label: "Sort users", options: SORT_OPTIONS },
    ];
    return showSubscriptionFilter ? all : all.filter((s) => s.key !== "subscription");
  }, [showSubscriptionFilter]);

  return (
    <DashboardFilterToolbar {...props} searchPlaceholder="Search by name or email" selects={selects} />
  );
};

export default UsersToolbar;
