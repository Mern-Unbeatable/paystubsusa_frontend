import React from "react";
import { ChevronDown, Plus, DollarSign, FileText, MapPin } from "lucide-react";
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
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium z-10">
        $
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0.00"
        className={`${FIELD_CLASS} pl-10`}
      />
    </div>
  </div>
);

const CompensationStep = ({ formData, updateField, onBack, onNext }) => (
  <div className="space-y-6 animate-in fade-in-50 duration-200">
    <StepHeader
      title="Compensation details"
      subtitle="Enter values from your records. We do not calculate tax liability."
    />

    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="w-4 h-4 text-[#1E60F2]" />
        <h3 className="font-semibold text-slate-800 text-[15px]">
          Federal Compensation & Tax
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MoneyField
          label="Box 1 – Nonemployee compensation"
          value={formData.box1NonemployeeComp}
          onChange={(v) => updateField("box1NonemployeeComp", v)}
        />
        <MoneyField
          label="Box 4 – Federal income tax withheld"
          value={formData.box4FederalTax}
          onChange={(v) => updateField("box4FederalTax", v)}
        />
      </div>
    </div>

    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <FileText className="w-4 h-4 text-[#1E60F2]" />
        <h3 className="font-semibold text-slate-800 text-[15px]">
          Additional Federal Items
        </h3>
      </div>

      <MoneyField
        label="Box 3 – Excess golden parachute payments"
        value={formData.box3ExcessGoldenParachute}
        onChange={(v) => updateField("box3ExcessGoldenParachute", v)}
      />

      <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition">
        <input
          type="checkbox"
          id="box2-direct-sales"
          checked={formData.box2DirectSales}
          onChange={(e) => updateField("box2DirectSales", e.target.checked)}
          className="w-4 h-4 rounded text-[#1E60F2] border-slate-300 focus:ring-[#1E60F2] cursor-pointer"
        />
        <label
          htmlFor="box2-direct-sales"
          className="text-[14px] text-slate-800 font-medium cursor-pointer select-none flex-1"
        >
          Box 2 – Payer made direct sales of $5,000 or more
        </label>
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Check if applies
        </span>
      </div>
    </div>

    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#1E60F2]" />
          <div>
            <h3 className="font-semibold text-slate-800 text-[15px]">
              State Reporting
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={BOX_LABEL_CLASS}>State</label>
            <div className="relative">
              <select
                value={formData.stateReportingState}
                onChange={(e) =>
                  updateField("stateReportingState", e.target.value)
                }
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
            <label className={BOX_LABEL_CLASS}>
              State/Payer&apos;s state no.
            </label>
            <input
              type="text"
              value={formData.statePayerNo}
              onChange={(e) => updateField("statePayerNo", e.target.value)}
              placeholder="e.g. TX-882109"
              className={FIELD_CLASS}
            />
          </div>
        </div>

        <div className="sm:w-1/3">
          <MoneyField
            label="State income"
            value={formData.stateIncome}
            onChange={(v) => updateField("stateIncome", v)}
          />
        </div>
      </div>
    </div>

    <StepNav onBack={onBack} onNext={onNext} />
  </div>
);

export default CompensationStep;
