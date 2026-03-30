import { type FC } from "react";
import type { Todo } from "../../api/Todo";
import { TodoItem } from "../TodoItem/TodoItem";
import "./todoList.scss";

interface TodoListProps {
  todoList: Todo[];
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  editTodo: (id: number, title: string) => void;
};

export const TodoListView: FC<TodoListProps> = ({ todoList, removeTodo, toggleTodo, editTodo }) => {
  return (
    <ul className="todos__list">
      {todoList.map(todo => (
        <li className="todos__item" key={todo.id}>
          <TodoItem
            todo={todo}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
          />
        </li>
      ))}
    </ul>
  );
};