import React from "react";

/** Checkbox with an optional mixed state, used for row and select-all selection. */
const SelectCheckbox = ({
  checked,
  indeterminate = false,
  onChange,
  label,
  disabled,
}) => (
  <input
    type="checkbox"
    ref={(el) => {
      if (el) el.indeterminate = indeterminate && !checked;
    }}
    checked={checked}
    onChange={onChange}
    disabled={disabled}
    aria-label={label}
    className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-secondary disabled:cursor-not-allowed disabled:opacity-50"
  />
);

export default SelectCheckbox;
