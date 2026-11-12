import React, { useState } from "react";
import {
  DEFAULT_PAYSTUB_THEME,
  THEME_FONTS,
} from "../../../../public/Generator/utils/paystubTheme";
import { inputClass, inputState } from "../utils/templateFormat";
import { Field } from "./TemplateFormFields";

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

/** Native picker plus a HEX input; only valid 6-digit HEX values reach `onChange`. */
export const ColorField = ({ id, label, hint, value, onChange, disabled }) => {
  const [draft, setDraft] = useState(value);
  const [synced, setSynced] = useState(value);
  if (value !== synced) {
    setSynced(value);
    setDraft(value);
  }
  const valid = HEX_COLOR.test(draft);

  const commit = (next) => {
    setDraft(next);
    if (HEX_COLOR.test(next)) onChange(next.toUpperCase());
  };

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div
        className={`mt-1.5 flex h-10 items-center gap-2 rounded-xl border bg-white px-1.5 transition focus-within:ring-2 ${
          valid
            ? "border-slate-200 focus-within:border-secondary focus-within:ring-secondary/20"
            : "border-rose-300 focus-within:ring-rose-100"
        } ${disabled ? "bg-slate-50 opacity-70" : ""}`}
      >
        <input
          type="color"
          value={valid ? draft.toLowerCase() : value.toLowerCase()}
          onChange={(event) => commit(event.target.value)}
          disabled={disabled}
          aria-label={`${label} colour picker`}
          className="h-7 w-8 shrink-0 cursor-pointer rounded-md border-0 bg-transparent p-0 disabled:cursor-not-allowed"
        />
        <input
          id={id}
          value={draft}
          onChange={(event) => commit(event.target.value.trim())}
          onBlur={() => !valid && setDraft(value)}
          disabled={disabled}
          maxLength={7}
          spellCheck={false}
          aria-invalid={!valid}
          aria-describedby={valid ? undefined : `${id}-error`}
          className="min-w-0 flex-1 bg-transparent font-mono text-sm uppercase text-slate-800 outline-none disabled:cursor-not-allowed"
        />
      </div>
      {valid ? (
        hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>
      ) : (
        <p
          id={`${id}-error`}
          className="mt-1 text-xs font-medium text-rose-600"
        >
          Use a 6-digit HEX colour like #1E60F2.
        </p>
      )}
    </div>
  );
};

export const RangeField = ({
  id,
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
  disabled,
}) => (
  <div>
    <div className="flex items-center justify-between gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-600">
        {format(value)}
      </span>
    </div>
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      disabled={disabled}
      className="mt-2 w-full cursor-pointer accent-secondary disabled:cursor-not-allowed disabled:opacity-60"
    />
  </div>
);

const COLOR_FIELDS = [
  ["primaryColor", "Primary", "Dark headers, net pay and tables"],
  ["accentColor", "Accent", "Blue headers, lines and tables"],
  ["tintColor", "Table tint", "Light-blue table headers"],
  ["backgroundColor", "Background", "Document page"],
  ["headingColor", "Headings", "Names and totals"],
  ["textColor", "Body text", "Rows and details"],
  ["borderColor", "Borders", "Boxes and dividers"],
];

const useThemeProps = (form) => ({
  theme: form.theme ?? DEFAULT_PAYSTUB_THEME,
  disabled: form.layoutLocked || form.submitting,
  update: form.setThemeValue,
});

export const ColorControls = ({ form }) => {
  const { theme, disabled, update } = useThemeProps(form);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {COLOR_FIELDS.map(([key, label, hint]) => (
        <ColorField
          key={key}
          id={`theme-${key}`}
          label={label}
          hint={hint}
          value={theme[key]}
          onChange={(value) => update(key, value)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export const TypographyControls = ({ form }) => {
  const { theme, disabled, update } = useThemeProps(form);
  return (
    <div className="space-y-4">
      <Field
        id="theme-fontFamily"
        label="Font family"
        hint="System fonts, so documents look the same offline and in PDFs."
      >
        <select
          id="theme-fontFamily"
          value={theme.fontFamily}
          onChange={(event) => update("fontFamily", event.target.value)}
          disabled={disabled}
          className={`${inputClass} ${inputState(false)} cursor-pointer bg-white`}
        >
          {Object.entries(THEME_FONTS).map(([value, { label }]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Field>
      <RangeField
        id="theme-fontScale"
        label="Text size"
        value={theme.fontScale}
        min={0.8}
        max={1.3}
        step={0.05}
        format={(v) => `${Math.round(v * 100)}%`}
        onChange={(v) => update("fontScale", v)}
        disabled={disabled}
      />
      <RangeField
        id="theme-lineHeight"
        label="Line height"
        value={theme.lineHeight}
        min={1}
        max={1.8}
        step={0.05}
        format={(v) => v.toFixed(2)}
        onChange={(v) => update("lineHeight", v)}
        disabled={disabled}
      />
      <RangeField
        id="theme-letterSpacing"
        label="Letter spacing"
        value={theme.letterSpacing}
        min={-0.05}
        max={0.2}
        step={0.01}
        format={(v) => `${v.toFixed(2)}em`}
        onChange={(v) => update("letterSpacing", v)}
        disabled={disabled}
      />
    </div>
  );
};

export const SpacingControls = ({ form }) => {
  const { theme, disabled, update } = useThemeProps(form);
  const px = (v) => `${v}px`;
  return (
    <div className="space-y-4">
      <RangeField
        id="theme-pagePadding"
        label="Page padding"
        value={theme.pagePadding}
        min={0}
        max={48}
        step={2}
        format={px}
        onChange={(v) => update("pagePadding", v)}
        disabled={disabled}
      />
      <RangeField
        id="theme-sectionSpacing"
        label="Section spacing"
        value={theme.sectionSpacing}
        min={0}
        max={32}
        step={1}
        format={px}
        onChange={(v) => update("sectionSpacing", v)}
        disabled={disabled}
      />
      <RangeField
        id="theme-borderRadius"
        label="Corner radius"
        value={theme.borderRadius}
        min={0}
        max={16}
        step={1}
        format={px}
        onChange={(v) => update("borderRadius", v)}
        disabled={disabled}
      />
    </div>
  );
};
