import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PATHS } from "../config/paths";

export default function RequireGuest() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to={PATHS.CUSTOMER.dashboard} replace />;

  return <Outlet />;
}
