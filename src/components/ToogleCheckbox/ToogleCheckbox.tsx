import { type FC } from "react";
import { Checkbox } from 'antd';
import { updateTodo } from "../../api/todo";

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
    <Checkbox
      checked={isDone}
      onChange={handleToogle}
    />
  );
};