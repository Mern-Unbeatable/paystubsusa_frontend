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

/** Only `{ status: "new" | "handled" }` is accepted; message text can't be edited. */
export async function updateContactMessageApi({ id, changes }, options = {}) {
  const response = await httpClient.patch(
    API_ENDPOINTS.ADMIN.CONTACT_MESSAGE(id),
    changes,
    options,
  );
  return { message: response.data?.data ?? null };
}

/** Emails the reply to the sender and marks the message handled. The key makes a retried send safe. */
export async function replyContactMessageApi(
  { id, message, idempotencyKey },
  options = {},
) {
  const response = await httpClient.post(
    API_ENDPOINTS.ADMIN.CONTACT_MESSAGE_REPLY(id),
    { message },
    { ...options, headers: { "Idempotency-Key": idempotencyKey } },
  );
  return { message: response.data?.data ?? null };
}

export async function deleteContactMessageApi(id, options = {}) {
  await httpClient.delete(API_ENDPOINTS.ADMIN.CONTACT_MESSAGE(id), options);
  return { id };
}
