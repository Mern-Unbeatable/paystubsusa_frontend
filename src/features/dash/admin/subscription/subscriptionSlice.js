import { createSlice } from "@reduxjs/toolkit";
import { cancelSubscription, fetchSubscriptionDetails, fetchSubscriptions } from "./subscriptionThunks";

/** Filters live in the URL query string (see useUrlFilters), not in the store. */
const initialState = {
  subscriptions: [],
  meta: { page: 1, pageSize: 10, totalItems: 0, totalPages: 0 },
  loading: false,
  status: "idle",
  error: null,
  // Only the latest list request may write results; older ones finish late or are aborted.
  requestId: null,
  details: { id: null, subscription: null, loading: false, error: null, requestId: null },
};

const merge = (current, updated) => (current && current.id === updated.id ? { ...current, ...updated } : current);

const adminSubscriptionSlice = createSlice({
  name: "adminSubscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state, action) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.subscriptions = action.payload.subscriptions;
        state.meta = action.payload.meta;
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.loading = false;
        state.status = action.meta.aborted ? "idle" : "failed";
        state.error = action.meta.aborted ? null : action.payload || null;
      })
      .addCase(fetchSubscriptionDetails.pending, (state, action) => {
        const keep = state.details.id === action.meta.arg;
        state.details = {
          id: action.meta.arg,
          subscription: keep ? state.details.subscription : null,
          loading: true,
          error: null,
          requestId: action.meta.requestId,
        };
      })
      .addCase(fetchSubscriptionDetails.fulfilled, (state, action) => {
        if (state.details.requestId !== action.meta.requestId) {
          return;
        }

        state.details.subscription = action.payload.subscription;
        state.details.loading = false;
      })
      .addCase(fetchSubscriptionDetails.rejected, (state, action) => {
        if (state.details.requestId !== action.meta.requestId) {
          return;
        }

        state.details.loading = false;
        state.details.error = action.meta.aborted ? null : action.payload || null;
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        const updated = action.payload?.subscription;
        if (!updated) {
          return;
        }

        state.subscriptions = state.subscriptions.map((s) => merge(s, updated));
        state.details.subscription = merge(state.details.subscription, updated);
      });
  },
});

export const adminSubscriptionReducer = adminSubscriptionSlice.reducer;
