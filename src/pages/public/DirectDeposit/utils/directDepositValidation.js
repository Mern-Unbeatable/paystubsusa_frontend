import { DD_FORM_STEPS } from "./directDepositFlow";

/** Required fields aligned with checkout / order payload. */
const REQUIRED = [
  { key: "employerName", label: "Employer name", step: DD_FORM_STEPS.EMPLOYER },
  {
    key: "streetAddress",
    label: "Employer street address",
    step: DD_FORM_STEPS.EMPLOYER,
  },
  { key: "city", label: "Employer city", step: DD_FORM_STEPS.EMPLOYER },
  { key: "state", label: "Employer state", step: DD_FORM_STEPS.EMPLOYER },
  { key: "zipCode", label: "Employer ZIP", step: DD_FORM_STEPS.EMPLOYER },
  { key: "employeeName", label: "Employee name", step: DD_FORM_STEPS.EMPLOYEE },
  {
    key: "employeeAddress",
    label: "Employee address",
    step: DD_FORM_STEPS.EMPLOYEE,
  },
  {
    key: "employeeCity",
    label: "Employee city",
    step: DD_FORM_STEPS.EMPLOYEE,
  },
  {
    key: "employeeState",
    label: "Employee state",
    step: DD_FORM_STEPS.EMPLOYEE,
  },
  {
    key: "employeeZipCode",
    label: "Employee ZIP",
    step: DD_FORM_STEPS.EMPLOYEE,
  },
  { key: "depositDate", label: "Deposit date", step: DD_FORM_STEPS.DEPOSIT },
  { key: "bankName", label: "Bank name", step: DD_FORM_STEPS.DEPOSIT },
  {
    key: "accountHolderName",
    label: "Account holder name",
    step: DD_FORM_STEPS.DEPOSIT,
  },
  { key: "accountType", label: "Account type", step: DD_FORM_STEPS.DEPOSIT },
  {
    key: "accountNumber",
    label: "Account number",
    step: DD_FORM_STEPS.DEPOSIT,
  },
  {
    key: "depositAmount",
    label: "Deposit amount",
    step: DD_FORM_STEPS.DEPOSIT,
  },
];

const isBlank = (value) =>
  value === undefined || value === null || String(value).trim() === "";

/** All incomplete required fields (order matches form steps). */
export function findIncompleteDirectDepositFields(formData) {
  return REQUIRED.filter((item) => isBlank(formData[item.key])).map((item) => ({
    ...item,
    field: item.key,
  }));
}

/** First incomplete required field, or null. */
export function findIncompleteDirectDepositField(formData) {
  return findIncompleteDirectDepositFields(formData)[0] ?? null;
}
