import React from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import payFrequencyOptions from "../../../../data/generator/payFrequencyOptions.json";
import { formatCurrency } from "../../../utils/formatCurrency";
import StepHeader from "./StepHeader";
import StepNav from "./StepNav";

const PayDetailsStep = ({ form, onBack, onNext }) => {
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
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <StepHeader title="Pay Details" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
            Pay Period Start <span className="text-rose-500">*</span>
          </label>
          <input
            type="date"
            value={formData.payPeriodStart}
            onChange={(e) => updateField("payPeriodStart", e.target.value)}
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
            onChange={(e) => updateField("payPeriodEnd", e.target.value)}
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
              onChange={(e) => updateField("payFrequency", e.target.value)}
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
              onChange={(e) => updateField("hourlyRate", e.target.value)}
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
              onChange={(e) => updateField("regularHours", e.target.value)}
              placeholder="80"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] text-[14px] text-slate-800"
            />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Overtime{" "}
              <span className="text-slate-400 font-normal">Hours (optional)</span>
            </label>
            <input
              type="number"
              value={formData.overtimeHours}
              onChange={(e) => updateField("overtimeHours", e.target.value)}
              placeholder="20"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] text-[14px] text-slate-800"
            />
            <p className="text-[11px] text-slate-400 mt-1">Paid at 1.5×</p>
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
            onChange={(e) => updateField("salaryAmount", e.target.value)}
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
          <div key={earning.id} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={earning.desc}
              onChange={(e) => {
                const val = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  additionalEarnings: prev.additionalEarnings.map((item) =>
                    item.id === earning.id ? { ...item, desc: val } : item,
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
                    additionalEarnings: prev.additionalEarnings.map((item) =>
                      item.id === earning.id ? { ...item, amount: val } : item,
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
          calculation will be available once the tax service is connected.
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
                  onChange={(e) => handleTaxAmountChange(t.id, e.target.value)}
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
                      item.id === d.id ? { ...item, amount: val } : item,
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

      <StepNav onBack={onBack} onNext={onNext} className="pt-4" />
    </div>
  );
};

export default PayDetailsStep;
