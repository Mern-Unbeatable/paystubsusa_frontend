import {
  createOrderApi,
  downloadDocumentApi,
  getOrderApi,
  sendCheckoutCodeApi,
  verifyCheckoutCodeApi,
} from "./checkoutApi";

export const checkoutService = {
  sendCode: sendCheckoutCodeApi,
  verifyCode: verifyCheckoutCodeApi,
  createOrder: createOrderApi,
  getOrder: getOrderApi,
  downloadDocument: downloadDocumentApi,
};
