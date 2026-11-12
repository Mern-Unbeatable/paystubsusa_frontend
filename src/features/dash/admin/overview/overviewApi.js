import { API_ENDPOINTS } from "../../../../api/endpoints";
import { httpClient } from "../../../../api/httpClient";

/** KPIs, monthly revenue, document mix, 5 latest orders and 5 latest audit events. `range` is "12m" or "6m". */
export async function getDashboardApi(range, options = {}) {
  const response = await httpClient.get(API_ENDPOINTS.ADMIN.DASHBOARD, { ...options, params: { range } });
  return { dashboard: response.data?.data ?? null };
}
