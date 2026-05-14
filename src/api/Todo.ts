import axios from "axios";

import type {
  Todo,
  TodoRequest,
  FilterTodo
} from "../types/todo";

const api = axios.create({
  baseURL: "https://easydev.club/api/v1/",
  headers: {
    "Content-Type": "application/json"
  }
})

export async function getTodos(filterTodo: FilterTodo) {
  const response = await api.get("todos", {
    params: {
      filter: filterTodo,
    },
  });

  return response.data;
}

export async function deleteTodo(
  id: number
): Promise<void> {
  await api.delete(`todos/${id}`);
}

export async function createTodo(
  todoRequest: TodoRequest
): Promise<Todo> {
  const response = await api.post<Todo>(
    "todos",
    todoRequest
  );

  return response.data;
}

export async function updateTodo(
  id: number,
  todoRequest: TodoRequest
): Promise<Todo> {
  const response = await api.put<Todo>(
    `/todos/${id}`,
    todoRequest
  );

  return response.data;
}