import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../api/errorNormalizer";
import { publicCatalogService } from "./publicCatalog.service";

/**
 * Loads the product catalog. Cached for the session unless `{ force: true }` (e.g. pricing /
 * home after Admin toggles Unlimited Active/Inactive).
 */
export const fetchCatalogProducts = createAsyncThunk(
  "publicCatalog/fetchProducts",
  async (_arg, { rejectWithValue, signal }) => {
    try {
      return await publicCatalogService.listProducts({ signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
  {
    condition: (arg, { getState }) => {
      const status = getState().publicCatalog.status;
      if (status === "loading") return false;
      if (arg?.force) return true;
      return status !== "succeeded";
    },
  },
);
