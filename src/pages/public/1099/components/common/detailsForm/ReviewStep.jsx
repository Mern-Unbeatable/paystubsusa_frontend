import React from "react";
import {
  Pencil,
  Building2,
  User,
  DollarSign,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { NEC1099_FORM_STEPS } from "../../../utils/nec1099Flow";
import StepHeader from "./StepHeader";
import StepNav from "./StepNav";

const formatMoney = (value) => (value ? `$${value}` : "—");

const ReviewCard = ({ title, icon: Icon, onEdit, children }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50/80 border-b border-slate-100">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-[#1E60F2]" />}
        <h3 className="font-bold text-slate-900 text-[14.5px]">{title}</h3>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="flex items-center gap-1 text-[#1E60F2] text-[12px] font-semibold bg-white border border-slate-200 hover:bg-blue-50 px-2.5 py-1 rounded-md shadow-sm transition cursor-pointer"
      >
        <Pencil className="w-3 h-3" /> Edit
      </button>
    </div>
    <div className="p-5 grid grid-cols-2 gap-x-6 gap-y-3.5 text-[13.5px]">
      {children}
    </div>
  </div>
);

const ReviewRow = ({ label, value, isMoney = false, fullWidth = false }) => {
  const isEmpty = !value || value === "—";
  return (
    <div className={`min-w-0 ${fullWidth ? "col-span-2" : ""}`}>
      <span className="text-slate-400 block text-[11px] font-semibold uppercase tracking-wider mb-0.5">
        {label}
      </span>
      {isMoney ? (
        <span
          className={`inline-block font-bold text-[13.5px] px-2 py-0.5 rounded-md ${
            isEmpty
              ? "text-slate-400 bg-transparent"
              : "text-emerald-700 bg-emerald-50 border border-emerald-100"
          }`}
        >
          {value || "—"}
        </span>
      ) : (
        <strong
          className={`block break-words text-[13.5px] font-semibold ${
            isEmpty ? "text-slate-400 italic font-normal" : "text-slate-800"
          }`}
        >
          {value || "Not provided"}
        </strong>
      )}
    </div>
  );
};

const ReviewStep = ({ formData, onEdit, onBack, onContinue }) => (
  <div className="space-y-6 animate-in fade-in-50 duration-200">
    <StepHeader
      title="Review your document"
      subtitle="Confirm everything is accurate before checkout."
    />

    <ReviewCard
      title="Payer Details"
      icon={Building2}
      onEdit={() => onEdit(NEC1099_FORM_STEPS.PAYER)}
    >
      <ReviewRow label="Payer Name" value={formData.payerName} fullWidth />
      <ReviewRow label="Payer TIN" value={formData.payerTin} />
      <ReviewRow label="Account Number" value={formData.accountNumber} />
      <ReviewRow
        label="Street Address"
        value={formData.streetAddress}
        fullWidth
      />
      <ReviewRow label="City" value={formData.city} />
      <ReviewRow
        label="State / ZIP"
        value={`${formData.state || "—"} ${formData.zipCode || ""}`}
      />
    </ReviewCard>

    <ReviewCard
      title="Recipient Details"
      icon={User}
      onEdit={() => onEdit(NEC1099_FORM_STEPS.RECIPIENT)}
    >
      <ReviewRow
        label="Recipient Name"
        value={formData.recipientName}
        fullWidth
      />
      <ReviewRow label="Recipient TIN" value={formData.recipientTin} />
      <ReviewRow
        label="Account Number"
        value={formData.recipientAccountNumber}
      />
      <ReviewRow
        label="Street Address"
        value={formData.recipientStreetAddress}
        fullWidth
      />
      <ReviewRow label="City" value={formData.recipientCity} />
      <ReviewRow
        label="State / ZIP"
        value={`${formData.recipientState || "—"} ${formData.recipientZipCode || ""}`}
      />
    </ReviewCard>

    <ReviewCard
      title="Compensation & Federal Tax"
      icon={DollarSign}
      onEdit={() => onEdit(NEC1099_FORM_STEPS.COMPENSATION)}
    >
      <ReviewRow
        label="Box 1 – Nonemployee compensation"
        value={formatMoney(formData.box1NonemployeeComp)}
        isMoney
      />
      <ReviewRow
        label="Box 4 – Federal income tax"
        value={formatMoney(formData.box4FederalTax)}
        isMoney
      />
      <ReviewRow
        label="Box 3 – Excess golden parachute"
        value={formatMoney(formData.box3ExcessGoldenParachute)}
        isMoney
      />
      <ReviewRow
        label="Box 2 – Direct sales $5,000+"
        value={formData.box2DirectSales ? "Yes" : "No"}
      />
    </ReviewCard>

    <ReviewCard
      title="State Reporting"
      icon={MapPin}
      onEdit={() => onEdit(NEC1099_FORM_STEPS.COMPENSATION)}
    >
      <ReviewRow label="State" value={formData.stateReportingState} />
      <ReviewRow
        label="State / Payer’s state no."
        value={formData.statePayerNo}
      />
      <ReviewRow
        label="State tax withheld"
        value={formatMoney(formData.stateTaxWithheld)}
        isMoney
      />
      <ReviewRow
        label="State income"
        value={formatMoney(formData.stateIncome)}
        isMoney
      />
    </ReviewCard>

    <div className="bg-gradient-to-br from-[#092258] to-[#113a82] text-white rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <p className="text-blue-200 text-[12px] font-bold uppercase tracking-wider">
            Ready to generate
          </p>
        </div>
        <p className="text-white text-[15px] font-medium">
          Your 1099-NEC is ready for final checkout.
        </p>
      </div>

      <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
        <ArrowRight className="w-5 h-5 text-white" />
      </div>

      <div className="relative z-10 text-center sm:text-right bg-white/10 sm:bg-transparent py-2.5 px-4 sm:p-0 rounded-xl w-full sm:w-auto">
        <p className="text-slate-300 text-[11px] font-semibold uppercase tracking-wider">
          Compensation (Box 1)
        </p>
        <p className="font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
          {formatMoney(formData.box1NonemployeeComp)}
        </p>
      </div>
    </div>

    <StepNav
      onBack={onBack}
      onNext={onContinue}
      nextLabel="Continue to Checkout"
    />
  </div>
);

export default ReviewStep;
