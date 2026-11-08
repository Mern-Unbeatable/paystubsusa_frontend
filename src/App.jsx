import "./index.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { bootstrapAuth } from "./features/auth/authThunks";
import { router } from "./router";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

  useEffect(() => {
    const preloadAuthRoutes = () => {
      import("./pages/auth/Login/LoginView");
      import("./pages/auth/Register/RegisterView");
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(preloadAuthRoutes, {
        timeout: 2500,
      });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(preloadAuthRoutes, 1200);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2600,
          style: {
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 600,
          },
          error: {
            style: {
              background: "#DC2626",
              color: "#FFFFFF",
            },
          },
          success: {
            style: {
              background: "#059669",
              color: "#FFFFFF",
            },
          },
        }}
      />
    </>
  );
}

export default App;
