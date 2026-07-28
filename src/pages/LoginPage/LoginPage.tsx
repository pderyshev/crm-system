import { useState, useEffect } from "react"
import {
  Button,
  Card,
  Form,
  Input,
  Typography,
} from "antd"
import { Link, useNavigate } from "react-router"
import { useAppDispatch } from "../../store/hooks"
import { loginThunk } from "../../store/auth/authThunks"
import { loginRules, passwordRules } from "../../helpers/rules"
import { AuthLayout } from "../../layouts/FormLayots/FormLayout"
import "./loginPage.scss"
import { useNotification } from "../../providers/NotificationProvider"

const { Title } = Typography

interface LoginFormValues {
  login: string;
  password: string;
}

export const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm<LoginFormValues>()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorType, setErrorType] = useState<"unauthorized" | "badRequest" | "server" | null>(null)

  const api = useNotification();

  useEffect(() => {
    if (isSuccess) { 
      api.success({
        title: "Успешный вход",
        description: "Добро пожаловать!",
      });
      setIsSuccess(false)
      navigate("/")
    }
  }, [isSuccess, api, navigate])

  useEffect(() => {
    if (errorType) {
      if (errorType === "unauthorized") {
        api.error({
          title: "Ошибка авторизации",
          description: "Неверный логин или пароль.",
        })
      } else if (errorType === "badRequest") {
        api.error({
          title: "Некорректные данные",
          description: "Проверьте правильность заполнения формы.",
        })
      } else if (errorType === "server") {
        api.error({
          title: "Ошибка сервера",
          description: "Попробуйте повторить попытку позже.",
        })
      }
      setErrorType(null)
    }
  }, [errorType, api])

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      setIsLoading(true)

      await dispatch(
        loginThunk({
          login: values.login,
          password: values.password,
        })
      ).unwrap()

      setIsSuccess(true)
    } catch (error) {
      const status = error as number

      if (status === 401) {
        setErrorType("unauthorized")
      } else if (status === 400) {
        setErrorType("badRequest")
      } else {
        setErrorType("server")
      }
    }
    finally {
      setIsLoading(false)
    }
  };

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