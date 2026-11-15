import { NEC1099_FORM_STEPS } from "./nec1099Flow";

const REQUIRED = [
  { field: "payerName", label: "Payer name", step: NEC1099_FORM_STEPS.PAYER },
  { field: "streetAddress", label: "Payer street address", step: NEC1099_FORM_STEPS.PAYER },
  { field: "city", label: "Payer city", step: NEC1099_FORM_STEPS.PAYER },
  { field: "state", label: "Payer state", step: NEC1099_FORM_STEPS.PAYER },
  { field: "zipCode", label: "Payer ZIP", step: NEC1099_FORM_STEPS.PAYER },
  { field: "payerTin", label: "Payer TIN", step: NEC1099_FORM_STEPS.PAYER },
  { field: "recipientName", label: "Recipient name", step: NEC1099_FORM_STEPS.RECIPIENT },
  { field: "recipientStreetAddress", label: "Recipient address", step: NEC1099_FORM_STEPS.RECIPIENT },
  { field: "recipientCity", label: "Recipient city", step: NEC1099_FORM_STEPS.RECIPIENT },
  { field: "recipientState", label: "Recipient state", step: NEC1099_FORM_STEPS.RECIPIENT },
  { field: "recipientZipCode", label: "Recipient ZIP", step: NEC1099_FORM_STEPS.RECIPIENT },
  { field: "recipientTin", label: "Recipient TIN", step: NEC1099_FORM_STEPS.RECIPIENT },
  { field: "box1NonemployeeComp", label: "Box 1 compensation", step: NEC1099_FORM_STEPS.COMPENSATION },
];

export function findIncompleteNec1099Field(formData) {
  for (const item of REQUIRED) {
    const value = formData[item.field];
    if (value === undefined || value === null || String(value).trim() === "") {
      return item;
    }
  }
  return null;
}
