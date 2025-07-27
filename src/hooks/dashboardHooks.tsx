import { useState, useMemo } from "react";
import { BadgeCheck, Hourglass, XCircle, CheckCircle } from "lucide-react";
import React from "react";
import { mockTasks } from "../mocks/tasks";
import { mockUsers } from "../mocks/users";

// Тип задачи
export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  deadline: string; // ISO string
  createdAt: string; // ISO string
  assignerId?: string | null;
}

// Типы статусов
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

// Функция поиска пользователя по ID
export const findUser = (id: string): string =>
  mockUsers.find((u) => u.id === id)?.name || "—";

// Стили для статусов
export const statusStyles: Record<SortableStatus, string> = {
  "to-do": "bg-gray-200 text-gray-800",
  "in-progress": "bg-yellow-200 text-yellow-800",
  done: "bg-green-200 text-green-800",
  canceled: "bg-red-200 text-red-800",
};

// Иконки для статусов
export const statusIcons: Record<SortableStatus, React.ReactNode> = {
  "to-do": <Hourglass size={16} />,
  "in-progress": <BadgeCheck size={16} />,
  done: <CheckCircle size={16} />,
  canceled: <XCircle size={16} />,
};

// Порядок сортировки статусов
export const statusOrder: SortableStatus[] = [
  "to-do",
  "in-progress",
  "done",
  "canceled",
];

// Проверка, является ли статус сортируемым
export const isSortableStatus = (status: string): status is SortableStatus =>
  statusOrder.includes(status as SortableStatus);

// Индикатор сортировки для UI
export const getSortIndicator = (
  sortField: SortField,
  sortOrder: SortOrder,
  field: SortField
): string => {
  if (sortField !== field) return "⇅";
  if (sortOrder === "asc") return "↑";
  if (sortOrder === "desc") return "↓";
  return "⇅";
};

// Основной хук сортировки задач
export const useSortedTasks = (tasks: Task[]) => {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const toggleSort = (field: SortField) => {
    if (sortField !== field) {
      setSortField(field);
      setSortOrder("asc");
    } else {
      if (sortOrder === "asc") setSortOrder("desc");
      else if (sortOrder === "desc") {
        setSortField(null);
        setSortOrder(null);
      } else {
        setSortOrder("asc");
      }
    }
  };

  const sortedTasks = useMemo(() => {
    if (!sortField || !sortOrder) return tasks;

    return [...tasks].sort((a, b) => {
      let comp = 0;

      if (sortField === "status") {
        const aStatus = isSortableStatus(a.status) ? a.status : "to-do";
        const bStatus = isSortableStatus(b.status) ? b.status : "to-do";
        comp = statusOrder.indexOf(aStatus) - statusOrder.indexOf(bStatus);
      } else if (sortField === "deadline") {
        comp = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      } else if (sortField === "createdAt") {
        comp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      return sortOrder === "asc" ? comp : -comp;
    });
  }, [tasks, sortField, sortOrder]);

  return { sortField, sortOrder, toggleSort, sortedTasks };
};
