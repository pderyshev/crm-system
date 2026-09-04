export type TaskStatus =
  | "backlog"
  | "todo"
  | "inProgress"
  | "review"
  | "readyForRelease"
  | "onHold"
  | "done";

export interface Task {
  id: number;
  title: string;
  description: string;
  executor: { id: number; name: string } | null;
  creator: { id: number; name: string };
  status: TaskStatus;
  deadline: string | null; // ISO
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilters {
  limit?: number;
  offset?: number;
  statuses?: TaskStatus[];
  executorId?: number;
  orderBy?: "createdAt" | "deadline" | "title";
  orderDir?: "asc" | "desc";
}

export interface TaskListResponse {
  data: Task[];
  total: number;
  meta: {
    limit: number;
    offset: number;
    statuses: TaskStatus[];
    executorId: number | null;
    orderBy: string;
    orderDir: string;
    statusCounts: Record<TaskStatus, number>;
  };
}