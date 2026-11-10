// router/routes/authRoutes.js
import React, { lazy } from "react";
import { createLazyRouteElement } from "./createLazyRouteElement";
import { PATHS } from "../../config/paths";
// Eager: register navigates here the moment the API answers, and a lazy chunk would flash
// a loading fallback in between.
import VerifyEmailView from "../../pages/auth/VerifyEmail/VerifyEmailView";

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

// Children of /auth (AuthLayout). Guest-only.
export const authRoutes = [
  {
    path: PATHS.AUTH.login,
    element: createLazyRouteElement(LoginView, { compactFallback: true }),
  },
  {
    path: PATHS.AUTH.register,
    element: createLazyRouteElement(RegisterView, { compactFallback: true }),
  },
  {
    path: PATHS.AUTH.forgotPassword,
    element: createLazyRouteElement(ForgotPasswordView, {
      compactFallback: true,
    }),
  },
];

// Child of /auth. Signed-in users only (the API verifies the code against the current session).
export const verifyEmailRoute = {
  path: PATHS.AUTH.verifyEmail,
  element: React.createElement(VerifyEmailView),
};

// Opened from an email link, so it must work whether or not someone is signed in.
export const resetPasswordRoute = {
  path: PATHS.AUTH.resetPassword,
  element: createLazyRouteElement(ResetPasswordView, { compactFallback: true }),
};
