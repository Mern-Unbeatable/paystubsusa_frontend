import { API_ENDPOINTS } from "../../../../api/endpoints";
import { httpClient } from "../../../../api/httpClient";

/** Paginated catalog for admins, including inactive products and usage counts. */
export async function listProductsApi(
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
    products: response.data?.data ?? [],
    meta: response.data?.meta ?? { page, pageSize, totalItems: 0, totalPages: 0 },
  };
}

export async function getProductApi(code, options = {}) {
  const response = await httpClient.get(API_ENDPOINTS.ADMIN.PRODUCT(code), options);
  return { product: response.data?.data ?? null };
}

/** New products are always one-time base packages (the server enforces this). */
export async function createProductApi(body, options = {}) {
  const response = await httpClient.post(API_ENDPOINTS.ADMIN.PRODUCTS, body, options);
  return { product: response.data?.data ?? null };
}

/** Only changed fields; repricing a subscription creates a new Stripe price server-side. */
export async function updateProductApi({ code, changes }, options = {}) {
  const response = await httpClient.patch(
    API_ENDPOINTS.ADMIN.PRODUCT(code),
    changes,
    options,
  );
  return { product: response.data?.data ?? null };
}

/** 409 when the product is a system product or referenced by orders/subscriptions. */
export async function deleteProductApi(code, options = {}) {
  await httpClient.delete(API_ENDPOINTS.ADMIN.PRODUCT(code), options);
  return { code };
}
