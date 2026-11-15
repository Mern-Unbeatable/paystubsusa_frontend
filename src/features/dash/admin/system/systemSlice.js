import { createSlice } from "@reduxjs/toolkit";
import { fetchSystemRecord, fetchSystemRecords } from "./systemThunks";

/** Filters live in the URL query string (see useUrlFilters), not in the store. */
const initialState = {
  table: null,
  records: [],
  meta: { page: 1, pageSize: 10, totalItems: 0, totalPages: 0 },
  loading: false,
  status: "idle",
  error: null,
  requestId: null,
  detail: {
    record: null,
    loading: false,
    error: null,
    requestId: null,
  },
};

const adminSystemSlice = createSlice({
  name: "adminSystem",
  initialState,
  reducers: {
    clearSystemDetail(state) {
      state.detail = {
        record: null,
        loading: false,
        error: null,
        requestId: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemRecords.pending, (state, action) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
        state.requestId = action.meta.requestId;
        state.table = action.meta.arg?.table ?? state.table;
      })
      .addCase(fetchSystemRecords.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;
        state.records = action.payload.records;
        state.meta = action.payload.meta;
        state.loading = false;
        state.status = "succeeded";
        state.table = action.meta.arg?.table ?? state.table;
      })
      .addCase(fetchSystemRecords.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;
        // Aborted requests are superseded; keep status/loading so the UI doesn't
        // bounce back to the idle skeleton between the abort and the next pending.
        if (action.meta.aborted) {
          state.error = null;
          return;
        }
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || null;
      })
      .addCase(fetchSystemRecord.pending, (state, action) => {
        state.detail.loading = true;
        state.detail.error = null;
        state.detail.record = null;
        state.detail.requestId = action.meta.requestId;
      })
      .addCase(fetchSystemRecord.fulfilled, (state, action) => {
        if (state.detail.requestId !== action.meta.requestId) return;
        state.detail.loading = false;
        state.detail.record = action.payload.record;
      })
      .addCase(fetchSystemRecord.rejected, (state, action) => {
        if (state.detail.requestId !== action.meta.requestId) return;
        state.detail.loading = false;
        state.detail.error = action.meta.aborted ? null : action.payload || null;
      });
  },
});

export const { clearSystemDetail } = adminSystemSlice.actions;
export const adminSystemReducer = adminSystemSlice.reducer;
