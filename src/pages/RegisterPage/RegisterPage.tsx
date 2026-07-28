import { useState } from "react"
import {
  Button,
  Card,
  Form,
  Input,
  notification,
  Typography,
} from "antd"
import { Link, useNavigate } from "react-router"
import { useAppDispatch } from "../../store/hooks"
import { registerThunk } from "../../store/auth/authThunks"
import { loginRules, passwordRules, usernameRules } from "../../helpers/rules"
import { AuthLayout } from "../../layouts/FormLayots/FormLayout"
import "./registerPage.scss"

const { Title } = Typography

interface RegisterFormValues {
  username: string
  login: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber?: string
}

export const RegisterPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm<RegisterFormValues>()
  const [isLoading, setIsLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const handleSubmit = async (
    values: RegisterFormValues
  ) => {
    try {
      setIsLoading(true)

      await dispatch(
        registerThunk({
          username: values.username,
          login: values.login,
          email: values.email,
          password: values.password,
          phoneNumber: values.phoneNumber || "",
        })
      ).unwrap()

      api.success({
        title: "Регистрация успешна",
        description: (
          <Button
            type="link"
            style={{ padding: 0 }}
            onClick={() => navigate("/login")}
          >
            Перейти на страницу авторизации
          </Button>
        ),
        duration: 0,
      })

    } catch (error) {
      const status = error as number

      if (status === 409) {
        api.error({
          title: "Пользователь уже существует",
          description: "Логин или email уже заняты.",
        })

        return
      }

      if (status === 400) {
        api.error({
          title: "Некорректные данные",
          description: "Проверьте правильность заполнения формы.",
        })

        return
      }

      api.error({
        title: "Ошибка сервера",
        description: "Попробуйте повторить запрос позже.",
      })
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {contextHolder}
      <AuthLayout
        footer={
          <div className="register-page__footer">
            Уже есть аккаунт?{" "}
            <Link to="/login">
              Войти
            </Link>
          </div>
        }
      >
        <div className="register-page">
          <Card className="register-page__wrapper">
            <Title className="register-page__title"
              level={2}
            >
              Регистрация
            </Title>
            <Form<RegisterFormValues>
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Form.Item
                label="Имя пользователя"
                name="username"
                rules={usernameRules}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Логин"
                name="login"
                rules={loginRules}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Введите email",
                  },
                  {
                    type: "email",
                    message:
                      "Введите корректный email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Телефон"
                name="phoneNumber"
                rules={[
                  {
                    validator(_, value) {
                      if (!value) {
                        return Promise.resolve()
                      }

                      const phoneRegex =
                        /^(\+7\d{10}|\d{10,15})$/

                      if (
                        phoneRegex.test(value)
                      ) {
                        return Promise.resolve()
                      }

                      return Promise.reject(
                        new Error(
                          "Некорректный номер телефона"
                        )
                      )
                    },
                  },
                ]}
              >
                <Input placeholder="+79991234567" />
              </Form.Item>
              <Form.Item
                label="Пароль"
                name="password"
                rules={passwordRules}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Повторите пароль"
                name="confirmPassword"
                dependencies={[
                  "password",
                ]}
                rules={[
                  {
                    required: true,
                    message:
                      "Повторите пароль",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        !value ||
                        getFieldValue(
                          "password"
                        ) === value
                      ) {
                        return Promise.resolve()
                      }

                      return Promise.reject(
                        new Error(
                          "Пароли не совпадают"
                        )
                      )
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                Зарегистрироваться
              </Button>

            </Form>
          </Card>
        </div>
      </AuthLayout>
    </>
  )
}