import { useState } from "react";
import { Button, Form, Input, Space, Typography } from "antd";
import { DeleteOutlined, EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { updateTask, deleteTask } from "../../api/todo.api";
import type { Task } from "../../types/todo";
import { ToggleCheckbox } from "../ToggleCheckbox/ToggleCheckbox";
import { useNotification } from "../../providers/NotificationProvider";
import { titleRules } from "../../helpers/rules";
import "./todoItem.scss"

const { Text } = Typography;

export const TodoItem = ({ task, updateTodoList }: { task: Task; updateTodoList: () => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm()
  const api = useNotification();

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      updateTodoList();
    } catch {
      api.error({
        title: "Ошибка удаления",
        description: "Не удалось удалить задачу",
      });
    }
  };

  const handleEditStart = () => {
    form.setFieldsValue({
      title: task.title,
    });
    setIsEditing(true)
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleEditSave = async (values: { title: string; description?: string }) => {
    try {
      await updateTask(task.id, {
        title: values.title.trim(),
        status: task.status,
        executorId: task.executor?.id
      });
      setIsEditing(false);
      updateTodoList();
      api.success({
        title: "Задача обновлена",
      });
    } catch {
      api.error({
        title: "Ошибка сохранения",
        description: "Не удалось сохранить изменения",
      });
    }
  };

  const isDone = task.status === "done";

  return (
    <div className="todo-item">
      <div className="todo-item__content">
        {isEditing ? (
          <Form form={form} onFinish={handleEditSave} className="todo-item__edit-form">
            <div className="todo-item__row">
              <ToggleCheckbox task={task} updateTodoList={updateTodoList} />
              <Form.Item name="title" rules={titleRules} className="todo-item__field">
                <Input placeholder="Название задачи" />
              </Form.Item>
              <div className="todo-item__actions">
                <Button htmlType="submit" icon={<SaveOutlined />} type="primary" />
                <Button icon={<CloseOutlined />} danger onClick={handleEditCancel} />
              </div>
            </div>
          </Form>
        ) : (
          <Space orientation="vertical" size="small" style={{ width: "100%" }}>
            <Space>
              <ToggleCheckbox task={task} updateTodoList={updateTodoList} />
              <Text
                strong
                className={`todo-item__title ${isDone ? "todo-item__title--done" : ""}`}
              >
                {task.title}
              </Text>
            </Space>
          </Space>
        )}
      </div>
      {!isEditing && (
        <div className="todo-item__actions">
          <Button icon={<EditOutlined />} type="primary" onClick={handleEditStart} />
          <Button icon={<DeleteOutlined />} danger type="text" onClick={handleDelete} />
        </div>
      )}
    </div>
  );
};