import type { FilterTodo } from "../../types/todo";
import { Tabs } from 'antd';

export interface FilterProps {
  filter: FilterTodo;
  setFilter: (f: FilterTodo) => void;
  counts: { all: number, completed: number, inWork: number };
};

const FILTERS = ["all", "completed", "inWork"] as const;

function isFilterTodo(value: string): value is FilterTodo {
  return FILTERS.includes(value as FilterTodo);
}

const TodoFilter = ({ filter, setFilter, counts }: FilterProps) => {
  const items = [
    {
      key: "all",
      label: `Все (${counts.all})`,
    },
    {
      key: "completed",
      label: `Выполненные (${counts.completed})`
    },
    {
      key: "inWork",
      label: `В работе (${counts.inWork})`
    },
  ];

  return (
    <Tabs
      activeKey={filter}
      onChange={(key) => {
        if (isFilterTodo(key)) {
          setFilter(key)
        }
      }}
      items={items}
    />
  )
}

export default TodoFilter;