import { axiosInstance } from "./axios"
import type { Profile } from "../types/user"

export const userApi = {
  profile() {
    return axiosInstance.get<Profile>("/user/profile")
  },

  logout() {
    return axiosInstance.post("/user/logout")
  }
}