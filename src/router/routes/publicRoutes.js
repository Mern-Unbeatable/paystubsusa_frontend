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
const W2PreviewView = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.W2PreviewView,
    })),
);
const W2CheckoutView = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.W2CheckoutView,
    })),
);
const W2SuccessView = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.W2SuccessView,
    })),
);
const Tax1099View = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.Tax1099View,
    })),
);
const Nec1099PreviewView = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.Nec1099PreviewView,
    })),
);
const Nec1099CheckoutView = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.Nec1099CheckoutView,
    })),
);
const Nec1099SuccessView = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.Nec1099SuccessView,
    })),
);
const DirectDepositView = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.DirectDepositView,
    })),
);
const DirectDepositPreviewView = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.DirectDepositPreviewView,
    })),
);
const DirectDepositCheckoutView = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.DirectDepositCheckoutView,
    })),
);
const DirectDepositSuccessView = lazy(
  () =>
    import("../../pages/public").then((module) => ({
      default: module.DirectDepositSuccessView,
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
  { path: PATHS.PUBLIC.w2, element: createLazyRouteElement(W2View) },
  {
    path: PATHS.PUBLIC.w2Preview,
    element: createLazyRouteElement(W2PreviewView),
  },
  {
    path: PATHS.PUBLIC.w2Checkout,
    element: createLazyRouteElement(W2CheckoutView),
  },
  {
    path: PATHS.PUBLIC.w2Success,
    element: createLazyRouteElement(W2SuccessView),
  },
  { path: PATHS.PUBLIC.nec1099, element: createLazyRouteElement(Tax1099View) },
  {
    path: PATHS.PUBLIC.nec1099Preview,
    element: createLazyRouteElement(Nec1099PreviewView),
  },
  {
    path: PATHS.PUBLIC.nec1099Checkout,
    element: createLazyRouteElement(Nec1099CheckoutView),
  },
  {
    path: PATHS.PUBLIC.nec1099Success,
    element: createLazyRouteElement(Nec1099SuccessView),
  },
  {
    path: PATHS.PUBLIC.directDeposit,
    element: createLazyRouteElement(DirectDepositView),
  },
  {
    path: PATHS.PUBLIC.directDepositPreview,
    element: createLazyRouteElement(DirectDepositPreviewView),
  },
  {
    path: PATHS.PUBLIC.directDepositCheckout,
    element: createLazyRouteElement(DirectDepositCheckoutView),
  },
  {
    path: PATHS.PUBLIC.directDepositSuccess,
    element: createLazyRouteElement(DirectDepositSuccessView),
  },
  { path: "pricing", element: createLazyRouteElement(PricingView) },
  { path: "find-paystubs", element: createLazyRouteElement(FindPaystubsView) },
  { path: "about", element: createLazyRouteElement(AboutView) },
  {
    path: "*",
    element: createLazyRouteElement(NotFound, { compactFallback: true }),
  },
];
