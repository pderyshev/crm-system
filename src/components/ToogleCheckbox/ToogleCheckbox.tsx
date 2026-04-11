import { type FC } from "react";
import "./toogleCheckbox.scss";
import { updateTodo } from "../../api/Todo";

export interface CheckboxProps {
  id: number;
  isDone: boolean;
  updateTodoList: () => void;
}

export const ToogleCheckbox: FC<CheckboxProps> = ({ id, isDone, updateTodoList }) => {
  const handleToogle = async () => {
    try {
      await updateTodo(id, { isDone: !isDone })
      updateTodoList();
    } catch (error) {
      console.error(error);
      alert("Произошла ошибка при смене статуса задачи, повторите попытку")
    }
  }
  
  return (
    <input
      className="custom-checkbox"
      type="checkbox"
      checked={isDone}
      onChange={handleToogle}
    />
  );
};