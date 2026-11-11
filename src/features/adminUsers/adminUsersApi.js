import { API_ENDPOINTS } from "../../api/endpoints";
import { httpClient } from "../../api/httpClient";

/** The API lists customers only (never admins) and supports search by name or email. */
export async function listAdminUsersApi(
  { q, status, subscription, emailVerified, sort, page, pageSize },
  options = {},
) {
  const params = { page, pageSize, sort };
  if (q) params.q = q;
  if (status) params.status = status;
  if (subscription) params.subscription = subscription;
  if (emailVerified) params.emailVerified = emailVerified;

  const response = await httpClient.get(API_ENDPOINTS.ADMIN.CUSTOMERS, {
    ...options,
    params,
  });
  return {
    users: response.data?.data ?? [],
    meta: response.data?.meta ?? { page, pageSize, totalItems: 0, totalPages: 0 },
  };
}

/** Customer record plus recent orders, documents and subscription. */
export async function getAdminUserApi(id, options = {}) {
  const response = await httpClient.get(API_ENDPOINTS.ADMIN.CUSTOMER(id), options);
  return response.data?.data ?? null;
}

/** Suspending revokes every session of that customer on the server. */
export async function updateAdminUserStatusApi(id, { status, reason }, options = {}) {
  const body = reason ? { status, reason } : { status };
  const response = await httpClient.patch(
    API_ENDPOINTS.ADMIN.CUSTOMER(id),
    body,
    options,
  );
  return response.data?.data ?? null;
}
