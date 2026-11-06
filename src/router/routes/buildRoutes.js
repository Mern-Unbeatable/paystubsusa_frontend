// router/buildRoutes.js
import React from "react";
import { Navigate } from "react-router-dom";
import { PublicLayout, AuthLayout, DashboardLayout } from "../../layouts";
import RequireAuth from "../guard/RequireAuth";
import RequireAdmin from "../guard/RequireAdmin";
import RequireGuest from "../guard/RequireGuest";
import { publicRoutes } from "./publicRoutes";
import { authRoutes } from "./authRoutes";
import { customerRoutes } from "./customerRoutes";
import { adminRoutes } from "./adminRoutes";
import { ALIASES } from "../../config/paths";

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
