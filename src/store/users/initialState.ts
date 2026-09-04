import type { User, UserListResponse } from "../../types/admin";

import { initAsyncState, type AsyncState} from "../utils";


export interface UsersState {
  users: AsyncState<UserListResponse>;
  currentUser: AsyncState<User>;
}


export const usersInitialState: UsersState = {
  users: initAsyncState<UserListResponse>(),
  currentUser: initAsyncState<User>(),
};