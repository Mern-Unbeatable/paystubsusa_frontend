import { API_ENDPOINTS } from "../../../../api/endpoints";
import { httpClient } from "../../../../api/httpClient";

/** Search matches the sender's name, email or the subject. */
export async function listContactMessagesApi(
  { q, status, page, pageSize },
  options = {},
) {
  const params = { page, pageSize };
  if (q) params.q = q;
  if (status) params.status = status;

  const response = await httpClient.get(API_ENDPOINTS.ADMIN.CONTACT_MESSAGES, {
    ...options,
    params,
  });
  return {
    messages: response.data?.data ?? [],
    meta: response.data?.meta ?? {
      page,
      pageSize,
      totalItems: 0,
      totalPages: 0,
    },
  };
}

/** Logs a message received another way (phone, email); no notification email is sent. */
export async function createContactMessageApi(body, options = {}) {
  const response = await httpClient.post(
    API_ENDPOINTS.ADMIN.CONTACT_MESSAGES,
    body,
    options,
  );
  return { message: response.data?.data ?? null };
}

/** `changes` may hold name, email, subject, message and/or status ("new" | "handled"). */
export async function updateContactMessageApi({ id, changes }, options = {}) {
  const response = await httpClient.patch(
    API_ENDPOINTS.ADMIN.CONTACT_MESSAGE(id),
    changes,
    options,
  );
  return { message: response.data?.data ?? null };
}

export async function deleteContactMessageApi(id, options = {}) {
  await httpClient.delete(API_ENDPOINTS.ADMIN.CONTACT_MESSAGE(id), options);
  return { id };
}
