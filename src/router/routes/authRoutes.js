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

const VerifyEmailView = lazy(
  () =>
    import("../../pages/auth").then((module) => ({
      default: module.VerifyEmailView,
    })),
);

// Standalone (no RootLayout wrapper). Guest-only.
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
];

// Opened from an email link, so it must work whether or not someone is signed in.
export const resetPasswordRoute = {
  path: "/reset-password",
  element: createLazyRouteElement(ResetPasswordView, { compactFallback: true }),
};

// Signed-in users only (the API verifies the code against the current session).
export const verifyEmailRoute = {
  path: "/verify-email",
  element: createLazyRouteElement(VerifyEmailView, { compactFallback: true }),
};
