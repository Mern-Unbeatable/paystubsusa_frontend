import React from "react";
import { ChevronDown, ArrowRight, Plus } from "lucide-react";
import US_STATES from "../../../data/shared/usStates.json";
import DocumentFormLayout from "../../../shared/documentFlow/components/DocumentFormLayout";
import { useFormStep } from "../../../shared/documentFlow/hooks/useFormStep";
import { useNec1099FormData } from "../../hooks/useNec1099FormData";
import { NEC1099_FLOW } from "../../utils/nec1099Flow";

/** Form steps 1-3 of the 1099-NEC flow; the current step lives in `?step=`. */
const Nec1099GeneratorForm = () => {
  const { formData, updateField: handleInputChange } = useNec1099FormData();
  const { currentStep, handleNext, handleBack, onStepClick } =
    useFormStep(NEC1099_FLOW);

  return (
    <DocumentFormLayout
      flow={NEC1099_FLOW}
      formData={formData}
      currentStep={currentStep}
      onStepClick={onStepClick}
    >
      {/* STEP 1: Payer Information matching Figma media_1793596986920.png */}
      {currentStep === 1 && (
        <div className="space-y-6">
          {/* Step Header */}
          <div className="flex items-start gap-3.5 pb-2">
            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-50 text-secondary font-bold text-[13px] tracking-wide mt-0.5">
              01
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#092258]">
                Payer information
              </h2>
              <p className="text-slate-400 text-[14px] mt-0.5">
                Enter the legal details exactly as they should appear.
              </p>
            </div>
          </div>

          {/* Payer Name */}
          <div>
            <label className="block text-[14px] font-semibold text-slate-800 mb-2">
              Payer Name
            </label>
            <input
              type="text"
              value={formData.payerName}
              onChange={(e) => handleInputChange("payerName", e.target.value)}
              placeholder="Payer Name"
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

          {/* Payer TIN */}
          <div>
            <label className="block text-[14px] font-semibold text-slate-800 mb-2">
              Payer TIN
            </label>
            <input
              type="text"
              value={formData.payerTin}
              onChange={(e) => handleInputChange("payerTin", e.target.value)}
              placeholder="12-3456789"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
            />
          </div>

          {/* Account Number (Optional) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[14px] font-semibold text-slate-800">
                Account Number
              </label>
              <span className="text-[13px] text-slate-400 font-normal">
                Optional
              </span>
            </div>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(e) =>
                handleInputChange("accountNumber", e.target.value)
              }
              placeholder="Account Number"
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

      {/* STEP 2: Recipient Information matching Figma media_1793597004916.png */}
      {currentStep === 2 && (
        <div className="space-y-6">
          {/* Step Header */}
          <div className="flex items-start gap-3.5 pb-2">
            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-50 text-secondary font-bold text-[13px] tracking-wide mt-0.5">
              02
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#092258]">
                Recipient information
              </h2>
              <p className="text-slate-400 text-[14px] mt-0.5">
                Personal information is encrypted and handled securely.
              </p>
            </div>
          </div>

          {/* Recipient Name */}
          <div>
            <label className="block text-[14px] font-semibold text-slate-800 mb-2">
              Recipient Name
            </label>
            <input
              type="text"
              value={formData.recipientName}
              onChange={(e) =>
                handleInputChange("recipientName", e.target.value)
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
              value={formData.recipientStreetAddress}
              onChange={(e) =>
                handleInputChange("recipientStreetAddress", e.target.value)
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
                value={formData.recipientCity}
                onChange={(e) =>
                  handleInputChange("recipientCity", e.target.value)
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
                  value={formData.recipientState}
                  onChange={(e) =>
                    handleInputChange("recipientState", e.target.value)
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
                value={formData.recipientZipCode}
                onChange={(e) =>
                  handleInputChange("recipientZipCode", e.target.value)
                }
                placeholder=""
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
          </div>

          {/* Recipient TIN */}
          <div>
            <label className="block text-[14px] font-semibold text-slate-800 mb-2">
              Recipient TIN
            </label>
            <input
              type="text"
              value={formData.recipientTin}
              onChange={(e) =>
                handleInputChange("recipientTin", e.target.value)
              }
              placeholder="..-......."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] placeholder-slate-400 focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
            />
          </div>

          {/* Account Number (Optional) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[14px] font-semibold text-slate-800">
                Account Number
              </label>
              <span className="text-[13px] text-slate-400 font-normal">
                Optional
              </span>
            </div>
            <input
              type="text"
              value={formData.recipientAccountNumber}
              onChange={(e) =>
                handleInputChange("recipientAccountNumber", e.target.value)
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

      {/* STEP 3: Compensation Details matching Figma media_1793597021070.png */}
      {currentStep === 3 && (
        <div className="space-y-6">
          {/* Step Header */}
          <div className="flex items-start gap-3.5 pb-2">
            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-50 text-secondary font-bold text-[13px] tracking-wide mt-0.5">
              03
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#092258]">
                Compensation details
              </h2>
              <p className="text-slate-400 text-[14px] mt-0.5">
                Enter values from your records. We do not calculate tax
                liability.
              </p>
            </div>
          </div>

          {/* Row 1: Box 1 & Box 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Box 1 – Nonemployee compensation
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  $
                </span>
                <input
                  type="text"
                  value={formData.box1NonemployeeComp}
                  onChange={(e) =>
                    handleInputChange("box1NonemployeeComp", e.target.value)
                  }
                  placeholder=""
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                Box 3 – Excess golden parachute payments
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  $
                </span>
                <input
                  type="text"
                  value={formData.box3ExcessGoldenParachute}
                  onChange={(e) =>
                    handleInputChange(
                      "box3ExcessGoldenParachute",
                      e.target.value,
                    )
                  }
                  placeholder=""
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Box 4 Federal Tax */}
          <div className="sm:w-1/2 sm:pr-2">
            <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
              Box 4 – Federal income tax withheld
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                $
              </span>
              <input
                type="text"
                value={formData.box4FederalTax}
                onChange={(e) =>
                  handleInputChange("box4FederalTax", e.target.value)
                }
                placeholder=""
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
            </div>
          </div>

          {/* Row 3: Box 2 Checkbox Card */}
          <div className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white flex items-center gap-3">
            <input
              type="checkbox"
              id="box2-direct-sales"
              checked={formData.box2DirectSales}
              onChange={(e) =>
                handleInputChange("box2DirectSales", e.target.checked)
              }
              className="w-4 h-4 rounded text-secondary border-slate-300 focus:ring-secondary cursor-pointer"
            />
            <label
              htmlFor="box2-direct-sales"
              className="text-[14px] text-slate-800 font-medium cursor-pointer select-none"
            >
              Box 2 – Payer made direct sales of $5,000 or more
            </label>
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                  State
                </label>
                <div className="relative">
                  <select
                    value={formData.stateReportingState}
                    onChange={(e) =>
                      handleInputChange("stateReportingState", e.target.value)
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
                  State tax withheld
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                    $
                  </span>
                  <input
                    type="text"
                    value={formData.stateTaxWithheld}
                    onChange={(e) =>
                      handleInputChange("stateTaxWithheld", e.target.value)
                    }
                    placeholder=""
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13.5px] font-semibold text-slate-800 mb-1.5">
                  State/Payer's state no.
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                    $
                  </span>
                  <input
                    type="text"
                    value={formData.statePayerNo}
                    onChange={(e) =>
                      handleInputChange("statePayerNo", e.target.value)
                    }
                    placeholder=""
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14.5px] focus:outline-hidden focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
                  />
                </div>
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

export default Nec1099GeneratorForm;
