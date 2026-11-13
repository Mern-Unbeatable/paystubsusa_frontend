import {
  createOrderApi,
  downloadDocumentApi,
  getOrderApi,
  listOrdersApi,
  redeemCreditApi,
  sendCheckoutCodeApi,
  verifyCheckoutCodeApi,
} from "./checkoutApi";

export const checkoutService = {
  sendCode: sendCheckoutCodeApi,
  verifyCode: verifyCheckoutCodeApi,
  createOrder: createOrderApi,
  listOrders: listOrdersApi,
  getOrder: getOrderApi,
  redeemCredit: redeemCreditApi,
  downloadDocument: downloadDocumentApi,
};
