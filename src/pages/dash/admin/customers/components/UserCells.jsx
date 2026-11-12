import React from "react";
import { Eye, ShieldCheck, ShieldOff } from "lucide-react";
import { DashboardStatusBadge } from "../../../../../layouts";
import UserAvatar from "../../../customer/Profile/components/UserAvatar";
import { STATUS_LABELS, SUBSCRIPTION_LABELS } from "../utils/customerFormat";

export const UserIdentity = ({ user, showEmail = false }) => (
  <div className="flex min-w-0 items-center gap-3">
    <UserAvatar name={user.name} email={user.email} className="h-9 w-9 text-xs" />
    <div className="min-w-0">
      <p className="truncate font-semibold text-slate-900">{user.name}</p>
      {showEmail ? (
        <p className="truncate text-xs text-slate-500">{user.email}</p>
      ) : (
        user.phone && <p className="truncate text-xs text-slate-400">{user.phone}</p>
      )}
    </div>
  </div>
);

export const RoleBadge = () => (
  <span className="inline-flex items-center rounded-md bg-secondary/10 px-2 py-0.5 text-xs font-semibold text-secondary">
    Customer
  </span>
);

export const UserStatusBadge = ({ user }) => (
  <DashboardStatusBadge status={STATUS_LABELS[user.status] || user.status} />
);

export const EmailVerifiedBadge = ({ user }) => (
  <DashboardStatusBadge status={user.emailVerifiedAt ? "Verified" : "Unverified"} />
);

export const SubscriptionBadge = ({ status }) => (
  <DashboardStatusBadge status={status ? SUBSCRIPTION_LABELS[status] || status : "None"} />
);

const actionButton =
  "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent transition focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30 cursor-pointer";

/** View opens the details dialog; the second action suspends or reactivates the account. */
export const UserRowActions = ({ user, onView, onChangeStatus }) => {
  const isSuspended = user.status === "suspended";
  const StatusIcon = isSuspended ? ShieldCheck : ShieldOff;
  const statusLabel = isSuspended ? "Reactivate" : "Suspend";

  return (
    <div className="inline-flex items-center gap-1">
      <button
        type="button"
        onClick={() => onView(user)}
        title="View details"
        aria-label={`View ${user.name}`}
        className={`${actionButton} text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-secondary`}
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onChangeStatus(user)}
        title={`${statusLabel} account`}
        aria-label={`${statusLabel} ${user.name}`}
        className={`${actionButton} ${
          isSuspended
            ? "text-emerald-600 hover:border-emerald-100 hover:bg-emerald-50"
            : "text-rose-500 hover:border-rose-100 hover:bg-rose-50"
        }`}
      >
        <StatusIcon className="h-4 w-4" />
      </button>
    </div>
  );
};
