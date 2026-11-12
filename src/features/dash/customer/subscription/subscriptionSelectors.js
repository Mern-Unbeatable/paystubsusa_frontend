export const selectCustomerSubscriptionState = (state) => state.customerSubscription;

export const selectMySubscription = (state) => selectCustomerSubscriptionState(state).subscription;
export const selectSubscriptionPlan = (state) => selectCustomerSubscriptionState(state).plan;
export const selectMySubscriptionError = (state) => selectCustomerSubscriptionState(state).error;
// "idle" counts as loading so the first render doesn't flash the "subscribe" offer.
export const selectMySubscriptionLoading = (state) =>
  selectCustomerSubscriptionState(state).loading || selectCustomerSubscriptionState(state).status === "idle";
