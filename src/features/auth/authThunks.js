import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./auth.service";

function toThunkError(error) {
  if (error?.isNormalizedError) {
    return error;
  }

  return {
    isNormalizedError: true,
    status: null,
    code: error?.code || "APP_ERROR",
    message: error?.message || "Something went wrong. Please try again.",
    fieldErrors: null,
    isNetworkError: false,
    isCanceled: false,
  };
}

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

      return rejectWithValue(toThunkError(error));
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

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue, signal }) => {
    try {
      return await authService.login(credentials, { signal });
    } catch (error) {
      return rejectWithValue(toThunkError(error));
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await authService.register(payload, { signal });
    } catch (error) {
      return rejectWithValue(toThunkError(error));
    }
  },
);

export const loginAsDemoUser = createAsyncThunk(
  "auth/loginAsDemoUser",
  async (userKey, { rejectWithValue }) => {
    try {
      return await authService.loginAsDemoUser(userKey);
    } catch (error) {
      return rejectWithValue(toThunkError(error));
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
      return rejectWithValue(toThunkError(error));
    }
  },
);
