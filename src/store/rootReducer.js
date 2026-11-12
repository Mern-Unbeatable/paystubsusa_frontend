import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { pricingReducer } from "../features/dash/admin/Pricing/pricingSlice";
import { templateReducer } from "../features/dash/admin/template/templateSlice";
import { userReducer } from "../features/dash/admin/user/userSlice";
import { adminOrderReducer } from "../features/dash/admin/order/orderSlice";
import { adminPaymentReducer } from "../features/dash/admin/payment/paymentSlice";
import { adminSubscriptionReducer } from "../features/dash/admin/subscription/subscriptionSlice";
import { adminDocumentReducer } from "../features/dash/admin/document/documentSlice";
import { adminOverviewReducer } from "../features/dash/admin/overview/overviewSlice";
import { customerOverviewReducer } from "../features/dash/customer/overview/overviewSlice";
import { customerDocumentReducer } from "../features/dash/customer/document/documentSlice";
import { customerPaymentReducer } from "../features/dash/customer/payment/paymentSlice";
import { customerSubscriptionReducer } from "../features/dash/customer/subscription/subscriptionSlice";
import { publicTemplateReducer } from "../features/public/template/publicTemplateSlice";
import { checkoutReducer } from "../features/public/checkout/checkoutSlice";
import { publicCatalogReducer } from "../features/public/catalog/publicCatalogSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  checkout: checkoutReducer,
  publicTemplate: publicTemplateReducer,
  publicCatalog: publicCatalogReducer,
  user: userReducer,
  adminOrder: adminOrderReducer,
  adminPayment: adminPaymentReducer,
  adminSubscription: adminSubscriptionReducer,
  adminDocument: adminDocumentReducer,
  adminOverview: adminOverviewReducer,
  customerOverview: customerOverviewReducer,
  customerDocument: customerDocumentReducer,
  customerPayment: customerPaymentReducer,
  customerSubscription: customerSubscriptionReducer,
  pricing: pricingReducer,
  template: templateReducer,
});
