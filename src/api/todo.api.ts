import { axiosInstance } from "./axios";
import type { Task, TaskFilters, TaskListResponse, TaskStatus } from "../types/todo";

export async function getTasks(filters: TaskFilters): Promise<TaskListResponse> {
  const params: any = {
    limit: filters.limit,
    offset: filters.offset,
  };

  if (filters.statuses && filters.statuses.length > 0) {
    params.statuses = filters.statuses.join(','); 
  }
  if (filters.executorId) params.executorId = filters.executorId;
  if (filters.orderBy) params.orderBy = filters.orderBy;
  if (filters.orderDir) params.orderDir = filters.orderDir;

  const response = await axiosInstance.get<TaskListResponse>("/tasks", { params });
  return response.data;
}

export async function createTask(data: { title: string; description?: string; executorId?: number }) {
  // Сервер ожидает поля с большой буквы
  const payload: any = {
    Title: data.title,
    ExecutorID: data.executorId
  };
  if (data.description) payload.Description = data.description;
  if (data.executorId) payload.ExecutorId = data.executorId;

  const response = await axiosInstance.post<Task>("/tasks", payload);
  return response.data;
}

export async function updateTask(id: number, data: Partial<{ title: string; description: string; status: TaskStatus; executorId: number; deadline: string }>) {
  const payload: any = {};
  if (data.title !== undefined) payload.Title = data.title;
  if (data.description !== undefined) payload.Description = data.description;
  if (data.status !== undefined) payload.Status = data.status;
  if (data.executorId !== undefined) payload.ExecutorID = data.executorId;
  if (data.deadline !== undefined) payload.Deadline = data.deadline;

  const response = await axiosInstance.put<Task>(`/tasks/${id}`, payload);
  return response.data;
}

export async function deleteTask(id: number) {
  await axiosInstance.delete(`/tasks/${id}`);
}