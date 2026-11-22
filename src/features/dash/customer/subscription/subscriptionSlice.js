import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { logoutUser } from "../../../auth/authThunks";
import { fetchMySubscription } from "./subscriptionThunks";

const initialState = {
  subscription: null,
  plan: null,
  loading: false,
  status: "idle",
  error: null,
  // Only the latest request may write results; older ones finish late or are aborted.
  requestId: null,
};

const isForceLogout = (action) => action.type === "auth/forceLogout";

const customerSubscriptionSlice = createSlice({
  name: "customerSubscription",
  initialState,
  reducers: {
    clearMySubscription() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMySubscription.pending, (state, action) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchMySubscription.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.subscription = action.payload.subscription;
        state.plan = action.payload.plan;
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(fetchMySubscription.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.loading = false;
        state.status = action.meta.aborted ? "idle" : "failed";
        state.error = action.meta.aborted ? null : action.payload || null;
      })
      // Avoid stale Unlimited access after logout / session expiry.
      .addMatcher(isAnyOf(logoutUser.fulfilled, logoutUser.rejected), () => initialState)
      .addMatcher(isForceLogout, () => initialState);
  },
});

export const { clearMySubscription } = customerSubscriptionSlice.actions;
export const customerSubscriptionReducer = customerSubscriptionSlice.reducer;
