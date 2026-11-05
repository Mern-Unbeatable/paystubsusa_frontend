import { configureStore } from "@reduxjs/toolkit";
import { setAuthFailureHandler } from "../api/axiosInstance";
import { forceLogout } from "../features/auth/authSlice";
import { rootReducer } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});

setAuthFailureHandler(() => {
  store.dispatch(forceLogout({ reason: "session-expired" }));
});

