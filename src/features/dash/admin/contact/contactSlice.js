import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  deleteContactMessage,
  fetchContactMessages,
  replyContactMessage,
  updateContactMessage,
} from "./contactThunks";

/** Filters live in the URL query string (see useUrlFilters), not in the store. */
const initialState = {
  messages: [],
  meta: { page: 1, pageSize: 10, totalItems: 0, totalPages: 0 },
  loading: false,
  status: "idle",
  error: null,
  // Only the latest list request may write results; older ones finish late or are aborted.
  requestId: null,
};

const adminContactSlice = createSlice({
  name: "adminContact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactMessages.pending, (state, action) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchContactMessages.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.messages = action.payload.messages;
        state.meta = action.payload.meta;
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(fetchContactMessages.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.loading = false;
        state.status = action.meta.aborted ? "idle" : "failed";
        state.error = action.meta.aborted ? null : action.payload || null;
      })
      .addCase(deleteContactMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(
          (m) => m.id !== action.payload.id,
        );
      })
      .addMatcher(
        isAnyOf(updateContactMessage.fulfilled, replyContactMessage.fulfilled),
        (state, action) => {
          const updated = action.payload?.message;
          if (!updated) {
            return;
          }

          state.messages = state.messages.map((m) =>
            m.id === updated.id ? { ...m, ...updated } : m,
          );
        },
      );
  },
});

export const adminContactReducer = adminContactSlice.reducer;
