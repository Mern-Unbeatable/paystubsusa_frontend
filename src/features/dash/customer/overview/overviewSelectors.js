export const selectCustomerOverviewState = (state) => state.customerOverview;

export const selectCustomerDashboard = (state) => selectCustomerOverviewState(state).dashboard;
export const selectCustomerDashboardError = (state) => selectCustomerOverviewState(state).error;
// "idle" counts as loading so the first render shows skeletons, not zeros.
export const selectCustomerDashboardLoading = (state) =>
  selectCustomerOverviewState(state).loading || selectCustomerOverviewState(state).status === "idle";
