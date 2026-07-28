import { Navigate } from "react-router"
import { Spin } from "antd"
import { useAppSelector } from "../store/hooks"
import type { PropsWithChildren } from "react"

export const ProtectedRoute = ({
  children,
}: PropsWithChildren) => {
  const {
    isAuthenticated,
    authInitialized,
  } = useAppSelector((state) => state.auth)

  if (!authInitialized) {
    return <Spin fullscreen />
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  return children
}