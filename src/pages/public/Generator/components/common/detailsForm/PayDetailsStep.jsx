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
import SectionCard from "./SectionCard";
import { FieldError, fieldClassName } from "./fieldValidation";

const ADDITIONAL_EARNING_TYPES = [
  "Overtime",
  "Holiday",
  "Vacation",
  "Bonus",
  "Tips",
  "Custom",
];

const dateInputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-1 focus:ring-[#1E60F2] outline-none text-[14px] text-slate-800 transition";
const selectInputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-1 focus:ring-[#1E60F2] outline-none text-[14px] text-slate-800 bg-white appearance-none cursor-pointer pr-10 transition";
const moneyInputClass =
  "w-full pl-7 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-1 focus:ring-[#1E60F2] outline-none text-[14px] text-slate-800 transition";
const plainInputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-1 focus:ring-[#1E60F2] outline-none text-[14px] text-slate-800 transition";
const ddInputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-2 focus:ring-[#1E60F2]/10 outline-none text-[14px] text-slate-800 transition placeholder:text-slate-400";

const PayDetailsStep = ({ form, fieldErrors = {}, onBack, onNext }) => {
  const {
    formData,
    setFormData,
    updateField,
    updateDirectDeposit,
    calculations,
    handleAddTax,
    handleRemoveTax,
    handleTaxAmountChange,
    handleAddEarning,
    handleRemoveEarning,
    handleAddDeduction,
    handleRemoveDeduction,
  } = form;
  const dd = formData.directDeposit ?? {};

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <StepHeader title="Pay Details" />

      {/* ================= SECTION 1: Dates & Frequency ================= */}
      <SectionCard icon={CalendarDays} title="Pay Schedule">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div id="paystub-field-payPeriodStart">
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Start Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              value={formData.payPeriodStart}
              onChange={(e) => updateField("payPeriodStart", e.target.value)}
              aria-invalid={Boolean(fieldErrors.payPeriodStart)}
              className={fieldClassName(dateInputClass, fieldErrors.payPeriodStart)}
            />
            <FieldError errors={fieldErrors} name="payPeriodStart" />
          </div>
          <div id="paystub-field-payPeriodEnd">
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              End Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              value={formData.payPeriodEnd}
              onChange={(e) => updateField("payPeriodEnd", e.target.value)}
              aria-invalid={Boolean(fieldErrors.payPeriodEnd)}
              className={fieldClassName(dateInputClass, fieldErrors.payPeriodEnd)}
            />
            <FieldError errors={fieldErrors} name="payPeriodEnd" />
          </div>
          <div id="paystub-field-payDate">
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Pay Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              value={formData.payDate}
              onChange={(e) => updateField("payDate", e.target.value)}
              aria-invalid={Boolean(fieldErrors.payDate)}
              className={fieldClassName(dateInputClass, fieldErrors.payDate)}
            />
            <FieldError errors={fieldErrors} name="payDate" />
          </div>
        </div>
      </SectionCard>

      {/* ================= SECTION 2: Earnings ================= */}
      <SectionCard icon={Banknote} title="Compensation">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div id="paystub-field-payFrequency">
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Pay Frequency <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.payFrequency}
                onChange={(e) => updateField("payFrequency", e.target.value)}
                aria-invalid={Boolean(fieldErrors.payFrequency)}
                className={fieldClassName(selectInputClass, fieldErrors.payFrequency)}
              >
                {payFrequencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <FieldError errors={fieldErrors} name="payFrequency" />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Pay Type <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl">
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
        </div>

        {formData.payType === "Hourly" ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div id="paystub-field-hourlyRate">
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
                  aria-invalid={Boolean(fieldErrors.hourlyRate)}
                  className={fieldClassName(moneyInputClass, fieldErrors.hourlyRate)}
                />
              </div>
              <FieldError errors={fieldErrors} name="hourlyRate" />
            </div>
            <div id="paystub-field-regularHours">
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                Regular Hours <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                value={formData.regularHours}
                onChange={(e) => updateField("regularHours", e.target.value)}
                placeholder="80"
                aria-invalid={Boolean(fieldErrors.regularHours)}
                className={fieldClassName(plainInputClass, fieldErrors.regularHours)}
              />
              <FieldError errors={fieldErrors} name="regularHours" />
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
          <div
            id="paystub-field-salaryAmount"
            className="animate-in fade-in slide-in-from-top-2 duration-200"
          >
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
                aria-invalid={Boolean(fieldErrors.salaryAmount)}
                className={fieldClassName(moneyInputClass, fieldErrors.salaryAmount)}
              />
            </div>
            <FieldError errors={fieldErrors} name="salaryAmount" />
          </div>
        )}

        {/* Additional Earnings */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="font-semibold text-slate-800 text-[14px] mb-1">
            Add new earning to paystubs
          </h4>
          <p className="text-[12px] text-slate-400 mb-3">
            Choose a type to add a line item for this pay period.
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {ADDITIONAL_EARNING_TYPES.map((type) => {
              const alreadyAdded =
                type !== "Custom" &&
                formData.additionalEarnings.some((e) => e.desc === type);
              return (
                <button
                  key={type}
                  type="button"
                  disabled={alreadyAdded}
                  onClick={() => handleAddEarning(type)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px] font-semibold transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 ${
                    type === "Custom"
                      ? "border-[#1E60F2]/30 bg-blue-50 text-[#1E60F2] hover:bg-blue-100"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  {type}
                </button>
              );
            })}
          </div>

          {formData.additionalEarnings.length > 0 && (
            <div className="space-y-3">
              {formData.additionalEarnings.map((earning) => {
                const isPreset = ADDITIONAL_EARNING_TYPES.includes(earning.desc);
                return (
                  <div
                    key={earning.id}
                    className="flex items-center gap-2 animate-in fade-in"
                  >
                    {isPreset ? (
                      <span className="flex-1 px-3.5 py-2 rounded-xl border border-slate-100 bg-slate-50 text-[14px] font-medium text-slate-700">
                        {earning.desc}
                      </span>
                    ) : (
                      <input
                        type="text"
                        value={earning.desc}
                        placeholder="Custom earning name"
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
                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 focus:border-[#1E60F2] focus:ring-1 focus:ring-[#1E60F2] outline-none text-[14px] transition"
                      />
                    )}
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
                );
              })}
            </div>
          )}
        </div>
      </SectionCard>

      {/* ================= SECTION 3: Taxes & Deductions ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Taxes */}
        <SectionCard icon={Landmark} title="Tax Withholdings">
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
        </SectionCard>

        {/* Deductions */}
        <SectionCard icon={Receipt} title="Other Deductions">
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
        </SectionCard>
      </div>

      {/* ================= Optional Direct Deposit Slip ================= */}
      <SectionCard
        icon={Landmark}
        title="Direct Deposit Slip"
        description="Optional detachable slip on the PDF. Net pay comes from the totals below."
        headerRight={
          <button
            type="button"
            role="switch"
            aria-checked={Boolean(dd.enabled)}
            aria-label="Include direct deposit slip"
            onClick={() => updateDirectDeposit({ enabled: !dd.enabled })}
            className={`inline-flex items-center shrink-0 select-none rounded-xl border p-2 transition cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E60F2]/40 ${
              dd.enabled
                ? "border-[#1E60F2]/30 bg-blue-50 hover:bg-blue-100"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <span
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                dd.enabled ? "bg-[#1E60F2]" : "bg-slate-300"
              }`}
              aria-hidden="true"
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  dd.enabled ? "translate-x-4" : "translate-x-0.5"
                }`}
              />
            </span>
          </button>
        }
      >
        {dd.enabled ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              ["bankName", "Bank name", "e.g. Chase"],
              ["accountHolderName", "Account holder", "Name on the account"],
              ["routingNumber", "Routing number", "9 digits"],
              ["accountNumber", "Account number", "4–17 digits"],
              ["checkNumber", "Check / advice # (optional)", "e.g. 100245"],
            ].map(([key, label, placeholder]) => (
              <div
                key={key}
                id={`paystub-field-${key}`}
                className={key === "checkNumber" ? "sm:col-span-2" : ""}
              >
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  {label}
                  {!label.includes("optional") && <span className="text-rose-500"> *</span>}
                </label>
                <input
                  type="text"
                  value={dd[key] ?? ""}
                  onChange={(e) => updateDirectDeposit({ [key]: e.target.value })}
                  placeholder={placeholder}
                  aria-invalid={Boolean(fieldErrors[key])}
                  className={fieldClassName(ddInputClass, fieldErrors[key])}
                />
                <FieldError errors={fieldErrors} name={key} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[13px] text-slate-500">
            Turn on the switch to add bank details to the PDF.
          </p>
        )}
      </SectionCard>

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
