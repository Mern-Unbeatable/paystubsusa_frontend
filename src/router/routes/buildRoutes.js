// router/buildRoutes.js
import React from "react";
import { Navigate } from "react-router-dom";
import { PublicLayout, AuthLayout, DashboardLayout } from "../../layouts";
import RequireAuth from "../guard/RequireAuth";
import RequireAdmin from "../guard/RequireAdmin";
import RequireCustomer from "../guard/RequireCustomer";
import RequireGuest from "../guard/RequireGuest";
import { publicRoutes } from "./publicRoutes";
import { authRoutes, resetPasswordRoute, verifyEmailRoute } from "./authRoutes";
import { customerRoutes } from "./customerRoutes";
import { adminRoutes } from "./adminRoutes";
import { ALIASES, PATHS } from "../../config/paths";

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
    // One AuthLayout for every /auth page, so register -> verify-email swaps only the page
    // (guards are pathless siblings underneath it) instead of remounting the whole tree.
    path: PATHS.AUTH.root,
    element: React.createElement(AuthLayout),
    children: [
      {
        index: true,
        element: React.createElement(Navigate, {
          to: PATHS.AUTH.login,
          replace: true,
        }),
      },
      {
        element: React.createElement(RequireGuest),
        children: authRoutes,
      },
      {
        element: React.createElement(RequireAuth),
        children: [verifyEmailRoute],
      },
    ],
  },
  {
    element: React.createElement(AuthLayout),
    children: [resetPasswordRoute],
  },
  {
    element: React.createElement(RequireAuth),
    children: [
      {
        element: React.createElement(RequireCustomer),
        children: customerRoutes,
      },
      {
        element: React.createElement(RequireAdmin),
        children: adminRoutes,
      },
    ],
  },
  ...redirectRoutes,
];
