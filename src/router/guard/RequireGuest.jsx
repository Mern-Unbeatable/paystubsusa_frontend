import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PATHS } from "../../config/paths";
import { getSafeRedirectPath } from "../routes/safeRedirect";

/** Owns the post-login/register redirect, so pages never race it with their own navigate(). */
export default function RequireGuest() {
  const { user, initializing } = useAuth();
  const location = useLocation();
  if (initializing) return null;
  if (user) {
    const from = location.state?.from;
    const intended = from ? `${from.pathname}${from.search || ""}` : null;
    const fallback =
      user.role === "admin"
        ? PATHS.ADMIN.dashboard
        : user.emailVerified === false
          ? PATHS.AUTH.verifyEmail
          : PATHS.CUSTOMER.dashboard;
    return <Navigate to={getSafeRedirectPath(intended, fallback)} replace />;
  }

  return <Outlet />;
}
