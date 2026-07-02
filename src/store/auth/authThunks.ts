import { createAsyncThunk } from "@reduxjs/toolkit"
import type { AuthData, UserRegistration } from "../../types/auth"
import { authApi } from "../../api/auth.api"
import { userApi } from "../../api/user.api"
import { tokenManager, refreshTokenStorage } from "../../helpers/tokenStorage"
import axios from "axios"

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (data: UserRegistration,
    { rejectWithValue }
  ) => {
    try {
      const response = await authApi.signup(data)

      return response.data
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.status)
      }

      return rejectWithValue(500)
    }
  }
)

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data: AuthData, { rejectWithValue }) => {
    try {
      const response = await authApi.signin(data)

      tokenManager.setAccessToken(
        response.data.accessToken
      )

      refreshTokenStorage.setRefreshTokens(
        response.data.refreshToken
      )

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.status)
      }

      return rejectWithValue(500)
    }
  }
)

export const fetchProfileThunk = createAsyncThunk(
  "user/profile",
  async () => {
    const response = await userApi.profile()

    return response.data
  }
)

export const logoutThunk = createAsyncThunk(
  "user/logout",
  async () => {
    try {
      await userApi.logout()
    } finally {
      tokenManager.clear()
      refreshTokenStorage.clear()
    }
  }
)

export const initializeAuthThunk =
  createAsyncThunk(
    "auth/initialize",
    async (_, {
        dispatch,
        rejectWithValue,
      }
    ) => {
      const refreshToken = refreshTokenStorage.getRefreshToken()

      if (!refreshToken) {
        return null
      }

      try {
        const response = await authApi.refreshToken({ refreshToken })

        tokenManager.setAccessToken(
          response.data.accessToken
        )

        refreshTokenStorage.setRefreshTokens(
          response.data.refreshToken
        )

        await dispatch(fetchProfileThunk())

        return response.data
      } catch {
        tokenManager.clear()
        refreshTokenStorage.clear()

        return rejectWithValue(
          "Срок действия токена истек."
        )
      }
    }
  )
