// router/routes/authRoutes.js
import { lazy } from "react";
import { createLazyRouteElement } from "../createLazyRouteElement";

const LoginView = lazy(() => import("../../pages/auth/LoginView"));
const RegisterView = lazy(() => import("../../pages/auth/RegisterView"));

// Standalone (no RootLayout wrapper)
export const authRoutes = [
  {
    path: "/login",
    element: createLazyRouteElement(LoginView, { compactFallback: true }),
  },
  {
    path: "/register",
    element: createLazyRouteElement(RegisterView, { compactFallback: true }),
  },
];
