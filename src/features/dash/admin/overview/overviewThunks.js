import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../../api/errorNormalizer";
import { overviewService } from "./overview.service";

export const fetchDashboard = createAsyncThunk(
  "adminOverview/fetchDashboard",
  async (range, { rejectWithValue, signal }) => {
    try {
      return await overviewService.getDashboard(range, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);
