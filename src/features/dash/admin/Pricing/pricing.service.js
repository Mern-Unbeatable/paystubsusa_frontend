import {
  createProductApi,
  deleteProductApi,
  getProductApi,
  listProductsApi,
  updateProductApi,
} from "./pricingApi";

export const pricingService = {
  list: listProductsApi,
  getDetails: getProductApi,
  create: createProductApi,
  update: updateProductApi,
  remove: deleteProductApi,
};
