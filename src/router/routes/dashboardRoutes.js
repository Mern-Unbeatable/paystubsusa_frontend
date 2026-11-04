// router/routes/dashboardRoutes.js
import { lazy } from "react";
import { createLazyRouteElement } from "../createLazyRouteElement";

const CustomerDashboardView = lazy(
  () => import("../../pages/dashboard/customer/CustomerDashboardView"),
);
const AdminDashboardView = lazy(
  () => import("../../pages/dashboard/admin/AdminDashboardView"),
);

// Standalone (no RootLayout wrapper)
export const customerRoutes = [
  {
    path: "/dashboard",
    element: createLazyRouteElement(CustomerDashboardView),
  },
];

export const adminRoutes = [
  { path: "/admin", element: createLazyRouteElement(AdminDashboardView) },
];
