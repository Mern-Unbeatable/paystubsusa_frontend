import React from "react";
import { NEC1099_FORM_STEPS } from "../../../utils/nec1099Flow";
import StepHeader from "./StepHeader";
import StepNav from "./StepNav";

const formatMoney = (value) => (value ? `$${value}` : "—");

const ReviewCard = ({ title, onEdit, children }) => (
  <div className="p-5 rounded-2xl border border-slate-200/90 bg-white">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-bold text-slate-900 text-[15px]">{title}</h3>
      <button
        type="button"
        onClick={onEdit}
        className="text-secondary hover:underline text-[13px] font-medium cursor-pointer"
      >
        Edit
      </button>
    </div>
    <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-[13.5px]">
      {children}
    </div>
  </div>
);

const ReviewRow = ({ label, value }) => (
  <div className="min-w-0">
    <span className="text-slate-400 block text-[12px]">{label}</span>
    <strong className="text-slate-800 block break-words">{value || "—"}</strong>
  </div>
);

const ReviewStep = ({ formData, onEdit, onBack, onContinue }) => (
  <div className="space-y-6">
    <StepHeader
      title="Review your document"
      subtitle="Confirm everything is accurate before checkout."
    />

    <ReviewCard
      title="Payer Details"
      onEdit={() => onEdit(NEC1099_FORM_STEPS.PAYER)}
    >
      <ReviewRow label="Payer Name" value={formData.payerName} />
      <ReviewRow label="Street Address" value={formData.streetAddress} />
      <ReviewRow label="City" value={formData.city} />
      <ReviewRow label="State" value={formData.state} />
      <ReviewRow label="ZIP Code" value={formData.zipCode} />
      <ReviewRow label="Payer TIN" value={formData.payerTin} />
      <ReviewRow label="Account Number" value={formData.accountNumber} />
    </ReviewCard>

    <ReviewCard
      title="Recipient Details"
      onEdit={() => onEdit(NEC1099_FORM_STEPS.RECIPIENT)}
    >
      <ReviewRow label="Recipient Name" value={formData.recipientName} />
      <ReviewRow
        label="Street Address"
        value={formData.recipientStreetAddress}
      />
      <ReviewRow label="City" value={formData.recipientCity} />
      <ReviewRow label="State" value={formData.recipientState} />
      <ReviewRow label="ZIP Code" value={formData.recipientZipCode} />
      <ReviewRow label="Recipient TIN" value={formData.recipientTin} />
      <ReviewRow
        label="Account Number"
        value={formData.recipientAccountNumber}
      />
    </ReviewCard>

    <ReviewCard
      title="Compensation Details"
      onEdit={() => onEdit(NEC1099_FORM_STEPS.COMPENSATION)}
    >
      <ReviewRow
        label="Box 1 Compensation"
        value={formatMoney(formData.box1NonemployeeComp)}
      />
      <ReviewRow
        label="Box 2 Direct Sales"
        value={formData.box2DirectSales ? "Yes ($5,000+)" : "No"}
      />
      <ReviewRow
        label="Box 3 Golden Parachute"
        value={formatMoney(formData.box3ExcessGoldenParachute)}
      />
      <ReviewRow
        label="Box 4 Federal Tax"
        value={formatMoney(formData.box4FederalTax)}
      />
      <ReviewRow
        label="Box 5 State Tax"
        value={formatMoney(formData.stateTaxWithheld)}
      />
      <ReviewRow
        label="Box 6 State / Payer No."
        value={[formData.stateReportingState, formData.statePayerNo]
          .filter(Boolean)
          .join(" / ")}
      />
      <ReviewRow
        label="Box 7 State Income"
        value={formatMoney(formData.stateIncome)}
      />
    </ReviewCard>

    <StepNav
      onBack={onBack}
      onNext={onContinue}
      nextLabel="Continue to Checkout"
    />
  </div>
);

export default ReviewStep;
