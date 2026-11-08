// router/routes/publicRoutes.js
import React, { lazy } from "react";
import { HomeView } from "../../pages/public";
import { createLazyRouteElement } from "./createLazyRouteElement";
import { PATHS } from "../../config/paths";

const GeneratorView = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.GeneratorView,
    })),
);
const PaystubCreateView = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.PaystubCreateView,
    })),
);
const PaystubPackageView = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.PaystubPackageView,
    })),
);
const PaystubCheckoutView = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.PaystubCheckoutView,
    })),
);
const PaystubSuccessView = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.PaystubSuccessView,
    })),
);
const W2View = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.W2View,
    })),
);
const Tax1099View = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.Tax1099View,
    })),
);
const DirectDepositView = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.DirectDepositView,
    })),
);
const PricingView = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.PricingView,
    })),
);
const FindPaystubsView = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.FindPaystubsView,
    })),
);
const AboutView = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.AboutView,
    })),
);
const NotFound = lazy(() => import("../../pages/error/NotFound"));

// Rendered inside PublicLayout (shared header/footer)
export const publicRoutes = [
  { index: true, element: React.createElement(HomeView) },
  {
    path: "paystub-generator",
    element: createLazyRouteElement(GeneratorView),
  },
  {
    path: PATHS.PUBLIC.paystubCreate,
    element: createLazyRouteElement(PaystubCreateView),
  },
  {
    path: PATHS.PUBLIC.paystubPackage,
    element: createLazyRouteElement(PaystubPackageView),
  },
  {
    path: PATHS.PUBLIC.paystubCheckout,
    element: createLazyRouteElement(PaystubCheckoutView),
  },
  {
    path: PATHS.PUBLIC.paystubSuccess,
    element: createLazyRouteElement(PaystubSuccessView),
  },
  { path: "w-2", element: createLazyRouteElement(W2View) },
  { path: "1099-nec", element: createLazyRouteElement(Tax1099View) },
  {
    path: "direct-deposit",
    element: createLazyRouteElement(DirectDepositView),
  },
  { path: "pricing", element: createLazyRouteElement(PricingView) },
  { path: "find-paystubs", element: createLazyRouteElement(FindPaystubsView) },
  { path: "about", element: createLazyRouteElement(AboutView) },
  {
    path: "*",
    element: createLazyRouteElement(NotFound, { compactFallback: true }),
  },
];
