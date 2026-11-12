import { API_ENDPOINTS } from "../../api/endpoints";
import { httpClient } from "../../api/httpClient";

/** Sends a message to the support inbox (admin "Contact messages"). */
export async function sendContactMessageApi({ name, email, subject, message }) {
  const response = await httpClient.post(API_ENDPOINTS.SUPPORT.CONTACT_MESSAGES, { name, email, subject, message });
  return response.data?.data ?? null;
}
