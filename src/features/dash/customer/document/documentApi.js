import { API_ENDPOINTS } from "../../../../api/endpoints";
import { httpClient } from "../../../../api/httpClient";

/** The signed-in customer's documents of paid orders. Search matches title, number, employer or employee. */
export async function listMyDocumentsApi({ q, type, sort, page, pageSize }, options = {}) {
  const params = { page, pageSize, sort };
  if (q) params.q = q;
  if (type) params.type = type;

  const response = await httpClient.get(API_ENDPOINTS.DOCUMENTS.LIST, { ...options, params });
  return {
    documents: response.data?.data ?? [],
    meta: response.data?.meta ?? { page, pageSize, totalItems: 0, totalPages: 0 },
  };
}

/** Short-lived signed URL for a rendered PDF the customer (or the verified guest, via `options.headers`) owns. */
export async function downloadMyDocumentApi(id, options = {}) {
  const response = await httpClient.post(API_ENDPOINTS.DOCUMENTS.DOWNLOAD(id), undefined, options);
  return response.data?.data;
}
