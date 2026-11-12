import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../../api/errorNormalizer";
import { pricingService } from "./pricing.service";

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
  async (body, { rejectWithValue, signal }) => {
    try {
      return await pricingService.create(body, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const updateProduct = createAsyncThunk(
  "pricing/updateProduct",
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await pricingService.update(payload, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "pricing/deleteProduct",
  async (code, { rejectWithValue, signal }) => {
    try {
      return await pricingService.remove(code, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);
