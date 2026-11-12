import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../../api/errorNormalizer";
import { customerPaymentService } from "./payment.service";

export const fetchMyPayments = createAsyncThunk(
  "customerPayment/fetchMyPayments",
  async (filters, { rejectWithValue, signal }) => {
    try {
      return await customerPaymentService.list(filters, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);
