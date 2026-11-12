import { cancelSubscriptionApi, getSubscriptionApi, listSubscriptionsApi } from "./subscriptionApi";

export const subscriptionService = {
  list: listSubscriptionsApi,
  getDetails: getSubscriptionApi,
  cancel: cancelSubscriptionApi,
};
