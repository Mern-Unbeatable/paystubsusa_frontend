import { createSlice } from "@reduxjs/toolkit";
import { fetchPaymentDetails, fetchPayments } from "./paymentThunks";

/** Filters live in the URL query string (see useUrlFilters), not in the store. */
const initialState = {
  payments: [],
  meta: { page: 1, pageSize: 10, totalItems: 0, totalPages: 0 },
  loading: false,
  status: "idle",
  error: null,
  // Only the latest list request may write results; older ones finish late or are aborted.
  requestId: null,
  details: { id: null, payment: null, loading: false, error: null, requestId: null },
};

const adminPaymentSlice = createSlice({
  name: "adminPayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state, action) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.payments = action.payload.payments;
        state.meta = action.payload.meta;
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.loading = false;
        state.status = action.meta.aborted ? "idle" : "failed";
        state.error = action.meta.aborted ? null : action.payload || null;
      })
      .addCase(fetchPaymentDetails.pending, (state, action) => {
        const keep = state.details.id === action.meta.arg;
        state.details = {
          id: action.meta.arg,
          payment: keep ? state.details.payment : null,
          loading: true,
          error: null,
          requestId: action.meta.requestId,
        };
      })
      .addCase(fetchPaymentDetails.fulfilled, (state, action) => {
        if (state.details.requestId !== action.meta.requestId) {
          return;
        }

        state.details.payment = action.payload.payment;
        state.details.loading = false;
      })
      .addCase(fetchPaymentDetails.rejected, (state, action) => {
        if (state.details.requestId !== action.meta.requestId) {
          return;
        }

        state.details.loading = false;
        state.details.error = action.meta.aborted ? null : action.payload || null;
      });
  },
});

export const adminPaymentReducer = adminPaymentSlice.reducer;
