export const selectAdminPaymentState = (state) => state.adminPayment;

export const selectAdminPayments = (state) => selectAdminPaymentState(state).payments;
export const selectAdminPaymentsMeta = (state) => selectAdminPaymentState(state).meta;
export const selectAdminPaymentsError = (state) => selectAdminPaymentState(state).error;
// "idle" counts as loading so the first render shows skeletons, not "No transactions yet".
export const selectAdminPaymentsLoading = (state) =>
  selectAdminPaymentState(state).loading || selectAdminPaymentState(state).status === "idle";
export const selectAdminPaymentDetails = (state) => selectAdminPaymentState(state).details;
