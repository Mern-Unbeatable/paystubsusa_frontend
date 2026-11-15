import React from "react";
import { ChevronDown } from "lucide-react";
import US_STATES from "../../../../data/shared/usStates.json";
import {
  FIELD_CLASS,
  LABEL_CLASS,
  SELECT_CLASS,
} from "../../../utils/formFieldClass";
import StepHeader from "./StepHeader";
import StepNav from "./StepNav";

const EmployerStep = ({ formData, updateField, onNext }) => (
  <div className="space-y-6">
    <StepHeader
      step={1}
      title="Employer information"
      subtitle="Enter the legal details exactly as they should appear."
    />

    <div>
      <label className={LABEL_CLASS}>
        Employer Identification Number (EIN)
      </label>
      <input
        type="text"
        value={formData.ein}
        onChange={(e) => updateField("ein", e.target.value)}
        placeholder="12-3456789"
        className={FIELD_CLASS}
      />
    </div>

    <div>
      <label className={LABEL_CLASS}>Employer Name</label>
      <input
        type="text"
        value={formData.employerName}
        onChange={(e) => updateField("employerName", e.target.value)}
        placeholder="Employee name"
        className={FIELD_CLASS}
      />
    </div>

    <div>
      <label className={LABEL_CLASS}>Street Address</label>
      <input
        type="text"
        value={formData.streetAddress}
        onChange={(e) => updateField("streetAddress", e.target.value)}
        placeholder="Street Address"
        className={FIELD_CLASS}
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
      <div className="sm:col-span-5">
        <label className={LABEL_CLASS}>City</label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => updateField("city", e.target.value)}
          placeholder="City"
          className={FIELD_CLASS}
        />
      </div>

      <div className="sm:col-span-4">
        <label className={LABEL_CLASS}>State</label>
        <div className="relative">
          <select
            value={formData.state}
            onChange={(e) => updateField("state", e.target.value)}
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

      <div className="sm:col-span-3">
        <label className={LABEL_CLASS}>ZIP Code</label>
        <input
          type="text"
          value={formData.zipCode}
          onChange={(e) => updateField("zipCode", e.target.value)}
          placeholder="Zip Code"
          className={FIELD_CLASS}
        />
      </div>
    </div>

    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-[14px] font-semibold text-slate-800">
          Control Number
        </label>
        <span className="text-[13px] text-slate-400 font-normal">Optional</span>
      </div>
      <input
        type="text"
        value={formData.controlNumber}
        onChange={(e) => updateField("controlNumber", e.target.value)}
        placeholder="Control Number"
        className={FIELD_CLASS}
      />
    </div>

    <StepNav onNext={onNext} showBack={false} />
  </div>
);

export default EmployerStep;
