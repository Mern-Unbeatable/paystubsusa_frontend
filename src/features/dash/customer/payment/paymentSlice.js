import { createSlice } from "@reduxjs/toolkit";
import { fetchMyPayments } from "./paymentThunks";

/** Filters live in the URL query string (see useUrlFilters), not in the store. */
const initialState = {
  payments: [],
  meta: { page: 1, pageSize: 10, totalItems: 0, totalPages: 0 },
  loading: false,
  status: "idle",
  error: null,
  // Only the latest list request may write results; older ones finish late or are aborted.
  requestId: null,
};

const customerPaymentSlice = createSlice({
  name: "customerPayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyPayments.pending, (state, action) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchMyPayments.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.payments = action.payload.payments;
        state.meta = action.payload.meta;
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(fetchMyPayments.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.loading = false;
        state.status = action.meta.aborted ? "idle" : "failed";
        state.error = action.meta.aborted ? null : action.payload || null;
      });
  },
});

export const customerPaymentReducer = customerPaymentSlice.reducer;
