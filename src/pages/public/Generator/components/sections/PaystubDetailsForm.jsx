import React, { useState } from "react";
import { ChevronDown, Trash2, Lock } from "lucide-react";
import payFrequencyOptions from "../../../data/generator/payFrequencyOptions.json";
import stepsList from "../../../data/generator/paystubSteps.json";
import US_STATES from "../../../data/shared/usStates.json";
import TemplateDocumentPreview from "../common/TemplateDocumentPreview";
import CompanyLogoField from "../common/CompanyLogoField";
import { formatCurrency } from "../../utils/formatCurrency";
import { PAYSTUB_FORM_STEPS } from "../../utils/paystubFlow";

const PaystubDetailsForm = ({
  template,
  form,
  initialStep = PAYSTUB_FORM_STEPS.EMPLOYER,
  onBackToTemplates,
  onChangeTemplate,
  onContinueToPackage,
}) => {
  const selectedTemplateId = template.id;
  const [currentStep, setStep] = useState(initialStep);
  const setCurrentStep = (step) => {
    setStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openTemplatePicker = () => onChangeTemplate(currentStep);
  const {
    formData,
    setFormData,
    updateField,
    calculations,
    handleAddTax,
    handleRemoveTax,
    handleTaxAmountChange,
    handleAddEarning,
    handleRemoveEarning,
    handleAddDeduction,
    handleRemoveDeduction,
  } = form;

  return (
    <>
      {/* 4-Step Progress Indicator Header */}
      <div className="mb-10 sm:mb-12">
        <div className="grid grid-cols-4 gap-1.5 sm:gap-4 border-b border-slate-200/80 pb-3">
          {stepsList.map((step) => {
            const isActive = currentStep === step.num;
            const isCompleted = currentStep > step.num;

            return (
              <div
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5 pb-2.5 relative cursor-pointer transition-colors min-w-0 ${
                  isActive || isCompleted
                    ? "text-slate-900 font-semibold"
                    : "text-slate-400 font-medium"
                }`}
              >
                <div
                  className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-[12px] font-bold border transition-colors ${
                    isActive || isCompleted
                      ? "border-[#1E60F2] text-[#1E60F2] bg-blue-50/60"
                      : "border-slate-300 text-slate-400 bg-white"
                  }`}
                >
                  {step.num}
                </div>
                <span className="text-[11px] leading-tight text-center sm:text-left sm:text-[14px] sm:truncate">
                  {step.label}
                </span>

                {(isActive || isCompleted) && (
                  <div className="absolute -bottom-3.5 left-0 right-0 h-[2.5px] bg-[#1E60F2]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Form Card */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          {/* Step 1: Employer Information */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in-50 duration-200">
              <div>
                <p className="text-[#1E60F2] font-bold text-[12px] uppercase tracking-wider mb-1">
                  STEP 1 OF 4
                </p>
                <h2 className="text-2xl sm:text-[26px] font-bold text-[#092258]">
                  Employer Information
                </h2>
                <p className="text-slate-400 text-[13px] mt-0.5">
                  Fields marked <span className="text-rose-500">*</span> are
                  required.
                </p>
              </div>

              <CompanyLogoField
                value={formData.companyLogo}
                onChange={(logo) => updateField("companyLogo", logo)}
              />

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  Company / Employer Name{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  placeholder="Enter Your company name"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.companyAddress}
                  onChange={(e) =>
                    updateField("companyAddress", e.target.value)
                  }
                  placeholder="Enter Address"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-6">
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.companyCity}
                    onChange={(e) => updateField("companyCity", e.target.value)}
                    placeholder="City"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    State <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.companyState}
                      onChange={(e) =>
                        updateField("companyState", e.target.value)
                      }
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 bg-white appearance-none cursor-pointer pr-8"
                    >
                      {US_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    ZIP Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.companyZip}
                    onChange={(e) => updateField("companyZip", e.target.value)}
                    placeholder="Zip code"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  Employer Identification Number (EIN){" "}
                  <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.companyEin}
                  onChange={(e) => updateField("companyEin", e.target.value)}
                  placeholder="Employer verification number"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
                />
                <p className="text-[12px] text-slate-400 mt-1">
                  9-digit federal tax ID, where applicable.
                </p>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  Company Phone{" "}
                  <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  type="tel"
                  value={formData.companyPhone ?? ""}
                  onChange={(e) => updateField("companyPhone", e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
                />
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onBackToTemplates}
                  className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-[14px] hover:bg-slate-50 transition"
                >
                  &lt; Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 rounded-lg bg-[#1E60F2] text-white font-semibold text-[14px] shadow-sm hover:bg-[#1550cf] transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue</span>
                  <span>&gt;</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Employee Information */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in-50 duration-200">
              <div>
                <p className="text-[#1E60F2] font-bold text-[12px] uppercase tracking-wider mb-1">
                  STEP 2 OF 4
                </p>
                <h2 className="text-2xl sm:text-[26px] font-bold text-[#092258]">
                  Employee Information
                </h2>
                <p className="text-slate-400 text-[13px] mt-0.5">
                  Fields marked <span className="text-rose-500">*</span> are
                  required.
                </p>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  Employee Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.employeeName}
                  onChange={(e) => updateField("employeeName", e.target.value)}
                  placeholder="jane doe"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.employeeAddress}
                  onChange={(e) =>
                    updateField("employeeAddress", e.target.value)
                  }
                  placeholder="123 main street"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-6">
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.employeeCity}
                    onChange={(e) =>
                      updateField("employeeCity", e.target.value)
                    }
                    placeholder="dhaka"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    State <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.employeeState}
                      onChange={(e) =>
                        updateField("employeeState", e.target.value)
                      }
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 bg-white appearance-none cursor-pointer pr-8"
                    >
                      {US_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    ZIP Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.employeeZip}
                    onChange={(e) => updateField("employeeZip", e.target.value)}
                    placeholder="10001"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  Employee ID{" "}
                  <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => updateField("employeeId", e.target.value)}
                  placeholder="EMP-002"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition"
                />
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-[14px] hover:bg-slate-50 transition"
                >
                  &lt; Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-2.5 rounded-lg bg-[#1E60F2] text-white font-semibold text-[14px] shadow-sm hover:bg-[#1550cf] transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue</span>
                  <span>&gt;</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Pay Details */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div>
                <p className="text-[#1E60F2] font-bold text-[12px] uppercase tracking-wider mb-1">
                  STEP 3 OF 4
                </p>
                <h2 className="text-2xl sm:text-[26px] font-bold text-[#092258]">
                  Pay Details
                </h2>
                <p className="text-slate-400 text-[13px] mt-0.5">
                  Fields marked <span className="text-rose-500">*</span> are
                  required.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Pay Period Start <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.payPeriodStart}
                    onChange={(e) =>
                      updateField("payPeriodStart", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-[#1E60F2] text-[13px] text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Pay Period End <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.payPeriodEnd}
                    onChange={(e) =>
                      updateField("payPeriodEnd", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-[#1E60F2] text-[13px] text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Pay Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.payDate}
                    onChange={(e) => updateField("payDate", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-[#1E60F2] text-[13px] text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Pay Frequency <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.payFrequency}
                      onChange={(e) =>
                        updateField("payFrequency", e.target.value)
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] text-[14px] text-slate-800 bg-white appearance-none cursor-pointer pr-8"
                    >
                      {payFrequencyOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Pay Type <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-lg">
                    <button
                      type="button"
                      onClick={() => updateField("payType", "Hourly")}
                      className={`py-1.5 text-[14px] font-semibold rounded-md transition ${
                        formData.payType === "Hourly"
                          ? "bg-[#009BFB] text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Hourly
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField("payType", "Salary")}
                      className={`py-1.5 text-[14px] font-semibold rounded-md transition ${
                        formData.payType === "Salary"
                          ? "bg-[#009BFB] text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Salary
                    </button>
                  </div>
                </div>
              </div>

              {formData.payType === "Hourly" ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                      Hourly Rate <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) =>
                        updateField("hourlyRate", e.target.value)
                      }
                      placeholder="200"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] text-[14px] text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                      Regular Hours <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.regularHours}
                      onChange={(e) =>
                        updateField("regularHours", e.target.value)
                      }
                      placeholder="80"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] text-[14px] text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                      Overtime{" "}
                      <span className="text-slate-400 font-normal">
                        Hours (optional)
                      </span>
                    </label>
                    <input
                      type="number"
                      value={formData.overtimeHours}
                      onChange={(e) =>
                        updateField("overtimeHours", e.target.value)
                      }
                      placeholder="20"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] text-[14px] text-slate-800"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Paid at 1.5×
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Gross Salary Amount <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.salaryAmount}
                    onChange={(e) =>
                      updateField("salaryAmount", e.target.value)
                    }
                    placeholder="22000"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] text-[14px] text-slate-800"
                  />
                </div>
              )}

              <div className="bg-slate-50/60 rounded-xl p-4 border border-slate-150">
                <h4 className="font-semibold text-slate-800 text-[14px] mb-3">
                  Additional Earnings
                </h4>
                {formData.additionalEarnings.map((earning) => (
                  <div
                    key={earning.id}
                    className="flex items-center gap-2 mb-2"
                  >
                    <input
                      type="text"
                      value={earning.desc}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          additionalEarnings: prev.additionalEarnings.map(
                            (item) =>
                              item.id === earning.id
                                ? { ...item, desc: val }
                                : item,
                          ),
                        }));
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[13px]"
                    />
                    <div className="relative w-28">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[13px]">
                        $
                      </span>
                      <input
                        type="number"
                        value={earning.amount}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            additionalEarnings: prev.additionalEarnings.map(
                              (item) =>
                                item.id === earning.id
                                  ? { ...item, amount: val }
                                  : item,
                            ),
                          }));
                        }}
                        className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-slate-200 bg-white text-[13px]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveEarning(earning.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddEarning}
                  className="text-[13px] font-medium text-[#1E60F2] hover:underline cursor-pointer pt-1"
                >
                  + Add earning (bonus, commission, tips...)
                </button>
              </div>

              <div className="bg-slate-50/60 rounded-xl p-4 border border-slate-150">
                <h4 className="font-semibold text-slate-800 text-[14px] mb-1">
                  Tax Withholdings
                </h4>
                <p className="text-slate-400 text-[12px] mb-3">
                  Enter withholding amounts for this pay period. Automatic tax
                  calculation will be available once the tax service is
                  connected.
                </p>

                <div className="space-y-2 mb-3">
                  {formData.taxes.map((t) => (
                    <div key={t.id} className="flex items-center gap-2">
                      <span className="flex-1 text-[13.5px] text-slate-700 font-medium">
                        {t.label}
                      </span>
                      <div className="relative w-28">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[13px]">
                          $
                        </span>
                        <input
                          type="number"
                          value={t.amount}
                          onChange={(e) =>
                            handleTaxAmountChange(t.id, e.target.value)
                          }
                          className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-slate-200 bg-white text-[13px] text-slate-800 text-right"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveTax(t.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleAddTax}
                  className="text-[13px] font-medium text-[#1E60F2] hover:underline cursor-pointer"
                >
                  + Add tax
                </button>
              </div>

              <div className="bg-slate-50/60 rounded-xl p-4 border border-slate-150">
                <h4 className="font-semibold text-slate-800 text-[14px] mb-2">
                  Other Deductions
                </h4>
                {formData.deductions.map((d) => (
                  <div key={d.id} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={d.desc}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[13px]"
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          deductions: prev.deductions.map((item) =>
                            item.id === d.id ? { ...item, desc: val } : item,
                          ),
                        }));
                      }}
                    />
                    <div className="relative w-28">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[13px]">
                        $
                      </span>
                      <input
                        type="number"
                        value={d.amount}
                        className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-slate-200 bg-white text-[13px]"
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            deductions: prev.deductions.map((item) =>
                              item.id === d.id
                                ? { ...item, amount: val }
                                : item,
                            ),
                          }));
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveDeduction(d.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddDeduction}
                  className="text-[13px] font-medium text-[#1E60F2] hover:underline cursor-pointer"
                >
                  + Add deduction (401(k), health insurance...)
                </button>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center justify-between text-center">
                <div>
                  <p className="text-[11px] text-slate-400 font-semibold uppercase">
                    Gross Pay
                  </p>
                  <p className="font-bold text-slate-900 text-[16px] sm:text-[18px]">
                    {formatCurrency(calculations.totalGross)}
                  </p>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <p className="text-[11px] text-slate-400 font-semibold uppercase">
                    Total Deductions
                  </p>
                  <p className="font-bold text-slate-900 text-[16px] sm:text-[18px]">
                    {formatCurrency(calculations.allDeductions)}
                  </p>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <p className="text-[11px] text-secondary font-semibold uppercase">
                    Net Pay
                  </p>
                  <p className="font-bold text-secondary text-[16px] sm:text-[18px]">
                    {formatCurrency(calculations.netPay)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-[14px] hover:bg-slate-50 transition"
                >
                  &lt; Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-2.5 rounded-lg bg-[#1E60F2] text-white font-semibold text-[14px] shadow-sm hover:bg-[#1550cf] transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue</span>
                  <span>&gt;</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review Paystub */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in-50 duration-200">
              <div>
                <p className="text-[#1E60F2] font-bold text-[12px] uppercase tracking-wider mb-1">
                  STEP 4 OF 4
                </p>
                <h2 className="text-2xl sm:text-[26px] font-bold text-[#092258]">
                  Review Paystub
                </h2>
                <p className="text-slate-400 text-[13px] mt-0.5">
                  Fields marked <span className="text-rose-500">*</span> are
                  required.
                </p>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-blue-50/60 rounded-xl border border-blue-100/80">
                <span className="text-slate-600 text-[14px] font-medium">
                  Selected template
                </span>
                <span className="flex items-center gap-3">
                  <span className="text-slate-900 font-bold text-[14px]">
                    {template.title}
                  </span>
                  <button
                    type="button"
                    onClick={openTemplatePicker}
                    className="text-[#1E60F2] text-[13px] font-medium hover:underline cursor-pointer"
                  >
                    Change
                  </button>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl border border-slate-200/90 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-800 text-[14px]">
                      Employer
                    </h4>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-[#1E60F2] text-[13px] font-semibold hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-[13px] font-medium text-slate-700">
                    {formData.companyName}
                  </p>
                  <p className="text-[12.5px] text-slate-500">
                    {formData.companyAddress}
                  </p>
                  <p className="text-[12.5px] text-slate-500">
                    {formData.companyCity}, {formData.companyState}{" "}
                    {formData.companyZip}
                  </p>
                  <p className="text-[12px] text-slate-400 mt-1">
                    EIN {formData.companyEin}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200/90 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-800 text-[14px]">
                      Employee
                    </h4>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-[#1E60F2] text-[13px] font-semibold hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-[13px] font-medium text-slate-700">
                    {formData.employeeName}
                  </p>
                  <p className="text-[12.5px] text-slate-500">
                    {formData.employeeAddress}
                  </p>
                  <p className="text-[12.5px] text-slate-500">
                    {formData.employeeCity}, {formData.employeeState}{" "}
                    {formData.employeeZip}
                  </p>
                  <p className="text-[12px] text-slate-400 mt-1">
                    ID {formData.employeeId}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200/90 bg-white">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-slate-800 text-[14px]">
                    Pay Period
                  </h4>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-[#1E60F2] text-[13px] font-semibold hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-[13px] text-slate-700">
                  {formData.payPeriodStart} → {formData.payPeriodEnd}
                </p>
                <p className="text-[12.5px] text-slate-500">
                  Pay date {formData.payDate} • {formData.payFrequency}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl border border-slate-200/90 bg-white">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="font-bold text-slate-800 text-[14px]">
                      Earnings
                    </h4>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="text-[#1E60F2] text-[13px] font-semibold hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-[13px] text-slate-600">
                    Gross pay {formatCurrency(calculations.totalGross)}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200/90 bg-white">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="font-bold text-slate-800 text-[14px]">
                      Deductions
                    </h4>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="text-[#1E60F2] text-[13px] font-semibold hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-[12.5px] text-slate-600">
                    Taxes {formatCurrency(calculations.totalTaxes)}
                  </p>
                  <p className="text-[12.5px] text-slate-600">
                    Other {formatCurrency(calculations.totalDeductions)}
                  </p>
                </div>
              </div>

              {/* Dark Navy Review Net Pay Callout Banner */}
              <div className="bg-[#092258] text-white rounded-xl p-4 sm:p-5 flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-[12px] font-medium">
                    Gross {formatCurrency(calculations.totalGross)}
                  </p>
                  <p className="font-bold text-lg sm:text-xl">Net Pay</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-2xl sm:text-3xl text-white">
                    {formatCurrency(calculations.netPay)}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-[14px] hover:bg-slate-50 transition"
                >
                  &lt; Back
                </button>
                <button
                  type="button"
                  onClick={onContinueToPackage}
                  className="px-7 py-3 rounded-lg bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-[15px] shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue to Checkout</span>
                  <span>&gt;</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: The Sticky Live Preview */}
        <div className="lg:col-span-6 sticky top-32">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[14px] font-bold text-slate-800">
              Live Preview • Template {selectedTemplateId}
            </span>
            <button
              type="button"
              onClick={openTemplatePicker}
              className="text-[13px] font-medium text-secondary hover:text-blue-200 hover:underline transition cursor-pointer"
            >
              Change Template
            </button>
          </div>

          <TemplateDocumentPreview
            template={template}
            formData={formData}
            calculations={calculations}
          />

          <div className="flex items-center gap-1.5 mt-2.5 text-slate-400 text-[12px]">
            <Lock className="w-3.5 h-3.5" />
            <span>Your final document is available after checkout.</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaystubDetailsForm;
