import { type FC } from "react";
import { TodoItem } from "../TodoItem/TodoItem";
import type { Todo, } from "../../types/todo";
import "./todoList.scss";

export interface TodoListProps {
  todoList: Todo[];
  updateTodoList: () => void;
};

export const TodoListView: FC<TodoListProps> = ({ todoList, updateTodoList }) => {
  return (
    <ul className="todos__list">
      {todoList.map(todo => (
        <li className="todos__item" key={todo.id}>
          <TodoItem
            todo={todo}
            updateTodoList={updateTodoList}
          />
        </li>
      ))}
    </ul>
  );
};