import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../../api/errorNormalizer";
import { customerSubscriptionService } from "./subscription.service";

export const fetchMySubscription = createAsyncThunk(
  "customerSubscription/fetchMySubscription",
  async (_, { rejectWithValue, signal }) => {
    try {
      return await customerSubscriptionService.load({ signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const startSubscriptionCheckout = createAsyncThunk(
  "customerSubscription/startCheckout",
  async (_, { rejectWithValue }) => {
    try {
      return await customerSubscriptionService.checkout();
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const openSubscriptionPortal = createAsyncThunk(
  "customerSubscription/openPortal",
  async (_, { rejectWithValue }) => {
    try {
      return await customerSubscriptionService.portal();
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);
