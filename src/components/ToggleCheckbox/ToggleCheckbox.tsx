import { type FC } from "react"
import {
  Checkbox,
  notification
} from "antd"
import { updateTodo } from "../../api/todo.api"

export interface CheckboxProps {
  id: number
  isDone: boolean
  updateTodoList: () => void
}

export const ToggleCheckbox: FC<CheckboxProps> = ({ id, isDone, updateTodoList }) => {
  const [api, contextHolder] = notification.useNotification()

  const handleToggle = async () => {
    try {
      await updateTodo(id, { isDone: !isDone })
      updateTodoList()
    } catch {
      api.error({
        title: "Ошибка при смене статуса задачи",
        description: "Не удалось изменить статус задачи. Пожалуйста, попробуйте снова."
      })
    }
  }

  return (
    <>
      {contextHolder}
      <Checkbox
        checked={isDone}
        onChange={handleToggle}
      />
    </>
  )
}