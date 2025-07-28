// src/types/task.ts
export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  deadline: string; // ISO string
  createdAt: string; // ISO string
  assignerId?: string | null;
}

export type TaskStatus =
  | "to-do"
  | "in-progress"
  | "review"
  | "blocked"
  | "done"
  | "canceled";

export type SortableStatus = "to-do" | "in-progress" | "done" | "canceled";

export type SortField = "status" | "deadline" | "createdAt" | null;

export type SortOrder = "asc" | "desc" | null;
