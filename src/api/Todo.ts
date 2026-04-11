import type { FilterTodo } from "../types/todo";
import type {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest
} from "../types/todo";

export function getTodos(filter: FilterTodo): Promise<MetaResponse<Todo, TodoInfo>> {
  return fetch(`https://easydev.club/api/v1/todos?filter=${filter}`)
    .then((response) => response.json())
}

export function deleteTodo(id: number): Promise<void> {
  return fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to delete todo")
    }
  })
}

async function validateTodoResponse(response: Response): Promise<Response> {
  if (!response.ok) {
    throw new Error(await response.text())
  }

  return response
}

export async function responseNewTodo(todo: TodoRequest): Promise<void> {
  return fetch("https://easydev.club/api/v1/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(todo)
  })
    .then(validateTodoResponse)
    .then(() => undefined)
}

export function updateTodo(id: number, data: TodoRequest): Promise<void> {
  return fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  }).then((response) => {
    if (!response.ok) throw new Error("Failed to update todo")
  })
}