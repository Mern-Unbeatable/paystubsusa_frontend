import { API_ENDPOINTS } from "../../../../api/endpoints";
import { httpClient } from "../../../../api/httpClient";

/** Paginated catalog for admins, including inactive products and usage counts. */
export async function listAdminProductsApi(
  { q, kind, documentType, status, page, pageSize },
  options = {},
) {
  const params = { page, pageSize };
  if (q) params.q = q;
  if (kind) params.kind = kind;
  if (documentType) params.documentType = documentType;
  if (status) params.status = status;

  const response = await httpClient.get(API_ENDPOINTS.ADMIN.PRODUCTS, {
    ...options,
    params,
  });
  return {
    items: response.data?.data ?? [],
    meta: response.data?.meta ?? { page, pageSize, totalItems: 0, totalPages: 0 },
  };
}

export async function getAdminProductApi(code, options = {}) {
  const response = await httpClient.get(API_ENDPOINTS.ADMIN.PRODUCT(code), options);
  return response.data?.data ?? null;
}

/** New products are always one-time base packages (the server enforces this). */
export async function createAdminProductApi(body, options = {}) {
  const response = await httpClient.post(API_ENDPOINTS.ADMIN.PRODUCTS, body, options);
  return response.data?.data ?? null;
}

/** Only changed fields; repricing a subscription creates a new Stripe price server-side. */
export async function updateAdminProductApi(code, body, options = {}) {
  const response = await httpClient.patch(API_ENDPOINTS.ADMIN.PRODUCT(code), body, options);
  return response.data?.data ?? null;
}

/** 409 when the product is a system product or referenced by orders/subscriptions. */
export async function deleteAdminProductApi(code, options = {}) {
  await httpClient.delete(API_ENDPOINTS.ADMIN.PRODUCT(code), options);
}
