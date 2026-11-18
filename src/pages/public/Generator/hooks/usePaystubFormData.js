import { useEffect, useMemo, useState } from "react";
import {
  coerceToSteps,
  DEFAULT_STEPS,
  fieldStep,
  flattenSteps,
  toPaystubApiFormData,
} from "../utils/paystubFormShape";

const FORM_DATA_STORAGE_KEY = "paystubGenerator.formData";
/** Durable copy written when the user reaches the review step. */
export const FORM_DATA_LOCAL_STORAGE_KEY = "paystubGenerator.formData.local";

const parseStoredSteps = (raw) => {
  if (raw === null) return null;
  const parsed = JSON.parse(raw);
  return coerceToSteps(parsed?.steps ?? parsed);
};

const readSteps = () => {
  if (typeof window === "undefined") return structuredClone(DEFAULT_STEPS);
  try {
    const fromSession = parseStoredSteps(
      window.sessionStorage.getItem(FORM_DATA_STORAGE_KEY),
    );
    if (fromSession) return fromSession;
    const fromLocal = parseStoredSteps(
      window.localStorage.getItem(FORM_DATA_LOCAL_STORAGE_KEY),
    );
    if (fromLocal) return fromLocal;
    return structuredClone(DEFAULT_STEPS);
  } catch {
    return structuredClone(DEFAULT_STEPS);
  }
};

/** Persist the current step payload to localStorage (review checkpoint). */
export function savePaystubFormDataLocally(stepsOrPayload) {
  const payload =
    stepsOrPayload?.schemaVersion && stepsOrPayload?.steps
      ? stepsOrPayload
      : toPaystubApiFormData(stepsOrPayload);
  window.localStorage.setItem(
    FORM_DATA_LOCAL_STORAGE_KEY,
    JSON.stringify(payload),
  );
  return payload;
}

const sumAmounts = (items) =>
  (items ?? []).reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

/** Accepts payDetails object or flat form fields. */
export const calculatePaystub = (pay) => {
  let regularEarnings = 0;
  let overtimeEarnings = 0;
  let totalGross = 0;

  if (pay.payType === "Hourly") {
    const rate = parseFloat(pay.hourlyRate) || 0;
    const hours = parseFloat(pay.regularHours) || 0;
    const otHours = parseFloat(pay.overtimeHours) || 0;
    regularEarnings = rate * hours;
    overtimeEarnings = rate * 1.5 * otHours;
    totalGross = regularEarnings + overtimeEarnings;
  } else {
    totalGross = parseFloat(pay.salaryAmount) || 0;
    regularEarnings = totalGross;
  }

  totalGross += sumAmounts(pay.additionalEarnings);

  const totalTaxes = sumAmounts(pay.taxes);
  const totalDeductions = sumAmounts(pay.deductions);
  const allDeductions = totalTaxes + totalDeductions;
  const netPay = Math.max(0, totalGross - allDeductions);

  return {
    regularEarnings,
    overtimeEarnings,
    totalGross,
    totalTaxes,
    totalDeductions,
    allDeductions,
    netPay,
  };
};

const REQUIRED_FIELDS = [
  { step: 1, key: "companyName", label: "Company name" },
  { step: 1, key: "companyAddress", label: "Company address" },
  { step: 1, key: "companyCity", label: "Company city" },
  { step: 1, key: "companyState", label: "Company state" },
  { step: 1, key: "companyZip", label: "Company ZIP code" },
  { step: 1, key: "checkSigner", label: "Who signs the check" },
  { step: 2, key: "employeeName", label: "Employee name" },
  { step: 2, key: "exemptions", label: "Exemptions" },
  { step: 2, key: "employeeAddress", label: "Employee address" },
  { step: 2, key: "employeeCity", label: "Employee city" },
  { step: 2, key: "employeeState", label: "Employee state" },
  { step: 2, key: "employeeZip", label: "Employee ZIP code" },
  { step: 3, key: "payPeriodStart", label: "Pay period start" },
  { step: 3, key: "payPeriodEnd", label: "Pay period end" },
  { step: 3, key: "payDate", label: "Pay date" },
  { step: 3, key: "payFrequency", label: "Pay frequency" },
  { step: 3, key: "hourlyRate", label: "Hourly rate", when: (d) => d.payType === "Hourly" },
  { step: 3, key: "regularHours", label: "Regular hours", when: (d) => d.payType === "Hourly" },
  { step: 3, key: "salaryAmount", label: "Gross salary amount", when: (d) => d.payType !== "Hourly" },
];

