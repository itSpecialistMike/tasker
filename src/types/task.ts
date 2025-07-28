// src/types/task.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  deadline: string; // ISO string
  createdAt: string; // ISO string
  startedAt?: string;
  completedAt?: string;
  assignerId?: string | null;
  reporterId: string;
  reviewerId?: string;
  approverId: string;
  approveStatus: ApproveStatus;
  dashboardId: string;
  blockedBy: string[];
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
export type ApproveStatus = "approved" | "rejected" | "approval" | "need-approval";

