import { W2_FORM_STEPS } from "./w2Flow";

/** Required fields aligned with server `w2FormData` (enough to reach checkout). */
const REQUIRED = [
  { field: "ein", label: "EIN", step: W2_FORM_STEPS.EMPLOYER },
  { field: "employerName", label: "Employer name", step: W2_FORM_STEPS.EMPLOYER },
  { field: "streetAddress", label: "Employer street address", step: W2_FORM_STEPS.EMPLOYER },
  { field: "city", label: "Employer city", step: W2_FORM_STEPS.EMPLOYER },
  { field: "state", label: "Employer state", step: W2_FORM_STEPS.EMPLOYER },
  { field: "zipCode", label: "Employer ZIP", step: W2_FORM_STEPS.EMPLOYER },
  { field: "ssn", label: "SSN", step: W2_FORM_STEPS.EMPLOYEE },
  { field: "firstName", label: "First name", step: W2_FORM_STEPS.EMPLOYEE },
  { field: "lastName", label: "Last name", step: W2_FORM_STEPS.EMPLOYEE },
  { field: "employeeAddress", label: "Employee address", step: W2_FORM_STEPS.EMPLOYEE },
  { field: "employeeCity", label: "Employee city", step: W2_FORM_STEPS.EMPLOYEE },
  { field: "employeeState", label: "Employee state", step: W2_FORM_STEPS.EMPLOYEE },
  { field: "employeeZip", label: "Employee ZIP", step: W2_FORM_STEPS.EMPLOYEE },
  { field: "box1Wages", label: "Box 1 wages", step: W2_FORM_STEPS.WAGES },
  { field: "box2FederalTax", label: "Box 2 federal tax", step: W2_FORM_STEPS.WAGES },
];

export function findIncompleteW2Field(formData) {
  for (const item of REQUIRED) {
    const value = formData[item.field];
    if (value === undefined || value === null || String(value).trim() === "") {
      return item;
    }
  }
  return null;
}
