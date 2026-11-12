export const selectCustomerPaymentState = (state) => state.customerPayment;

export const selectMyPayments = (state) => selectCustomerPaymentState(state).payments;
export const selectMyPaymentsMeta = (state) => selectCustomerPaymentState(state).meta;
export const selectMyPaymentsError = (state) => selectCustomerPaymentState(state).error;
// "idle" counts as loading so the first render shows skeletons, not "No payments yet".
export const selectMyPaymentsLoading = (state) =>
  selectCustomerPaymentState(state).loading || selectCustomerPaymentState(state).status === "idle";