const toFlatFormData = (formDataOrSteps) => {
  if (formDataOrSteps?.employer) return flattenSteps(formDataOrSteps);
  if (formDataOrSteps?.steps) return flattenSteps(formDataOrSteps.steps);
  return formDataOrSteps;
};

/** All empty required fields as `{ step, key, label }[]`. */
export const findIncompleteFields = (formDataOrSteps) => {
  const flat = toFlatFormData(formDataOrSteps);
  return REQUIRED_FIELDS.filter((f) => {
    if (f.when && !f.when(flat)) return false;
    const value = f.read ? f.read(flat) : flat[f.key];
    return !String(value ?? "").trim();
  });
};

/** Bank fields required when purchasing the Direct Deposit Slip on the package step. */
const DD_BANK_FIELDS = [
  { key: "bankName", label: "Bank name" },
  { key: "accountHolderName", label: "Account holder name" },
  { key: "routingNumber", label: "Routing number" },
  { key: "accountNumber", label: "Account number" },
];

export const findIncompleteDirectDepositFields = (formDataOrSteps) => {
  const flat = toFlatFormData(formDataOrSteps);
  const dd = flat.directDeposit ?? {};
  return DD_BANK_FIELDS.filter(
    (f) => !String(dd[f.key] ?? "").trim(),
  ).map((f) => ({ ...f, step: 5 }));
};

/** First empty required field as `{ step, label }`, or null when the form is complete. */
export const findIncompleteField = (formDataOrSteps) =>
  findIncompleteFields(formDataOrSteps)[0] ?? null;

/** Paystub details shared across every page of the generator flow. */
export function usePaystubFormData() {
  const [steps, setSteps] = useState(readSteps);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(FORM_DATA_STORAGE_KEY, JSON.stringify(steps));
    } catch {
      // Storage can be unavailable; state still works in memory.
    }
  }, [steps]);

  const formData = useMemo(() => flattenSteps(steps), [steps]);
  const calculations = useMemo(() => calculatePaystub(steps.payDetails), [steps.payDetails]);

  const updateField = (field, value) => {
    const step = fieldStep(field);
    if (!step) return;
    setSteps((prev) => ({
      ...prev,
      [step]: { ...prev[step], [field]: value },
    }));
  };

  const updateDirectDeposit = (patch) =>
    setSteps((prev) => ({
      ...prev,
      directDeposit: { ...prev.directDeposit, ...patch },
    }));

  const patchPayDetails = (updater) =>
    setSteps((prev) => ({
      ...prev,
      payDetails: typeof updater === "function" ? updater(prev.payDetails) : { ...prev.payDetails, ...updater },
    }));

  const addRow = (listKey, row) =>
    patchPayDetails((pay) => ({
      ...pay,
      [listKey]: [...pay[listKey], { id: Date.now().toString(), ...row }],
    }));

  const removeRow = (listKey, id) =>
    patchPayDetails((pay) => ({
      ...pay,
      [listKey]: pay[listKey].filter((item) => item.id !== id),
    }));

  return {
    steps,
    formData,
    setFormData: (next) => {
      if (typeof next === "function") {
        setSteps((prev) => coerceToSteps(next(flattenSteps(prev))));
        return;
      }
      setSteps(coerceToSteps(next));
    },
    updateField,
    updateDirectDeposit,
    calculations,
    /** API / encrypt payload — never includes client calculation. */
    toApiFormData: () => toPaystubApiFormData(steps),
    handleAddTax: () => addRow("taxes", { label: "Custom Tax", amount: "0.00" }),
    handleRemoveTax: (id) => removeRow("taxes", id),
    handleTaxAmountChange: (id, amount) =>
      patchPayDetails((pay) => ({
        ...pay,
        taxes: pay.taxes.map((t) => (t.id === id ? { ...t, amount } : t)),
      })),
    handleAddEarning: (desc = "Custom") =>
      addRow("additionalEarnings", {
        desc: desc === "Custom" ? "" : desc,
        amount: "0.00",
      }),
    handleRemoveEarning: (id) => removeRow("additionalEarnings", id),
    handleAddDeduction: () =>
      addRow("deductions", { desc: "401(k) / Insurance", amount: "0.00" }),
    handleRemoveDeduction: (id) => removeRow("deductions", id),
  };
}
