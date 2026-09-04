import { axiosInstance } from "./axios"
import type { Profile } from "../types/user"

export const userApi = {
  profile() {
    return axiosInstance.get<Profile>("/users/profile")
  },

  logout(refreshToken: string) {
    return axiosInstance.post("/auth/logout", { RefreshToken: refreshToken });
}
}