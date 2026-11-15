import STEPS from "../../data/w2/steps.json";
import W2FormDocument from "../templates/W2FormDocument";
import { PATHS } from "../../../../config/paths";

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

export const W2_FLOW = {
  steps: STEPS,
  paths: {
    form: PATHS.PUBLIC.w2Create,
    // Checkout / success are query phases on the create URL (legacy path redirects remain).
    checkout: PATHS.PUBLIC.w2Checkout,
    success: PATHS.PUBLIC.w2Success,
  },
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
    String(formData.taxYear ?? new Date().getUTCFullYear() - 1),
  ],
  Document: W2FormDocument,
};
