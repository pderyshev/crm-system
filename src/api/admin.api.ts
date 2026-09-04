import type {
  BlockRequest,
  User,
  UserFilters,
  UserListResponse,
  UserRequest,
  UserRolesRequest,
} from "../types/admin"

import { axiosInstance } from "./axios"

export const adminApi = {
  
  getUsers(params: UserFilters) {
    return axiosInstance.get<UserListResponse>("/users/", { params, })
  },

  getUser(id: number) {
    return axiosInstance.get<User>(`/users/${id}`)
  },

  updateUser(id: number, data: UserRequest) {
    return axiosInstance.put<User>(`/users/${id}`, data)
  },

  updateRoles(id: number, data: UserRolesRequest) {
    return axiosInstance.put<User>(`/users/${id}/roles`, data)
  },

  updateBlockStatus(id: number, data: BlockRequest) {
    return axiosInstance.put<User>(`/users/${id}/block`, data)
  },

  deleteUser(id: number) {
    return axiosInstance.delete<void>(`/users/${id}`)
  },
}