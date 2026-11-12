import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../../api/errorNormalizer";
import { paymentService } from "./payment.service";

export const fetchPayments = createAsyncThunk(
  "adminPayment/fetchPayments",
  async (filters, { rejectWithValue, signal }) => {
    try {
      return await paymentService.list(filters, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const fetchPaymentDetails = createAsyncThunk(
  "adminPayment/fetchPaymentDetails",
  async (id, { rejectWithValue, signal }) => {
    try {
      return await paymentService.getDetails(id, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);
