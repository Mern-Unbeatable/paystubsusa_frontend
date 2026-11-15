import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../../api/errorNormalizer";
import { systemService } from "./system.service";

const thunk = (type, call) =>
  createAsyncThunk(type, async (arg, { rejectWithValue, signal }) => {
    try {
      return await call(arg, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  });

export const fetchSystemRecords = thunk(
  "adminSystem/fetchSystemRecords",
  systemService.list,
);

export const fetchSystemRecord = thunk(
  "adminSystem/fetchSystemRecord",
  systemService.get,
);
