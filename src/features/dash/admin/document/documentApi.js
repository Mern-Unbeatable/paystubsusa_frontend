import { API_ENDPOINTS } from "../../../../api/endpoints";
import { httpClient } from "../../../../api/httpClient";

/** Search matches the title, document number, employer or recipient name. */
export async function listDocumentsApi({ q, type, status, sort, page, pageSize }, options = {}) {
  const params = { page, pageSize, sort };
  if (q) params.q = q;
  if (type) params.type = type;
  if (status) params.status = status;

  const response = await httpClient.get(API_ENDPOINTS.ADMIN.DOCUMENTS, { ...options, params });
  return {
    documents: response.data?.data ?? [],
    meta: response.data?.meta ?? { page, pageSize, totalItems: 0, totalPages: 0 },
  };
}

export async function getDocumentApi(id, options = {}) {
  const response = await httpClient.get(API_ENDPOINTS.ADMIN.DOCUMENT(id), options);
  return { document: response.data?.data ?? null };
}

/** Short-lived signed URL (audited server-side). */
export async function downloadDocumentApi(id, options = {}) {
  const response = await httpClient.post(API_ENDPOINTS.ADMIN.DOCUMENT_DOWNLOAD(id), undefined, options);
  return { url: response.data?.data?.url ?? null };
}

/** Queues a re-render from the stored form data. */
export async function regenerateDocumentApi(id, options = {}) {
  await httpClient.post(API_ENDPOINTS.ADMIN.DOCUMENT_REGENERATE(id), undefined, options);
  return { id };
}
