import { MAX_TODO_LENGTH, MIN_TODO_LENGTH, validationTodoTitle } from "../../helpers/validationTitle"
import { createTodo } from "../../api/todo";
import TodoInput from "../../ui-kit/Input/Input";
import { Button, Form, notification } from "antd";

interface CreateTodoProps {
  onTodoCreated: () => void;
}

interface CreateTodoFormValues {
  title: string;
}

export const CreateTodo = ({ onTodoCreated }: CreateTodoProps) => {
  const [form] = Form.useForm<CreateTodoFormValues>();
  const [api, contextHolder] = notification.useNotification();
  const minTitleLength = MIN_TODO_LENGTH
  const maxTitleLength = MAX_TODO_LENGTH

  const handleFinish = async (values: CreateTodoFormValues) => {

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
    } catch {
      api.error({
        title: "Ошибка при создании задачи",
        description: `Не удалось создать задачу "${trimmedTitle}". Пожалуйста, попробуйте снова.`
      });
    }
  }

  return (
    <>
      {contextHolder}
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
          { min: minTitleLength, message: `Минимальная длина текста ${minTitleLength} символа` },
          { max: maxTitleLength, message: `Максимальная длина текста ${maxTitleLength} символов` }
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
    </>
    
  )
}