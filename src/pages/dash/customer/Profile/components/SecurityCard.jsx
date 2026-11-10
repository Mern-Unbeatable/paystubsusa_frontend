import React, { useState } from "react";
import { KeyRound, LogOut, ShieldCheck } from "lucide-react";
import SectionCard from "./SectionCard";
import ChangePasswordModal from "./ChangePasswordModal";

const SecurityCard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <SectionCard icon={ShieldCheck} title="Password & Security" description="Keep your account secure.">
      <div className="divide-y divide-slate-100">
        <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <KeyRound className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-400" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-slate-800">Password</p>
              <p className="text-[13px] text-slate-500">
                Use a unique password you don&apos;t use on other sites.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-[13px] font-semibold text-slate-700 transition hover:border-secondary/40 hover:text-secondary cursor-pointer"
          >
            Change Password
          </button>
        </div>

        <div className="flex items-start gap-3 pt-4">
          <LogOut className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-400" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-slate-800">Other devices</p>
            <p className="text-[13px] text-slate-500">
              Changing your password signs you out everywhere else. You stay signed in here.
            </p>
          </div>
        </div>
      </div>

      <ChangePasswordModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </SectionCard>
  );
};

export default SecurityCard;
