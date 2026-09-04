import { CreateTodo } from "../../components/CreateTodo/CreateTodo";
import TodoFilter from "../../components/TodoFilter/TodoFilter";
import { TodoListView } from "../../components/TodoList/TodoList";
import { getTasks } from "../../api/todo.api";
import "./todoPage.scss";
import { useState, useEffect } from "react";
import type { TaskFilters, TaskListResponse, TaskStatus } from "../../types/todo";

export default function TodoPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "completed" | "inWork">("all");
  const [filter, setFilter] = useState<TaskFilters>({
    limit: 20,
    offset: 0,
    statuses: [],
  });
  const [taskData, setTaskData] = useState<TaskListResponse | null>(null);

  const loadTasks = async (filters: TaskFilters) => {
    setLoading(true);
    try {
      const data = await getTasks(filters);
      setTaskData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(filter);
  }, [filter]);

  const statusCounts = taskData?.meta?.statusCounts as Record<TaskStatus, number> || {};
  const total = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);
  const doneCount = statusCounts.done || 0;
  const inWorkCount = (statusCounts.inProgress || 0) + (statusCounts.review || 0) + (statusCounts.onHold || 0) + (statusCounts.backlog || 0) + (statusCounts.readyForRelease || 0) + (statusCounts.todo || 0);

  const counts = {
    all: total,
    completed: doneCount,
    inWork: inWorkCount,
  };

  const handleFilterChange = (tab: "all" | "completed" | "inWork") => {
    setActiveTab(tab);
    let statuses: TaskStatus[] = [];
    if (tab === "completed") statuses = ["done"];
    else if (tab === "inWork") statuses = ["inProgress", "review", "onHold", "backlog", "readyForRelease", "todo"];

    setFilter({ ...filter, statuses, offset: 0 });
  };

  return (
    <div className="todos">
      <CreateTodo onTodoCreated={() => loadTasks(filter)} />
      <TodoFilter
        filter={activeTab}
        setFilter={handleFilterChange}
        counts={counts}
      />
      <TodoListView
        tasks={taskData?.data || []}
        loading={loading}
        updateTodoList={() => loadTasks(filter)}
      />
    </div>
  );
}