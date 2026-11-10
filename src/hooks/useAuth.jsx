import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthLoading,
  selectAuthStatus,
  selectAuthUser,
  selectIsAuthenticated,
} from "../features/auth/authSelectors";
import { authService } from "../features/auth/auth.service";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyEmail as verifyEmailThunk,
} from "../features/auth/authThunks";

export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const loading = useSelector(selectAuthLoading);
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const login = useCallback(
    (credentials) => dispatch(loginUser(credentials)).unwrap(),
    [dispatch],
  );

  const register = useCallback(
    (payload) => dispatch(registerUser(payload)).unwrap(),
    [dispatch],
  );

  const logout = useCallback(() => dispatch(logoutUser()).unwrap(), [dispatch]);

  const verifyEmail = useCallback(
    (code) => dispatch(verifyEmailThunk(code)).unwrap(),
    [dispatch],
  );

  return {
    user,
    loading,
    status,
    // True until the first session restore settles; guards wait on this, not on `loading`.
    initializing: status === "idle" || status === "bootstrapping",
    error,
    isAuthenticated,
    login,
    register,
    logout,
    verifyEmail,
    forgotPassword: authService.forgotPassword,
    resetPassword: authService.resetPassword,
    resendVerification: authService.resendVerification,
  };
}
