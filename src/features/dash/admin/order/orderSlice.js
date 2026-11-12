import { createSlice } from "@reduxjs/toolkit";
import { fetchOrderDetails, fetchOrders } from "./orderThunks";

/** Filters live in the URL query string (see useAdminOrders), not in the store. */
const initialState = {
  orders: [],
  meta: { page: 1, pageSize: 10, totalItems: 0, totalPages: 0 },
  loading: false,
  status: "idle",
  error: null,
  // Only the latest list request may write results; older ones finish late or are aborted.
  requestId: null,
  details: { id: null, order: null, loading: false, error: null, requestId: null },
};

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state, action) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        const { orders, meta } = action.payload;
        state.orders = orders;
        state.meta = meta;
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.loading = false;
        state.status = action.meta.aborted ? "idle" : "failed";
        state.error = action.meta.aborted ? null : action.payload || null;
      })
      .addCase(fetchOrderDetails.pending, (state, action) => {
        const keep = state.details.id === action.meta.arg;
        state.details = {
          id: action.meta.arg,
          order: keep ? state.details.order : null,
          loading: true,
          error: null,
          requestId: action.meta.requestId,
        };
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        if (state.details.requestId !== action.meta.requestId) {
          return;
        }

        state.details.order = action.payload.order;
        state.details.loading = false;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        if (state.details.requestId !== action.meta.requestId) {
          return;
        }

        state.details.loading = false;
        state.details.error = action.meta.aborted ? null : action.payload || null;
      });
  },
});

export const adminOrderReducer = adminOrderSlice.reducer;
