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
  return out;
}
