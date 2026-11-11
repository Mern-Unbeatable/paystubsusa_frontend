import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { userReducer } from "../features/dash/admin/user/userSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

