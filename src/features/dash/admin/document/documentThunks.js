import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../../api/errorNormalizer";
import { documentService } from "./document.service";

const withErrors = (type, call) =>
  createAsyncThunk(type, async (arg, { rejectWithValue, signal }) => {
    try {
      return await call(arg, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  });

export const fetchDocuments = withErrors("adminDocument/fetchDocuments", documentService.list);
export const fetchDocumentDetails = withErrors("adminDocument/fetchDocumentDetails", documentService.getDetails);
export const downloadDocument = withErrors("adminDocument/downloadDocument", documentService.download);
export const regenerateDocument = withErrors("adminDocument/regenerateDocument", documentService.regenerate);
