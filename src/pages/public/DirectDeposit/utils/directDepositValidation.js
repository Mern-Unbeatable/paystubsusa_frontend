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

/** Strip spaces/dashes — same normalize as server `bankAccountNumber`. */
export function normalizeAccountNumber(value) {
  return String(value || "").replace(/[\s-]/g, "");
}

const ACCOUNT_NUMBER = /^\d{4,17}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Same rule as server `zip()` — 5 digits or ZIP+4. */
const ZIP = /^\d{5}(-\d{4})?$/;

/** Format digits into `12345` or `12345-6789` while typing. */
export function formatZipInput(value) {
  const digits = String(value || "")
    .replace(/\D/g, "")
    .slice(0, 9);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function isValidZip(value) {
  return ZIP.test(String(value || "").trim());
}

/** Optional contact: email or phone (10–15 digits) when provided. */
export function isValidEmployerContact(value) {
  const v = String(value || "").trim();
  if (!v) return true;
  if (EMAIL.test(v)) return true;
  const digits = v.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

/** All incomplete or invalid required fields (order matches form steps). */
export function findIncompleteDirectDepositFields(formData) {
  const missing = REQUIRED.filter((item) => isBlank(formData[item.key])).map(
    (item) => ({
      ...item,
      field: item.key,
    }),
  );

  const formatted = [];
  if (
    !isBlank(formData.accountNumber) &&
    !ACCOUNT_NUMBER.test(normalizeAccountNumber(formData.accountNumber))
  ) {
    formatted.push({
      key: "accountNumber",
      field: "accountNumber",
      label: "Account number",
      message: "Account number must be 4–17 digits",
      step: DD_FORM_STEPS.DEPOSIT,
    });
  }
  if (!isValidEmployerContact(formData.employerContact)) {
    formatted.push({
      key: "employerContact",
      field: "employerContact",
      label: "Employer contact",
      message: "Enter a valid email or phone number",
      step: DD_FORM_STEPS.EMPLOYER,
    });
  }
  if (!isBlank(formData.zipCode) && !isValidZip(formData.zipCode)) {
    formatted.push({
      key: "zipCode",
      field: "zipCode",
      label: "Employer ZIP",
      message: "Employer ZIP must be a 5-digit ZIP code",
      step: DD_FORM_STEPS.EMPLOYER,
    });
  }
  if (
    !isBlank(formData.employeeZipCode) &&
    !isValidZip(formData.employeeZipCode)
  ) {
    formatted.push({
      key: "employeeZipCode",
      field: "employeeZipCode",
      label: "Employee ZIP",
      message: "Employee ZIP must be a 5-digit ZIP code",
      step: DD_FORM_STEPS.EMPLOYEE,
    });
  }

  return [...missing, ...formatted];
}

/** First incomplete required field, or null. */
export function findIncompleteDirectDepositField(formData) {
  return findIncompleteDirectDepositFields(formData)[0] ?? null;
}
