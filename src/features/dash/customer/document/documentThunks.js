import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../../api/errorNormalizer";
import { customerDocumentService } from "./document.service";

export const fetchMyDocuments = createAsyncThunk(
  "customerDocument/fetchMyDocuments",
  async (filters, { rejectWithValue, signal }) => {
    try {
      return await customerDocumentService.list(filters, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const downloadMyDocument = createAsyncThunk(
  "customerDocument/downloadMyDocument",
  async (id, { rejectWithValue }) => {
    try {
      return await customerDocumentService.download(id);
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);
