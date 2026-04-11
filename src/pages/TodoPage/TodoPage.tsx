import { CreateTodo } from "../../components/CreateTodo/CreateTodo";
import { TodoFilter } from "../../components/TodoFilter/TodoFilter";
import { TodoListView } from "../../components/TodoList/TodoList";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../../api/Todo";
import "./todoPage.scss";
import { useState, useEffect } from "react";
import type { RequestState } from "../../types/requestState";
import type { FilterTodo } from "../../types/todo";

export default function TodoPage() {
  const [state, setState] = useState<RequestState>({ status: "idle" });
  const [filter, setFilter] = useState<FilterTodo>("all")

  // Загрузка списка задач
  const loadTodoList = async (currentFilter = filter) => {
    setState({ status: "pending" });

    try {
      const data = await getTodos(currentFilter);
      setState({
        status: "success",
        data: data.data,
        info: data.info ?? { all: 0, completed: 0, inWork: 0 }
      });
    } catch (error) {
      setState({ status: "error", error });
    }
  };

  useEffect(() => {
    loadTodoList(filter);
  }, [filter]);

  // Добавление задачи
  const addTodo = async (title: string) => {
    try {
      await createTodo({ title, isDone: false });
      await loadTodoList(filter); // Обновляем список задач после добавления новой задачи
    } catch (error) {
      console.error(error);
    }
  }

  const todos =
    state.status === "success"
      ? state.data
      : [];

  // Счетчики
  const counts =
    state.status === "success"
      ? state.info
      : { all: 0, completed: 0, inWork: 0 }

  // Удаление задачи
  const removeTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      await loadTodoList(filter); // Обновляем список задач после удаления задачи
    } catch (error) {
      console.error(error);
    }
  }

  // Изменение задачи
  const editTodo = async (id: number, title: string) => {
    try {
      await updateTodo(id, { title });
      await loadTodoList(filter); // Обновляем список задач после изменения
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

      await loadTodoList(filter); // Обновляем список задач после переключения флага
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <div className="todos">
      <CreateTodo addTodo={addTodo} />

      <TodoFilter
        filter={filter}
        setFilter={setFilter}
        counts={counts}
      />

      <TodoListView
        todoList={todos}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
      />
    </div>
  )
}