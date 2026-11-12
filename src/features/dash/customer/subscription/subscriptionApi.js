import { API_ENDPOINTS } from "../../../../api/endpoints";
import { httpClient } from "../../../../api/httpClient";

export const SUBSCRIPTION_PRODUCT_CODE = "unlimited_monthly";

/** The customer's latest subscription (any status), or null if they never subscribed. */
export async function getMySubscriptionApi(options = {}) {
  const response = await httpClient.get(API_ENDPOINTS.ACCOUNT.SUBSCRIPTION, options);
  return response.data?.data ?? null;
}

/** The Unlimited plan as currently sold; null when it is inactive. */
export async function getSubscriptionPlanApi(options = {}) {
  const response = await httpClient.get(API_ENDPOINTS.CATALOG.PRODUCTS, options);
  return (response.data?.data ?? []).find((p) => p.code === SUBSCRIPTION_PRODUCT_CODE) ?? null;
}

/** Stripe Checkout URL for a new subscription. */
export async function createSubscriptionCheckoutApi() {
  const response = await httpClient.post(API_ENDPOINTS.ACCOUNT.SUBSCRIPTION_CHECKOUT);
  return response.data?.data?.url ?? null;
}

/** Stripe Customer Portal URL to update the card, cancel or resume. */
export async function createSubscriptionPortalApi() {
  const response = await httpClient.post(API_ENDPOINTS.ACCOUNT.SUBSCRIPTION_PORTAL);
  return response.data?.data?.url ?? null;
}
