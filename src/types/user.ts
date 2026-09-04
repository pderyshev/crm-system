export interface Profile {
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

export interface ProfileRequest {
  userName?: string
  email?: string
  phoneNumber?: string
  birthday?: string | null
}

export interface PasswordRequest {
  password: string
}

export const Roles = {
  USER: "user",
  MANAGER: "manager",
  MODERATOR: "moderator",
  ADMIN: "admin"
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];