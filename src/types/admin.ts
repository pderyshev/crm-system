export interface UserFilters {
  limit?: number
  offset?: number
  search?: string
  roles?: string
  orderBy?: UserOrderBy
  orderDir?: UserOrderDir
  isBlocked?: boolean
}

export type UserOrderBy =
  | "id"
  | "userName"
  | "email"
  | "createdAt"

export type UserOrderDir =
  | "asc"
  | "desc"

export interface User {
  id: number
  userName: string
  email: string
  phoneNumber: string
  birthday: string | null
  roles: Role[]
  isBlocked: boolean
  createdAt: string
  updatedAt: string
}

export interface UserListResponse {
  data: User[]
  total: number
  meta: {
    limit?: number
    offset?: number
    [key: string]: unknown
  }
}

export interface UserRolesRequest {
  roles: Role[]
}

export interface UserRequest {
  userName?: string
  email?: string
  phoneNumber?: string
  birthday?: string | null
}

export interface BlockRequest {
  isBlocked: boolean
}

export type Role =
  | "user"
  | "manager"
  | "moderator"
  | "admin"

export const Roles = {
  USER: "user",
  MANAGER: "manager",
  MODERATOR: "moderator",
  ADMIN: "admin",
} as const