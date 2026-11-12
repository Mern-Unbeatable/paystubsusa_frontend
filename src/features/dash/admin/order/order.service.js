import { getOrderApi, listOrdersApi } from "./orderApi";

export const orderService = {
  list: listOrdersApi,
  getDetails: getOrderApi,
};
