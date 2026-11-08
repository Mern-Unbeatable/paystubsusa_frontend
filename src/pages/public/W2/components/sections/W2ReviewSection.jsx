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

/** Step 4 content: read-only summary of the entered W-2 details. */
const W2ReviewSection = ({ formData, onEdit, onBack, onNext }) => (
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

    <ReviewCard title="Employer Details" onEdit={() => onEdit(1)}>
      <ReviewRow label="Employer Name" value={formData.employerName} />
      <ReviewRow label="EIN" value={formData.ein} />
      <ReviewRow label="Street Address" value={formData.streetAddress} />
      <ReviewRow label="City" value={formData.city} />
      <ReviewRow label="State" value={formData.state} />
      <ReviewRow label="ZIP Code" value={formData.zipCode} />
      <ReviewRow label="Control Number" value={formData.controlNumber} />
    </ReviewCard>

    <ReviewCard title="Employee Details" onEdit={() => onEdit(2)}>
      <ReviewRow label="First Name" value={formData.firstName} />
      <ReviewRow label="Middle Initial" value={formData.middleInitial} />
      <ReviewRow label="Last Name" value={formData.lastName} />
      <ReviewRow label="SSN" value={formData.ssn} />
      <ReviewRow label="Street Address" value={formData.employeeAddress} />
      <ReviewRow label="City" value={formData.employeeCity} />
      <ReviewRow label="State" value={formData.employeeState} />
      <ReviewRow label="ZIP Code" value={formData.employeeZip} />
    </ReviewCard>

    <ReviewCard title="Wages & Taxes" onEdit={() => onEdit(3)}>
      <ReviewRow label="Box 1 Wages, tips, other" value={formatMoney(formData.box1Wages)} />
      <ReviewRow label="Box 2 Federal Tax" value={formatMoney(formData.box2FederalTax)} />
      <ReviewRow label="Box 3 Social Security Wages" value={formatMoney(formData.box3SocialSecurityWages)} />
      <ReviewRow label="Box 4 Social Security Tax" value={formatMoney(formData.box4SocialSecurityTax)} />
      <ReviewRow label="Box 5 Medicare Wages" value={formatMoney(formData.box5MedicareWages)} />
      <ReviewRow label="Box 6 Medicare Tax" value={formatMoney(formData.box6MedicareTax)} />
      <ReviewRow label="Box 7 Social Security Tips" value={formatMoney(formData.box7SocialSecurityTips)} />
      <ReviewRow label="Box 8 Allocated Tips" value={formatMoney(formData.box8AllocatedTips)} />
      <ReviewRow label="Box 10 Dependent Care" value={formatMoney(formData.box10DependentCare)} />
      <ReviewRow label="Box 11 Nonqualified Plans" value={formatMoney(formData.box11NonqualifiedPlans)} />
      <ReviewRow
        label="Box 12 Code / Amount"
        value={
          formData.box12Code || formData.box12Amount
            ? [formData.box12Code, formatMoney(formData.box12Amount)].filter(Boolean).join(" · ")
            : ""
        }
      />
      <ReviewRow
        label="Box 13 Statutory Employee"
        value={formData.box13StatutoryEmployee ? "Yes" : "No"}
      />
    </ReviewCard>

    <ReviewCard title="State & Local" onEdit={() => onEdit(3)}>
      <ReviewRow label="Box 15 State" value={formData.box15State} />
      <ReviewRow label="Box 16 State Wages" value={formatMoney(formData.box16StateWages)} />
      <ReviewRow label="Box 17 State Income Tax" value={formatMoney(formData.box17StateTax)} />
      <ReviewRow label="Box 18 Local Wages" value={formatMoney(formData.box18LocalWages)} />
      <ReviewRow label="Box 19 Local Income Tax" value={formatMoney(formData.box19LocalTax)} />
      <ReviewRow label="Box 20 Locality Name" value={formData.box20Locality} />
    </ReviewCard>

    {/* Actions: < Back (left), Continue to Checkout (right) */}
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

export default W2ReviewSection;
