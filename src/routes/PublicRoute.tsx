import { Navigate } from "react-router"
import { useAppSelector } from "../store/hooks"
import type { PropsWithChildren } from "react"


export const PublicRoute = ({
  children,
}: PropsWithChildren) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  if (isAuthenticated) {
    return (
      <Navigate
        to="/todos"
        replace
      />
    )
  }

  return children
}