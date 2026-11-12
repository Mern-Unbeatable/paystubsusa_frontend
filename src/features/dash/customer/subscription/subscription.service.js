import {
  createSubscriptionCheckoutApi,
  createSubscriptionPortalApi,
  getMySubscriptionApi,
  getSubscriptionPlanApi,
} from "./subscriptionApi";

export const customerSubscriptionService = {
  async load(options) {
    const [subscription, plan] = await Promise.all([getMySubscriptionApi(options), getSubscriptionPlanApi(options)]);
    return { subscription, plan };
  },
  checkout: createSubscriptionCheckoutApi,
  portal: createSubscriptionPortalApi,
};
