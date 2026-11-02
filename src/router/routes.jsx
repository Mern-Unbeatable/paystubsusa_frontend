import { createBrowserRouter } from "react-router";
import App from "../App";
import RootLayout from "../layout/RootLayout";
import HomeView from "../pages/public/public_Home/HomeView";
import PaystubGeneratorView from "../pages/public/public_generator/PaystubGeneratorView";
import W2View from "../pages/public/public_w2/W2View";
import Nec1099View from "../pages/public/public_1099/Nec1099View";
import DirectDepositView from "../pages/public/public_direct_deposit/DirectDepositView";

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
    ],
  },
]);