import axios from "axios";
import {
  refreshTokenStorage,
  tokenManager,
} from "../helpers/tokenStorage";
import { authApi } from "./auth.api";

interface RetryConfig {
  _retry?: boolean;
}

export const axiosInstance = axios.create({
  baseURL: "https://easydev.club/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = tokenManager.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config as
      | (RetryConfig & typeof error.config)
      | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isUnauthorized =
      error.response?.status === 401;

    const url = originalRequest.url ?? "";

    const isRefreshRequest =
      url.includes("/auth/refresh");

    const isLoginRequest =
      url.includes("/auth/signin");

    const isRegisterRequest =
      url.includes("/auth/signup");

    if (
      !isUnauthorized ||
      originalRequest._retry ||
      isRefreshRequest ||
      isLoginRequest ||
      isRegisterRequest
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken =
      refreshTokenStorage.getRefreshToken();

    if (!refreshToken) {
      tokenManager.clear();
      refreshTokenStorage.clear();

      window.location.href = "/login";

      return Promise.reject(error);
    }

    try {
      const response =
        await authApi.refreshToken({
          refreshToken,
        });

      tokenManager.setAccessToken(
        response.data.accessToken
      );

      refreshTokenStorage.setRefreshTokens(
        response.data.refreshToken
      );

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${response.data.accessToken}`,
      };

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      tokenManager.clear();
      refreshTokenStorage.clear();

      return Promise.reject(refreshError);
    }
  }
);