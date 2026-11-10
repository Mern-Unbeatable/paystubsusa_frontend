import React, { useState } from "react";
import { BadgeCheck, MailWarning } from "lucide-react";
import VerifyEmailModal from "./VerifyEmailModal";

const EmailVerificationCard = ({ user }) => {
  const [modalOpen, setModalOpen] = useState(false);

  if (user.emailVerified) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-200/80 bg-emerald-50/60 px-5 py-4">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <BadgeCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-emerald-800">Email Verified</p>
          <p className="truncate text-[13px] text-emerald-700/80">{user.email}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50/40 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <MailWarning className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-amber-900">
              Your email address is not verified.
            </p>
            <p className="truncate text-[13px] font-medium text-amber-800">{user.email}</p>
            <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-amber-800/80">
              Verifying confirms this address belongs to you. It&apos;s required to
              place orders and links any earlier orders made with this email to
              your account.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex flex-shrink-0 items-center justify-center rounded-xl bg-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0089e0] active:scale-[0.98] cursor-pointer"
        >
          Verify Email Address
        </button>
      </div>

      <VerifyEmailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        email={user.email}
      />
    </>
  );
};

export default EmailVerificationCard;
