import React from "react";
import { ChevronDown, Plus } from "lucide-react";
import US_STATES from "../../../../data/shared/usStates.json";
import {
  BOX_LABEL_CLASS,
  MONEY_INPUT_CLASS,
  SELECT_CLASS,
} from "../../../utils/formFieldClass";
import StepHeader from "./StepHeader";
import StepNav from "./StepNav";

const MoneyField = ({ label, value, onChange, className = "" }) => (
  <div className={className}>
    <label className={BOX_LABEL_CLASS}>{label}</label>
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
        $
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={MONEY_INPUT_CLASS}
      />
    </div>
  </div>
);

const CompensationStep = ({ formData, updateField, onBack, onNext }) => (
  <div className="space-y-6">
    <StepHeader
      title="Compensation details"
      subtitle="Enter values from your records. We do not calculate tax liability."
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <MoneyField
        label="Box 1 – Nonemployee compensation"
        value={formData.box1NonemployeeComp}
        onChange={(v) => updateField("box1NonemployeeComp", v)}
      />
      <MoneyField
        label="Box 3 – Excess golden parachute payments"
        value={formData.box3ExcessGoldenParachute}
        onChange={(v) => updateField("box3ExcessGoldenParachute", v)}
      />
    </div>

    <MoneyField
      className="sm:w-1/2 sm:pr-2"
      label="Box 4 – Federal income tax withheld"
      value={formData.box4FederalTax}
      onChange={(v) => updateField("box4FederalTax", v)}
    />

    <div className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white flex items-center gap-3">
      <input
        type="checkbox"
        id="box2-direct-sales"
        checked={formData.box2DirectSales}
        onChange={(e) => updateField("box2DirectSales", e.target.checked)}
        className="w-4 h-4 rounded text-secondary border-slate-300 focus:ring-secondary cursor-pointer"
      />
      <label
        htmlFor="box2-direct-sales"
        className="text-[14px] text-slate-800 font-medium cursor-pointer select-none"
      >
        Box 2 – Payer made direct sales of $5,000 or more
      </label>
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
          <label className={BOX_LABEL_CLASS}>State</label>
          <div className="relative">
            <select
              value={formData.stateReportingState}
              onChange={(e) => updateField("stateReportingState", e.target.value)}
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
        <MoneyField
          label="State tax withheld"
          value={formData.stateTaxWithheld}
          onChange={(v) => updateField("stateTaxWithheld", v)}
        />
        <div>
          <label className={BOX_LABEL_CLASS}>State/Payer&apos;s state no.</label>
          <div className="relative">
            <input
              type="text"
              value={formData.statePayerNo}
              onChange={(e) => updateField("statePayerNo", e.target.value)}
              className={MONEY_INPUT_CLASS.replace("pl-8", "px-4")}
            />
          </div>
        </div>
      </div>

      <MoneyField
        className="sm:w-1/3"
        label="State income"
        value={formData.stateIncome}
        onChange={(v) => updateField("stateIncome", v)}
      />
    </div>

    <StepNav onBack={onBack} onNext={onNext} />
  </div>
);

export default CompensationStep;
