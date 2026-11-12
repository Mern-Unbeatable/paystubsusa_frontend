import React from "react";
import { SUBSCRIPTION_STATUS } from "../utils/subscriptionFormat";

const SubscriptionStatusBadge = ({ subscription }) => {
  const config = SUBSCRIPTION_STATUS[subscription.status];
  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      <span
        className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${
          config?.className ?? "bg-slate-100 text-slate-600 ring-slate-200"
        }`}
      >
        {config?.label ?? subscription.status}
      </span>
      {subscription.cancelAtPeriodEnd && subscription.status !== "canceled" && (
        <span className="whitespace-nowrap rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-100">
          Cancels at period end
        </span>
      )}
    </span>
  );
};

export default SubscriptionStatusBadge;
