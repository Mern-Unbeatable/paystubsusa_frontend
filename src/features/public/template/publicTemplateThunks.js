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
