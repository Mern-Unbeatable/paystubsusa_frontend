// router/buildRoutes.js
import React from "react";
import { Navigate } from "react-router-dom";
import { PublicLayout, AuthLayout, DashboardLayout } from "../../layouts";
import { RequireAuth, RequireAdmin, RequireGuest } from "../guard";
import { publicRoutes, authRoutes, customerRoutes, adminRoutes } from ".";
import { ALIASES } from "../config/paths";

const redirectRoutes = Object.entries(ALIASES).map(([from, to]) => ({
  path: from,
  element: React.createElement(Navigate, { to, replace: true }),
}));

export const routeConfig = [
  {
    path: "/",
    element: React.createElement(PublicLayout),
    children: publicRoutes,
  },
  {
    element: React.createElement(RequireGuest),
    children: [
      {
        element: React.createElement(AuthLayout),
        children: authRoutes,
      },
    ],
  },
  {
    element: React.createElement(RequireAuth),
    children: [
      ...customerRoutes,
      {
        element: React.createElement(RequireAdmin),
        children: adminRoutes,
      },
    ],
  },
  ...redirectRoutes,
];
