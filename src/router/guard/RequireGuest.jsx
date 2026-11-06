import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PATHS } from "../../config/paths";

export default function RequireGuest() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) {
    const redirectPath =
      user.role === "admin" ? PATHS.ADMIN.dashboard : PATHS.CUSTOMER.dashboard;
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
