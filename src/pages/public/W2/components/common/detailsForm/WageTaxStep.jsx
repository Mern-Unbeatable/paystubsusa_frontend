import React from "react";
import { ChevronDown, Plus } from "lucide-react";
import US_STATES from "../../../../data/shared/usStates.json";
import {
  BOX_LABEL_CLASS,
  FIELD_CLASS,
  SELECT_CLASS,
} from "../../../utils/formFieldClass";
import StepHeader from "./StepHeader";
import StepNav from "./StepNav";

const MoneyField = ({ label, value, onChange }) => (
  <div>
    <label className={BOX_LABEL_CLASS}>{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="$0.00"
      className={FIELD_CLASS}
    />
  </div>
);

const WageTaxStep = ({ formData, updateField, onBack, onNext }) => (
  <div className="space-y-6">
    <StepHeader
      step={3}
      title="Wage & tax information"
      subtitle="Enter values from your records. We do not calculate tax liability."
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <MoneyField
        label="Box 1 – Wages, tips, other compensation"
        value={formData.box1Wages}
        onChange={(v) => updateField("box1Wages", v)}
      />
      <MoneyField
        label="Box 2 – Federal income tax withheld"
        value={formData.box2FederalTax}
        onChange={(v) => updateField("box2FederalTax", v)}
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

    <div className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white flex items-center gap-3">
      <input
        type="checkbox"
        id="box13-statutory"
        checked={formData.box13StatutoryEmployee}
        onChange={(e) =>
          updateField("box13StatutoryEmployee", e.target.checked)
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

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className={BOX_LABEL_CLASS}>Box 12 – Code</label>
        <input
          type="text"
          value={formData.box12Code}
          onChange={(e) => updateField("box12Code", e.target.value)}
          placeholder="DD"
          className={FIELD_CLASS}
        />
      </div>
      <MoneyField
        label="Box 12 – Amount"
        value={formData.box12Amount}
        onChange={(v) => updateField("box12Amount", v)}
      />
    </div>

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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
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
          <input
            type="text"
            value={formData.box16StateWages}
            onChange={(e) => updateField("box16StateWages", e.target.value)}
            className={FIELD_CLASS}
          />
        </div>
        <div>
          <label className={BOX_LABEL_CLASS}>Box 17 – State tax</label>
          <input
            type="text"
            value={formData.box17StateTax}
            onChange={(e) => updateField("box17StateTax", e.target.value)}
            className={FIELD_CLASS}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={BOX_LABEL_CLASS}>Box 18 – Local wages</label>
          <input
            type="text"
            value={formData.box18LocalWages}
            onChange={(e) => updateField("box18LocalWages", e.target.value)}
            className={FIELD_CLASS}
          />
        </div>
        <div>
          <label className={BOX_LABEL_CLASS}>Box 19 – Local tax</label>
          <input
            type="text"
            value={formData.box19LocalTax}
            onChange={(e) => updateField("box19LocalTax", e.target.value)}
            className={FIELD_CLASS}
          />
        </div>
        <div>
          <label className={BOX_LABEL_CLASS}>Box 20 – Locality</label>
          <input
            type="text"
            value={formData.box20Locality}
            onChange={(e) => updateField("box20Locality", e.target.value)}
            className={FIELD_CLASS}
          />
        </div>
      </div>
    </div>

    <StepNav onBack={onBack} onNext={onNext} />
  </div>
);

export default WageTaxStep;
