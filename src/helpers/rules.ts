const MIN_TODO_LENGTH = 2
const MAX_TODO_LENGTH = 64

export const titleRules = [
  { required: true, message: 'Поле не должно быть пустым', },
  { min: MIN_TODO_LENGTH, message: `Минимальная длина текста ${MIN_TODO_LENGTH} символа` },
  { max: MAX_TODO_LENGTH, message: `Максимальная длина текста ${MAX_TODO_LENGTH} символов` }
]