import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeThunkError } from "../../api/errorNormalizer";
import { authService } from "./auth.service";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue, signal }) => {
    try {
      return await authService.login(credentials, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await authService.register(payload, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue, signal }) => {
    try {
      await authService.logout({ signal });
      return null;
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
  {
    condition: (_, { getState }) => {
      const authState = getState()?.auth;

      if (!authState) {
        return true;
      }

      return authState.loading !== true;
    },
  },
);

export const bootstrapAuth = createAsyncThunk(
  "auth/bootstrap",
  async (_, { rejectWithValue, signal }) => {
    try {
      return await authService.restoreSession({ signal });
    } catch (error) {
      if (error?.status === 401 || error?.status === 403) {
        authService.clearClientAuthState();
        return { user: null };
      }

      return rejectWithValue(normalizeThunkError(error));
    }
  },
  {
    condition: (_, { getState }) => {
      const authState = getState()?.auth;

      if (!authState) {
        return true;
      }

      return authState.status === "idle";
    },
  },
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (changes, { rejectWithValue, signal }) => {
    try {
      return await authService.updateProfile(changes, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const uploadAvatar = createAsyncThunk(
  "auth/uploadAvatar",
  async (file, { rejectWithValue, signal }) => {
    try {
      return await authService.uploadAvatar(file, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const removeAvatar = createAsyncThunk(
  "auth/removeAvatar",
  async (_, { rejectWithValue, signal }) => {
    try {
      return await authService.removeAvatar({ signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

/** Re-reads the signed-in user from the API, the source of truth for account state. */
export const reloadUser = createAsyncThunk(
  "auth/reloadUser",
  async (_, { rejectWithValue, signal }) => {
    try {
      return await authService.reloadUser({ signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (code, { rejectWithValue, signal }) => {
    try {
      return await authService.verifyEmail(code, { signal });
    } catch (error) {
      return rejectWithValue(normalizeThunkError(error));
    }
  },
);
