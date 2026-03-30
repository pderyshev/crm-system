import { useState } from "react"
import { validationTodoTitle } from "../../helpers/validationTitle"
import { Button } from "../Button/Button"
import "./createTodo.scss"

export const CreateTodo = ({ addTodo } : { addTodo: (todo: string) => void }) => {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = validationTodoTitle(value)

    if(!result.isValid) {
      setError(result.error)
      return
    }

    addTodo(value.trim())
    setValue("") // После добавления задачи очищаем поле ввода
    setError("") // Очищаем ошибку после успешного добавления задачи
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form__wrapper">
        <input
          className="todo-form__input"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Введите задачу"
        />
        {/* В случае ошибки валидации - показываем сообщение */}
        {error && <p className="todo-form__error">{error}</p>} 
      </div>
      <Button label="Добавить" type="submit" className="todo-form__btn" />
    </form>
  )
}