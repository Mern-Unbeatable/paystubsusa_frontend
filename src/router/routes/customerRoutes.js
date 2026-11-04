// Standalone (no RootLayout wrapper)
import { lazy } from "react";
import React from "react";
import { DashboardLayout } from "../../layouts";
import { createLazyRouteElement } from "./createLazyRouteElement";

const CustomerOverview = lazy(
  () => import("../../pages/dashboard/customer/CustomerOverview"),
);
const MyDocumentsView = lazy(
  () => import("../../pages/dashboard/customer/MyDocumentsView"),
);
const PaymentHistoryView = lazy(
  () => import("../../pages/dashboard/customer/PaymentHistoryView"),
);
const SubscriptionView = lazy(
  () => import("../../pages/dashboard/customer/SubscriptionView"),
);
const HelpCenterView = lazy(
  () => import("../../pages/dashboard/customer/HelpCenterView"),
);
const ProfileView = lazy(
  () => import("../../pages/dashboard/customer/ProfileView"),
);

export const customerRoutes = [
  {
    path: "/customer",
    element: React.createElement(DashboardLayout),
    children: [
      {
        path: "home",
        element: createLazyRouteElement(CustomerOverview),
      },
      {
        path: "overview",
        element: createLazyRouteElement(CustomerOverview),
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
