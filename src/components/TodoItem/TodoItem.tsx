import { useState, type FC } from "react";
import { CheckboxComponent } from "../CheckboxComponent/CheckboxComponent";
import { Button } from "../Button/Button";
import { validationTodoTitle } from "../../helpers/validationTitle";
import { CancelIcon, DeleteIcon, EditIcon, SaveIcon } from "../../assets/iсons";
import "./TodoItem.scss"
import type { Todo } from "../../types/todo";

export interface TodoViewProps {
  todo: Todo;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  editTodo: (id: number, title: string) => void;
}

export const TodoItem: FC<TodoViewProps> = ({
  todo,
  removeTodo,
  toggleTodo,
  editTodo
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);
  const [error, setError] = useState("");

  const handleStartEdit = () => {
    setDraftTitle(todo.title);
    setError("");
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setDraftTitle(todo.title);
    setError("");
    setIsEditing(false);
  }

  const handleSaveEdit = () => {
    const result = validationTodoTitle(draftTitle);

    if (!result.isValid) {
      setError(result.error);
      return;
    }

    editTodo(todo.id, result.isValid ? draftTitle.trim() : draftTitle);
    setIsEditing(false);
    setError("");
  }

  return (
    <div className="todos__item-wrapper">
      <div className="todos__item-left">
        <CheckboxComponent
          checked={todo.isDone}
          onChange={() => toggleTodo(todo.id)}
        />
        <div className="todos__edit-warpper">
          {isEditing ? (
            <div className="todos__edit-container">
              <input
                className={`todos__input-draft ${error ? "todos__input-draft--error" : ""}`}
                value={draftTitle}
                onChange={(e) => {
                  setDraftTitle(e.target.value);
                  if (error) setError("");
                }}
              />
              {error && <span className="todos__error-message">{error}</span>}
            </div>
          ) : (
            <span
              className="todos__title"
              style={{ textDecoration: todo.isDone ? "line-through" : "none" }}
            >
              {todo.title}
            </span>
          )}
        </div>
      </div>

      <div className="todos__inner">
        {isEditing ? (
          <>
            <Button
              icon={SaveIcon()}
              onClick={handleSaveEdit}
              className="todos__btn todos__btn--edit"
            />
            <Button
              icon={CancelIcon()}
              onClick={handleCancelEdit}
              className="todos__btn todos__btn--delete"
            />
          </>
        ) : (
          <>
            <Button
              icon={EditIcon()}
              onClick={handleStartEdit}
              className="todos__btn todos__btn--edit"
            />
            <Button
              icon={DeleteIcon()}
              onClick={() => removeTodo(todo.id)}
              className="todos__btn todos__btn--delete"
            />
          </>
        )}
      </div>
    </div>
  );
}