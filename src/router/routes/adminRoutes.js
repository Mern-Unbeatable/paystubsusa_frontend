// router/routes/adminRoutes.js
import { lazy } from "react";
import React from "react";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "../../layouts";
import { createLazyRouteElement } from "./createLazyRouteElement";

const AdminOverviewView = lazy(
  () => import("../../pages/dashboard/admin/overview/AdminOverviewView"),
);
const AdminUsers = lazy(
  () => import("../../pages/dashboard/admin/users/AdminUsersView"),
);
const AdminCustomers = lazy(
  () => import("../../pages/dashboard/admin/customers/AdminCustomersView"),
);
const AdminDocuments = lazy(
  () => import("../../pages/dashboard/admin/documents/AdminDocumentsView"),
);
const AdminOrders = lazy(
  () => import("../../pages/dashboard/admin/orders/AdminOrdersView"),
);
const AdminTransactions = lazy(
  () => import("../../pages/dashboard/admin/transactions/AdminTransactionsView"),
);
const AdminSubscriptions = lazy(
  () =>
    import(
      "../../pages/dashboard/admin/subscriptions/AdminSubscriptionsView"
    ),
);
const AdminDocumentTemplates = lazy(
  () => import("../../pages/dashboard/admin/templates/AdminDocumentTemplatesView"),
);
const AdminPricingPlans = lazy(
  () => import("../../pages/dashboard/admin/pricing/AdminPricingPlansView"),
);
const AdminProfile = lazy(
  () => import("../../pages/dashboard/admin/profile/AdminProfileView"),
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
        element: createLazyRouteElement(AdminOverviewView),
      },
      {
        path: "overview",
        element: createLazyRouteElement(AdminOverviewView),
      },
      {
        path: "users",
        element: createLazyRouteElement(AdminUsers),
      },
      {
        path: "customers",
        element: createLazyRouteElement(AdminCustomers),
      },
      {
        path: "documents",
        element: createLazyRouteElement(AdminDocuments),
      },
      {
        path: "orders",
        element: createLazyRouteElement(AdminOrders),
      },
      {
        path: "transactions",
        element: createLazyRouteElement(AdminTransactions),
      },
      {
        path: "subscriptions",
        element: createLazyRouteElement(AdminSubscriptions),
      },
      {
        path: "templates",
        element: createLazyRouteElement(AdminDocumentTemplates),
      },
      {
        path: "pricing",
        element: createLazyRouteElement(AdminPricingPlans),
      },
      {
        path: "profile",
        element: createLazyRouteElement(AdminProfile),
      },
    ],
  },
];
