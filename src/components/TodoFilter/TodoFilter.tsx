import type { FilterTodo } from "../../types/todo";
import "./todoFilter.scss";

export interface FilterProps {
  filter: FilterTodo;
  setFilter: (f: FilterTodo) => void;
  counts: { all: number, completed: number, inWork: number };
};

export const TodoFilter = ({ filter, setFilter, counts }: FilterProps) => {
  return (
    <div className="todo-filter">
      <button className="todo-filter__btn" disabled={filter === "all"} onClick={() => setFilter("all")}>
        Все ({counts.all})
      </button>
      <button className="todo-filter__btn" disabled={filter === "completed"} onClick={() => setFilter("completed")}>
        Выполненные ({counts.completed})
      </button>
      <button className="todo-filter__btn" disabled={filter === "inWork"} onClick={() => setFilter("inWork")}>
        В работе ({counts.inWork})
      </button>
    </div>
  )
}