import type {
  ActionReducerMapBuilder,
  AsyncThunk
} from "@reduxjs/toolkit"

export interface AsyncState<T> {
  data: T | null;
  error: unknown;
  errorCounter: number;
  status:
  | "idle"
  | "pending"
  | "fulfiled"
  | "rejected"
}

export const initAsyncState = <T>(
  data: T | null = null
): AsyncState<T> => ({
  data,
  error: null,
  errorCounter: 0,
  status: "idle"
});

export const addAsyncBuilderCases = <TState, TResult>(
  builder: ActionReducerMapBuilder<TState>,
  thunk: AsyncThunk<TResult, any, any>,
  key: keyof TState
) => {
  builder.addCase(
    thunk.pending, (state: any) => {
      state[key].status = "pending"
    }
  )

  builder.addCase(
    thunk.fulfilled,
    (state: any, action) => {
      state[key].status = "fulfilled";
      state[key].data = action.payload;
      state[key].error = null;
      state[key].errorCounter = 0;
    }
  );

  builder.addCase(
    thunk.rejected,
    (state: any, action) => {
      state[key].status = "rejected";
      state[key].error = action.payload;
      state[key].errorCounter += 1;
    }
  );
}