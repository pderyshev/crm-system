import { useState } from "react"
import { validationTodoTitle } from "../../helpers/validationTitle"
import { Button } from "../../ui-kit/Button/Button"
import "./createTodo.scss"
import { createTodo } from "../../api/Todo";

interface CreateTodoPropos {
  onTodoCreated: () => void;
}

export const CreateTodo = ({ onTodoCreated } : CreateTodoPropos) => {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = validationTodoTitle(value)

    if(!result.isValid) {
      setError(result.error)
      return
    }

    try {
      await createTodo({ title: value.trim(), isDone: false })
      setValue("")
      setError("")
      onTodoCreated()
    } catch (error) {
      console.error(error);
      setError("Не удалось создать задачу, повторите попытку")
    }
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
      <Button variant="primary" label="Добавить" type="submit" className="todo-form__btn" />
    </form>
  )
}