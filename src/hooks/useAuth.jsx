import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthLoading,
  selectAuthStatus,
  selectAuthUser,
  selectIsAuthenticated,
} from "../features/auth/authSelectors";
import {
  loginAsDemoUser,
  loginUser,
  logoutUser,
  registerUser,
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

  const loginAs = useCallback(
    (userKey) => dispatch(loginAsDemoUser(userKey)).unwrap(),
    [dispatch],
  );

  const logout = useCallback(() => dispatch(logoutUser()).unwrap(), [dispatch]);

  return {
    user,
    loading,
    status,
    error,
    isAuthenticated,
    login,
    register,
    loginAs,
    logout,
  };
}
