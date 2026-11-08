import STEPS from "../../data/tax1099/steps.json";
import Nec1099FormDocument from "../components/common/Nec1099FormDocument";
import { PATHS } from "../../../../config/paths";
import { createPaidFlag } from "../../shared/documentFlow/utils/documentFlow";

/** Everything the shared document-flow pages need to know about the 1099-NEC. */
export const NEC1099_FLOW = {
  steps: STEPS,
  paths: {
    form: PATHS.PUBLIC.nec1099,
    preview: PATHS.PUBLIC.nec1099Preview,
    checkout: PATHS.PUBLIC.nec1099Checkout,
    success: PATHS.PUBLIC.nec1099Success,
  },
  paidFlag: createPaidFlag("nec1099Generator.paid"),
  priceLabel: "$14.99",
  documentLabel: "Form 1099-NEC",
  orderTitle: "Form 1099-NEC · Nonemployee Compensation",
  getOrderSubtitle: (formData) =>
    [formData.recipientName || "Recipient", formData.payerName]
      .filter(Boolean)
      .join(" · "),
  getRecipientName: (formData) => formData.recipientName,
  getPdfFileNameParts: (formData) => ["1099-NEC", formData.recipientName],
  Document: Nec1099FormDocument,
};
