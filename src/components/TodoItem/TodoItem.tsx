import { useState, type FC } from "react";
import { ToogleCheckbox } from "../ToogleCheckbox/ToogleCheckbox";
import { validationTodoTitle } from "../../helpers/validationTitle";
import { CancelIcon, DeleteIcon, EditIcon, SaveIcon } from "../../assets/iсons";
import "./TodoItem.scss"
import type { Todo } from "../../types/todo";
import { deleteTodo, updateTodo } from "../../api/Todo";
import { IconButton } from "../../ui-kit/IconButton/IconButton";

export interface TodoViewProps {
  todo: Todo;
  updateTodoList: () => void;
}

export const TodoItem: FC<TodoViewProps> = ({
  todo,
  updateTodoList
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);
  const [error, setError] = useState("");

  const handleDeleteTodo = async () => {
    try {
      await deleteTodo(todo.id)
      updateTodoList();
    } catch (error) {
      console.error(error);
      alert("Ошибка при удалении задачи, попробуйте еще раз")
    }
  }

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

  const handleSaveEdit = async () => {
    const result = validationTodoTitle(draftTitle);

    if (!result.isValid) {
      setError(result.error);
      return;
    }

    try {
      await updateTodo(todo.id, { title: draftTitle.trim() })
      setIsEditing(false);
      setError("");
      updateTodoList();
    } catch (error) {
      console.error(error);
      alert("Не удалось сохранить изменения, попробуйте еще раз")
    }
  }

  return (
    <div className="todos__item-wrapper">
      <div className="todos__item-left">
        <ToogleCheckbox
          id={todo.id}
          isDone={todo.isDone}
          updateTodoList={updateTodoList}
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
            <IconButton
              onClick={handleSaveEdit}
              variant="primary"
              className="todos__btn todos__btn--edit"
            >
              <SaveIcon />
            </IconButton>

            <IconButton
              onClick={handleCancelEdit}
              variant="danger"
              className="todos__btn todos__btn--delete"
            >
              <CancelIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              onClick={handleStartEdit}
              variant="primary"
              className="todos__btn todos__btn--edit"
            >
              <EditIcon />
            </IconButton>

            <IconButton
              onClick={handleDeleteTodo}
              variant="danger"
              className="todos__btn todos__btn--delete"
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
}