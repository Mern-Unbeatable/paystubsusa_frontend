import { API_ENDPOINTS } from "../../../../api/endpoints";
import { httpClient } from "../../../../api/httpClient";

export async function listSystemRecordsApi(
  { table, q, page, pageSize },
  options = {},
) {
  const params = { page, pageSize };
  if (q) params.q = q;

  const response = await httpClient.get(API_ENDPOINTS.ADMIN.SYSTEM_TABLE(table), {
    ...options,
    params,
    headers: {
      ...(options.headers || {}),
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
  });
  const records = response.data?.data;
  const meta = response.data?.meta;
  if (!Array.isArray(records)) {
    throw Object.assign(new Error("Invalid system table response"), {
      status: response.status,
      code: "INVALID_RESPONSE",
      message: "Invalid system table response",
    });
  }
  return {
    records,
    meta: meta ?? {
      page,
      pageSize,
      totalItems: 0,
      totalPages: 0,
    },
  };
}

export async function getSystemRecordApi({ table, id }, options = {}) {
  const response = await httpClient.get(
    API_ENDPOINTS.ADMIN.SYSTEM_RECORD(table, id),
    options,
  );
  return { record: response.data?.data ?? null };
}
