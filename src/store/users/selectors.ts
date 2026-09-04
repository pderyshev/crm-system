import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const selectUsersStore = (state: RootState) => state.users;

export const selectUsers = createSelector(selectUsersStore, (state) => state.users);

export const selectUsersData = createSelector(selectUsers, (users) => users.data);

export const selectUsersList = createSelector(selectUsersData, (users) => users?.data ?? []);

export const selectUsersLoading = createSelector(selectUsers, (users) => users.status === "pending");

export const selectUsersTotal = createSelector(selectUsersData, (users) => users?.total ?? 0);

export const selectCurrentUser = createSelector(selectUsersStore, (state) => state.currentUser);

export const selectCurrentUserData = createSelector(selectCurrentUser, (user) => user.data);

export const selectCurrentUserLoading = createSelector(selectCurrentUser, (user) => user.status === "pending");