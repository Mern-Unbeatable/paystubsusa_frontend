import { createSlice } from "@reduxjs/toolkit";
import { createCheckoutOrder, refreshCheckoutOrder, sendCheckoutCode, verifyCheckoutCode } from "./checkoutThunks";

// In memory only: the guest token must never reach localStorage/sessionStorage.
const initialState = {
  challengeId: null,
  guestToken: null,
  email: null,
  order: null,
  clientSecret: null,
  // Stripe-reported PaymentIntent status; the order itself turns "paid" via the webhook.
  paymentStatus: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    resetCheckout: () => initialState,
    // Drops an unpaid order (e.g. the package changed) but keeps the verified email.
    clearCheckoutOrder: (state) => {
      state.order = null;
      state.clientSecret = null;
      state.paymentStatus = null;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
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
      })
      .addCase(refreshCheckoutOrder.fulfilled, (state, action) => {
        state.order = action.payload;
      });
  },
});

export const { resetCheckout, clearCheckoutOrder, setPaymentStatus } = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
