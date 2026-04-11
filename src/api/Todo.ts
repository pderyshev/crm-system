import type {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
  FilterTodo
} from "../types/todo";

export function getTodos(filterTodo: FilterTodo): Promise<MetaResponse<Todo, TodoInfo>> {
  return fetch(`https://easydev.club/api/v1/todos?filter=${filterTodo}`)
    .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to get todo")
    }
    return response.json()
  })
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

export async function createTodo(todoRequest: TodoRequest): Promise<Todo> {
  return fetch("https://easydev.club/api/v1/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(todoRequest)
  })
    .then(validateTodoResponse)
    .then((response) => response.json())
}

export function updateTodo(id: number, todoRequest: TodoRequest): Promise<Todo> {
  return fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoRequest)
  }).then((response) => {
    if (!response.ok) throw new Error("Failed to update todo")
    return response.json()
  })
}