import { useState } from "react"
import {
  Button,
  Card,
  Form,
  Input,
  Typography,
} from "antd"
import { Link, useNavigate } from "react-router"
import { useAppDispatch } from "../../store/hooks"
import { fetchProfileThunk, loginThunk } from "../../store/auth/authThunks"
import { loginRules, passwordRules } from "../../helpers/rules"
import { AuthLayout } from "../../layouts/FormLayots/FormLayout"
import "./loginPage.scss"
import { useNotification } from "../../providers/NotificationProvider"

const { Title } = Typography

interface LoginFormValues {
  login: string
  password: string
}

export const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm<LoginFormValues>()
  const [isLoading, setIsLoading] = useState(false)

  const api = useNotification()


  const handleSubmit = async (values: LoginFormValues) => {
    try {
      setIsLoading(true)

      await dispatch(
        loginThunk({
          login: values.login,
          password: values.password,
        })
      ).unwrap()

      api.success({
        title: "Успешный вход",
        description: "Добро пожаловать!",
      })

      await dispatch(fetchProfileThunk()).unwrap()

      navigate("/todos")
    } catch (error) {
      const status = error as number

      switch (status) {
        case 401:
          api.error({
            title: "Ошибка авторизации",
            description: "Неверный логин или пароль.",
          })
          break

        case 400:
          api.error({
            title: "Некорректные данные",
            description: "Проверьте правильность заполнения формы.",
          })
          break

        default:
          api.error({
            title: "Ошибка сервера",
            description: "Попробуйте повторить попытку позже.",
          })
      }
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AuthLayout
        footer={
          <div className="login-page__footer">
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </div>
        }
      >
        <div className="login-page">
          <Card className="login-page__wrapper">
            <Title className="login-page__title"
              level={2}
            >
              Авторизация
            </Title>

            <Form<LoginFormValues>
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Form.Item
                label="Логин"
                name="login"
                rules={loginRules}
              >
                <Input placeholder="Введите логин" />
              </Form.Item>
              <Form.Item
                label="Пароль"
                name="password"
                rules={passwordRules}
              >
                <Input.Password placeholder="Введите пароль" />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isLoading}
              >
                Войти
              </Button>
            </Form>
          </Card>
        </div>
      </AuthLayout>
    </>
  )
}