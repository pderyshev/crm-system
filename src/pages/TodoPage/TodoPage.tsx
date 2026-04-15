import { CreateTodo } from "../../components/CreateTodo/CreateTodo";
import { TodoFilter } from "../../components/TodoFilter/TodoFilter";
import { TodoListView } from "../../components/TodoList/TodoList";
import {
  getTodos,
} from "../../api/Todo";
import "./todoPage.scss";
import { useState, useEffect } from "react";
import type { RequestState } from "../../types/requestState";
import type { FilterTodo, MetaResponse, Todo, TodoInfo } from "../../types/todo";

export default function TodoPage() {
  const [, setPageState] = useState<RequestState>({ status: "idle" });
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

  return (
    <div className="todos">
      <CreateTodo onTodoCreated={loadTodoList} />

      <TodoFilter
        filter={filterTodo}
        setFilter={setFilterTodo}
        counts={todoData?.info || { all: 0, completed: 0, inWork: 0 }}
      />

      <TodoListView
        todoList={todoData?.data || []}
        updateTodoList={loadTodoList}
      />
    </div>
  )
}