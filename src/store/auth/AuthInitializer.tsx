import { useEffect } from "react"
import { useAppDispatch } from "../hooks"
import { initializeAuthThunk } from "./authThunks"

export const AuthInitializer = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAuthThunk())
  }, [dispatch])

  return null
}