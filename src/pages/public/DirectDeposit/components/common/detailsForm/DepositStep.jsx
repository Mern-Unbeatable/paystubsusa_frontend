import React from "react";
import {
  ChevronDown,
  ShieldAlert,
  Calendar,
  Landmark,
  DollarSign,
  FileText,
} from "lucide-react";
import accountTypeOptions from "../../../../data/directDeposit/accountTypeOptions.json";
import {
  BOX_LABEL_CLASS,
  FIELD_CLASS,
  SELECT_CLASS,
} from "../../../utils/formFieldClass";
import StepHeader from "./StepHeader";
import StepNav from "./StepNav";

const DepositStep = ({ formData, updateField, onBack, onNext }) => (
  <div className="space-y-6 animate-in fade-in-50 duration-200">
    <StepHeader
      title="Deposit details"
      subtitle="Enter the payment details for this informational slip."
    />

    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-amber-800">
      <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 stroke-[2]" />
      <p className="text-[13.5px] font-normal leading-relaxed">
        This document is not a bank-issued record or proof of a completed
        transaction.
      </p>
    </div>

    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="w-4 h-4 text-[#1E60F2]" />
        <h3 className="font-semibold text-slate-800 text-[15px]">
          Payment Timing
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={BOX_LABEL_CLASS}>Deposit Date</label>
          <input
            type="text"
            value={formData.depositDate}
            onChange={(e) => updateField("depositDate", e.target.value)}
            placeholder="MM/DD/YYYY"
            className={FIELD_CLASS}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[13.5px] font-semibold text-slate-800">
              Pay Period
            </label>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Optional
            </span>
          </div>
          <input
            type="text"
            value={formData.payPeriod}
            onChange={(e) => updateField("payPeriod", e.target.value)}
            placeholder="e.g. May 1 – May 15, 2025"
            className={FIELD_CLASS}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[13.5px] font-semibold text-slate-800">
            Payment Reference Number
          </label>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Optional
          </span>
        </div>
        <input
          type="text"
          value={formData.paymentReference}
          onChange={(e) => updateField("paymentReference", e.target.value)}
          placeholder="e.g. REF-99201"
          className={FIELD_CLASS}
        />
      </div>
    </div>

    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Landmark className="w-4 h-4 text-[#1E60F2]" />
        <h3 className="font-semibold text-slate-800 text-[15px]">
          Bank Account
        </h3>
      </div>

      <div>
        <label className={BOX_LABEL_CLASS}>Bank Name</label>
        <input
          type="text"
          value={formData.bankName}
          onChange={(e) => updateField("bankName", e.target.value)}
          placeholder="e.g. Chase Bank"
          className={FIELD_CLASS}
        />
      </div>

      <div>
        <label className={BOX_LABEL_CLASS}>Account Holder Name</label>
        <input
          type="text"
          value={formData.accountHolderName}
          onChange={(e) => updateField("accountHolderName", e.target.value)}
          placeholder="e.g. Jane Doe"
          className={FIELD_CLASS}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-4">
          <label className={BOX_LABEL_CLASS}>Account Type</label>
          <div className="relative">
            <select
              value={formData.accountType}
              onChange={(e) => updateField("accountType", e.target.value)}
              className={SELECT_CLASS}
            >
              {accountTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
        <div className="sm:col-span-4">
          <label className={BOX_LABEL_CLASS}>Account Number</label>
          <input
            type="text"
            value={formData.accountNumber}
            onChange={(e) => updateField("accountNumber", e.target.value)}
            placeholder="4–17 digits"
            className={FIELD_CLASS}
          />
        </div>
        <div className="sm:col-span-4">
          <label className={BOX_LABEL_CLASS}>Deposit Amount</label>
          <div className="relative">
            <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            <input
              type="text"
              value={formData.depositAmount}
              onChange={(e) => updateField("depositAmount", e.target.value)}
              placeholder="0.00"
              className={`${FIELD_CLASS} pl-10`}
            />
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <FileText className="w-4 h-4 text-[#1E60F2]" />
        <h3 className="font-semibold text-slate-800 text-[15px]">
          Description
        </h3>
      </div>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[13.5px] font-semibold text-slate-800">
            Payment Description
          </label>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Optional
          </span>
        </div>
        <input
          type="text"
          value={formData.paymentDescription}
          onChange={(e) => updateField("paymentDescription", e.target.value)}
          placeholder="e.g. Bi-weekly Direct Deposit Payroll"
          className={FIELD_CLASS}
        />
      </div>
    </div>

    <StepNav onBack={onBack} onNext={onNext} />
  </div>
);

export default DepositStep;
