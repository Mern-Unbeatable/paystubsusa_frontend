import { createSlice } from "@reduxjs/toolkit";
import {
  createCheckoutOrder,
  redeemPaystubCredit,
  refreshCheckoutOrder,
  sendCheckoutCode,
  verifyCheckoutCode,
} from "./checkoutThunks";

// In memory only: the guest token must never reach localStorage/sessionStorage.
const initialState = {
  challengeId: null,
  guestToken: null,
  email: null,
  order: null,
  clientSecret: null,
  // Stripe-reported PaymentIntent status; the order itself turns "paid" via the webhook.
  paymentStatus: null,
  // Set while the customer builds a paystub to pay with a credit of the paid order: { entitlementId }.
  credit: null,
  // Paystub created from the last spent credit; the success page shows it instead of the first one.
  lastDocumentId: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    resetCheckout: () => initialState,
    // Drops an unpaid order (e.g. the package changed) but keeps the verified email.
    clearCheckoutOrder: (state) => {
      // Spending a credit keeps the paid order, even when the template changes.
      if (state.credit) return;
      state.order = null;
      state.clientSecret = null;
      state.paymentStatus = null;
      state.lastDocumentId = null;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    startCreditRedeem: (state, action) => {
      state.credit = { entitlementId: action.payload.entitlementId };
    },
    cancelCreditRedeem: (state) => {
      state.credit = null;
    },
    // Picks up a paid order found after a reload (memory state was lost) and spends its next credit.
    resumeCreditOrder: (state, action) => {
      const order = action.payload;
      const entitlement = order.entitlements.find((e) => e.documentType === "paystub" && e.creditsRemaining > 0);
      if (!entitlement) return;
      state.order = order;
      state.clientSecret = null;
      state.paymentStatus = null;
      state.lastDocumentId = null;
      state.credit = { entitlementId: entitlement.id };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendCheckoutCode.fulfilled, (state, action) => {
        state.challengeId = action.payload.challengeId;
      })
      .addCase(verifyCheckoutCode.fulfilled, (state, action) => {
        state.guestToken = action.payload.guestToken;
        state.email = action.payload.email;
        state.challengeId = null;
      })
      .addCase(createCheckoutOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.clientSecret = action.payload.payment?.clientSecret ?? null;
        state.paymentStatus = null;
        state.credit = null;
        state.lastDocumentId = null;
      })
      .addCase(refreshCheckoutOrder.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(redeemPaystubCredit.fulfilled, (state, action) => {
        state.credit = null;
        state.lastDocumentId = action.payload?.document?.id ?? null;
      });
  },
});

export const {
  resetCheckout,
  clearCheckoutOrder,
  setPaymentStatus,
  startCreditRedeem,
  cancelCreditRedeem,
  resumeCreditOrder,
} = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
