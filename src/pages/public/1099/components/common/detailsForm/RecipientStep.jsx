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

const RecipientStep = ({ formData, updateField, onBack, onNext }) => (
  <div className="space-y-6">
    <StepHeader
      title="Recipient information"
      subtitle="Personal information is encrypted and handled securely."
    />

    <div>
      <label className={LABEL_CLASS}>Recipient Name</label>
      <input
        type="text"
        value={formData.recipientName}
        onChange={(e) => updateField("recipientName", e.target.value)}
        className={FIELD_CLASS}
      />
    </div>

    <div>
      <label className={LABEL_CLASS}>Street Address</label>
      <input
        type="text"
        value={formData.recipientStreetAddress}
        onChange={(e) => updateField("recipientStreetAddress", e.target.value)}
        className={FIELD_CLASS}
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
      <div className="sm:col-span-5">
        <label className={LABEL_CLASS}>City</label>
        <input
          type="text"
          value={formData.recipientCity}
          onChange={(e) => updateField("recipientCity", e.target.value)}
          className={FIELD_CLASS}
        />
      </div>
      <div className="sm:col-span-4">
        <label className={LABEL_CLASS}>State</label>
        <div className="relative">
          <select
            value={formData.recipientState}
            onChange={(e) => updateField("recipientState", e.target.value)}
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
          value={formData.recipientZipCode}
          onChange={(e) => updateField("recipientZipCode", e.target.value)}
          className={FIELD_CLASS}
        />
      </div>
    </div>

    <div>
      <label className={LABEL_CLASS}>Recipient TIN</label>
      <input
        type="text"
        value={formData.recipientTin}
        onChange={(e) => updateField("recipientTin", e.target.value)}
        placeholder="..-......."
        className={FIELD_CLASS}
      />
    </div>

    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-[14px] font-semibold text-slate-800">
          Account Number
        </label>
        <span className="text-[13px] text-slate-400 font-normal">Optional</span>
      </div>
      <input
        type="text"
        value={formData.recipientAccountNumber}
        onChange={(e) => updateField("recipientAccountNumber", e.target.value)}
        className={FIELD_CLASS}
      />
    </div>

    <StepNav onBack={onBack} onNext={onNext} />
  </div>
);

export default RecipientStep;
