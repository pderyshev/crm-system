import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const selectAuthStore = (
  state: RootState
) => state.auth 

export const selectIsAuthenticated = createSelector(
  selectAuthStore,
  (state) => state.isAuthenticated
)

export const selectAuthInitialized = createSelector(
  selectAuthStore,
  (state) => state.authInitialized
)

export const selectProfile = createSelector(
  selectAuthStore,
  (state) => state.profile
)

export const selectProfileData = createSelector(
    selectProfile,
    (profile) => profile.data
  );

export const selectProfileLoading = createSelector(
    selectProfile,
    (profile) =>
      profile.status === "pending"
  );