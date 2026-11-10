import React from "react";
import { BadgeCheck, CalendarDays, MailWarning } from "lucide-react";
import { formatDate, formatRole, getInitials } from "../utils/profileFormat";

const ProfileOverviewCard = ({ user }) => {
  const memberSince = formatDate(user.createdAt);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
      <div className="h-20 bg-gradient-to-r from-primary via-[#0b3a7a] to-secondary sm:h-24" aria-hidden="true" />
      <div className="flex flex-col gap-4 px-5 pb-5 sm:flex-row sm:items-end sm:gap-5 sm:px-6 sm:pb-6">
        <div
          className="-mt-10 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-secondary text-2xl font-black text-white shadow-md sm:-mt-12 sm:h-24 sm:w-24 sm:text-3xl"
          aria-hidden="true"
        >
          {getInitials(user.name, user.email)}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xl font-bold text-slate-900 sm:text-2xl">
            {user.name || "Unnamed account"}
          </h2>
          <p className="truncate text-sm text-slate-500">{user.email}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] font-semibold">
            <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-secondary ring-1 ring-secondary/20">
              {formatRole(user.role)}
            </span>
            {user.emailVerified ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 ring-1 ring-emerald-200">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Email verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-amber-700 ring-1 ring-amber-200">
                <MailWarning className="h-3.5 w-3.5" aria-hidden="true" />
                Email not verified
              </span>
            )}
            {memberSince && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 font-medium text-slate-600 ring-1 ring-slate-200">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                Member since {memberSince}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileOverviewCard;
