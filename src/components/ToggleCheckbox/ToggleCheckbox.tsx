import { type FC } from "react";
import { Checkbox } from "antd";
import { updateTask } from "../../api/todo.api";
import { useNotification } from "../../providers/NotificationProvider";
import type { Task } from "../../types/todo";

export interface ToggleCheckboxProps {
  task: Task;
  updateTodoList: () => void;
}

export const ToggleCheckbox: FC<ToggleCheckboxProps> = ({ task, updateTodoList }) => {
  const api = useNotification();
  const isDone = task.status === "done";

  const handleToggle = async () => {
    const newStatus = isDone ? "inProgress" : "done";
    try {
      
      await updateTask(task.id, {
        title: task.title,
        description: task.description || "",
        status: newStatus,
        executorId: task.executor?.id, 
      });
      updateTodoList();
    } catch {
      api.error({
        title: "Ошибка при смене статуса задачи",
        description: "Не удалось изменить статус задачи. Пожалуйста, попробуйте снова.",
      });
    }
  };

  return <Checkbox checked={isDone} onChange={handleToggle} />;
};