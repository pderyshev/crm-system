import { createSlice } from "@reduxjs/toolkit";
import { authInitialState } from "./authInitialState";
import { addAsyncBuilderCases } from "../utils";
import { fetchProfileThunk, initializeAuthThunk, loginThunk, logoutThunk } from "./authThunks";

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {},

  extraReducers(builder) {
    addAsyncBuilderCases(
      builder,
      fetchProfileThunk,
      "profile"
    )

    builder
      .addCase(
        loginThunk.fulfilled,
        (state) => {
          state.isAuthenticated = true
        }
      )

      .addCase(
        logoutThunk.fulfilled,
        (state) => {
          state.isAuthenticated = false
          state.profile.data = null
        }
      )

      .addCase(
        initializeAuthThunk.fulfilled,
        (state, action) => {
          state.authInitialized = true

          if (action.payload) {
            state.isAuthenticated = true
          }
        }
      )

      .addCase(
        initializeAuthThunk.rejected,
        (state) => {
          state.authInitialized = true
          state.isAuthenticated = false
        }
      )
  }
})

export default authSlice.reducer
