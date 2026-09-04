import { titleRules } from "../../helpers/rules"
import { createTask } from "../../api/todo.api"
import {
  Button,
  Form,
  Input,
} from "antd"
import { useNotification } from "../../providers/NotificationProvider"
import { useAppSelector } from "../../store/hooks"
import { selectProfileData } from "../../store/auth/selectors"
import "./createTodo.scss"

interface CreateTodoProps {
  onTodoCreated: () => void
}

interface CreateTodoFormValues {
  title: string
}

export const CreateTodo = ({ onTodoCreated }: CreateTodoProps) => {
  const [form] = Form.useForm<CreateTodoFormValues>()
  const api = useNotification()
  const profile = useAppSelector(selectProfileData)

  const handleFinish = async (values: any) => {
    try {
      if (!profile?.id) {
        api.error({
          title: "Ошибка",
          description: "Не удалось определить текущего пользователя"
        })
        return
      }

      await createTask({
        title: values.title,
        description: values.description,
        executorId: profile.id
      });
      form.resetFields();
      onTodoCreated();
    } catch {
      api.error({ title: "Ошибка", description: "Не удалось создать задачу" });
    }
  };

  return (
    <>
      <Form
        form={form}
        onFinish={handleFinish}
        className="create-todo-form"
      >
        <Form.Item
          name="title"
          rules={titleRules}
          className="create-todo-form__input"
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