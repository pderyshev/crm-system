import { createSlice } from "@reduxjs/toolkit"
import {
  addAsyncBuilderCases,
} from "../utils"
import {
  usersInitialState,
} from "./initialState"
import {
  fetchUsersThunk,
  fetchUserThunk,
  updateUserThunk,
  updateRolesThunk,
  updateBlockStatusThunk,
  deleteUserThunk,
} from "./usersThunks"

const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncBuilderCases(
      builder,
      fetchUsersThunk,
      "users"
    )

    addAsyncBuilderCases(
      builder,
      fetchUserThunk,
      "currentUser"
    )

    builder.addCase(
      updateUserThunk.fulfilled,
      (state, action) => {
        state.currentUser.data = action.payload
        if (state.users.data) {
          state.users.data.data = state.users.data.data.map((user) =>
            user.id === action.payload.id
              ? action.payload
              : user
          )
        }
      }
    )

    builder.addCase(
      updateRolesThunk.fulfilled,
      (state, action) => {
        state.currentUser.data = action.payload
        if (state.users.data) {
          state.users.data.data = state.users.data.data.map((user) =>
            user.id === action.payload.id
              ? action.payload
              : user
          )
        }
      }
    )

    builder.addCase(
      updateBlockStatusThunk.fulfilled,
      (state, action) => {
        state.currentUser.data = action.payload
        if (state.users.data) {
          state.users.data.data = state.users.data.data.map((user) =>
            user.id === action.payload.id
              ? action.payload
              : user
          )
        }
      }
    )

    builder.addCase(
      deleteUserThunk.fulfilled,
      (state, action) => {
        if (!state.users.data) {
          return
        }
        state.users.data.data = state.users.data.data.filter((user) =>
          user.id !== action.payload
        )
        state.users.data.total -= 1
        if (state.currentUser.data?.id === action.payload) {
          state.currentUser.data = null
        }
      }
    )
  },
})


export default usersSlice.reducer