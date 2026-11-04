import "./index.css";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { router } from "./router";

function App() {
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

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
