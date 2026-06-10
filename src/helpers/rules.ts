const MIN_TODO_LENGTH = 2
const MAX_TODO_LENGTH = 64

const MIN_LOGIN_LENGTH = 2
const MAX_LOGIN_LENGTH = 60

const MIN_PASSWORD_LENGTH = 6
const MAX_PASSWORD_LENGTH = 60

const MIN_USERNAME_LENGTH = 1
const MAX_USERNAME_LENGTH = 60

export const titleRules = [
  {
    required: true,
    message: "Поле не должно быть пустым",
  },
  {
    min: MIN_TODO_LENGTH,
    message: `Минимальная длина текста ${MIN_TODO_LENGTH} символа`
  },
  {
    max: MAX_TODO_LENGTH,
    message: `Максимальная длина текста ${MAX_TODO_LENGTH} символов`
  },
]

export const loginRules = [{
  required: true,
  message: "Введите логин",
},
{
  min: MIN_LOGIN_LENGTH,
  message: `Минимальная длина логина ${MIN_LOGIN_LENGTH} символа`,
},
{
  max: MAX_LOGIN_LENGTH,
  message: `Максимальная длина логина ${MAX_LOGIN_LENGTH} символов`,
},
{
  pattern: /^[A-Za-z]+$/,
  message: "Только латинские буквы",
},
]

export const passwordRules = [
  {
    required: true,
    message: "Введите пароль",
  },
  {
    min: MIN_PASSWORD_LENGTH,
    message: `Минимум ${MIN_PASSWORD_LENGTH} символов`,
  },
  {
    max: MAX_PASSWORD_LENGTH,
    message: `Максимум ${MAX_PASSWORD_LENGTH} символов`,
  },
]

export const usernameRules = [
  {
    required: true,
    message: "Введите имя пользователя",
  },
  {
    min: MIN_USERNAME_LENGTH,
    message: `Минимум ${MIN_USERNAME_LENGTH} символ`,
  },
  {
    max: MAX_USERNAME_LENGTH,
    message: `Максимум ${MAX_USERNAME_LENGTH} символов`,
  },
  {
    pattern:
      /^[A-Za-zА-Яа-яЁё\s]+$/,
    message: "Допустимы только русские и латинские буквы",
  },
]

export const emailRules = [
  {
    required: true,
    message: "Введите email",
  },
  {
    type: "email",
    message: "Введите корректный email",
  },
]


