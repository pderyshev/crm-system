import { type FC } from "react"
import {
  Checkbox,
} from "antd"
import { updateTodo } from "../../api/todo.api"
import { useNotification } from "../../providers/NotificationProvider"

export interface CheckboxProps {
  id: number
  isDone: boolean
  updateTodoList: () => void
}

export const ToggleCheckbox: FC<CheckboxProps> = ({ id, isDone, updateTodoList }) => {
  const api = useNotification()

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
      <Checkbox
        checked={isDone}
        onChange={handleToggle}
      />
    </>
  )
}