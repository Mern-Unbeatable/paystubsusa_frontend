export const selectCheckout = (state) => state.checkout;

/** Paystub credits still unused on the current order (pack + additional paystubs), or null. */
export const selectCheckoutCredits = (state) =>
  state.checkout.order?.entitlements?.find((e) => e.documentType === "paystub" && e.creditsRemaining > 0) ?? null;

/** Paid per the server, or Stripe confirmed the charge and the webhook is still on its way. */
export const selectCheckoutPaid = (state) =>
  state.checkout.order?.status === "paid" || state.checkout.paymentStatus === "succeeded";
