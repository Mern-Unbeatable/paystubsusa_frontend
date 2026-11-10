import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PATHS } from "../../config/paths";
import { getSafeRedirectPath } from "../routes/safeRedirect";

/**
 * Sends signed-in users away from guest pages (also the post-login redirect). Register
 * navigates itself, but only ever to the same verify-email target this would pick.
 */
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
