import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../../api/errorNormalizer";
import { subscriptionService } from "./subscription.service";

export const fetchSubscriptions = createAsyncThunk(
  "adminSubscription/fetchSubscriptions",
  async (filters, { rejectWithValue, signal }) => {
    try {
      return await subscriptionService.list(filters, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const fetchSubscriptionDetails = createAsyncThunk(
  "adminSubscription/fetchSubscriptionDetails",
  async (id, { rejectWithValue, signal }) => {
    try {
      return await subscriptionService.getDetails(id, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const cancelSubscription = createAsyncThunk(
  "adminSubscription/cancelSubscription",
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await subscriptionService.cancel(payload, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);
