import { createSlice } from "@reduxjs/toolkit";
import { fetchPublicTemplates } from "./publicTemplateThunks";

// byType[documentType] = { templates, status: "idle" | "loading" | "succeeded" | "failed", error }
const initialState = { byType: {} };

const publicTemplateSlice = createSlice({
  name: "publicTemplate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicTemplates.pending, (state, action) => {
        const current = state.byType[action.meta.arg];
        state.byType[action.meta.arg] = { templates: current?.templates ?? [], status: "loading", error: null };
      })
      .addCase(fetchPublicTemplates.fulfilled, (state, action) => {
        state.byType[action.meta.arg] = { templates: action.payload.templates, status: "succeeded", error: null };
      })
      .addCase(fetchPublicTemplates.rejected, (state, action) => {
        // An aborted request (unmount) may be retried; anything else is final for the session.
        const status = action.meta.aborted ? "idle" : "failed";
        state.byType[action.meta.arg] = { templates: [], status, error: action.payload ?? null };
      });
  },
});

export const publicTemplateReducer = publicTemplateSlice.reducer;
