import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { adminApi } from "../../api/admin.api"
import type {
  User,
  UserFilters,
  UserListResponse,
  UserRequest,
  UserRolesRequest,
  BlockRequest,
} from "../../types/admin"

export const fetchUsersThunk = createAsyncThunk<
  UserListResponse,
  UserFilters
>(
  "users/fetchUsers",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await adminApi.getUsers(filters)

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.status ?? 500
        )
      }
      return rejectWithValue(500)
    }
  }
)

export const fetchUserThunk = createAsyncThunk<
  User,
  number
>(
  "users/fetchUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminApi.getUser(id)

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.status ?? 500
        )
      }
      return rejectWithValue(500)
    }
  }
)

export const updateUserThunk = createAsyncThunk<
  User,
  {
    id: number
    data: UserRequest
  }
>(
  "users/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await adminApi.updateUser(id, data)

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.status ?? 500
        )
      }
      return rejectWithValue(500)
    }
  }
)

export const updateRolesThunk = createAsyncThunk<
  User,
  {
    id: number
    data: UserRolesRequest
  }
>(
  "users/updateRoles",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await adminApi.updateRoles(id, data)

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.status ?? 500
        )
      }
      return rejectWithValue(500)
    }
  }
)

export const updateBlockStatusThunk = createAsyncThunk<
  User,
  {
    id: number
    data: BlockRequest
  }
>(
  "users/updateBlockStatus",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response =
        await adminApi.updateBlockStatus(id, data)

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.status ?? 500
        )
      }
      return rejectWithValue(500)
    }
  }
)


export const deleteUserThunk = createAsyncThunk<
  number,
  number
>(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await adminApi.deleteUser(id)

      return id
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.status ?? 500
        )
      }
      return rejectWithValue(500)
    }
  }
)