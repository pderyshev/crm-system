import { createSlice } from "@reduxjs/toolkit"
import type { Profile } from "../../types/user"

import {
  loginThunk,
  logoutThunk,
  // refreshTokenThunk,
  fetchProfileThunk,
  initializeAuthThunk,
} from "./authThunks"

interface AuthState {
  isAuthenticated: boolean
  authInitialized: boolean
  loading: boolean
  profile: Profile | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  authInitialized: false,
  loading: false,
  profile: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(loginThunk.pending, (state) => {
        state.loading = true
      })

      .addCase(loginThunk.fulfilled, (state) => {
        state.loading = false
        state.isAuthenticated = true
      })

      .addCase(loginThunk.rejected, (state) => {
        state.loading = false
      })

      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })

      .addCase(fetchProfileThunk.rejected, (state) => {
        state.loading = false
      })

      .addCase(fetchProfileThunk.pending, (state) => {
        state.loading = true
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.isAuthenticated = false
        state.profile = null
      })

      .addCase(initializeAuthThunk.fulfilled, (state, action) => {
        state.authInitialized = true

        if (action.payload) {
          state.isAuthenticated = true
        }
      }
      )

      .addCase(initializeAuthThunk.rejected, (state) => {
        state.authInitialized = true
        state.isAuthenticated = false
      }
      )
  },
})

export default authSlice.reducer