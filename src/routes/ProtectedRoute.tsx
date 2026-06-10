import { Navigate } from "react-router"
import { Spin } from "antd"
import { useAppSelector } from "../store/hooks"
import type { JSX } from "react"

export const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element
}) => {
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