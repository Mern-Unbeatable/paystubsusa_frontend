import React from "react";
import {
  ChevronDown,
  Plus,
  DollarSign,
  FileText,
  MapPin,
} from "lucide-react";
import US_STATES from "../../../../data/shared/usStates.json";
import {
  BOX_LABEL_CLASS,
  FIELD_CLASS,
  SELECT_CLASS,
} from "../../../utils/formFieldClass";
import { fieldClassName } from "../../../../Generator/components/common/detailsForm/fieldValidation";
import StepHeader from "./StepHeader";
import StepNav from "./StepNav";

const RequiredMark = () => (
  <span className="text-rose-500" aria-hidden="true">
    {" "}
    *
  </span>
);

const MoneyField = ({
  id,
  label,
  value,
  onChange,
  icon: Icon,
  error,
  required = false,
}) => (
  <div id={id}>
    <label className={BOX_LABEL_CLASS}>
      {label}
      {required ? <RequiredMark /> : null}
    </label>
    <div className="relative">
      {Icon ? (
        <Icon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
      ) : (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium z-10">
          $
        </span>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0.00"
        aria-invalid={Boolean(error)}
        className={fieldClassName(`${FIELD_CLASS} pl-10`, error)}
      />
    </div>
    {error && (
      <p className="text-[12px] text-rose-500 mt-1.5" role="alert">
        {error} is required
      </p>
    )}
  </div>
);

const WageTaxStep = ({
  formData,
  fieldErrors = {},
  updateField,
  onBack,
  onNext,
}) => (
  <div className="space-y-6 animate-in fade-in-50 duration-200">
    <StepHeader
      step={3}
      title="Wage & tax information"
      subtitle="Enter values from your records. We do not calculate tax liability."
    />

    {/* ================= Section 1: Federal Wages & Taxes ================= */}
    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="w-4 h-4 text-[#1E60F2]" />
        <h3 className="font-semibold text-slate-800 text-[15px]">
          Federal Wages & Taxes
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MoneyField
          id="w2-field-box1Wages"
          label="Box 1 – Wages, tips, other compensation"
          value={formData.box1Wages}
          onChange={(v) => updateField("box1Wages", v)}
          error={fieldErrors.box1Wages}
          required
        />
        <MoneyField
          id="w2-field-box2FederalTax"
          label="Box 2 – Federal income tax withheld"
          value={formData.box2FederalTax}
          onChange={(v) => updateField("box2FederalTax", v)}
          error={fieldErrors.box2FederalTax}
          required
        />
        <MoneyField
          label="Box 3 – Social Security wages"
          value={formData.box3SocialSecurityWages}
          onChange={(v) => updateField("box3SocialSecurityWages", v)}
        />
        <MoneyField
          label="Box 4 – Social Security tax withheld"
          value={formData.box4SocialSecurityTax}
          onChange={(v) => updateField("box4SocialSecurityTax", v)}
        />
        <MoneyField
          label="Box 5 – Medicare wages and tips"
          value={formData.box5MedicareWages}
          onChange={(v) => updateField("box5MedicareWages", v)}
        />
        <MoneyField
          label="Box 6 – Medicare tax withheld"
          value={formData.box6MedicareTax}
          onChange={(v) => updateField("box6MedicareTax", v)}
        />
      </div>
    </div>

    {/* ================= Section 2: Additional Federal Items ================= */}
    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <FileText className="w-4 h-4 text-[#1E60F2]" />
        <h3 className="font-semibold text-slate-800 text-[15px]">
          Additional Federal Items
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MoneyField
          label="Box 7 – Social Security tips"
          value={formData.box7SocialSecurityTips}
          onChange={(v) => updateField("box7SocialSecurityTips", v)}
        />
        <MoneyField
          label="Box 8 – Allocated tips"
          value={formData.box8AllocatedTips}
          onChange={(v) => updateField("box8AllocatedTips", v)}
        />
        <MoneyField
          label="Box 10 – Dependent care benefits"
          value={formData.box10DependentCare}
          onChange={(v) => updateField("box10DependentCare", v)}
        />
        <MoneyField
          label="Box 11 – Nonqualified plans"
          value={formData.box11NonqualifiedPlans}
          onChange={(v) => updateField("box11NonqualifiedPlans", v)}
        />
      </div>

      {/* Box 13 - Statutory Employee */}
      <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition">
        <input
          type="checkbox"
          id="box13-statutory"
          checked={formData.box13StatutoryEmployee}
          onChange={(e) =>
            updateField("box13StatutoryEmployee", e.target.checked)
          }
          className="w-4 h-4 rounded text-[#1E60F2] border-slate-300 focus:ring-[#1E60F2] cursor-pointer"
        />
        <label
          htmlFor="box13-statutory"
          className="text-[14px] text-slate-800 font-medium cursor-pointer select-none flex-1"
        >
          Box 13 – Statutory employee
        </label>
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Check if applies
        </span>
      </div>

      {/* Box 12 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div>
          <label className={BOX_LABEL_CLASS}>Box 12 – Code</label>
          <input
            type="text"
            value={formData.box12Code}
            onChange={(e) => updateField("box12Code", e.target.value)}
            placeholder="e.g. DD"
            className={FIELD_CLASS}
          />
        </div>
        <MoneyField
          label="Box 12 – Amount"
          value={formData.box12Amount}
          onChange={(v) => updateField("box12Amount", v)}
        />
      </div>
    </div>

    {/* ================= Section 3: State & Local Reporting ================= */}
    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#1E60F2]" />
          <div>
            <h3 className="font-semibold text-slate-800 text-[15px]">
              State & Local Reporting
            </h3>
            <p className="text-[12px] text-slate-400 mt-0.5">
              Add applicable state and local values.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => alert("Additional state reporting added.")}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-[13px] font-semibold transition cursor-pointer w-full sm:w-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Add state</span>
        </button>
      </div>

      <div className="space-y-4 pt-2">
        {/* Box 15-17 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={BOX_LABEL_CLASS}>Box 15 – State</label>
            <div className="relative">
              <select
                value={formData.box15State}
                onChange={(e) => updateField("box15State", e.target.value)}
                className={SELECT_CLASS}
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
            <label className={BOX_LABEL_CLASS}>Box 16 – State wages</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                $
              </span>
              <input
                type="text"
                value={formData.box16StateWages}
                onChange={(e) => updateField("box16StateWages", e.target.value)}
                className={`${FIELD_CLASS} pl-7`}
              />
            </div>
          </div>
          <div>
            <label className={BOX_LABEL_CLASS}>Box 17 – State tax</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                $
              </span>
              <input
                type="text"
                value={formData.box17StateTax}
                onChange={(e) => updateField("box17StateTax", e.target.value)}
                className={`${FIELD_CLASS} pl-7`}
              />
            </div>
          </div>
        </div>

        {/* Box 18-20 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={BOX_LABEL_CLASS}>Box 18 – Local wages</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                $
              </span>
              <input
                type="text"
                value={formData.box18LocalWages}
                onChange={(e) => updateField("box18LocalWages", e.target.value)}
                className={`${FIELD_CLASS} pl-7`}
              />
            </div>
          </div>
          <div>
            <label className={BOX_LABEL_CLASS}>Box 19 – Local tax</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                $
              </span>
              <input
                type="text"
                value={formData.box19LocalTax}
                onChange={(e) => updateField("box19LocalTax", e.target.value)}
                className={`${FIELD_CLASS} pl-7`}
              />
            </div>
          </div>
          <div>
            <label className={BOX_LABEL_CLASS}>Box 20 – Locality</label>
            <input
              type="text"
              value={formData.box20Locality}
              onChange={(e) => updateField("box20Locality", e.target.value)}
              placeholder="e.g. NYC"
              className={FIELD_CLASS}
            />
          </div>
        </div>
      </div>
    </div>

    <StepNav onBack={onBack} onNext={onNext} />
  </div>
);

export default WageTaxStep;
