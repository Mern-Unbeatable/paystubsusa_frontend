import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { pricingReducer } from "../features/dash/admin/Pricing/pricingSlice";
import { templateReducer } from "../features/dash/admin/template/templateSlice";
import { userReducer } from "../features/dash/admin/user/userSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  pricing: pricingReducer,
  template: templateReducer,
});
