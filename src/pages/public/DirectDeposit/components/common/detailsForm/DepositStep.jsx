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
import {
  FieldError,
  fieldClassName,
} from "../../../../Generator/components/common/detailsForm/fieldValidation";
import {
  formatPayPeriodRange,
  toDateInputValue,
} from "../../../utils/directDepositDates";
import StepHeader from "./StepHeader";
import StepNav from "./StepNav";

const RequiredMark = () => (
  <span className="text-rose-500" aria-hidden="true">
    {" "}
    *
  </span>
);

const DepositStep = ({
  formData,
  fieldErrors = {},
  updateField,
  onBack,
  onNext,
}) => {
  const syncPayPeriod = (start, end) => {
    updateField("payPeriod", formatPayPeriodRange(start, end));
  };

  const handlePayPeriodStart = (value) => {
    updateField("payPeriodStart", value);
    syncPayPeriod(value, formData.payPeriodEnd);
  };

  const handlePayPeriodEnd = (value) => {
    updateField("payPeriodEnd", value);
    syncPayPeriod(formData.payPeriodStart, value);
  };

  return (
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
        <div id="dd-field-depositDate">
          <label className={BOX_LABEL_CLASS}>
            Deposit Date
            <RequiredMark />
          </label>
          <input
            type="date"
            value={toDateInputValue(formData.depositDate)}
            onChange={(e) => updateField("depositDate", e.target.value)}
            aria-invalid={Boolean(fieldErrors.depositDate)}
            className={fieldClassName(FIELD_CLASS, fieldErrors.depositDate)}
          />
          <FieldError errors={fieldErrors} name="depositDate" />
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

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[13.5px] font-semibold text-slate-800">
            Pay Period
          </label>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Optional
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-medium text-slate-500 mb-1.5">
              Start
            </label>
            <input
              type="date"
              value={toDateInputValue(formData.payPeriodStart)}
              onChange={(e) => handlePayPeriodStart(e.target.value)}
              className={FIELD_CLASS}
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-slate-500 mb-1.5">
              End
            </label>
            <input
              type="date"
              value={toDateInputValue(formData.payPeriodEnd)}
              min={toDateInputValue(formData.payPeriodStart) || undefined}
              onChange={(e) => handlePayPeriodEnd(e.target.value)}
              className={FIELD_CLASS}
            />
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Landmark className="w-4 h-4 text-[#1E60F2]" />
        <h3 className="font-semibold text-slate-800 text-[15px]">
          Bank Account
        </h3>
      </div>

      <div id="dd-field-bankName">
        <label className={BOX_LABEL_CLASS}>
          Bank Name
          <RequiredMark />
        </label>
        <input
          type="text"
          value={formData.bankName}
          onChange={(e) => updateField("bankName", e.target.value)}
          placeholder="e.g. Chase Bank"
          aria-invalid={Boolean(fieldErrors.bankName)}
          className={fieldClassName(FIELD_CLASS, fieldErrors.bankName)}
        />
        <FieldError errors={fieldErrors} name="bankName" />
      </div>

      <div id="dd-field-accountHolderName">
        <label className={BOX_LABEL_CLASS}>
          Account Holder Name
          <RequiredMark />
        </label>
        <input
          type="text"
          value={formData.accountHolderName}
          onChange={(e) => updateField("accountHolderName", e.target.value)}
          placeholder="e.g. Jane Doe"
          aria-invalid={Boolean(fieldErrors.accountHolderName)}
          className={fieldClassName(
            FIELD_CLASS,
            fieldErrors.accountHolderName,
          )}
        />
        <FieldError errors={fieldErrors} name="accountHolderName" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-4" id="dd-field-accountType">
          <label className={BOX_LABEL_CLASS}>
            Account Type
            <RequiredMark />
          </label>
          <div className="relative">
            <select
              value={formData.accountType}
              onChange={(e) => updateField("accountType", e.target.value)}
              aria-invalid={Boolean(fieldErrors.accountType)}
              className={fieldClassName(SELECT_CLASS, fieldErrors.accountType)}
            >
              {accountTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <FieldError errors={fieldErrors} name="accountType" />
        </div>
        <div className="sm:col-span-4" id="dd-field-accountNumber">
          <label className={BOX_LABEL_CLASS}>
            Account Number
            <RequiredMark />
          </label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={17}
            value={formData.accountNumber}
            onChange={(e) =>
              updateField(
                "accountNumber",
                e.target.value.replace(/\D/g, "").slice(0, 17),
              )
            }
            placeholder="4–17 digits"
            aria-invalid={Boolean(fieldErrors.accountNumber)}
            className={fieldClassName(FIELD_CLASS, fieldErrors.accountNumber)}
          />
          <FieldError errors={fieldErrors} name="accountNumber" />
          {!fieldErrors.accountNumber && (
            <p className="text-[12px] text-slate-400 mt-1.5">
              Enter 4–17 digits only.
            </p>
          )}
        </div>
        <div className="sm:col-span-4" id="dd-field-depositAmount">
          <label className={BOX_LABEL_CLASS}>
            Deposit Amount
            <RequiredMark />
          </label>
          <div className="relative">
            <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            <input
              type="text"
              value={formData.depositAmount}
              onChange={(e) => updateField("depositAmount", e.target.value)}
              placeholder="0.00"
              aria-invalid={Boolean(fieldErrors.depositAmount)}
              className={fieldClassName(
                `${FIELD_CLASS} pl-10`,
                fieldErrors.depositAmount,
              )}
            />
          </div>
          <FieldError errors={fieldErrors} name="depositAmount" />
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
};

export default DepositStep;
