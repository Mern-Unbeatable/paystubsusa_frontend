import React, { useEffect, useState } from "react";
import {
  Activity,
  BadgeCheck,
  CalendarClock,
  CalendarDays,
  CircleDot,
  CreditCard,
  FileText,
  LogIn,
  MailCheck,
  Package,
  Phone,
  Repeat,
  ShieldCheck,
  ShieldOff,
  ShoppingBag,
  UserCog,
  UserRound,
  Wallet,
} from "lucide-react";
import ProfileModal from "../../../../../Components/modal/ProfileModal";
import { useUsers } from "../../../../../hooks/useUsers";
import { describeRequestError } from "../../../customer/Profile/utils/profileFormat";
import { formatCents, formatMoney, formatShortDate } from "../utils/userFormat";

import {
  EmailVerifiedBadge,
  RoleBadge,
  SubscriptionBadge,
  UserIdentity,
  UserStatusBadge,
} from "./UserCells";

const Field = ({ label, icon: Icon, children, hint }) => (
  <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-2.5">
    {Icon && (
      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-secondary ring-1 ring-slate-100">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
    )}
    <div className="min-w-0">
      <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 truncate text-sm font-semibold text-slate-800">
        {children}
      </dd>
      {hint && <p className="mt-0.5 truncate text-xs text-slate-400">{hint}</p>}
    </div>
  </div>
);

const Section = ({ title, icon: Icon, children }) => (
  <section className="space-y-2">
    <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {title}
    </h3>
    <dl className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">{children}</dl>
  </section>
);

const Skeleton = () => (
  <span className="inline-block h-4 w-16 animate-pulse rounded bg-slate-200" />
);

/** `user` is the list row (shown immediately); orders and plan details load from the API. */
const UserDetailsModal = ({ user, onClose, onChangeStatus }) => {
  const { details: loaded, loadUserDetails } = useUsers();
  const [attempt, setAttempt] = useState(0);
  const userId = user?.id;

  const retry = () => setAttempt((n) => n + 1);

  useEffect(() => {
    if (!userId) return undefined;
    const request = loadUserDetails(userId);
    return () => request.abort();
  }, [userId, attempt, loadUserDetails]);

  const current = loaded.id === userId ? loaded : { user: null, loading: true, error: null };
  const details = current.user;
  const error = current.error && describeRequestError(current.error, "Couldn't load this user.");
  const record = details || user;
  const pending = !details && !error;
  const plan = details?.subscription;
  const isSuspended = record?.status === "suspended";
  const StatusIcon = isSuspended ? ShieldCheck : ShieldOff;

  const footer = (
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onClose}
        className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 cursor-pointer"
      >
        Close
      </button>
      {onChangeStatus && record && (
        <button
          type="button"
          onClick={() => onChangeStatus(record)}
          className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white transition cursor-pointer ${
            isSuspended
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-rose-600 hover:bg-rose-700"
          }`}
        >
          <StatusIcon className="h-4 w-4" />
          {isSuspended ? "Reactivate account" : "Suspend account"}
        </button>
      )}
    </div>
  );

  return (
    <ProfileModal
      open={Boolean(user)}
      onClose={onClose}
      title="User details"
      description="Account, activity and subscription overview."
      icon={UserRound}
      size="lg"
      footer={footer}
    >
      {record && (
        <div className="space-y-5" aria-busy={pending}>
          <div className="rounded-xl border border-slate-100 p-3.5">
            <UserIdentity user={record} showEmail />
          </div>

          <Section title="Account" icon={UserCog}>
            <Field label="Joined" icon={CalendarDays}>
              {formatShortDate(record.createdAt)}
            </Field>
            <Field label="Last login" icon={LogIn}>
              {formatShortDate(record.lastLoginAt)}
            </Field>
            <Field label="Role" icon={BadgeCheck}>
              <RoleBadge />
            </Field>
            <Field label="Status" icon={ShieldCheck}>
              <UserStatusBadge user={record} />
            </Field>
            <Field label="Email verification" icon={MailCheck}>
              <EmailVerifiedBadge user={record} />
            </Field>
            <Field label="Subscription" icon={Repeat}>
              <SubscriptionBadge status={record.subscriptionStatus} />
            </Field>
          </Section>

          <Section title="Activity" icon={Activity}>
            <Field label="Orders" icon={ShoppingBag}>
              {pending ? (
                <Skeleton />
              ) : (
                (details?.orders?.meta?.totalItems ?? "—")
              )}
            </Field>
            <Field label="Documents" icon={FileText}>
              {record.documentCount ?? 0}
            </Field>
            <Field label="Lifetime spend" icon={Wallet}>
              {formatCents(record.lifetimeSpendCents)}
            </Field>
            <Field label="Phone" icon={Phone}>
              {record.phone || "—"}
            </Field>
          </Section>

          {pending && (
            <Section title="Latest plan" icon={CreditCard}>
              <Field label="Plan" icon={Package}>
                <Skeleton />
              </Field>
              <Field label="Plan status" icon={CircleDot}>
                <Skeleton />
              </Field>
            </Section>
          )}
          {details && !plan && (
            <Section title="Latest plan" icon={CreditCard}>
              <Field label="Plan" icon={Package}>
                No subscription history
              </Field>
            </Section>
          )}
          {plan && (
            <Section title="Latest plan" icon={CreditCard}>
              <Field
                label="Plan"
                icon={Package}
                hint={`${formatMoney(plan.amountCents, plan.currency)} / ${plan.interval}`}
              >
                {plan.planName}
              </Field>
              <Field
                label="Plan status"
                icon={CircleDot}
                hint={
                  plan.cancelAtPeriodEnd ? "Cancels at period end" : undefined
                }
              >
                <span className="capitalize">
                  {plan.status.replace(/_/g, " ")}
                </span>
              </Field>
              <Field
                label={plan.cancelAtPeriodEnd ? "Ends" : "Renews"}
                icon={CalendarClock}
              >
                {formatShortDate(plan.currentPeriodEnd)}
              </Field>
            </Section>
          )}

          {error && (
            <div
              role="alert"
              className="flex items-center justify-between gap-3 rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700"
            >
              <span>{error}</span>
              <button
                type="button"
                onClick={retry}
                className="shrink-0 font-semibold underline cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      )}
    </ProfileModal>
  );
};

export default UserDetailsModal;
