import STEPS from "../../data/tax1099/steps.json";
import Nec1099FormDocument from "../templates/Nec1099FormDocument";
import { PATHS } from "../../../../config/paths";

export const NEC1099_FORM_STEPS = {
  PAYER: 1,
  RECIPIENT: 2,
  COMPENSATION: 3,
  REVIEW: 4,
};

export const NEC1099_PAGE_STEPS = {
  CHECKOUT: 5,
};

export const NEC1099_FLOW = {
  steps: STEPS,
  paths: {
    form: PATHS.PUBLIC.nec1099Create,
    checkout: PATHS.PUBLIC.nec1099Checkout,
    success: PATHS.PUBLIC.nec1099Success,
  },
  priceLabel: "$14.99",
  documentLabel: "Form 1099-NEC",
  orderTitle: "Form 1099-NEC · Nonemployee Compensation",
  getOrderSubtitle: (formData) =>
    [formData.recipientName || "Recipient", formData.payerName]
      .filter(Boolean)
      .join(" · "),
  getRecipientName: (formData) => formData.recipientName,
  getPdfFileNameParts: (formData) => [
    "1099-NEC",
    formData.recipientName,
    String(formData.taxYear ?? new Date().getUTCFullYear() - 1),
  ],
  Document: Nec1099FormDocument,
};
