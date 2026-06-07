import { axiosInstance } from "./axios";

import type {
  Todo,
  TodoRequest,
  FilterTodo,
  MetaResponse,
  TodoInfo
} from "../types/todo";

export async function getTodos(filterTodo: FilterTodo):Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await axiosInstance.get("todos", {
    params: {
      filter: filterTodo,
    },
  });

  return response.data;
}

export async function deleteTodo(
  id: number
): Promise<void> {
  await axiosInstance.delete(`todos/${id}`);
}

export async function createTodo(
  todoRequest: TodoRequest
): Promise<Todo> {
  const response = await axiosInstance.post<Todo>(
    "todos",
    todoRequest
  );

  return response.data;
}

export async function updateTodo(
  id: number,
  todoRequest: TodoRequest
): Promise<Todo> {
  const response = await axiosInstance.put<Todo>(
    `/todos/${id}`,
    todoRequest
  );

  return response.data;
}