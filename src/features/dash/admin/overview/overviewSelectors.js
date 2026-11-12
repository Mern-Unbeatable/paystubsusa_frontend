export const selectAdminOverviewState = (state) => state.adminOverview;

export const selectAdminDashboard = (state) => selectAdminOverviewState(state).dashboard;
export const selectAdminDashboardError = (state) => selectAdminOverviewState(state).error;
// "idle" counts as loading so the first render shows skeletons, not zeros.
export const selectAdminDashboardLoading = (state) =>
  selectAdminOverviewState(state).loading || selectAdminOverviewState(state).status === "idle";
