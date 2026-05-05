
interface IdleRequestState { status: "idle"; }
interface LoadingRequestState { status: "pending"; }
interface SuccessRequestState { status: "success"; }
interface ErrorRequestState {
  status: "error";
  error: unknown;
}

export type RequestState =
  | IdleRequestState
  | LoadingRequestState
  | SuccessRequestState
  | ErrorRequestState;