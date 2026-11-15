import { DD_FORM_STEPS } from "./directDepositFlow";

const REQUIRED = [
  { field: "employerName", label: "Employer name", step: DD_FORM_STEPS.EMPLOYER },
  { field: "streetAddress", label: "Employer street address", step: DD_FORM_STEPS.EMPLOYER },
  { field: "city", label: "Employer city", step: DD_FORM_STEPS.EMPLOYER },
  { field: "state", label: "Employer state", step: DD_FORM_STEPS.EMPLOYER },
  { field: "zipCode", label: "Employer ZIP", step: DD_FORM_STEPS.EMPLOYER },
  { field: "employeeName", label: "Employee name", step: DD_FORM_STEPS.EMPLOYEE },
  { field: "employeeAddress", label: "Employee address", step: DD_FORM_STEPS.EMPLOYEE },
  { field: "employeeCity", label: "Employee city", step: DD_FORM_STEPS.EMPLOYEE },
  { field: "employeeState", label: "Employee state", step: DD_FORM_STEPS.EMPLOYEE },
  { field: "employeeZipCode", label: "Employee ZIP", step: DD_FORM_STEPS.EMPLOYEE },
  { field: "depositDate", label: "Deposit date", step: DD_FORM_STEPS.DEPOSIT },
  { field: "bankName", label: "Bank name", step: DD_FORM_STEPS.DEPOSIT },
  { field: "accountHolderName", label: "Account holder name", step: DD_FORM_STEPS.DEPOSIT },
  { field: "accountType", label: "Account type", step: DD_FORM_STEPS.DEPOSIT },
  { field: "accountNumber", label: "Account number", step: DD_FORM_STEPS.DEPOSIT },
  { field: "depositAmount", label: "Deposit amount", step: DD_FORM_STEPS.DEPOSIT },
];

export function findIncompleteDirectDepositField(formData) {
  for (const item of REQUIRED) {
    const value = formData[item.field];
    if (value === undefined || value === null || String(value).trim() === "") {
      return item;
    }
  }
  return null;
}
