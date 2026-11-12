export const selectAdminSubscriptionState = (state) => state.adminSubscription;

export const selectAdminSubscriptions = (state) => selectAdminSubscriptionState(state).subscriptions;
export const selectAdminSubscriptionsMeta = (state) => selectAdminSubscriptionState(state).meta;
export const selectAdminSubscriptionsError = (state) => selectAdminSubscriptionState(state).error;
// "idle" counts as loading so the first render shows skeletons, not "No subscriptions yet".
export const selectAdminSubscriptionsLoading = (state) =>
  selectAdminSubscriptionState(state).loading || selectAdminSubscriptionState(state).status === "idle";
export const selectAdminSubscriptionDetails = (state) => selectAdminSubscriptionState(state).details;
