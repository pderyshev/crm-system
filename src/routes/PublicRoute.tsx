import { Navigate } from "react-router"
import { useAppSelector } from "../store/hooks"
import type { JSX } from "react"

interface Props {
  children: JSX.Element
}

export const PublicRoute = ({
  children,
}: Props) => {
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