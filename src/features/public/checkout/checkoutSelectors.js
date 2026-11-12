export const selectCheckout = (state) => state.checkout;

/** Paid per the server, or Stripe confirmed the charge and the webhook is still on its way. */
export const selectCheckoutPaid = (state) =>
  state.checkout.order?.status === "paid" || state.checkout.paymentStatus === "succeeded";
