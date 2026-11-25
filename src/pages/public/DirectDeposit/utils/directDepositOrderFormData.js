import {
  formatDisplayDate,
  formatPayPeriodRange,
} from "./directDepositDates";
import { normalizeAccountNumber } from "./directDepositValidation";

const ORDER_FORM_KEYS = [
  "employerName",
  "streetAddress",
  "city",
  "state",
  "zipCode",
  "employerContact",
  "employeeName",
  "employeeAddress",
  "employeeCity",
  "employeeState",
  "employeeZipCode",
  "employeeId",
  "depositDate",
  "payPeriod",
  "paymentReference",
  "bankName",
  "accountHolderName",
  "accountType",
  "accountNumber",
  "depositAmount",
  "paymentDescription",
];

export function toDirectDepositOrderFormData(formData) {
  const out = {};
  for (const key of ORDER_FORM_KEYS) {
    if (formData[key] === undefined) continue;
    out[key] = formData[key];
  }
  // Persist human-readable dates on the order (native pickers store ISO).
  if (out.depositDate !== undefined) {
    out.depositDate = formatDisplayDate(out.depositDate);
  }
  const range = formatPayPeriodRange(
    formData.payPeriodStart,
    formData.payPeriodEnd,
  );
  if (range) out.payPeriod = range;
  else if (out.payPeriod !== undefined) {
    out.payPeriod = String(out.payPeriod);
  }
  if (out.accountNumber !== undefined) {
    out.accountNumber = normalizeAccountNumber(out.accountNumber);
  }
  return out;
}
