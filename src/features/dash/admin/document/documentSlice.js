import { createSlice } from "@reduxjs/toolkit";
import { fetchDocumentDetails, fetchDocuments, regenerateDocument } from "./documentThunks";

/** Filters live in the URL query string (see useUrlFilters), not in the store. */
const initialState = {
  documents: [],
  meta: { page: 1, pageSize: 10, totalItems: 0, totalPages: 0 },
  loading: false,
  status: "idle",
  error: null,
  // Only the latest list request may write results; older ones finish late or are aborted.
  requestId: null,
  details: { id: null, document: null, loading: false, error: null, requestId: null },
};

const markQueued = (doc, id) => (doc && doc.id === id ? { ...doc, status: "queued" } : doc);

const adminDocumentSlice = createSlice({
  name: "adminDocument",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state, action) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.documents = action.payload.documents;
        state.meta = action.payload.meta;
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.loading = false;
        state.status = action.meta.aborted ? "idle" : "failed";
        state.error = action.meta.aborted ? null : action.payload || null;
      })
      .addCase(fetchDocumentDetails.pending, (state, action) => {
        const keep = state.details.id === action.meta.arg;
        state.details = {
          id: action.meta.arg,
          document: keep ? state.details.document : null,
          loading: true,
          error: null,
          requestId: action.meta.requestId,
        };
      })
      .addCase(fetchDocumentDetails.fulfilled, (state, action) => {
        if (state.details.requestId !== action.meta.requestId) {
          return;
        }

        state.details.document = action.payload.document;
        state.details.loading = false;
      })
      .addCase(fetchDocumentDetails.rejected, (state, action) => {
        if (state.details.requestId !== action.meta.requestId) {
          return;
        }

        state.details.loading = false;
        state.details.error = action.meta.aborted ? null : action.payload || null;
      })
      .addCase(regenerateDocument.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.documents = state.documents.map((d) => markQueued(d, id));
        state.details.document = markQueued(state.details.document, id);
      });
  },
});

export const adminDocumentReducer = adminDocumentSlice.reducer;
