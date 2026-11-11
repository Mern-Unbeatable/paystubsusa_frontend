import { API_ENDPOINTS } from "../../../../api/endpoints";
import { httpClient } from "../../../../api/httpClient";

/** Paginated templates for admins, including inactive ones and usage counts. */
export async function listTemplatesApi(
  { q, documentType, status, page, pageSize },
  options = {},
) {
  const params = { page, pageSize };
  if (q) params.q = q;
  if (documentType) params.documentType = documentType;
  if (status) params.status = status;

  const response = await httpClient.get(API_ENDPOINTS.ADMIN.TEMPLATES, {
    ...options,
    params,
  });
  return {
    templates: response.data?.data ?? [],
    meta: response.data?.meta ?? { page, pageSize, totalItems: 0, totalPages: 0 },
  };
}

export async function getTemplateApi(id, options = {}) {
  const response = await httpClient.get(API_ENDPOINTS.ADMIN.TEMPLATE(id), options);
  return { template: response.data?.data ?? null };
}

/** The renderer must be one the document bundle implements; the server rejects others. */
export async function createTemplateApi(body, options = {}) {
  const response = await httpClient.post(API_ENDPOINTS.ADMIN.TEMPLATES, body, options);
  return { template: response.data?.data ?? null };
}

/** Only changed fields; the layout is locked once documents were issued with it. */
export async function updateTemplateApi({ id, changes }, options = {}) {
  const response = await httpClient.patch(API_ENDPOINTS.ADMIN.TEMPLATE(id), changes, options);
  return { template: response.data?.data ?? null };
}

/** Also clears the previous default of the same document type server-side. */
export async function setDefaultTemplateApi(id, options = {}) {
  const response = await httpClient.post(API_ENDPOINTS.ADMIN.TEMPLATE_DEFAULT(id), null, options);
  return { template: response.data?.data ?? null };
}

/** 409 when the template is built-in, the default, or used by issued documents. */
export async function deleteTemplateApi(id, options = {}) {
  await httpClient.delete(API_ENDPOINTS.ADMIN.TEMPLATE(id), options);
  return { id };
}

export async function uploadTemplatePreviewApi({ id, file }, options = {}) {
  const body = new FormData();
  body.append("image", file);
  // Overrides the instance's JSON default, which would make axios serialize FormData to JSON.
  const response = await httpClient.put(API_ENDPOINTS.ADMIN.TEMPLATE_PREVIEW(id), body, {
    ...options,
    headers: { ...options.headers, "Content-Type": "multipart/form-data" },
  });
  return { template: response.data?.data ?? null };
}

export async function removeTemplatePreviewApi(id, options = {}) {
  const response = await httpClient.delete(API_ENDPOINTS.ADMIN.TEMPLATE_PREVIEW(id), options);
  return { template: response.data?.data ?? null };
}
