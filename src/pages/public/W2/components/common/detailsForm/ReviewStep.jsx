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
import { W2_FORM_STEPS } from "../../../utils/w2Flow";
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

/** Step 4: read-only summary before checkout. */
const ReviewStep = ({ formData, onEdit, onBack, onContinue }) => (
  <div className="space-y-6 animate-in fade-in-50 duration-200">
    <StepHeader
      step={4}
      title="Review your document"
      subtitle="Confirm everything is accurate before checkout."
    />

    <ReviewCard
      title="Employer Details"
      icon={Building2}
      onEdit={() => onEdit(W2_FORM_STEPS.EMPLOYER)}
    >
      <ReviewRow
        label="Employer Name"
        value={formData.employerName}
        fullWidth
      />
      <ReviewRow label="EIN" value={formData.ein} />
      <ReviewRow label="Control Number" value={formData.controlNumber} />
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
      title="Employee Details"
      icon={User}
      onEdit={() => onEdit(W2_FORM_STEPS.EMPLOYEE)}
    >
      <ReviewRow
        label="Full Name"
        value={[formData.firstName, formData.middleInitial, formData.lastName]
          .filter(Boolean)
          .join(" ")}
        fullWidth
      />
      <ReviewRow label="SSN" value={formData.ssn} fullWidth />
      <ReviewRow
        label="Street Address"
        value={formData.employeeAddress}
        fullWidth
      />
      <ReviewRow label="City" value={formData.employeeCity} />
      <ReviewRow
        label="State / ZIP"
        value={`${formData.employeeState || "—"} ${formData.employeeZip || ""}`}
      />
    </ReviewCard>

    <ReviewCard
      title="Wages & Federal Taxes"
      icon={DollarSign}
      onEdit={() => onEdit(W2_FORM_STEPS.WAGES)}
    >
      <ReviewRow
        label="Box 1 – Wages, tips, other"
        value={formatMoney(formData.box1Wages)}
        isMoney
      />
      <ReviewRow
        label="Box 2 – Federal Tax"
        value={formatMoney(formData.box2FederalTax)}
        isMoney
      />
      <ReviewRow
        label="Box 3 – Social Security Wages"
        value={formatMoney(formData.box3SocialSecurityWages)}
        isMoney
      />
      <ReviewRow
        label="Box 4 – Social Security Tax"
        value={formatMoney(formData.box4SocialSecurityTax)}
        isMoney
      />
      <ReviewRow
        label="Box 5 – Medicare Wages"
        value={formatMoney(formData.box5MedicareWages)}
        isMoney
      />
      <ReviewRow
        label="Box 6 – Medicare Tax"
        value={formatMoney(formData.box6MedicareTax)}
        isMoney
      />
      <ReviewRow
        label="Box 7 – Social Security Tips"
        value={formatMoney(formData.box7SocialSecurityTips)}
        isMoney
      />
      <ReviewRow
        label="Box 8 – Allocated Tips"
        value={formatMoney(formData.box8AllocatedTips)}
        isMoney
      />
      <ReviewRow
        label="Box 10 – Dependent Care"
        value={formatMoney(formData.box10DependentCare)}
        isMoney
      />
      <ReviewRow
        label="Box 11 – Nonqualified Plans"
        value={formatMoney(formData.box11NonqualifiedPlans)}
        isMoney
      />
      <ReviewRow
        label="Box 12 – Code / Amount"
        value={
          formData.box12Code || formData.box12Amount
            ? [formData.box12Code, formatMoney(formData.box12Amount)]
                .filter(Boolean)
                .join(" · ")
            : ""
        }
      />
      <ReviewRow
        label="Box 13 – Statutory Employee"
        value={formData.box13StatutoryEmployee ? "Yes" : "No"}
      />
    </ReviewCard>

    <ReviewCard
      title="State & Local"
      icon={MapPin}
      onEdit={() => onEdit(W2_FORM_STEPS.WAGES)}
    >
      <ReviewRow label="Box 15 – State" value={formData.box15State} />
      <ReviewRow
        label="Box 16 – State Wages"
        value={formatMoney(formData.box16StateWages)}
        isMoney
      />
      <ReviewRow
        label="Box 17 – State Tax"
        value={formatMoney(formData.box17StateTax)}
        isMoney
      />
      <ReviewRow
        label="Box 18 – Local Wages"
        value={formatMoney(formData.box18LocalWages)}
        isMoney
      />
      <ReviewRow
        label="Box 19 – Local Tax"
        value={formatMoney(formData.box19LocalTax)}
        isMoney
      />
      <ReviewRow
        label="Box 20 – Locality Name"
        value={formData.box20Locality}
      />
    </ReviewCard>

    {/* Ready-to-generate Callout */}
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
          Your W-2 is ready for final checkout.
        </p>
      </div>

      <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
        <ArrowRight className="w-5 h-5 text-white" />
      </div>

      <div className="relative z-10 text-center sm:text-right bg-white/10 sm:bg-transparent py-2.5 px-4 sm:p-0 rounded-xl w-full sm:w-auto">
        <p className="text-slate-300 text-[11px] font-semibold uppercase tracking-wider">
          Wages (Box 1)
        </p>
        <p className="font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
          {formatMoney(formData.box1Wages)}
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
