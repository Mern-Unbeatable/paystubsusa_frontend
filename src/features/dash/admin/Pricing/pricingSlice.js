import { createSlice } from "@reduxjs/toolkit";
import {
  deleteProduct,
  fetchProductDetails,
  fetchProducts,
  updateProduct,
} from "./pricingThunks";

export const INITIAL_PRICING_FILTERS = {
  q: "",
  kind: "",
  documentType: "",
  status: "",
  page: 1,
  pageSize: 20,
};

const initialState = {
  products: [],
  meta: { page: 1, pageSize: 20, totalItems: 0, totalPages: 0 },
  filters: INITIAL_PRICING_FILTERS,
  loading: false,
  status: "idle",
  error: null,
  // Only the latest list request may write results; older ones finish late or are aborted.
  requestId: null,
  details: { code: null, product: null, loading: false, error: null, requestId: null },
};

const mergeProduct = (current, updated) =>
  current && current.code === updated.code ? { ...current, ...updated } : current;

const pricingSlice = createSlice({
  name: "pricing",
  initialState,
  reducers: {
    /** Any filter change except paging returns to the first page. */
    setPricingFilter(state, action) {
      const { key, value } = action.payload;
      state.filters[key] = value;
      if (key !== "page") {
        state.filters.page = 1;
      }
    },
    resetPricingFilters(state) {
      state.filters = INITIAL_PRICING_FILTERS;
    },
    clearPricingError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        const { products, meta } = action.payload;
        state.products = products;
        state.meta = meta;
        state.loading = false;
        state.status = "succeeded";
        // The total can shrink (e.g. after a delete or under a status filter); stay on a real page.
        if (meta.totalPages > 0 && state.filters.page > meta.totalPages) {
          state.filters.page = meta.totalPages;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.loading = false;
        state.status = action.meta.aborted ? "idle" : "failed";
        state.error = action.meta.aborted ? null : action.payload || null;
      })
      .addCase(fetchProductDetails.pending, (state, action) => {
        const keep = state.details.code === action.meta.arg;
        state.details = {
          code: action.meta.arg,
          product: keep ? state.details.product : null,
          loading: true,
          error: null,
          requestId: action.meta.requestId,
        };
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        if (state.details.requestId !== action.meta.requestId) {
          return;
        }

        state.details.product = action.payload.product;
        state.details.loading = false;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        if (state.details.requestId !== action.meta.requestId) {
          return;
        }

        state.details.loading = false;
        state.details.error = action.meta.aborted ? null : action.payload || null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updated = action.payload?.product;
        if (!updated) {
          return;
        }

        state.products = state.products.map((product) => mergeProduct(product, updated));
        state.details.product = mergeProduct(state.details.product, updated);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const { code } = action.payload;
        state.products = state.products.filter((product) => product.code !== code);
        if (state.details.code === code) {
          state.details = initialState.details;
        }
      });
  },
});

export const { clearPricingError, resetPricingFilters, setPricingFilter } =
  pricingSlice.actions;
export const pricingReducer = pricingSlice.reducer;
