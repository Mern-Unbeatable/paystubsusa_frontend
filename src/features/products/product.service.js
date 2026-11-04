import { API_ENDPOINTS } from "../../api/endpoints";
import { httpClient } from "../../api/httpClient";

async function listProducts(options = {}) {
  const response = await httpClient.get(API_ENDPOINTS.PRODUCTS.LIST, options);
  return response.data;
}

async function getProductById(productId, options = {}) {
  const response = await httpClient.get(API_ENDPOINTS.PRODUCTS.DETAILS(productId), options);
  return response.data;
}

export const productService = {
  listProducts,
  getProductById,
};

