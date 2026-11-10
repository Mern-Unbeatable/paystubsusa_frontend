import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PATHS } from "../../config/paths";
import GuardRedirect from "./GuardRedirect";

export default function RequireCustomer() {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) return null;

  if (user?.role !== "customer") {
    const redirectPath =
      user?.role === "admin" ? PATHS.ADMIN.dashboard : PATHS.AUTH.login;

    return (
      <GuardRedirect
        to={redirectPath}
        replace
        state={{ from: location }}
        toastConfig={{
          id: `unauthorized:${location.pathname}`,
          type: "error",
          message: "You are not authorized to access this page.",
        }}
      />
    );
  }

  return <Outlet />;
}
