import { createSlice } from "@reduxjs/toolkit";
import { fetchUserDetails, fetchUsers, updateUserStatus } from "./userThunks";

export const INITIAL_USER_FILTERS = {
  q: "",
  status: "",
  subscription: "",
  emailVerified: "",
  sort: "-createdAt",
  page: 1,
  pageSize: 20,
};

const initialState = {
  users: [],
  meta: { page: 1, pageSize: 20, totalItems: 0, totalPages: 0 },
  filters: INITIAL_USER_FILTERS,
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
    /** Any filter change except paging returns to the first page. */
    setUserFilter(state, action) {
      const { key, value } = action.payload;
      state.filters[key] = value;
      if (key !== "page") {
        state.filters.page = 1;
      }
    },
    resetUserFilters(state) {
      state.filters = INITIAL_USER_FILTERS;
    },
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
        // The total can shrink (e.g. after a suspension under a status filter); stay on a real page.
        if (meta.totalPages > 0 && state.filters.page > meta.totalPages) {
          state.filters.page = meta.totalPages;
        }
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

export const { clearUserError, resetUserFilters, setUserFilter } = userSlice.actions;
export const userReducer = userSlice.reducer;
