import { createSlice } from "@reduxjs/toolkit";
import { fetchCatalogProducts } from "./publicCatalogThunks";

// status: "idle" | "loading" | "succeeded" | "failed"
const initialState = { products: [], status: "idle", error: null };

const publicCatalogSlice = createSlice({
  name: "publicCatalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCatalogProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.status = "succeeded";
      })
      .addCase(fetchCatalogProducts.rejected, (state, action) => {
        // An aborted request (unmount) may be retried.
        state.status = action.meta.aborted ? "idle" : "failed";
        state.error = action.payload ?? null;
      });
  },
});

export const publicCatalogReducer = publicCatalogSlice.reducer;
