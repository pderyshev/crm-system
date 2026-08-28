import { titleRules } from "../../helpers/rules"
import { createTodo } from "../../api/todo.api"
import {
  Button,
  Form,
  Input,
} from "antd"
import { useNotification } from "../../providers/NotificationProvider"

interface CreateTodoProps {
  onTodoCreated: () => void
}

interface CreateTodoFormValues {
  title: string
}

export const CreateTodo = ({ onTodoCreated }: CreateTodoProps) => {
  const [form] = Form.useForm<CreateTodoFormValues>()
  const api = useNotification()

  const handleFinish = async (values: CreateTodoFormValues) => {
    const { title } = values

    try {
      await createTodo({ title: title, isDone: false })
      form.resetFields()
      onTodoCreated()
    } catch {
      api.error({
        title: "Ошибка при создании задачи",
        description: `Не удалось создать задачу "${title}". Пожалуйста, попробуйте снова.`
      })
    }
  }

  return (
    <>
      <Form
        form={form}
        style={{
          maxWidth: 600,
          display: "flex",
          gap: "10px",
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          name="title"
          style={{ flex: 1 }}
          rules={titleRules}
        >
          <Input
            placeholder="Введите задачу"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </>

  )
}