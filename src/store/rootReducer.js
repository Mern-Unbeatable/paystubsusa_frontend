import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { pricingReducer } from "../features/dash/admin/Pricing/pricingSlice";
import { templateReducer } from "../features/dash/admin/template/templateSlice";
import { userReducer } from "../features/dash/admin/user/userSlice";
import { adminOrderReducer } from "../features/dash/admin/order/orderSlice";
import { publicTemplateReducer } from "../features/public/template/publicTemplateSlice";
import { checkoutReducer } from "../features/public/checkout/checkoutSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  checkout: checkoutReducer,
  publicTemplate: publicTemplateReducer,
  user: userReducer,
  adminOrder: adminOrderReducer,
  pricing: pricingReducer,
  template: templateReducer,
});
