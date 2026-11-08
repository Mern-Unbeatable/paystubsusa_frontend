import React from "react";
import { ArrowRight } from "lucide-react";

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

      {/* Section 1: Employer / Payer Details */}
      <div className="p-5 rounded-2xl border border-slate-200/90 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-900 text-[15px]">
            Employer / Payer Details
          </h3>
          <button
            type="button"
            onClick={() => onEdit(1)}
            className="text-secondary hover:underline text-[13px] font-medium cursor-pointer"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-[13.5px]">
          <div className="flex justify-between sm:justify-start sm:gap-6">
            <span className="text-slate-500 w-36">Employer Name</span>
            <strong className="text-slate-800">{formData.payerName || '—'}</strong>
          </div>
          <div className="flex justify-between sm:justify-start sm:gap-6">
            <span className="text-slate-500 w-36">Employer Address</span>
            <strong className="text-slate-800">{formData.streetAddress || '—'}</strong>
          </div>
          <div className="flex justify-between sm:justify-start sm:gap-6">
            <span className="text-slate-500 w-36">Employer City</span>
            <strong className="text-slate-800">{formData.city || '—'}</strong>
          </div>
          <div className="flex justify-between sm:justify-start sm:gap-6">
            <span className="text-slate-500 w-36">Employer Zip</span>
            <strong className="text-slate-800">{formData.zipCode || '—'}</strong>
          </div>
        </div>
      </div>

      {/* Section 2: Employee / Recipient Details */}
      <div className="p-5 rounded-2xl border border-slate-200/90 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-900 text-[15px]">
            Employee / Recipient Details
          </h3>
          <button
            type="button"
            onClick={() => onEdit(2)}
            className="text-secondary hover:underline text-[13px] font-medium cursor-pointer"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-[13.5px]">
          <div className="flex justify-between sm:justify-start sm:gap-6">
            <span className="text-slate-500 w-36">Person Name</span>
            <strong className="text-slate-800">{formData.recipientName || '—'}</strong>
          </div>
          <div className="flex justify-between sm:justify-start sm:gap-6">
            <span className="text-slate-500 w-36">Person Address</span>
            <strong className="text-slate-800">{formData.recipientStreetAddress || '—'}</strong>
          </div>
          <div className="flex justify-between sm:justify-start sm:gap-6">
            <span className="text-slate-500 w-36">Person City</span>
            <strong className="text-slate-800">{formData.recipientCity || '—'}</strong>
          </div>
        </div>
      </div>

      {/* Section 3: Tax & Compensation */}
      <div className="p-5 rounded-2xl border border-slate-200/90 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-900 text-[15px]">
            Tax & Compensation
          </h3>
          <button
            type="button"
            onClick={() => onEdit(3)}
            className="text-secondary hover:underline text-[13px] font-medium cursor-pointer"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[13.5px]">
          <div>
            <span className="text-slate-400 block text-[12px]">Box1</span>
            <strong className="text-slate-800">{formData.box1NonemployeeComp || '0.00'}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[12px]">Box3</span>
            <strong className="text-slate-800">{formData.box3ExcessGoldenParachute || '0.00'}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[12px]">Box4</span>
            <strong className="text-slate-800">{formData.box4FederalTax || '0.00'}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[12px]">State Wages</span>
            <strong className="text-slate-800">{formData.stateIncome || '0.00'}</strong>
          </div>
        </div>
      </div>

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
