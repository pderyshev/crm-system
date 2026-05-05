import type { ResultValidationText } from "../types/validatoinTitle";

export const MIN_TODO_LENGTH = 2
export const MAX_TODO_LENGTH = 64

export const validationTodoTitle = (title: string): ResultValidationText => {
  const trimmed = title.trim();

  if (!trimmed) {
    return {
      isValid: false,
      error: "Это поле не должно быть пустым"
    }
  }

  if (trimmed.length < MIN_TODO_LENGTH) {
    return {
      isValid: false,
      error: `Минимальная длина текста ${MIN_TODO_LENGTH} символа`
    }
  }

  if (trimmed.length > MAX_TODO_LENGTH) {
    return {
      isValid: false,
      error: `Максимальная длина текста ${MAX_TODO_LENGTH} символа`
    }
  }

  return {
    isValid: true,
    error: ""
  }
}
