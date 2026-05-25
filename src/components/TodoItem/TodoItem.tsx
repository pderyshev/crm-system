import { useState, type FC } from "react";
import { ToggleCheckbox } from "../ToggleCheckbox/ToggleCheckbox";
import "./TodoItem.scss"
import type { Todo } from "../../types/todo";
import { deleteTodo, updateTodo } from "../../api/todo";
import { Button, Form, notification } from "antd";
import { CloseCircleOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import TodoInput from "../../ui-kit/Input/Input";
import { MIN_TODO_LENGTH, MAX_TODO_LENGTH } from "../../helpers/validationTitle";

export interface TodoViewProps {
  todo: Todo;
  updateTodoList: () => void;
}

interface CreateTodoFormValues {
  title: string;
}

export const TodoItem: FC<TodoViewProps> = ({
  todo,
  updateTodoList
}) => {
  const [form] = Form.useForm<CreateTodoFormValues>();
  const [isEditing, setIsEditing] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const minTitleLength = MIN_TODO_LENGTH
  const maxTitleLength = MAX_TODO_LENGTH


  const handleDeleteTodo = async () => {
    try {
      await deleteTodo(todo.id)
      updateTodoList();
    } catch {
      api.error({
        title: "Ошибка при удалении задачи",
        description: "Не удалось удалить задачу. Пожалуйста, попробуйте снова."
      });
    }
  }

  const handleStartEdit = () => {
    form.setFieldsValue({
      title: todo.title
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    form.resetFields()
    setIsEditing(false);
  }

  const handleSaveEdit = async () => {
    try {
      const values = await form.validateFields();

      await updateTodo(todo.id, {
        title: values.title.trim(),
      });

      setIsEditing(false);

      updateTodoList();
    } catch {
      api.error({
        title: "Ошибка при сохранении изменений",
        description: "Не удалось сохранить изменения. Пожалуйста, попробуйте снова."
      });
    }
  }

  return (
    <>
      {contextHolder}
      <div className="todos__item-wrapper">
        <div className="todos__item-left">
          <ToggleCheckbox
            id={todo.id}
            isDone={todo.isDone}
            updateTodoList={updateTodoList}
          />
          <div className="todos__edit-warpper">
            {isEditing ? (
              <div className="todos__edit-container">
                <Form
                  form={form}
                  onFinish={handleSaveEdit}
                >
                  <Form.Item
                    name="title"
                    rules={[
                      { required: true, message: 'Поле не должно быть пустым', },
                      { min: minTitleLength, message: `Минимальная длина текста ${minTitleLength} символа` },
                      { max: maxTitleLength, message: `Максимальная длина текста ${maxTitleLength} символов` }
                    ]}
                    style={{ marginBottom: 0 }}
                  >
                    <TodoInput />
                  </Form.Item>
                </Form>
              </div>
            ) : (
              <span
                className="todos__title"
                style={{ textDecoration: todo.isDone ? "line-through" : "none" }}
              >
                {todo.title}
              </span>
            )}
          </div>
        </div>

        <div className="todos__inner">
          {isEditing ? (
            <>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                icon={<SaveOutlined />}
                onClick={() => form.submit()}
              />

              <Button
                onClick={handleCancelEdit}
                type="primary"
                danger
                size="large"
                icon={<CloseCircleOutlined />}
              />
            </>
          ) : (
            <>
              <Button
                onClick={handleStartEdit}
                type="primary"
                size="large"
                icon={<EditOutlined />}
              />

              <Button
                onClick={handleDeleteTodo}
                type="primary"
                danger
                size="large"
                icon={<DeleteOutlined />}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}