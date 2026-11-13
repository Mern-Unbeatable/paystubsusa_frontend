import React from "react";
import {
  ChevronDown,
  Trash2,
  Plus,
  CalendarDays,
  Clock,
  Banknote,
  Landmark,
  Receipt,
  ArrowRight,
} from "lucide-react";
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

      {/* ================= SECTION 1: Dates & Frequency ================= */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <CalendarDays className="w-4 h-4 text-[#1E60F2]" />
          <h3 className="font-semibold text-slate-800 text-[15px]">
            Pay Schedule
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Start Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              value={formData.payPeriodStart}
              onChange={(e) => updateField("payPeriodStart", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-1 focus:ring-[#1E60F2] outline-none text-[14px] text-slate-800 transition"
            />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              End Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              value={formData.payPeriodEnd}
              onChange={(e) => updateField("payPeriodEnd", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-1 focus:ring-[#1E60F2] outline-none text-[14px] text-slate-800 transition"
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
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-1 focus:ring-[#1E60F2] outline-none text-[14px] text-slate-800 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
            Pay Frequency <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.payFrequency}
              onChange={(e) => updateField("payFrequency", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-1 focus:ring-[#1E60F2] outline-none text-[14px] text-slate-800 bg-white appearance-none cursor-pointer pr-10 transition"
            >
              {payFrequencyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ================= SECTION 2: Earnings ================= */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Banknote className="w-4 h-4 text-[#1E60F2]" />
          <h3 className="font-semibold text-slate-800 text-[15px]">
            Compensation
          </h3>
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
            Pay Type <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl max-w-sm">
            <button
              type="button"
              onClick={() => updateField("payType", "Hourly")}
              className={`py-2 text-[14px] font-semibold rounded-lg transition cursor-pointer ${
                formData.payType === "Hourly"
                  ? "bg-white text-[#1E60F2] shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Hourly
            </button>
            <button
              type="button"
              onClick={() => updateField("payType", "Salary")}
              className={`py-2 text-[14px] font-semibold rounded-lg transition cursor-pointer ${
                formData.payType === "Salary"
                  ? "bg-white text-[#1E60F2] shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Salary
            </button>
          </div>
        </div>

        {formData.payType === "Hourly" ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Hourly Rate <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  $
                </span>
                <input
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => updateField("hourlyRate", e.target.value)}
                  placeholder="200"
                  className="w-full pl-7 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-1 focus:ring-[#1E60F2] outline-none text-[14px] text-slate-800 transition"
                />
              </div>
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-1 focus:ring-[#1E60F2] outline-none text-[14px] text-slate-800 transition"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Overtime{" "}
                <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                type="number"
                value={formData.overtimeHours}
                onChange={(e) => updateField("overtimeHours", e.target.value)}
                placeholder="20"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-1 focus:ring-[#1E60F2] outline-none text-[14px] text-slate-800 transition"
              />
              <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Paid at 1.5× rate
              </p>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-top-2 duration-200">
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Gross Salary Amount <span className="text-rose-500">*</span>
            </label>
            <div className="relative max-w-sm">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                $
              </span>
              <input
                type="number"
                value={formData.salaryAmount}
                onChange={(e) => updateField("salaryAmount", e.target.value)}
                placeholder="22000"
                className="w-full pl-7 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-1 focus:ring-[#1E60F2] outline-none text-[14px] text-slate-800 transition"
              />
            </div>
          </div>
        )}

        {/* Additional Earnings */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="font-semibold text-slate-800 text-[14px] mb-3">
            Additional Earnings
          </h4>
          <div className="space-y-3">
            {formData.additionalEarnings.map((earning) => (
              <div
                key={earning.id}
                className="flex items-center gap-2 animate-in fade-in"
              >
                <input
                  type="text"
                  value={earning.desc}
                  placeholder="Description (e.g. Bonus)"
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      additionalEarnings: prev.additionalEarnings.map((item) =>
                        item.id === earning.id ? { ...item, desc: val } : item,
                      ),
                    }));
                  }}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-1 focus:ring-[#1E60F2] outline-none text-[14px] transition"
                />
                <div className="relative w-32">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    value={earning.amount}
                    placeholder="0.00"
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
                    className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-1 focus:ring-[#1E60F2] outline-none text-[14px] transition"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveEarning(earning.id)}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                  aria-label="Remove earning"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddEarning}
            className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1E60F2] hover:text-[#1550cf] transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add earning
          </button>
        </div>
      </div>

      {/* ================= SECTION 3: Taxes & Deductions ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Taxes */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-[#1E60F2]" />
            <div>
              <h3 className="font-semibold text-slate-800 text-[15px]">
                Tax Withholdings
              </h3>
              <p className="text-slate-400 text-[12px] mt-0.5">
                Enter withholding amounts for this pay period.
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {formData.taxes.map((t) => (
              <div key={t.id} className="flex items-center gap-2">
                <span className="flex-1 text-[13.5px] text-slate-700 font-medium truncate">
                  {t.label}
                </span>
                <div className="relative w-28 shrink-0">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    value={t.amount}
                    placeholder="0.00"
                    onChange={(e) =>
                      handleTaxAmountChange(t.id, e.target.value)
                    }
                    className="w-full pl-7 pr-2 py-1.5 rounded-lg border border-slate-200 focus:border-[#1E60F2] focus:ring-1 focus:ring-[#1E60F2] outline-none text-[13px] text-slate-800 text-right transition"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveTax(t.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddTax}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1E60F2] hover:text-[#1550cf] transition cursor-pointer pt-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add tax
          </button>
        </div>

        {/* Deductions */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-[#1E60F2]" />
            <h3 className="font-semibold text-slate-800 text-[15px]">
              Other Deductions
            </h3>
          </div>

          <div className="space-y-2.5">
            {formData.deductions.map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-2 animate-in fade-in"
              >
                <input
                  type="text"
                  value={d.desc}
                  placeholder="Description"
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      deductions: prev.deductions.map((item) =>
                        item.id === d.id ? { ...item, desc: val } : item,
                      ),
                    }));
                  }}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-1 focus:ring-[#1E60F2] outline-none text-[13px] transition min-w-0"
                />
                <div className="relative w-24 shrink-0">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    value={d.amount}
                    placeholder="0.00"
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        deductions: prev.deductions.map((item) =>
                          item.id === d.id ? { ...item, amount: val } : item,
                        ),
                      }));
                    }}
                    className="w-full pl-7 pr-2 py-2 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-1 focus:ring-[#1E60F2] outline-none text-[13px] transition"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveDeduction(d.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddDeduction}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1E60F2] hover:text-[#1550cf] transition cursor-pointer pt-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add deduction
          </button>
        </div>
      </div>

      {/* ================= Totals Bar ================= */}
      <div className="bg-[#092258] rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-auto text-center sm:text-left">
          <p className="text-[12px] text-slate-400 font-semibold uppercase tracking-wider">
            Gross Pay
          </p>
          <p className="font-bold text-white text-xl sm:text-2xl">
            {formatCurrency(calculations.totalGross)}
          </p>
        </div>
        <div className="hidden sm:block h-10 w-px bg-slate-700/50" />
        <div className="w-full sm:w-auto text-center sm:text-left">
          <p className="text-[12px] text-slate-400 font-semibold uppercase tracking-wider">
            Total Deductions
          </p>
          <p className="font-bold text-white text-xl sm:text-2xl">
            {formatCurrency(calculations.allDeductions)}
          </p>
        </div>
        <div className="hidden sm:block h-10 w-px bg-slate-700/50" />
        <div className="w-full sm:w-auto text-center sm:text-right bg-white/10 py-2 px-4 rounded-xl">
          <p className="text-[12px] text-emerald-300 font-bold uppercase tracking-wider flex items-center justify-center sm:justify-end gap-1">
            Net Pay <ArrowRight className="w-3 h-3" />
          </p>
          <p className="font-extrabold text-emerald-400 text-xl sm:text-2xl">
            {formatCurrency(calculations.netPay)}
          </p>
        </div>
      </div>

      <StepNav onBack={onBack} onNext={onNext} className="pt-4" />
    </div>
  );
};

export default PayDetailsStep;
