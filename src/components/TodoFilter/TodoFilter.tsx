import { Tabs } from "antd";

export interface FilterProps {
  filter: "all" | "completed" | "inWork";
  setFilter: (f: "all" | "completed" | "inWork") => void;
  counts: { all: number; completed: number; inWork: number };
}

const TodoFilter = ({ filter, setFilter, counts }: FilterProps) => {
  const items = [
    { key: "all", label: `Все (${counts.all})` },
    { key: "completed", label: `Выполненные (${counts.completed})` },
    { key: "inWork", label: `В работе (${counts.inWork})` },
  ];

  return (
    <Tabs
      activeKey={filter}
      onChange={(key) => setFilter(key as any)}
      items={items}
    />
  );
};

export default TodoFilter;