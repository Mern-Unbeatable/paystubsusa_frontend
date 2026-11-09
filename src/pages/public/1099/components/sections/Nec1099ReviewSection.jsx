import React from "react";
import { ArrowRight } from "lucide-react";

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

/** Step 4 content: read-only summary of the entered 1099-NEC details. */
const Nec1099ReviewSection = ({ formData, onEdit, onBack, onNext }) => (
  <div className="space-y-6">
    {/* Step Header */}
    <div className="flex items-start gap-3.5 pb-2">
      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-50 text-secondary font-bold text-[13px] tracking-wide mt-0.5">
        04
      </span>
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#092258]">
          Review your document
        </h2>
        <p className="text-slate-400 text-[14px] mt-0.5">
          Confirm everything is accurate before checkout.
        </p>
      </div>
    </div>

    <ReviewCard title="Payer Details" onEdit={() => onEdit(1)}>
      <ReviewRow label="Payer Name" value={formData.payerName} />
      <ReviewRow label="Street Address" value={formData.streetAddress} />
      <ReviewRow label="City" value={formData.city} />
      <ReviewRow label="State" value={formData.state} />
      <ReviewRow label="ZIP Code" value={formData.zipCode} />
      <ReviewRow label="Payer TIN" value={formData.payerTin} />
      <ReviewRow label="Account Number" value={formData.accountNumber} />
    </ReviewCard>

    <ReviewCard title="Recipient Details" onEdit={() => onEdit(2)}>
      <ReviewRow label="Recipient Name" value={formData.recipientName} />
      <ReviewRow label="Street Address" value={formData.recipientStreetAddress} />
      <ReviewRow label="City" value={formData.recipientCity} />
      <ReviewRow label="State" value={formData.recipientState} />
      <ReviewRow label="ZIP Code" value={formData.recipientZipCode} />
      <ReviewRow label="Recipient TIN" value={formData.recipientTin} />
      <ReviewRow label="Account Number" value={formData.recipientAccountNumber} />
    </ReviewCard>

    <ReviewCard title="Compensation Details" onEdit={() => onEdit(3)}>
      <ReviewRow label="Box 1 Compensation" value={formatMoney(formData.box1NonemployeeComp)} />
      <ReviewRow label="Box 2 Direct Sales" value={formData.box2DirectSales ? "Yes ($5,000+)" : "No"} />
      <ReviewRow label="Box 3 Golden Parachute" value={formatMoney(formData.box3ExcessGoldenParachute)} />
      <ReviewRow label="Box 4 Federal Tax" value={formatMoney(formData.box4FederalTax)} />
      <ReviewRow label="Box 5 State Tax" value={formatMoney(formData.stateTaxWithheld)} />
      <ReviewRow
        label="Box 6 State / Payer No."
        value={[formData.stateReportingState, formData.statePayerNo].filter(Boolean).join(" / ")}
      />
      <ReviewRow label="Box 7 State Income" value={formatMoney(formData.stateIncome)} />
    </ReviewCard>

    {/* Actions: < Back (left), Continue to Checkout > (right) */}
    <div className="flex items-center justify-between pt-6">
      <button
        type="button"
        onClick={onBack}
        className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium text-[14.5px] hover:bg-slate-50 transition cursor-pointer"
      >
        &lt; Back
      </button>
      <button
        type="button"
        onClick={onNext}
        className="bg-secondary hover:bg-[#0089e0] text-white font-semibold text-[15px] px-8 py-3.5 rounded-xl shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer active:scale-98"
      >
        <span>Continue to Checkout</span>
        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  </div>
);

export default Nec1099ReviewSection;
