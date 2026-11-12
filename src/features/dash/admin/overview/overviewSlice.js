import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboard } from "./overviewThunks";

const initialState = {
  dashboard: null,
  loading: false,
  status: "idle",
  error: null,
  // Only the latest request may write results; older ones finish late or are aborted.
  requestId: null,
};

const adminOverviewSlice = createSlice({
  name: "adminOverview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state, action) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.dashboard = action.payload.dashboard;
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.loading = false;
        state.status = action.meta.aborted ? "idle" : "failed";
        state.error = action.meta.aborted ? null : action.payload || null;
      });
  },
});

export const adminOverviewReducer = adminOverviewSlice.reducer;
