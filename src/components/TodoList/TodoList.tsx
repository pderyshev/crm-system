import { type Task } from "../../types/todo";
import { TodoItem } from "../TodoItem/TodoItem";
import "./todoList.scss";

interface Props {
  tasks: Task[];
  loading: boolean;
  updateTodoList: () => void;
}

export const TodoListView = ({ tasks, loading, updateTodoList }: Props) => {
  if (loading) return <div>Загрузка...</div>;
  return (
    <ul className="todos__list">
      {tasks.map((task) => (
        <li className="todos__item" key={task.id}>
          <TodoItem task={task} updateTodoList={updateTodoList} />
        </li>
      ))}
    </ul>
  );
};