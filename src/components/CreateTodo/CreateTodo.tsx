import { titleRules } from "../../helpers/validationTitle"
import { createTodo } from "../../api/todo";
import {
  Button,
  Form,
  Input,
  notification
} from "antd";

interface CreateTodoProps {
  onTodoCreated: () => void;
}

interface CreateTodoFormValues {
  title: string;
}

export const CreateTodo = ({ onTodoCreated }: CreateTodoProps) => {
  const [form] = Form.useForm<CreateTodoFormValues>();
  const [api, contextHolder] = notification.useNotification();

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
      });
    }
  }

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        style={{
          maxWidth: 600,
          display: 'flex',
          gap: '10px',
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