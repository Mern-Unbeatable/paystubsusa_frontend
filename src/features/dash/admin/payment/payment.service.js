import { getPaymentApi, listPaymentsApi } from "./paymentApi";

export const paymentService = {
  list: listPaymentsApi,
  getDetails: getPaymentApi,
};
