import { API_ENDPOINTS } from "../../../../api/endpoints";
import { httpClient } from "../../../../api/httpClient";

/** One row per email that ordered without an account; search matches the email. */
export async function listGuestBuyersApi(
  { q, sort, page, pageSize },
  options = {},
) {
  const params = { page, pageSize };
  if (q) params.q = q;
  if (sort) params.sort = sort;

  const response = await httpClient.get(API_ENDPOINTS.ADMIN.GUEST_BUYERS, {
    ...options,
    params,
  });
  return {
    guests: response.data?.data ?? [],
    meta: response.data?.meta ?? {
      page,
      pageSize,
      totalItems: 0,
      totalPages: 0,
    },
  };
}
