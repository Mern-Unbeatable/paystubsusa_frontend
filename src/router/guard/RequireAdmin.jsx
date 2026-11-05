import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PATHS } from "../config/paths";
import GuardRedirect from "./GuardRedirect";

export default function RequireAdmin() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return null;
  if (!user)
    return (
      <GuardRedirect
        to={PATHS.AUTH.login}
        replace
        state={{ from: location }}
        toastConfig={{
          id: `auth-required:${location.pathname}`,
          type: "error",
          message: "Please log in to continue.",
        }}
      />
    );

  if (user.role !== "admin")
    return (
      <GuardRedirect
        to={PATHS.CUSTOMER.dashboard}
        replace
        toastConfig={{
          id: `unauthorized:${location.pathname}`,
          type: "error",
          message: "You are not authorized to access this page.",
        }}
      />
    );

  return <Outlet />;
}
