import { API_ENDPOINTS } from "../../../../api/endpoints";
import { httpClient } from "../../../../api/httpClient";

/** Search matches the order number or the buyer's email. */
export async function listOrdersApi({ q, status, documentType, page, pageSize }, options = {}) {
  const params = { page, pageSize };
  if (q) params.q = q;
  if (status) params.status = status;
  if (documentType) params.documentType = documentType;

  const response = await httpClient.get(API_ENDPOINTS.ADMIN.ORDERS, { ...options, params });
  return {
    orders: response.data?.data ?? [],
    meta: response.data?.meta ?? { page, pageSize, totalItems: 0, totalPages: 0 },
  };
}

/** Order with items, documents, payments and the linked account. */
export async function getOrderApi(id, options = {}) {
  const response = await httpClient.get(API_ENDPOINTS.ADMIN.ORDER(id), options);
  return { order: response.data?.data ?? null };
}
