import { CreateTodo } from "../../components/CreateTodo/CreateTodo";
import { TodoFilter } from "../../components/TodoFilter/TodoFilter";
import { TodoListView } from "../../components/TodoList/TodoList";
import { useTodoList } from "../../hooks/useTodoList";
import "./todoPage.scss";

export default function TodoPage() {
  const todo = useTodoList();

  return (
    <div className="todos">
      <CreateTodo addTodo={todo.addTodo} />

      <TodoFilter
        filter={todo.filter}
        setFilter={todo.setFilter}
        counts={todo.counts}
      />

      <TodoListView
        todoList={todo.todos}
        removeTodo={todo.removeTodo}
        toggleTodo={todo.toggleTodo}
        editTodo={todo.editTodo}
      />
    </div>
  )
}