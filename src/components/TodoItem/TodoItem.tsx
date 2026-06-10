import { useState, type FC } from "react"
import { ToggleCheckbox } from "../ToggleCheckbox/ToggleCheckbox"
import "./TodoItem.scss"
import type { Todo } from "../../types/todo"
import {
  deleteTodo,
  updateTodo
} from "../../api/todo.api"
import {
  Button,
  Form,
  Input,
  notification
} from "antd"
import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined
} from "@ant-design/icons"
import { titleRules } from "../../helpers/rules"

export interface TodoViewProps {
  todo: Todo
  updateTodoList: () => void
}

interface CreateTodoFormValues {
  title: string
}

export const TodoItem: FC<TodoViewProps> = ({
  todo,
  updateTodoList
}) => {
  const [form] = Form.useForm<CreateTodoFormValues>()
  const [isEditing, setIsEditing] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const handleDeleteTodo = async () => {
    try {
      await deleteTodo(todo.id)
      updateTodoList()
    } catch {
      api.error({
        title: "Ошибка при удалении задачи",
        description: "Не удалось удалить задачу. Пожалуйста, попробуйте снова."
      })
    }
  }

  const handleStartEdit = () => {
    form.setFieldsValue({
      title: todo.title
    })
    setIsEditing(true)
  };

  const handleCancelEdit = () => {
    form.resetFields()
    setIsEditing(false)
  }

  const handleSaveEdit = async () => {
    try {
      const values = await form.validateFields()

      await updateTodo(todo.id, {
        title: values.title.trim(),
      });

      setIsEditing(false)

      updateTodoList()
    } catch {
      api.error({
        title: "Ошибка при сохранении изменений",
        description: "Не удалось сохранить изменения. Пожалуйста, попробуйте снова."
      })
    }
  }

  return (
    <>
      {contextHolder}
      {isEditing ? (
      <Form
        form={form}
        onFinish={handleSaveEdit}
        className="todos__item-wrapper"
      >
        <div className="todos__item-left">
          <ToggleCheckbox
            id={todo.id}
            isDone={todo.isDone}
            updateTodoList={updateTodoList}
          />
          <div className="todos__edit-warpper">
            <div className="todos__edit-container">
              <Form.Item
                name="title"
                rules={titleRules}
                style={{ marginBottom: 0 }}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="todos__inner">
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            icon={<SaveOutlined />}
          />
          <Button
            htmlType="button"
            onClick={handleCancelEdit}
            type="primary"
            danger
            size="large"
            icon={<CloseCircleOutlined />}
          />
        </div>
      </Form>
    ) : (
      <div className="todos__item-wrapper">
        <div className="todos__item-left">
          <ToggleCheckbox
            id={todo.id}
            isDone={todo.isDone}
            updateTodoList={updateTodoList}
          />
          <div className="todos__edit-warpper">
            <span
              className="todos__title"
              style={{
                textDecoration: todo.isDone ? "line-through" : "none",
              }}
            >
              {todo.title}
            </span>
          </div>
        </div>
        <div className="todos__inner">
          <Button
            htmlType="button"
            onClick={handleStartEdit}
            type="primary"
            size="large"
            icon={<EditOutlined />}
          />
          <Button
            htmlType="button"
            onClick={handleDeleteTodo}
            type="primary"
            danger
            size="large"
            icon={<DeleteOutlined />}
          />
        </div>
      </div>
    )}
    </>
  )
}