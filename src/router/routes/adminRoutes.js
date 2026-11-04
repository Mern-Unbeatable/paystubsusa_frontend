// router/routes/adminRoutes.js
import { lazy } from "react";
import React from "react";
import { DashboardLayout } from "../../layouts";
import { createLazyRouteElement } from "./createLazyRouteElement";

const AdminDashboardView = lazy(
  () => import("../../pages/dashboard/admin/AdminDashboardView"),
);

export const adminRoutes = [
  {
    path: "/admin",
    element: React.createElement(DashboardLayout, { role: "admin" }),
    children: [
      {
        path: "home",
        element: createLazyRouteElement(AdminDashboardView),
      },
      {
        path: "overview",
        element: createLazyRouteElement(AdminDashboardView),
      },
      {
        index: true,
        element: createLazyRouteElement(AdminDashboardView),
      },
    ],
  },
];
