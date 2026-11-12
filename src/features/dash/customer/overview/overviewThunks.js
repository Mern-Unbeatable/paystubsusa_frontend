import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../../api/errorNormalizer";
import { customerOverviewService } from "./overview.service";

export const fetchCustomerDashboard = createAsyncThunk(
  "customerOverview/fetchDashboard",
  async (_, { rejectWithValue, signal }) => {
    try {
      return await customerOverviewService.getDashboard({ signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const downloadCustomerDocument = createAsyncThunk(
  "customerOverview/downloadDocument",
  async (id, { rejectWithValue }) => {
    try {
      return await customerOverviewService.downloadDocument(id);
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);
