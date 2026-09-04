import { axiosInstance } from "./axios"
import type { AuthData, RefreshToken, Token, UserRegistration } from "../types/auth"

export const authApi = {
  
  signup(data: UserRegistration) {
    return axiosInstance.post("/auth/signup", data)
  },

  signin(data: AuthData) {
    return axiosInstance.post<Token>("/auth/signin", data)
  },

  refreshToken(data: RefreshToken) {
    return axiosInstance.post<Token>("/auth/refresh", data)
  },
}