// Standalone (no RootLayout wrapper)
import { lazy } from "react";
import React from "react";
import { DashboardLayout } from "../../layouts";
import { createLazyRouteElement } from "./createLazyRouteElement";

const CustomerOverviewView = lazy(
  () =>
    import("../../pages/dashboard/customer").then((module) => ({
      default: module.CustomerOverviewView,
    })),
);
const MyDocumentsView = lazy(
  () =>
    import("../../pages/dashboard/customer").then((module) => ({
      default: module.MyDocumentsView,
    })),
);
const PaymentHistoryView = lazy(
  () =>
    import("../../pages/dashboard/customer").then((module) => ({
      default: module.PaymentHistoryView,
    })),
);
const SubscriptionView = lazy(
  () =>
    import("../../pages/dashboard/customer").then((module) => ({
      default: module.SubscriptionView,
    })),
);
const HelpCenterView = lazy(
  () =>
    import("../../pages/dashboard/customer").then((module) => ({
      default: module.HelpCenterView,
    })),
);
const ProfileView = lazy(
  () =>
    import("../../pages/dashboard/customer").then((module) => ({
      default: module.ProfileView,
    })),
);

export const customerRoutes = [
  {
    path: "/customer",
    element: React.createElement(DashboardLayout),
    children: [
      {
        path: "home",
        element: createLazyRouteElement(CustomerOverviewView),
      },
      {
        path: "overview",
        element: createLazyRouteElement(CustomerOverviewView),
      },
      {
        path: "documents",
        element: createLazyRouteElement(MyDocumentsView),
      },
      {
        path: "payments",
        element: createLazyRouteElement(PaymentHistoryView),
      },
      {
        path: "subscription",
        element: createLazyRouteElement(SubscriptionView),
      },
      {
        path: "help",
        element: createLazyRouteElement(HelpCenterView),
      },
      {
        path: "profile",
        element: createLazyRouteElement(ProfileView),
      },
    ],
  },
];
