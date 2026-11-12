import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../../../api/errorNormalizer";
import { templateService } from "./template.service";

export const fetchTemplates = createAsyncThunk(
  "template/fetchTemplates",
  async (filters, { rejectWithValue, signal }) => {
    try {
      return await templateService.list(filters, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const fetchTemplateDetails = createAsyncThunk(
  "template/fetchTemplateDetails",
  async (id, { rejectWithValue, signal }) => {
    try {
      return await templateService.getDetails(id, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const createTemplate = createAsyncThunk(
  "template/createTemplate",
  async (body, { rejectWithValue, signal }) => {
    try {
      return await templateService.create(body, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const updateTemplate = createAsyncThunk(
  "template/updateTemplate",
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await templateService.update(payload, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const setDefaultTemplate = createAsyncThunk(
  "template/setDefaultTemplate",
  async (id, { rejectWithValue, signal }) => {
    try {
      return await templateService.setDefault(id, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const deleteTemplate = createAsyncThunk(
  "template/deleteTemplate",
  async (id, { rejectWithValue, signal }) => {
    try {
      return await templateService.remove(id, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const uploadTemplatePreview = createAsyncThunk(
  "template/uploadTemplatePreview",
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await templateService.uploadPreview(payload, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const removeTemplatePreview = createAsyncThunk(
  "template/removeTemplatePreview",
  async (id, { rejectWithValue, signal }) => {
    try {
      return await templateService.removePreview(id, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);
