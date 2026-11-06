// router/routes/authRoutes.js
import { lazy } from "react";
import { createLazyRouteElement } from "./createLazyRouteElement";

const LoginView = lazy(
  () =>
    import("../../pages/auth").then((module) => ({
      default: module.LoginView,
    })),
);
const RegisterView = lazy(
  () =>
    import("../../pages/auth").then((module) => ({
      default: module.RegisterView,
    })),
);
const ForgotPasswordView = lazy(
  () =>
    import("../../pages/auth").then((module) => ({
      default: module.ForgotPasswordView,
    })),
);
const ResetPasswordView = lazy(
  () =>
    import("../../pages/auth").then((module) => ({
      default: module.ResetPasswordView,
    })),
);

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
  {
    path: "/forgot-password",
    element: createLazyRouteElement(ForgotPasswordView, {
      compactFallback: true,
    }),
  },
  {
    path: "/reset-password",
    element: createLazyRouteElement(ResetPasswordView, {
      compactFallback: true,
    }),
  },
];
