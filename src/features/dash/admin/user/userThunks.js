import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../../api/errorNormalizer";
import { userService } from "./user.service";

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (filters, { rejectWithValue, signal }) => {
    try {
      return await userService.list(filters, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (id, { rejectWithValue, signal }) => {
    try {
      return await userService.getDetails(id, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const updateUserStatus = createAsyncThunk(
  "user/updateUserStatus",
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await userService.updateStatus(payload, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);
