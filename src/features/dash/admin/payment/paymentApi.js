import { API_ENDPOINTS } from "../../../../api/endpoints";
import { httpClient } from "../../../../api/httpClient";

/** Search matches the Stripe payment ID, order number or buyer email. */
export async function listPaymentsApi({ q, status, page, pageSize }, options = {}) {
  const params = { page, pageSize };
  if (q) params.q = q;
  if (status) params.status = status;

  const response = await httpClient.get(API_ENDPOINTS.ADMIN.PAYMENTS, { ...options, params });
  return {
    payments: response.data?.data ?? [],
    meta: response.data?.meta ?? { page, pageSize, totalItems: 0, totalPages: 0 },
  };
}

export async function getPaymentApi(id, options = {}) {
  const response = await httpClient.get(API_ENDPOINTS.ADMIN.PAYMENT(id), options);
  return { payment: response.data?.data ?? null };
}
