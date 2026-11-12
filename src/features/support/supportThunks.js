import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../api/errorNormalizer";
import { sendContactMessageApi } from "./supportApi";

export const sendContactMessage = createAsyncThunk("support/sendContactMessage", async (input, { rejectWithValue }) => {
  try {
    return await sendContactMessageApi(input);
  } catch (error) {
    return rejectWithValue(normalizeThunkError(error));
  }
});
