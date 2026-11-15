import STEPS from "../../data/directDeposit/steps.json";
import DirectDepositSlipDocument from "../templates/DirectDepositSlipDocument";
import { PATHS } from "../../../../config/paths";

export const DD_FORM_STEPS = {
  EMPLOYER: 1,
  EMPLOYEE: 2,
  DEPOSIT: 3,
  REVIEW: 4,
};

export const DD_PAGE_STEPS = {
  CHECKOUT: 5,
};

export const DIRECT_DEPOSIT_FLOW = {
  steps: STEPS,
  paths: {
    form: PATHS.PUBLIC.directDepositCreate,
    checkout: PATHS.PUBLIC.directDepositCheckout,
    success: PATHS.PUBLIC.directDepositSuccess,
  },
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
