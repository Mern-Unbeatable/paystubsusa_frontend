import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../pages/auth/hooks/useAuth";
import { PATHS } from "../../config/paths";
import { getSafeRedirectPath } from "../routes/safeRedirect";

/**
 * Sends signed-in users away from guest pages (also the post-login redirect). Verification
 * is offered only right after registering (Register navigates there itself); a later login
 * of an unverified user goes straight to the dashboard, where Profile offers verification.
 */
export default function RequireGuest() {
  const { user, initializing } = useAuth();
  const location = useLocation();
  if (initializing) return null;
  if (user) {
    const from = location.state?.from;
    const intended = from ? `${from.pathname}${from.search || ""}` : null;
    const justRegistered =
      location.pathname === PATHS.AUTH.register && user.emailVerified === false;
    const fallback =
      user.role === "admin"
        ? PATHS.ADMIN.dashboard
        : justRegistered
          ? PATHS.AUTH.verifyEmail
          : PATHS.CUSTOMER.dashboard;
    return <Navigate to={getSafeRedirectPath(intended, fallback)} replace />;
  }

  return <Outlet />;
}
