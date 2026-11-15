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

const EmployeeStep = ({ formData, updateField, onBack, onNext }) => (
  <div className="space-y-6">
    <StepHeader
      step={2}
      title="Employee information"
      subtitle="Personal information is encrypted and handled securely."
    />

    <div>
      <label className={LABEL_CLASS}>Social Security Number (SSN)</label>
      <input
        type="text"
        value={formData.ssn}
        onChange={(e) => updateField("ssn", e.target.value)}
        placeholder="...-..-...."
        className={FIELD_CLASS}
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
      <div className="sm:col-span-5">
        <label className={LABEL_CLASS}>First Name</label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => updateField("firstName", e.target.value)}
          className={FIELD_CLASS}
        />
      </div>
      <div className="sm:col-span-3">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[14px] font-semibold text-slate-800">
            Middle Initial
          </label>
          <span className="text-[12px] text-slate-400 font-normal">
            Optional
          </span>
        </div>
        <input
          type="text"
          value={formData.middleInitial}
          onChange={(e) => updateField("middleInitial", e.target.value)}
          maxLength={2}
          className={FIELD_CLASS}
        />
      </div>
      <div className="sm:col-span-4">
        <label className={LABEL_CLASS}>Last Name</label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => updateField("lastName", e.target.value)}
          className={FIELD_CLASS}
        />
      </div>
    </div>

    <div>
      <label className={LABEL_CLASS}>Street Address</label>
      <input
        type="text"
        value={formData.employeeAddress}
        onChange={(e) => updateField("employeeAddress", e.target.value)}
        className={FIELD_CLASS}
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
      <div className="sm:col-span-5">
        <label className={LABEL_CLASS}>City</label>
        <input
          type="text"
          value={formData.employeeCity}
          onChange={(e) => updateField("employeeCity", e.target.value)}
          className={FIELD_CLASS}
        />
      </div>

      <div className="sm:col-span-4">
        <label className={LABEL_CLASS}>State</label>
        <div className="relative">
          <select
            value={formData.employeeState}
            onChange={(e) => updateField("employeeState", e.target.value)}
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
          value={formData.employeeZip}
          onChange={(e) => updateField("employeeZip", e.target.value)}
          className={FIELD_CLASS}
        />
      </div>
    </div>

    <StepNav onBack={onBack} onNext={onNext} />
  </div>
);

export default EmployeeStep;
