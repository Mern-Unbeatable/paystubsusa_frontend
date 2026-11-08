import React from "react";

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
            <span className="text-slate-500 w-36">
              Employer Name
            </span>
            <strong className="text-slate-800">
              {formData.employerName || "—"}
            </strong>
          </div>
          <div className="flex justify-between sm:justify-start sm:gap-6">
            <span className="text-slate-500 w-36">
              Employer Address
            </span>
            <strong className="text-slate-800">
              {formData.streetAddress || "—"}
            </strong>
          </div>
          <div className="flex justify-between sm:justify-start sm:gap-6">
            <span className="text-slate-500 w-36">
              Employer City
            </span>
            <strong className="text-slate-800">
              {formData.city || "—"}
            </strong>
          </div>
          <div className="flex justify-between sm:justify-start sm:gap-6">
            <span className="text-slate-500 w-36">
              Employer Zip
            </span>
            <strong className="text-slate-800">
              {formData.zipCode || "—"}
            </strong>
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
            <span className="text-slate-500 w-36">First Name</span>
            <strong className="text-slate-800">
              {formData.firstName || "—"}
            </strong>
          </div>
          <div className="flex justify-between sm:justify-start sm:gap-6">
            <span className="text-slate-500 w-36">Last Name</span>
            <strong className="text-slate-800">
              {formData.lastName || "—"}
            </strong>
          </div>
          <div className="flex justify-between sm:justify-start sm:gap-6">
            <span className="text-slate-500 w-36">
              Person Address
            </span>
            <strong className="text-slate-800">
              {formData.employeeAddress || "—"}
            </strong>
          </div>
          <div className="flex justify-between sm:justify-start sm:gap-6">
            <span className="text-slate-500 w-36">Person City</span>
            <strong className="text-slate-800">
              {formData.employeeCity || "—"}
            </strong>
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
        {formData.box1Wages ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[13.5px]">
            <div>
              <span className="text-slate-400 block text-[12px]">
                Wages
              </span>
              <strong className="text-slate-800">
                ${formData.box1Wages}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[12px]">
                Federal Tax
              </span>
              <strong className="text-slate-800">
                ${formData.box2FederalTax || "0.00"}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[12px]">
                Social Security
              </span>
              <strong className="text-slate-800">
                ${formData.box4SocialSecurityTax || "0.00"}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[12px]">
                Medicare Tax
              </span>
              <strong className="text-slate-800">
                ${formData.box6MedicareTax || "0.00"}
              </strong>
            </div>
          </div>
        ) : (
          <p className="text-slate-400 text-[13.5px]">
            No information entered yet.
          </p>
        )}
      </div>

      {/* Section 4: Document Price Banner Card matching Figma */}
      {/* <div className="p-5 rounded-2xl bg-[#F0F7FF] border border-blue-200/60 flex items-center justify-between">
        <div>
          <p className="font-bold text-[#092258] text-[15px]">
            W-2 Document
          </p>
          <p className="text-slate-500 text-[13px] mt-0.5">
            Professionally formatted PDF
          </p>
        </div>
        <div>
          <span className="text-xl font-black text-[#092258]">$14.99</span>
        </div>
      </div> */}

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
        </button>
      </div>
    </div>
);

export default W2ReviewSection;
