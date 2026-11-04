// router/routes/adminRoutes.js
import { lazy } from "react";
import React from "react";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "../../layouts";
import { createLazyRouteElement } from "./createLazyRouteElement";

const AdminOverview = lazy(
  () => import("../../pages/dashboard/admin/overview/AdminOverview"),
);
const AdminUsers = lazy(
  () => import("../../pages/dashboard/admin/users/AdminUsers"),
);
const AdminDocuments = lazy(
  () => import("../../pages/dashboard/admin/documents/AdminDocuments"),
);
const AdminTransactions = lazy(
  () => import("../../pages/dashboard/admin/transactions/AdminTransactions"),
);

export const adminRoutes = [
  {
    path: "/admin",
    element: React.createElement(DashboardLayout, { role: "admin" }),
    children: [
      {
        index: true,
        element: React.createElement(Navigate, { to: "overview", replace: true }),
      },
      {
        path: "home",
        element: createLazyRouteElement(AdminOverview),
      },
      {
        path: "overview",
        element: createLazyRouteElement(AdminOverview),
      },
      {
        path: "users",
        element: createLazyRouteElement(AdminUsers),
      },
      {
        path: "documents",
        element: createLazyRouteElement(AdminDocuments),
      },
      {
        path: "transactions",
        element: createLazyRouteElement(AdminTransactions),
      },
    ],
  },
];
