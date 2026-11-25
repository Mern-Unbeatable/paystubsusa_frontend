import React from "react";

const ERROR_RING =
  "border-rose-500 focus:border-rose-500 focus:ring-rose-200/50 ring-1 ring-rose-200";

/** Appends red error styles when the field failed validation. */
export function fieldClassName(base, hasError) {
  return hasError ? `${base} ${ERROR_RING}` : base;
}

export function FieldError({ errors, name }) {
  const value = errors?.[name];
  if (!value) return null;
  // Accept full messages ("… is required" / "Enter a valid…") or plain labels.
  const message = /required|valid|must be/i.test(value)
    ? value
    : `${value} is required`;
  return (
    <p className="text-[12px] text-rose-500 mt-1.5" role="alert">
      {message}
    </p>
  );
}

export function toFieldErrorMap(missingFields) {
  return Object.fromEntries(
    missingFields.map((f) => [f.key, f.message ?? `${f.label} is required`]),
  );
}
