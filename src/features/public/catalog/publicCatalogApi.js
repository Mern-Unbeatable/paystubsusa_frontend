import { API_ENDPOINTS } from "../../../api/endpoints";
import { httpClient } from "../../../api/httpClient";

/** Active products with their current prices, in display order; no auth required. */
export async function listCatalogProductsApi(options = {}) {
  const response = await httpClient.get(API_ENDPOINTS.CATALOG.PRODUCTS, options);
  return { products: response.data?.data ?? [] };
}
