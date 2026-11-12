import { API_ENDPOINTS } from "../../../../api/endpoints";
import { httpClient } from "../../../../api/httpClient";

/** Counts, subscription, and the 3 latest documents and payments of the signed-in customer. */
export async function getCustomerDashboardApi(options = {}) {
  const response = await httpClient.get(API_ENDPOINTS.ACCOUNT.DASHBOARD, options);
  return { dashboard: response.data?.data ?? null };
}

/** Short-lived signed URL for a rendered PDF the customer owns. */
export async function downloadCustomerDocumentApi(id) {
  const response = await httpClient.post(API_ENDPOINTS.DOCUMENTS.DOWNLOAD(id));
  return response.data?.data;
}
