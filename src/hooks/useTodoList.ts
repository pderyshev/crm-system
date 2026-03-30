import { useEffect, useState } from "react";
import {
  fetchTodoList,
  responseNewTodo,
  deleteTodo,
  type TodoList,
  updateTodo
} from "../api/Todo";
import type { FilterType } from "../components/TodoFilter/TodoFilter";

interface IdleRequestState { status: "idle"; }
interface LoadingRequestState { status: "pending"; }
interface SuccessRequestState { status: "success"; data: TodoList; }
interface ErrorRequestState { status: "error"; error: unknown; }

type RequestState =
  | IdleRequestState
  | LoadingRequestState
  | SuccessRequestState
  | ErrorRequestState;

export function useTodoList() {
  const [state, setState] = useState<RequestState>({ status: "idle" });
  const [filter, setFilter] = useState<FilterType>("all")

  // Загрузка списка задач
  const loadTodoList = async () => {
    setState({ status: "pending" });

    try {
      const data = await fetchTodoList();
      setState({ status: "success", data: data.data });
    } catch (error) {
      setState({ status: "error", error });
    }
  };

  useEffect(() => {
    loadTodoList();
  }, []);

  // Добавление задачи
  const addTodo = async (title: string) => {
    try {
      await responseNewTodo({ title, isDone: false });
      await loadTodoList(); // Обновляем список задач после добавления новой задачи
    } catch (error) {
      console.error(error);
    }
  }

  // Фильтрация по статусу задачи
  const filteredTodos =
    state.status === "success"
      ? state.data.filter(todo => {
        if (filter === "completed") return todo.isDone;
        if (filter === "inWork") return !todo.isDone
        return true
      })
      : [];

  // Счетчики
  const counts =
    state.status === "success"
      ? {
        all: state.data.length,
        completed: state.data.filter(t => t.isDone).length,
        inWork: state.data.filter(t => !t.isDone).length,
      }
      : { all: 0, completed: 0, inWork: 0 }

  // Удаление задачи
  const removeTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      await loadTodoList(); // Обновляем список задач после удаления задачи
    } catch (error) {
      console.error(error);
    }
  }

  // Изменение задачи
  const editTodo = async (id: number, title: string) => {
    try {
      await updateTodo(id, { title });
      await loadTodoList(); // Обновляем список задач после изменения
    } catch (error) {
      console.error(error);
    }
  }

  // Переключение флага о выполнении задачи
  const toggleTodo = async (id: number) => {
    if (state.status !== "success") return;

    const current = state.data.find((todo) => {
      return todo.id === id
    });

    try {
      await updateTodo(id, {
        isDone: !current?.isDone
      });

      await loadTodoList(); // Обновляем список задач после переключения флага
    } catch (error) {
      console.error(error);
    };
  };

  return {
    state,
    loadTodoList,
    addTodo,
    filter,
    setFilter,
    filteredTodos,
    counts,
    removeTodo,
    editTodo,
    toggleTodo,
  };
}