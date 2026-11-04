import "./index.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { bootstrapAuth } from "./features/auth/authThunks";
import { router } from "./router";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

  useEffect(() => {
    const preloadAuthRoutes = () => {
      import("./pages/auth/LoginView");
      import("./pages/auth/RegisterView");
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

  return <RouterProvider router={router} />;
}

export default App;
