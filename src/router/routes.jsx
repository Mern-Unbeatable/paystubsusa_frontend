import { createBrowserRouter } from "react-router";
import App from "../App";
import RootLayout from "../layout/RootLayout";
import HomeView from "../pages/public/public_Home/HomeView";
import PaystubGeneratorView from "../pages/public/public_generator/PaystubGeneratorView";
import W2View from "../pages/public/public_w2/W2View";
import Nec1099View from "../pages/public/public_1099/Nec1099View";
import DirectDepositView from "../pages/public/public_direct_deposit/DirectDepositView";
import PricingView from "../pages/public/public_pricing/PricingView";
import FindPaystubsView from "../pages/public/public_find_paystubs/FindPaystubsView";
import LoginView from "../pages/public/public_auth/LoginView";
import RegisterView from "../pages/public/public_auth/RegisterView";
import CustomerDashboardView from "../pages/dashboard/CustomerDashboardView";
import AdminDashboardView from "../pages/dashboard/AdminDashboardView";
import AboutView from "../pages/public/public_about/AboutView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: "paystub-generator",
        element: <PaystubGeneratorView />,
      },
      {
        path: "generator",
        element: <PaystubGeneratorView />,
      },
      {
        path: "w-2",
        element: <W2View />,
      },
      {
        path: "w2",
        element: <W2View />,
      },
      {
        path: "1099-nec",
        element: <Nec1099View />,
      },
      {
        path: "1099",
        element: <Nec1099View />,
      },
      {
        path: "direct-deposit",
        element: <DirectDepositView />,
      },
      {
        path: "pricing",
        element: <PricingView />,
      },
      {
        path: "find-paystubs",
        element: <FindPaystubsView />,
      },
      {
        path: "find-your-paystubs",
        element: <FindPaystubsView />,
      },
      {
        path: "about",
        element: <AboutView />,
      },
      {
        path: "about-us",
        element: <AboutView />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginView />,
  },
  {
    path: "/signin",
    element: <LoginView />,
  },
  {
    path: "/register",
    element: <RegisterView />,
  },
  {
    path: "/signup",
    element: <RegisterView />,
  },
  {
    path: "/dashboard",
    element: <CustomerDashboardView />,
  },
  {
    path: "/customer/dashboard",
    element: <CustomerDashboardView />,
  },
  {
    path: "/admin",
    element: <AdminDashboardView />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboardView />,
  },
]);