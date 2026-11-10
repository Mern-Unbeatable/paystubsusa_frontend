import React from "react";
import { ChevronDown, ArrowRight, Plus } from "lucide-react";
import US_STATES from "../../../data/shared/usStates.json";
import DocumentFormLayout from "../../../shared/documentFlow/components/DocumentFormLayout";
import { useFormStep } from "../../../shared/documentFlow/hooks/useFormStep";
import { useW2FormData } from "../../hooks/useW2FormData";
import { W2_FLOW } from "../../utils/w2Flow";

/** Form steps 1-3 of the W-2 flow; the current step lives in `?step=`. */
const W2GeneratorForm = () => {
  const { formData, updateField: handleInputChange } = useW2FormData();
  const { currentStep, handleNext, handleBack, onStepClick } =
    useFormStep(W2_FLOW);

  return (
    <DocumentFormLayout
      flow={W2_FLOW}
      formData={formData}
      currentStep={currentStep}
      onStepClick={onStepClick}
    >
      {/* STEP 1: Employer Information */}
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

          {/* EIN */}
          <div>
            <label className="block text-[14px] font-semibold text-slate-800 mb-2">
              Employer Identification Number (EIN)
            </label>
            <input
              type="text"
              value={formData.ein}
              onChange={(e) => handleInputChange("ein", e.target.value)}
              placeholder="12-3456789"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
            />
          </div>

          {/* Employer Name */}
          <div>
            <label className="block text-[14px] font-semibold text-slate-800 mb-2">
              Employer Name
            </label>
            <input
              type="text"
              value={formData.employerName}
              onChange={(e) =>
                handleInputChange("employerName", e.target.value)
              }
              placeholder="Employee name"
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
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
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
                placeholder="Zip Code"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
          </div>

          {/* Control Number */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[14px] font-semibold text-slate-800">
                Control Number
              </label>
              <span className="text-[13px] text-slate-400 font-normal">
                Optional
              </span>
            </div>
            <input
              type="text"
              value={formData.controlNumber}
              onChange={(e) =>
                handleInputChange("controlNumber", e.target.value)
              }
              placeholder="Control Number"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
            />
          </div>

          {/* Action */}
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

      {/* STEP 2: Employee Information matching Figma media_1793596594370.png */}
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

          {/* SSN */}
          <div>
            <label className="block text-[14px] font-semibold text-slate-800 mb-2">
              Social Security Number (SSN)
            </label>
            <input
              type="text"
              value={formData.ssn}
              onChange={(e) => handleInputChange("ssn", e.target.value)}
              placeholder="...-..-...."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
            />
          </div>

          {/* First Name, Middle Initial (Optional), Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-5">
              <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder=""
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
            <div className="sm:col-span-3">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[14px] font-semibold text-slate-800">
                  Middle Initial
                </label>
                <span className="text-[12px] text-slate-400 font-normal">
                  Optional
                </span>
              </div>
              <input
                type="text"
                value={formData.middleInitial}
                onChange={(e) =>
                  handleInputChange("middleInitial", e.target.value)
                }
                placeholder=""
                maxLength={2}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
            <div className="sm:col-span-4">
              <label className="block text-[14px] font-semibold text-slate-800 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder=""
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
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
                value={formData.employeeCity}
                onChange={(e) =>
                  handleInputChange("employeeCity", e.target.value)
                }
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
                value={formData.employeeZip}
                onChange={(e) =>
                  handleInputChange("employeeZip", e.target.value)
                }
                placeholder=""
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
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

      {/* STEP 3: Wage & Tax Information matching Figma media_1793596615235.png */}
      {currentStep === 3 && (
        <div className="space-y-6">
          {/* Step Header */}
          <div className="flex items-start gap-3.5 pb-2">
            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-50 text-secondary font-bold text-[13px] tracking-wide mt-0.5">
              03
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#092258]">
                Wage & tax information
              </h2>
              <p className="text-slate-400 text-[14px] mt-0.5">
                Enter values from your records. We do not calculate tax
                liability.
              </p>
            </div>
          </div>

          {/* 2-Column Grid matching Figma */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Box 1 & Box 2 */}
            <div>
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Box 1 – Wages, tips, other compensation
              </label>
              <input
                type="text"
                value={formData.box1Wages}
                onChange={(e) => handleInputChange("box1Wages", e.target.value)}
                placeholder="$0.00"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
            <div>
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Box 2 – Federal income tax withheld
              </label>
              <input
                type="text"
                value={formData.box2FederalTax}
                onChange={(e) =>
                  handleInputChange("box2FederalTax", e.target.value)
                }
                placeholder="$0.00"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>

            {/* Box 3 & Box 4 */}
            <div>
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Box 3 – Social Security wages
              </label>
              <input
                type="text"
                value={formData.box3SocialSecurityWages}
                onChange={(e) =>
                  handleInputChange("box3SocialSecurityWages", e.target.value)
                }
                placeholder="$0.00"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
            <div>
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Box 4 – Social Security tax withheld
              </label>
              <input
                type="text"
                value={formData.box4SocialSecurityTax}
                onChange={(e) =>
                  handleInputChange("box4SocialSecurityTax", e.target.value)
                }
                placeholder="$0.00"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>

            {/* Box 5 & Box 6 */}
            <div>
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Box 5 – Medicare wages and tips
              </label>
              <input
                type="text"
                value={formData.box5MedicareWages}
                onChange={(e) =>
                  handleInputChange("box5MedicareWages", e.target.value)
                }
                placeholder="$0.00"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
            <div>
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Box 6 – Medicare tax withheld
              </label>
              <input
                type="text"
                value={formData.box6MedicareTax}
                onChange={(e) =>
                  handleInputChange("box6MedicareTax", e.target.value)
                }
                placeholder="$0.00"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>

            {/* Box 7 & Box 8 */}
            <div>
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Box 7 – Social Security tips
              </label>
              <input
                type="text"
                value={formData.box7SocialSecurityTips}
                onChange={(e) =>
                  handleInputChange("box7SocialSecurityTips", e.target.value)
                }
                placeholder="$0.00"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
            <div>
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Box 8 – Allocated tips
              </label>
              <input
                type="text"
                value={formData.box8AllocatedTips}
                onChange={(e) =>
                  handleInputChange("box8AllocatedTips", e.target.value)
                }
                placeholder="$0.00"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>

            {/* Box 10 & Box 11 */}
            <div>
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Box 10 – Dependent care benefits
              </label>
              <input
                type="text"
                value={formData.box10DependentCare}
                onChange={(e) =>
                  handleInputChange("box10DependentCare", e.target.value)
                }
                placeholder="$0.00"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
            <div>
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Box 11 – Nonqualified plans
              </label>
              <input
                type="text"
                value={formData.box11NonqualifiedPlans}
                onChange={(e) =>
                  handleInputChange("box11NonqualifiedPlans", e.target.value)
                }
                placeholder="$0.00"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
          </div>

          {/* Box 13 – Statutory employee Checkbox in full width row */}
          <div className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white flex items-center gap-3">
            <input
              type="checkbox"
              id="box13-statutory"
              checked={formData.box13StatutoryEmployee}
              onChange={(e) =>
                handleInputChange("box13StatutoryEmployee", e.target.checked)
              }
              className="w-4 h-4 rounded text-secondary border-slate-300 focus:ring-secondary cursor-pointer"
            />
            <label
              htmlFor="box13-statutory"
              className="text-[14px] text-slate-800 font-medium cursor-pointer select-none"
            >
              Box 13 – Statutory employee
            </label>
          </div>

          {/* Box 12 Code & Amount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Box 12 – Code
              </label>
              <input
                type="text"
                value={formData.box12Code}
                onChange={(e) => handleInputChange("box12Code", e.target.value)}
                placeholder="DD"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
            <div>
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Box 12 – Amount
              </label>
              <input
                type="text"
                value={formData.box12Amount}
                onChange={(e) =>
                  handleInputChange("box12Amount", e.target.value)
                }
                placeholder="$0.00"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
          </div>

          {/* State Reporting Section matching Figma */}
          <div className="pt-3">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-[15px] font-bold text-slate-900">
                  State reporting
                </h3>
                <p className="text-[13px] text-slate-400 mt-0.5">
                  Add applicable state and local values.
                </p>
              </div>
              <button
                type="button"
                onClick={() => alert("Additional state reporting added.")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:border-secondary text-slate-700 hover:text-secondary text-[13px] font-medium transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add state</span>
              </button>
            </div>

            {/* Row 1: Box 15 State, Box 16 State wages, Box 17 State tax */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                  Box 15 – State
                </label>
                <div className="relative">
                  <select
                    value={formData.box15State}
                    onChange={(e) =>
                      handleInputChange("box15State", e.target.value)
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

              <div>
                <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                  Box 16 – State wages
                </label>
                <input
                  type="text"
                  value={formData.box16StateWages}
                  onChange={(e) =>
                    handleInputChange("box16StateWages", e.target.value)
                  }
                  placeholder=""
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                  Box 17 – State tax
                </label>
                <input
                  type="text"
                  value={formData.box17StateTax}
                  onChange={(e) =>
                    handleInputChange("box17StateTax", e.target.value)
                  }
                  placeholder=""
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                />
              </div>
            </div>

            {/* Row 2: Box 18 Local wages, Box 19 Local tax, Box 20 Locality */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                  Box 18 – Local wages
                </label>
                <input
                  type="text"
                  value={formData.box18LocalWages}
                  onChange={(e) =>
                    handleInputChange("box18LocalWages", e.target.value)
                  }
                  placeholder=""
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                  Box 19 – Local tax
                </label>
                <input
                  type="text"
                  value={formData.box19LocalTax}
                  onChange={(e) =>
                    handleInputChange("box19LocalTax", e.target.value)
                  }
                  placeholder=""
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                  Box 20 – Locality
                </label>
                <input
                  type="text"
                  value={formData.box20Locality}
                  onChange={(e) =>
                    handleInputChange("box20Locality", e.target.value)
                  }
                  placeholder=""
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                />
              </div>
            </div>
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

export default W2GeneratorForm;
