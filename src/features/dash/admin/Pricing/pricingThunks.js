import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../../api/errorNormalizer";
import { fetchCatalogProducts } from "../../../public/catalog/publicCatalogThunks";
import { pricingService } from "./pricing.service";

/** Keep public catalog (and planAvailable UI) in sync after Admin Pricing Plans changes. */
const refreshPublicCatalog = (dispatch) => dispatch(fetchCatalogProducts({ force: true }));

export const fetchProducts = createAsyncThunk(
  "pricing/fetchProducts",
  async (filters, { rejectWithValue, signal }) => {
    try {
      return await pricingService.list(filters, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const fetchProductDetails = createAsyncThunk(
  "pricing/fetchProductDetails",
  async (code, { rejectWithValue, signal }) => {
    try {
      return await pricingService.getDetails(code, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const createProduct = createAsyncThunk(
  "pricing/createProduct",
  async (body, { rejectWithValue, signal, dispatch }) => {
    try {
      const created = await pricingService.create(body, { signal });
      refreshPublicCatalog(dispatch);
      return created;
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const updateProduct = createAsyncThunk(
  "pricing/updateProduct",
  async (payload, { rejectWithValue, signal, dispatch }) => {
    try {
      const updated = await pricingService.update(payload, { signal });
      refreshPublicCatalog(dispatch);
      return updated;
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "pricing/deleteProduct",
  async (code, { rejectWithValue, signal, dispatch }) => {
    try {
      const deleted = await pricingService.remove(code, { signal });
      refreshPublicCatalog(dispatch);
      return deleted;
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);
