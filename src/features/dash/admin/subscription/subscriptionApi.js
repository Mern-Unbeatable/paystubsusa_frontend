import { API_ENDPOINTS } from "../../../../api/endpoints";
import { httpClient } from "../../../../api/httpClient";

/** Search matches the customer's name or email, or the Stripe subscription ID. */
export async function listSubscriptionsApi({ q, status, page, pageSize }, options = {}) {
  const params = { page, pageSize };
  if (q) params.q = q;
  if (status) params.status = status;

  const response = await httpClient.get(API_ENDPOINTS.ADMIN.SUBSCRIPTIONS, { ...options, params });
  return {
    subscriptions: response.data?.data ?? [],
    meta: response.data?.meta ?? { page, pageSize, totalItems: 0, totalPages: 0 },
  };
}

export async function getSubscriptionApi(id, options = {}) {
  const response = await httpClient.get(API_ENDPOINTS.ADMIN.SUBSCRIPTION(id), options);
  return { subscription: response.data?.data ?? null };
}

/** Cancels through Stripe: at the end of the paid period, or immediately. */
export async function cancelSubscriptionApi({ id, atPeriodEnd }, options = {}) {
  const response = await httpClient.post(API_ENDPOINTS.ADMIN.SUBSCRIPTION_CANCEL(id), { atPeriodEnd }, options);
  return { subscription: response.data?.data ?? null };
}
