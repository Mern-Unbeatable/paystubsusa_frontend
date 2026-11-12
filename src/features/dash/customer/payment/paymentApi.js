import { API_ENDPOINTS } from "../../../../api/endpoints";
import { httpClient } from "../../../../api/httpClient";

/** The signed-in customer's order and subscription payments, newest first. */
export async function listMyPaymentsApi({ status, page, pageSize }, options = {}) {
  const params = { page, pageSize };
  if (status) params.status = status;

  const response = await httpClient.get(API_ENDPOINTS.PAYMENTS.LIST, { ...options, params });
  return {
    payments: response.data?.data ?? [],
    meta: response.data?.meta ?? { page, pageSize, totalItems: 0, totalPages: 0 },
  };
}
