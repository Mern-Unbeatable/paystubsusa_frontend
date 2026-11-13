import { API_ENDPOINTS } from "../../../api/endpoints";
import { httpClient } from "../../../api/httpClient";

// Without a guest token the request falls back to the signed-in user's Bearer token.
export const guestAuth = (guestToken) => (guestToken ? { Authorization: `Guest ${guestToken}` } : {});

/** Emails a 6-digit code ("checkout" or "document_access"). Responds the same whether or not the email is known. */
export async function sendCheckoutCodeApi(email, purpose = "checkout") {
  const response = await httpClient.post(API_ENDPOINTS.VERIFICATIONS.SEND, { email, purpose });
  return response.data?.data;
}

/** Exchanges the code for a short-lived guest token scoped to the verified email. */
export async function verifyCheckoutCodeApi(challengeId, code) {
  const response = await httpClient.post(API_ENDPOINTS.VERIFICATIONS.VERIFY(challengeId), { code });
  return response.data?.data;
}

/** Server prices the items; the response carries the Stripe client secret when payment is due. */
export async function createOrderApi(body, { guestToken, idempotencyKey }) {
  const response = await httpClient.post(API_ENDPOINTS.ORDERS.CREATE, body, {
    headers: { ...guestAuth(guestToken), "Idempotency-Key": idempotencyKey },
  });
  return response.data?.data;
}

/** The buyer's own orders (the server scopes guests to their verified email); resolves to `{ data, meta }`. */
export async function listOrdersApi(params, guestToken) {
  const response = await httpClient.get(API_ENDPOINTS.ORDERS.LIST, { params, headers: guestAuth(guestToken) });
  return response.data;
}

export async function getOrderApi(orderId, guestToken) {
  const response = await httpClient.get(API_ENDPOINTS.ORDERS.DETAILS(orderId), { headers: guestAuth(guestToken) });
  return response.data?.data;
}

/** Spends one paystub credit of a paid order on a new paystub; resolves to `{ document, creditsRemaining }`. */
export async function redeemCreditApi(body, guestToken) {
  const response = await httpClient.post(API_ENDPOINTS.DOCUMENTS.REDEEM_CREDIT, body, { headers: guestAuth(guestToken) });
  return response.data?.data;
}

/** Short-lived signed URL for a rendered PDF. */
export async function downloadDocumentApi(documentId, guestToken) {
  const response = await httpClient.post(API_ENDPOINTS.DOCUMENTS.DOWNLOAD(documentId), undefined, {
    headers: guestAuth(guestToken),
  });
  return response.data?.data;
}
