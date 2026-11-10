import React from "react";
import { Link } from "react-router";
import { BadgeCheck, IdCard, MailWarning } from "lucide-react";
import SectionCard from "./SectionCard";
import { PATHS } from "../../../../../config/paths";
import { formatDate, formatRole } from "../utils/profileFormat";

const Row = ({ label, children }) => (
  <div className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
    <dt className="text-[13px] text-slate-500">{label}</dt>
    <dd className="min-w-0 text-sm font-medium text-slate-800 sm:text-right">{children}</dd>
  </div>
);

const AccountInfoCard = ({ user }) => (
  <SectionCard icon={IdCard} title="Account Information" description="Details tied to your sign-in.">
    <dl className="divide-y divide-slate-100">
      <Row label="Full name">{user.name || "Not set"}</Row>
      <Row label="Email address">
        <span className="block truncate">{user.email}</span>
      </Row>
      <Row label="Email status">
        {user.emailVerified ? (
          <span className="inline-flex items-center gap-1 text-emerald-700">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" /> Verified
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-amber-700">
            <MailWarning className="h-4 w-4" aria-hidden="true" /> Not verified
          </span>
        )}
      </Row>
      <Row label="Account type">{formatRole(user.role)}</Row>
      {formatDate(user.createdAt) && <Row label="Member since">{formatDate(user.createdAt)}</Row>}
    </dl>
    <p className="mt-4 rounded-xl bg-slate-50 px-3 py-2.5 text-[12px] leading-relaxed text-slate-500">
      Need to change your email address?{" "}
      <Link to={PATHS.CUSTOMER.help} className="font-semibold text-secondary hover:underline">
        Contact support
      </Link>
      .
    </p>
  </SectionCard>
);

export default AccountInfoCard;
