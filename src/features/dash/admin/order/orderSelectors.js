export const selectAdminOrderState = (state) => state.adminOrder;

export const selectAdminOrders = (state) => selectAdminOrderState(state).orders;
export const selectAdminOrdersMeta = (state) => selectAdminOrderState(state).meta;
export const selectAdminOrdersError = (state) => selectAdminOrderState(state).error;
// "idle" counts as loading so the first render shows skeletons, not "No orders yet".
export const selectAdminOrdersLoading = (state) =>
  selectAdminOrderState(state).loading || selectAdminOrderState(state).status === "idle";
export const selectAdminOrderDetails = (state) => selectAdminOrderState(state).details;
