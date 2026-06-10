import axios from "axios";
import { tokenStorage } from "../helpers/tokenStorage";
import { authApi } from "./auth.api";

interface RetryConfig {
  _retry?: boolean;
}

export const axiosInstance = axios.create({
  baseURL: "https://easydev.club/api/v1/",
  headers: {
    "Content-Type": "application/json"
  }
})

axiosInstance.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getAccessToken()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
 return config;
})

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest =
      error.config as RetryConfig &
        typeof error.config;

    const isUnauthorized =
      error.response?.status === 401

    const isRefreshRequest =
      originalRequest.url?.includes(
        "/auth/refresh"
      );

    if (
      isUnauthorized &&
      !originalRequest._retry &&
      !isRefreshRequest
    ) {
      originalRequest._retry = true;

      const refreshToken =
        tokenStorage.getRefreshToken()

      if (!refreshToken) {
        tokenStorage.clear();

        window.location.href = "/login"

        return Promise.reject(error)
      }

      try {
        const response =
          await authApi.refreshToken({
            refreshToken,
          });

        tokenStorage.setTokens(
          response.data.accessToken,
          response.data.refreshToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${response.data.accessToken}`

        return axiosInstance(
          originalRequest
        );
      } catch (refreshError) {
        tokenStorage.clear()

        window.location.href = "/login";

        return Promise.reject(
          refreshError
        );
      }
    }

    return Promise.reject(error)
  }
);