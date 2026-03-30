export interface TodoRequest {
  title?: string;
  isDone?: boolean;  // изменение статуса задачи происходит через этот флаг
}

export interface Todo {
  id: number;
  title: string;
  created: string; // ISO date string 
  isDone: boolean;
}

export interface TodoInfo {
  all: number
  completed: number
  inWork: number
}

export interface MetaResponse<T, N> {
  data: T[]
  info?: N
  meta: {
    totalAmount: number
  }
}

export type TodoList = Todo[];

export interface FetshTodoList {
  data: TodoList
}

export type FetchTodoListResponse = FetshTodoList

export function isTodo(data: unknown): data is Todo {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    typeof data.id === "number" &&
    "title" in data &&
    typeof data.title === "string" &&
    "created" in data &&
    typeof data.created === "string" &&
    "isDone" in data &&
    typeof data.isDone === "boolean"
  )
}

export function fetchTodoList():Promise<FetchTodoListResponse> {
  return fetch("https://easydev.club/api/v1/todos")
    .then((response) => response.json())
}

export function deleteTodo(id: number): Promise<void> {
  return fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if(!response.ok) {
      throw new Error("Failed to delete todo")
    }
  })
}

async function validateTodoResponse(response: Response): Promise<Response> {
  if(!response.ok) {
    throw new Error(await response.text())
  }

  return response
}

export async function responseNewTodo(todo: TodoRequest): Promise<void> {
  return fetch("https://easydev.club/api/v1/todos", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
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
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(data)
  }).then((response) => {
    if(!response.ok) throw new Error ("Failed to update todo")
  })
}