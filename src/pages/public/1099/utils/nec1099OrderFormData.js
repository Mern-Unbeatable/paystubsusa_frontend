const ORDER_FORM_KEYS = [
  "payerName",
  "streetAddress",
  "city",
  "state",
  "zipCode",
  "payerTin",
  "accountNumber",
  "recipientName",
  "recipientStreetAddress",
  "recipientCity",
  "recipientState",
  "recipientZipCode",
  "recipientTin",
  "recipientAccountNumber",
  "box1NonemployeeComp",
  "box2DirectSales",
  "box3ExcessGoldenParachute",
  "box4FederalTax",
  "stateReportingState",
  "stateTaxWithheld",
  "statePayerNo",
  "stateIncome",
];

export function toNec1099OrderFormData(formData) {
  const out = {};
  for (const key of ORDER_FORM_KEYS) {
    if (formData[key] === undefined) continue;
    out[key] = formData[key];
  }
  out.taxYear = formData.taxYear ?? new Date().getUTCFullYear() - 1;
  return out;
}
