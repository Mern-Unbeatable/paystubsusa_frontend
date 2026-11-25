import { W2_FORM_STEPS } from "./w2Flow";

/** Required fields aligned with server `w2FormData` (enough to reach checkout). */
const REQUIRED = [
  { key: "ein", label: "EIN", step: W2_FORM_STEPS.EMPLOYER },
  { key: "employerName", label: "Employer name", step: W2_FORM_STEPS.EMPLOYER },
  { key: "streetAddress", label: "Employer street address", step: W2_FORM_STEPS.EMPLOYER },
  { key: "city", label: "Employer city", step: W2_FORM_STEPS.EMPLOYER },
  { key: "state", label: "Employer state", step: W2_FORM_STEPS.EMPLOYER },
  { key: "zipCode", label: "Employer ZIP", step: W2_FORM_STEPS.EMPLOYER },
  { key: "ssn", label: "SSN", step: W2_FORM_STEPS.EMPLOYEE },
  { key: "firstName", label: "First name", step: W2_FORM_STEPS.EMPLOYEE },
  { key: "lastName", label: "Last name", step: W2_FORM_STEPS.EMPLOYEE },
  { key: "employeeAddress", label: "Employee address", step: W2_FORM_STEPS.EMPLOYEE },
  { key: "employeeCity", label: "Employee city", step: W2_FORM_STEPS.EMPLOYEE },
  { key: "employeeState", label: "Employee state", step: W2_FORM_STEPS.EMPLOYEE },
  { key: "employeeZip", label: "Employee ZIP", step: W2_FORM_STEPS.EMPLOYEE },
  { key: "box1Wages", label: "Box 1 wages", step: W2_FORM_STEPS.WAGES },
  { key: "box2FederalTax", label: "Box 2 federal tax", step: W2_FORM_STEPS.WAGES },
];

const isBlank = (value) =>
  value === undefined || value === null || String(value).trim() === "";

/** All incomplete required fields (order matches form steps). */
export function findIncompleteW2Fields(formData) {
  return REQUIRED.filter((item) => isBlank(formData[item.key])).map((item) => ({
    ...item,
    field: item.key,
  }));
}

/** First incomplete required field, or null. */
export function findIncompleteW2Field(formData) {
  return findIncompleteW2Fields(formData)[0] ?? null;
}

/** Incomplete required fields for a single form step. */
export function findIncompleteW2FieldsForStep(formData, step) {
  return findIncompleteW2Fields(formData).filter((item) => item.step === step);
}
