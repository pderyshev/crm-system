import { useState, type FC } from "react";
import { ToogleCheckbox } from "../ToogleCheckbox/ToogleCheckbox";
import "./TodoItem.scss"
import type { Todo } from "../../types/todo";
import { deleteTodo, updateTodo } from "../../api/Todo";
import { Button, Form } from "antd";
import { CloseCircleOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import TodoInput from "../../ui-kit/Input/Input";

export interface TodoViewProps {
  todo: Todo;
  updateTodoList: () => void;
}

export const TodoItem: FC<TodoViewProps> = ({
  todo,
  updateTodoList
}) => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);


  const handleDeleteTodo = async () => {
    try {
      await deleteTodo(todo.id)
      updateTodoList();
    } catch (error) {
      console.error(error);
      alert("Ошибка при удалении задачи, попробуйте еще раз")
    }
  }

  const handleStartEdit = () => {
    form.setFieldsValue({
      title: todo.title
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    form.resetFields
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
    } catch (error) {
      console.error(error);
      alert("Не удалось сохранить изменения, попробуйте еще раз")
    }
  }

  return (
    <div className="todos__item-wrapper">
      <div className="todos__item-left">
        <ToogleCheckbox
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
                    { min: 2, message: 'Минимальная длина текста 2 символа' },
                    { max: 64, message: 'Максимальная длина текста 64 символа' }
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
  );
}