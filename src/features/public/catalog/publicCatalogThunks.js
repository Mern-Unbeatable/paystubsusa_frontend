import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../api/errorNormalizer";
import { publicCatalogService } from "./publicCatalog.service";

/** Loads the product catalog once per session; later calls are no-ops unless the last one failed. */
export const fetchCatalogProducts = createAsyncThunk(
  "publicCatalog/fetchProducts",
  async (_, { rejectWithValue, signal }) => {
    try {
      return await publicCatalogService.listProducts({ signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
  {
    condition: (_, { getState }) => {
      const status = getState().publicCatalog.status;
      return status !== "loading" && status !== "succeeded";
    },
  },
);
