import { NEC1099_FORM_STEPS } from "./nec1099Flow";

/** Required fields aligned with checkout / order payload. */
const REQUIRED = [
  { key: "payerName", label: "Payer name", step: NEC1099_FORM_STEPS.PAYER },
  {
    key: "streetAddress",
    label: "Payer street address",
    step: NEC1099_FORM_STEPS.PAYER,
  },
  { key: "city", label: "Payer city", step: NEC1099_FORM_STEPS.PAYER },
  { key: "state", label: "Payer state", step: NEC1099_FORM_STEPS.PAYER },
  { key: "zipCode", label: "Payer ZIP", step: NEC1099_FORM_STEPS.PAYER },
  { key: "payerTin", label: "Payer TIN", step: NEC1099_FORM_STEPS.PAYER },
  {
    key: "recipientName",
    label: "Recipient name",
    step: NEC1099_FORM_STEPS.RECIPIENT,
  },
  {
    key: "recipientStreetAddress",
    label: "Recipient address",
    step: NEC1099_FORM_STEPS.RECIPIENT,
  },
  {
    key: "recipientCity",
    label: "Recipient city",
    step: NEC1099_FORM_STEPS.RECIPIENT,
  },
  {
    key: "recipientState",
    label: "Recipient state",
    step: NEC1099_FORM_STEPS.RECIPIENT,
  },
  {
    key: "recipientZipCode",
    label: "Recipient ZIP",
    step: NEC1099_FORM_STEPS.RECIPIENT,
  },
  {
    key: "recipientTin",
    label: "Recipient TIN",
    step: NEC1099_FORM_STEPS.RECIPIENT,
  },
  {
    key: "box1NonemployeeComp",
    label: "Box 1 compensation",
    step: NEC1099_FORM_STEPS.COMPENSATION,
  },
];

const isBlank = (value) =>
  value === undefined || value === null || String(value).trim() === "";

/** All incomplete required fields (order matches form steps). */
export function findIncompleteNec1099Fields(formData) {
  return REQUIRED.filter((item) => isBlank(formData[item.key])).map((item) => ({
    ...item,
    field: item.key,
  }));
}

/** First incomplete required field, or null. */
export function findIncompleteNec1099Field(formData) {
  return findIncompleteNec1099Fields(formData)[0] ?? null;
}
