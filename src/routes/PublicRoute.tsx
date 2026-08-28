import { Navigate, Outlet } from "react-router"
import { useAppSelector } from "../store/hooks"

export const PublicRoute = () => {
  const { isAuthenticated, authInitialized } =
    useAppSelector((state) => state.auth);

  if (!authInitialized) {
    return null;
  }

  return isAuthenticated
    ? <Navigate to="/" replace />
    : <Outlet />;
};