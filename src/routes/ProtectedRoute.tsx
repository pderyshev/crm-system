import { Navigate, Outlet } from "react-router"
import { useAppSelector } from "../store/hooks"

export const ProtectedRoute = () => {
  const {
    isAuthenticated,
    authInitialized,
  } = useAppSelector((state) => state.auth)

  if (!authInitialized) {
    return null
  }

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/login" replace />
}