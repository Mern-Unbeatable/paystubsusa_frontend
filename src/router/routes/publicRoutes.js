// router/routes/publicRoutes.js
import React, { lazy } from "react";
import HomeView from "../../pages/public/public_Home/HomeView";
import { createLazyRouteElement } from "../createLazyRouteElement";

const PaystubGeneratorView = lazy(
  () => import("../../pages/public/public_generator/PaystubGeneratorView"),
);
const W2View = lazy(() => import("../../pages/public/public_w2/W2View"));
const Nec1099View = lazy(
  () => import("../../pages/public/public_1099/Nec1099View"),
);
const DirectDepositView = lazy(
  () => import("../../pages/public/public_direct_deposit/DirectDepositView"),
);
const PricingView = lazy(
  () => import("../../pages/public/public_pricing/PricingView"),
);
const FindPaystubsView = lazy(
  () => import("../../pages/public/public_find_paystubs/FindPaystubsView"),
);
const AboutView = lazy(
  () => import("../../pages/public/public_about/AboutView"),
);
const NotFound = lazy(() => import("../../pages/error/NotFound"));

// Rendered inside RootLayout (shared header/footer)
export const publicRoutes = [
  { index: true, element: React.createElement(HomeView) },
  {
    path: "paystub-generator",
    element: createLazyRouteElement(PaystubGeneratorView),
  },
  { path: "w-2", element: createLazyRouteElement(W2View) },
  { path: "1099-nec", element: createLazyRouteElement(Nec1099View) },
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
