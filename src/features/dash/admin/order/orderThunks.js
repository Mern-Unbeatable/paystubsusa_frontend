import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../../api/errorNormalizer";
import { orderService } from "./order.service";

export const fetchOrders = createAsyncThunk(
  "adminOrder/fetchOrders",
  async (filters, { rejectWithValue, signal }) => {
    try {
      return await orderService.list(filters, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const fetchOrderDetails = createAsyncThunk(
  "adminOrder/fetchOrderDetails",
  async (id, { rejectWithValue, signal }) => {
    try {
      return await orderService.getDetails(id, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);
