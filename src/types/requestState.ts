import type { TodoList, TodoInfo } from "./todo";

interface IdleRequestState { status: "idle"; }
interface LoadingRequestState { status: "pending"; }
interface SuccessRequestState {
  status: "success";
  data: TodoList;
  info: TodoInfo
}
interface ErrorRequestState {
  status: "error";
  error: unknown;
}

export type RequestState =
  | IdleRequestState
  | LoadingRequestState
  | SuccessRequestState
  | ErrorRequestState;