import {
  createOrderApi,
  downloadDocumentApi,
  getOrderApi,
  redeemCreditApi,
  sendCheckoutCodeApi,
  verifyCheckoutCodeApi,
} from "./checkoutApi";

export const checkoutService = {
  sendCode: sendCheckoutCodeApi,
  verifyCode: verifyCheckoutCodeApi,
  createOrder: createOrderApi,
  getOrder: getOrderApi,
  redeemCredit: redeemCreditApi,
  downloadDocument: downloadDocumentApi,
};
