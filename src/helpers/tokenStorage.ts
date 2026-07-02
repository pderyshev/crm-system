const REFRESH_TOKEN = "refresh_token"

class TokenManager {
  private accessToken: string | null = null;

  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(
    token: string
  ) {
    this.accessToken = token;
  }

  clear() {
    this.accessToken = null;
  }
}

export const tokenManager = new TokenManager();

export const refreshTokenStorage = {

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN)
  },

  setRefreshTokens(refreshToken: string) {
    localStorage.setItem(REFRESH_TOKEN, refreshToken)
  },

  clear() {
    localStorage.removeItem(REFRESH_TOKEN)
  }
}