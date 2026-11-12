// router/routes/adminRoutes.js
import { lazy } from "react";
import React from "react";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "../../layouts";
import { createLazyRouteElement } from "./createLazyRouteElement";

const AdminOverviewView = lazy(() =>
  import("../../pages/dash/admin").then((module) => ({
    default: module.AdminOverviewView,
  })),
);
const AdminUsersView = lazy(() =>
  import("../../pages/dash/admin").then((module) => ({
    default: module.AdminUsersView,
  })),
);
const AdminCustomersView = lazy(() =>
  import("../../pages/dash/admin").then((module) => ({
    default: module.AdminCustomersView,
  })),
);
const AdminDocumentsView = lazy(() =>
  import("../../pages/dash/admin").then((module) => ({
    default: module.AdminDocumentsView,
  })),
);
const AdminOrdersView = lazy(() =>
  import("../../pages/dash/admin").then((module) => ({
    default: module.AdminOrdersView,
  })),
);
const AdminTransactionsView = lazy(() =>
  import("../../pages/dash/admin").then((module) => ({
    default: module.AdminTransactionsView,
  })),
);
const AdminSubscriptionsView = lazy(() =>
  import("../../pages/dash/admin").then((module) => ({
    default: module.AdminSubscriptionsView,
  })),
);
const AdminDocumentTemplatesView = lazy(() =>
  import("../../pages/dash/admin").then((module) => ({
    default: module.AdminDocumentTemplatesView,
  })),
);
const AdminTemplateCreateView = lazy(() =>
  import("../../pages/dash/admin").then((module) => ({
    default: module.AdminTemplateCreateView,
  })),
);
const AdminTemplateEditView = lazy(() =>
  import("../../pages/dash/admin").then((module) => ({
    default: module.AdminTemplateEditView,
  })),
);
const AdminPricingPlansView = lazy(() =>
  import("../../pages/dash/admin").then((module) => ({
    default: module.AdminPricingPlansView,
  })),
);
const AdminProfileView = lazy(() =>
  import("../../pages/dash/admin").then((module) => ({
    default: module.AdminProfileView,
  })),
);

export const adminRoutes = [
  {
    path: "/admin",
    element: React.createElement(DashboardLayout, { role: "admin" }),
    children: [
      {
        index: true,
        element: React.createElement(Navigate, {
          to: "overview",
          replace: true,
        }),
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
        element: createLazyRouteElement(AdminUsersView),
      },
      {
        path: "customers",
        element: createLazyRouteElement(AdminCustomersView),
      },
      {
        path: "documents",
        element: createLazyRouteElement(AdminDocumentsView),
      },
      {
        path: "orders",
        element: createLazyRouteElement(AdminOrdersView),
      },
      {
        path: "transactions",
        element: createLazyRouteElement(AdminTransactionsView),
      },
      {
        path: "subscriptions",
        element: createLazyRouteElement(AdminSubscriptionsView),
      },
      {
        path: "templates",
        element: createLazyRouteElement(AdminDocumentTemplatesView),
      },
      {
        path: "templates/new",
        element: createLazyRouteElement(AdminTemplateCreateView),
      },
      {
        path: "templates/:id/edit",
        element: createLazyRouteElement(AdminTemplateEditView),
      },
      {
        path: "pricing",
        element: createLazyRouteElement(AdminPricingPlansView),
      },
      {
        path: "profile",
        element: createLazyRouteElement(AdminProfileView),
      },
    ],
  },
];
