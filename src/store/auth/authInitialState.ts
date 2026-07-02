import type { Profile } from "../../types/user";
import {
  initAsyncState,
  type AsyncState
} from "../utils"

export interface AuthState {
  isAuthenticated: boolean
  authInitialized: boolean
  profile: AsyncState<Profile>
}

export const authInitialState: AuthState = {
  isAuthenticated: false,
  authInitialized: false,
  profile: initAsyncState<Profile>()
}