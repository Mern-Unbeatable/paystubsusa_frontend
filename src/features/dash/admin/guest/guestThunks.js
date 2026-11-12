import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../../api/errorNormalizer";
import { guestService } from "./guest.service";

export const fetchGuestBuyers = createAsyncThunk(
  "adminGuest/fetchGuestBuyers",
  async (filters, { rejectWithValue, signal }) => {
    try {
      return await guestService.list(filters, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);
