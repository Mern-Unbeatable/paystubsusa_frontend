import { API_ENDPOINTS } from "../../../api/endpoints";
import { httpClient } from "../../../api/httpClient";

/** Active templates customers can pick, ordered by sort order; no auth required. */
export async function listPublicTemplatesApi(documentType, options = {}) {
  const response = await httpClient.get(API_ENDPOINTS.CATALOG.TEMPLATES, {
    ...options,
    params: documentType ? { documentType } : undefined,
  });
  return { templates: response.data?.data ?? [] };
}
