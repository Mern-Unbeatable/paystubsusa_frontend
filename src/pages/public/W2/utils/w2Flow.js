import STEPS from "../../data/w2/steps.json";
import W2FormDocument from "../templates/W2FormDocument";
import { PATHS } from "../../../../config/paths";
import { createPaidFlag } from "../../shared/documentFlow/utils/documentFlow";

/** Steps inside the details form on the create page. */
export const W2_FORM_STEPS = {
  EMPLOYER: 1,
  EMPLOYEE: 2,
  WAGES: 3,
  REVIEW: 4,
};

/** Stepper position of the page that follows the details form. */
export const W2_PAGE_STEPS = {
  CHECKOUT: 5,
};

const getEmployeeName = (formData) =>
  [formData.firstName, formData.lastName].filter(Boolean).join(" ");

/** Everything the shared document-flow pages need to know about the W-2. */
export const W2_FLOW = {
  steps: STEPS,
  paths: {
    form: PATHS.PUBLIC.w2,
    preview: PATHS.PUBLIC.w2,
    checkout: PATHS.PUBLIC.w2Checkout,
    success: PATHS.PUBLIC.w2Success,
  },
  paidFlag: createPaidFlag("w2Generator.paid"),
  priceLabel: "$14.99",
  documentLabel: "Form W-2",
  orderTitle: "Form W-2 · Tax Year 2025",
  getOrderSubtitle: (formData) =>
    [getEmployeeName(formData) || "Employee", formData.employerName]
      .filter(Boolean)
      .join(" · "),
  getRecipientName: getEmployeeName,
  getPdfFileNameParts: (formData) => [
    "W-2",
    formData.firstName,
    formData.lastName,
    "2025",
  ],
  Document: W2FormDocument,
};
