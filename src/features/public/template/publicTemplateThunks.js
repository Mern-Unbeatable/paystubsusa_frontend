<<<<<<< HEAD
import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../api/errorNormalizer";
import { publicTemplateService } from "./publicTemplate.service";

/** Loads one document type's templates. Skips only while an identical request is in flight. */
export const fetchPublicTemplates = createAsyncThunk(
  "publicTemplate/fetchPublicTemplates",
  async (documentType, { rejectWithValue, signal }) => {
    try {
      return await publicTemplateService.list(documentType, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
  {
    condition: (documentType, { getState }) => {
      const status = getState().publicTemplate.byType[documentType]?.status;
      return status !== "loading";
    },
  },
);
=======
import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../api/errorNormalizer";
import { publicTemplateService } from "./publicTemplate.service";

/** Loads one document type's templates once per session; later calls are no-ops. */
export const fetchPublicTemplates = createAsyncThunk(
  "publicTemplate/fetchPublicTemplates",
  async (documentType, { rejectWithValue, signal }) => {
    try {
      return await publicTemplateService.list(documentType, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
  {
    condition: (documentType, { getState }) => {
      const status = getState().publicTemplate.byType[documentType]?.status;
      return status !== "loading" && status !== "succeeded";
    },
  },
);
>>>>>>> 925e0dca3d6ce63aa3b5108ff89adee725836e25
