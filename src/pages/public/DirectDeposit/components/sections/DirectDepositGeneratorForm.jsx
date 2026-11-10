import React from "react";
import { ChevronDown, ArrowRight, ShieldAlert } from "lucide-react";
import accountTypeOptions from "../../../data/directDeposit/accountTypeOptions.json";
import US_STATES from "../../../data/shared/usStates.json";
import DocumentFormLayout from "../../../shared/documentFlow/components/DocumentFormLayout";
import { useFormStep } from "../../../shared/documentFlow/hooks/useFormStep";
import { useDirectDepositFormData } from "../../hooks/useDirectDepositFormData";
import { DIRECT_DEPOSIT_FLOW } from "../../utils/directDepositFlow";

/** Form steps 1-3 of the direct deposit flow; the current step lives in `?step=`. */
const DirectDepositGeneratorForm = () => {
  const { formData, updateField: handleInputChange } =
    useDirectDepositFormData();
  const { currentStep, handleNext, handleBack, onStepClick } =
    useFormStep(DIRECT_DEPOSIT_FLOW);

  return (
    <DocumentFormLayout
      flow={DIRECT_DEPOSIT_FLOW}
      formData={formData}
      currentStep={currentStep}
      onStepClick={onStepClick}
    >
      {/* STEP 1: Employer Information matching Figma media_1793597424314.png */}
      {currentStep === 1 && (
        <div className="space-y-6">
          {/* Step Header */}
          <div className="flex items-start gap-3.5 pb-2">
            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-50 text-secondary font-bold text-[13px] tracking-wide mt-0.5">
              01
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#092258]">
                Employer information
              </h2>
              <p className="text-slate-400 text-[14px] mt-0.5">
                Enter the legal details exactly as they should appear.
              </p>
            </div>
          </div>

          {/* Company / Employer Name */}
          <div>
            <label className="block text-[14px] font-semibold text-slate-800 mb-2">
              Company / Employer Name
            </label>
            <input
              type="text"
              value={formData.employerName}
              onChange={(e) =>
                handleInputChange("employerName", e.target.value)
              }
              placeholder=""
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
            />
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-[14px] font-semibold text-slate-800 mb-2">
              Street Address
            </label>
            <input
              type="text"
              value={formData.streetAddress}
              onChange={(e) =>
                handleInputChange("streetAddress", e.target.value)
              }
              placeholder=""
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
            />
          </div>

          {/* City, State, ZIP */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-5">
              <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder=""
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                State
              </label>
              <div className="relative">
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="w-full appearance-none px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all pr-10 cursor-pointer"
                >
                  <option value="">Select</option>
                  {US_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                placeholder=""
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
          </div>

          {/* Employer Contact Information (Optional) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[14px] font-semibold text-slate-800">
                Employer Contact Information
              </label>
              <span className="text-[13px] text-slate-400 font-normal">
                Optional
              </span>
            </div>
            <input
              type="text"
              value={formData.employerContact}
              onChange={(e) =>
                handleInputChange("employerContact", e.target.value)
              }
              placeholder=""
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
            />
          </div>

          {/* Action: Save & Continue */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleNext}
              className="bg-secondary hover:bg-[#0089e0] text-white font-semibold text-[15px] px-6 py-3.5 rounded-xl shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Save & Continue</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Employee Information matching Figma media_1793597443452.png */}
      {currentStep === 2 && (
        <div className="space-y-6">
          {/* Step Header */}
          <div className="flex items-start gap-3.5 pb-2">
            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-50 text-secondary font-bold text-[13px] tracking-wide mt-0.5">
              02
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#092258]">
                Employee information
              </h2>
              <p className="text-slate-400 text-[14px] mt-0.5">
                Personal information is encrypted and handled securely.
              </p>
            </div>
          </div>

          {/* Employee Full Name */}
          <div>
            <label className="block text-[14px] font-semibold text-slate-800 mb-2">
              Employee Full Name
            </label>
            <input
              type="text"
              value={formData.employeeName}
              onChange={(e) =>
                handleInputChange("employeeName", e.target.value)
              }
              placeholder="Employee Full Name"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
            />
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-[14px] font-semibold text-slate-800 mb-2">
              Street Address
            </label>
            <input
              type="text"
              value={formData.employeeAddress}
              onChange={(e) =>
                handleInputChange("employeeAddress", e.target.value)
              }
              placeholder="Street Address"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
            />
          </div>

          {/* City, State, ZIP */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-5">
              <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.employeeCity}
                onChange={(e) =>
                  handleInputChange("employeeCity", e.target.value)
                }
                placeholder="City"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                State
              </label>
              <div className="relative">
                <select
                  value={formData.employeeState}
                  onChange={(e) =>
                    handleInputChange("employeeState", e.target.value)
                  }
                  className="w-full appearance-none px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all pr-10 cursor-pointer"
                >
                  <option value="">Select</option>
                  {US_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                value={formData.employeeZipCode}
                onChange={(e) =>
                  handleInputChange("employeeZipCode", e.target.value)
                }
                placeholder="ZIP Code"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
          </div>

          {/* Employee ID (Optional) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[14px] font-semibold text-slate-800">
                Employee ID
              </label>
              <span className="text-[13px] text-slate-400 font-normal">
                Optional
              </span>
            </div>
            <input
              type="text"
              value={formData.employeeId}
              onChange={(e) => handleInputChange("employeeId", e.target.value)}
              placeholder=""
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
            />
          </div>

          {/* Actions: < Back (left), Save & Continue > (right) */}
          <div className="flex items-center justify-between pt-6">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium text-[14.5px] hover:bg-slate-50 transition cursor-pointer"
            >
              &lt; Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-secondary hover:bg-[#0089e0] text-white font-semibold text-[15px] px-6 py-3.5 rounded-xl shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Save & Continue</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Deposit Details matching Figma media_1793597459968.png */}
      {currentStep === 3 && (
        <div className="space-y-6">
          {/* Step Header */}
          <div className="flex items-start gap-3.5 pb-2">
            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-50 text-secondary font-bold text-[13px] tracking-wide mt-0.5">
              03
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#092258]">
                Deposit details
              </h2>
              <p className="text-slate-400 text-[14px] mt-0.5">
                Enter the payment details for this informational slip.
              </p>
            </div>
          </div>

          {/* Amber Warning Notice matching Figma */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-amber-800">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 stroke-[2]" />
            <p className="text-[13.5px] font-normal leading-relaxed">
              This document is not a bank-issued record or proof of a completed
              transaction.
            </p>
          </div>

          {/* Row 1: Deposit Date & Pay Period */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Deposit Date
              </label>
              <input
                type="text"
                value={formData.depositDate}
                onChange={(e) =>
                  handleInputChange("depositDate", e.target.value)
                }
                placeholder="MM/DD/YY"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>

            <div>
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Pay Period
              </label>
              <input
                type="text"
                value={formData.payPeriod}
                onChange={(e) => handleInputChange("payPeriod", e.target.value)}
                placeholder="May 1 – May 15, 2025"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
          </div>

          {/* Row 2: Payment Reference Number & Bank Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Payment Reference Number
              </label>
              <input
                type="text"
                value={formData.paymentReference}
                onChange={(e) =>
                  handleInputChange("paymentReference", e.target.value)
                }
                placeholder=""
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[13.5px] font-semibold text-slate-800">
                  Bank Name
                </label>
                <span className="text-[12.5px] text-slate-400 font-normal">
                  Optional
                </span>
              </div>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => handleInputChange("bankName", e.target.value)}
                placeholder=""
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
          </div>

          {/* Row 3: Account Holder Name */}
          <div>
            <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
              Account Holder Name
            </label>
            <input
              type="text"
              value={formData.accountHolderName}
              onChange={(e) =>
                handleInputChange("accountHolderName", e.target.value)
              }
              placeholder=""
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
            />
          </div>

          {/* Row 4: Account Type, Account Number, Deposit Amount (3 columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-4">
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Account Type
              </label>
              <div className="relative">
                <select
                  value={formData.accountType}
                  onChange={(e) =>
                    handleInputChange("accountType", e.target.value)
                  }
                  className="w-full appearance-none px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all pr-10 cursor-pointer"
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
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Account Number
              </label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) =>
                  handleInputChange("accountNumber", e.target.value)
                }
                placeholder="•••• 0000"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Deposit Amount
              </label>
              <input
                type="text"
                value={formData.depositAmount}
                onChange={(e) =>
                  handleInputChange("depositAmount", e.target.value)
                }
                placeholder="$0.00"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
          </div>

          {/* Row 5: Payment Description (Optional) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[13.5px] font-semibold text-slate-800">
                Payment Description
              </label>
              <span className="text-[12.5px] text-slate-400 font-normal">
                Optional
              </span>
            </div>
            <input
              type="text"
              value={formData.paymentDescription}
              onChange={(e) =>
                handleInputChange("paymentDescription", e.target.value)
              }
              placeholder=""
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
            />
          </div>

          {/* Actions: < Back (left), Save & Continue > (right) */}
          <div className="flex items-center justify-between pt-6">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium text-[14.5px] hover:bg-slate-50 transition cursor-pointer"
            >
              &lt; Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-secondary hover:bg-[#0089e0] text-white font-semibold text-[15px] px-6 py-3.5 rounded-xl shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Save & Continue</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </DocumentFormLayout>
  );
};

export default DirectDepositGeneratorForm;
