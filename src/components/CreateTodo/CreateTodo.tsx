import { validationTodoTitle } from "../../helpers/validationTitle"
import { createTodo } from "../../api/todo";
import TodoInput from "../../ui-kit/Input/Input";
import { Button, Form } from "antd";

interface CreateTodoProps {
  onTodoCreated: () => void;
}

export const CreateTodo = ({ onTodoCreated }: CreateTodoProps) => {
  const [form] = Form.useForm();

  const handleFinish = async (values: { title: string }) => {

    const trimmedTitle = values.title.trim()
    const result = validationTodoTitle(trimmedTitle)

    if (!result.isValid) {
      form.setFields([{name: "title", errors: [result.error]}])
      return
    }

    try {
      await createTodo({ title: trimmedTitle, isDone: false })
      form.resetFields()
      onTodoCreated()
    } catch (error) {
      console.error(error);
      form.setFields([{name: "title", errors: ["Ошибка при создании задачи"]}])
    }
  }

  return (
    <Form
      form={form}
      style={{ maxWidth: 600,
        display: 'flex',
        gap: '10px',
       }}
      onFinish={handleFinish}
    >
      <Form.Item
        name="title"
        style={{ flex: 1}}
        rules={[
          { required: true, message: 'Поле не должно быть пустым', },
          { min: 2, message: 'Минимальная длина текста 2 символа' },
          { max: 64, message: 'Максимальная длина текста 64 символа' }
        ]}
      >
        <TodoInput
          placeholder="Введите задачу"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  )
}