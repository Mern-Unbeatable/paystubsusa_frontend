import { createSlice } from "@reduxjs/toolkit";
import { fetchUserDetails, fetchUsers, updateUserStatus } from "./userThunks";

/** Filters live in the URL query string (see useUrlFilters), not in the store. */
const initialState = {
  users: [],
  meta: { page: 1, pageSize: 10, totalItems: 0, totalPages: 0 },
  loading: false,
  status: "idle",
  error: null,
  // Only the latest list request may write results; older ones finish late or are aborted.
  requestId: null,
  details: { id: null, user: null, loading: false, error: null, requestId: null },
};

const mergeUser = (current, updated) =>
  current && current.id === updated.id ? { ...current, ...updated } : current;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        const { users, meta } = action.payload;
        state.users = users;
        state.meta = meta;
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return;
        }

        state.loading = false;
        state.status = action.meta.aborted ? "idle" : "failed";
        state.error = action.meta.aborted ? null : action.payload || null;
      })
      .addCase(fetchUserDetails.pending, (state, action) => {
        const keep = state.details.id === action.meta.arg;
        state.details = {
          id: action.meta.arg,
          user: keep ? state.details.user : null,
          loading: true,
          error: null,
          requestId: action.meta.requestId,
        };
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        if (state.details.requestId !== action.meta.requestId) {
          return;
        }

        state.details.user = action.payload.user;
        state.details.loading = false;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        if (state.details.requestId !== action.meta.requestId) {
          return;
        }

        state.details.loading = false;
        state.details.error = action.meta.aborted ? null : action.payload || null;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const updated = action.payload?.user;
        if (!updated) {
          return;
        }

        state.users = state.users.map((user) => mergeUser(user, updated));
        state.details.user = mergeUser(state.details.user, updated);
      });
  },
});

export const { clearUserError } = userSlice.actions;
export const userReducer = userSlice.reducer;
