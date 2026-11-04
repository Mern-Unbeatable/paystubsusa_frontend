import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  bootstrapAuth,
  loginAsDemoUser,
  loginUser,
  logoutUser,
  registerUser,
} from "./authThunks";

const initialState = {
  user: null,
  loading: true,
  status: "idle",
  error: null,
  logoutReason: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    forceLogout(state, action) {
      state.user = null;
      state.loading = false;
      state.status = "unauthenticated";
      state.error = null;
      state.logoutReason = action.payload?.reason || "expired";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bootstrapAuth.pending, (state) => {
        state.loading = true;
        state.status = "bootstrapping";
        state.error = null;
      })
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        if (state.status === "authenticated" && !action.payload?.user) {
          state.loading = false;
          state.error = null;
          return;
        }

        state.user = action.payload?.user || null;
        state.loading = false;
        state.status = action.payload?.user
          ? "authenticated"
          : "unauthenticated";
        state.error = null;
      })
      .addCase(bootstrapAuth.rejected, (state, action) => {
        if (state.status === "authenticated") {
          state.loading = false;
          state.error = null;
          return;
        }

        state.user = null;
        state.loading = false;
        state.status = "unauthenticated";
        state.error = action.payload || null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.status = "unauthenticated";
        state.error = null;
        state.logoutReason = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.status = "unauthenticated";
        state.error = action.payload || null;
      })
      .addMatcher(
        isAnyOf(
          bootstrapAuth.pending,
          loginUser.pending,
          registerUser.pending,
          loginAsDemoUser.pending,
          logoutUser.pending,
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          loginUser.fulfilled,
          registerUser.fulfilled,
          loginAsDemoUser.fulfilled,
        ),
        (state, action) => {
          state.user = action.payload?.user || null;
          state.loading = false;
          state.status = action.payload?.user
            ? "authenticated"
            : "unauthenticated";
          state.error = null;
          state.logoutReason = null;
        },
      )
      .addMatcher(
        isAnyOf(
          loginUser.rejected,
          registerUser.rejected,
          loginAsDemoUser.rejected,
        ),
        (state, action) => {
          state.loading = false;
          state.status = "unauthenticated";
          state.error = action.payload || null;
        },
      );
  },
});

export const { clearAuthError, forceLogout } = authSlice.actions;
export const authReducer = authSlice.reducer;
