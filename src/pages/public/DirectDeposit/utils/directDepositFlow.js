import STEPS from "../../data/directDeposit/steps.json";
import DirectDepositSlipDocument from "../components/common/DirectDepositSlipDocument";
import { PATHS } from "../../../../config/paths";
import { createPaidFlag } from "../../shared/documentFlow/utils/documentFlow";

/** Everything the shared document-flow pages need to know about the direct deposit slip. */
export const DIRECT_DEPOSIT_FLOW = {
  steps: STEPS,
  paths: {
    form: PATHS.PUBLIC.directDeposit,
    preview: PATHS.PUBLIC.directDepositPreview,
    checkout: PATHS.PUBLIC.directDepositCheckout,
    success: PATHS.PUBLIC.directDepositSuccess,
  },
  paidFlag: createPaidFlag("directDepositGenerator.paid"),
  priceLabel: "$14.99",
  documentLabel: "Direct Deposit Slip",
  orderTitle: "Direct Deposit Slip",
  getOrderSubtitle: (formData) =>
    [formData.employeeName || "Employee", formData.employerName]
      .filter(Boolean)
      .join(" · "),
  getRecipientName: (formData) => formData.employeeName,
  getPdfFileNameParts: (formData) => [
    "Direct-Deposit",
    formData.employeeName,
    formData.depositDate,
  ],
  Document: DirectDepositSlipDocument,
};
