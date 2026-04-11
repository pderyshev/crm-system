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
import type { FilterTodo, MetaResponse, Todo, TodoInfo } from "../../types/todo";

export default function TodoPage() {
  const [pageState, setPageState] = useState<RequestState>({ status: "idle" });
  const [filterTodo, setFilterTodo] = useState<FilterTodo>("all")
  const [todoData, setTodoData] = useState<MetaResponse<Todo, TodoInfo>>();

  // Загрузка списка задач
  const loadTodoList = async (currentFilter = filterTodo) => {
    setPageState({ status: "pending" });

    try {
      const data = await getTodos(currentFilter);
      setTodoData(data);
      setPageState({ status: "success", });
    } catch (error) {
      setPageState({ status: "error", error });
    }
  };

  useEffect(() => {
    loadTodoList(filterTodo);
  }, [filterTodo]);

  // Добавление задачи
  const addTodo = async (title: string) => {
    try {
      await createTodo({ title, isDone: false });
      await loadTodoList(filterTodo); // Обновляем список задач после добавления новой задачи
    } catch (error) {
      console.error(error);
    }
  }

  const todos =
    pageState.status === "success"
      ? todoData?.data
      : [];

  // Счетчики
  const counts =
    pageState.status === "success"
      ? todoData?.info
      : { all: 0, completed: 0, inWork: 0 }

  // Удаление задачи
  const removeTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      await loadTodoList(filterTodo); // Обновляем список задач после удаления задачи
    } catch (error) {
      console.error(error);
    }
  }

  // Изменение задачи
  const editTodo = async (id: number, title: string) => {
    try {
      await updateTodo(id, { title });
      await loadTodoList(filterTodo); // Обновляем список задач после изменения
    } catch (error) {
      console.error(error);
    }
  }

  // Переключение флага о выполнении задачи
  const toggleTodo = async (id: number) => {
    if (pageState.status !== "success") return;

    const current = todoData?.data.find((todo) => {
      return todo.id === id
    });

    try {
      await updateTodo(id, {
        isDone: !current?.isDone
      });

      await loadTodoList(filterTodo); // Обновляем список задач после переключения флага
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <div className="todos">
      <CreateTodo addTodo={addTodo} />

      <TodoFilter
        filter={filterTodo}
        setFilter={setFilterTodo}
        counts={todoData?.info || { all: 0, completed: 0, inWork: 0 }}
      />

      <TodoListView
        todoList={todoData?.data || []}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
      />
    </div>
  )
}