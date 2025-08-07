// tasker/src/hooks/statusUtils.ts
// Этот файл содержит утилиты для работы со статусами задач в приложении Tasker
import React from "react";
import { BadgeCheck, Hourglass, XCircle, CheckCircle } from "lucide-react";
import type { SortableStatus } from "@/types/task";

/**
 * Порядок сортировки статусов задач
 */
export const statusOrder: SortableStatus[] = [
  "to-do",
  "in-progress",
  "done",
  "canceled",
];

/**
 * Проверка, является ли статус сортируемым
 */
export const isSortableStatus = (status: string): status is SortableStatus =>
  statusOrder.includes(status as SortableStatus);

/**
 * Стили для каждого статуса
 */
export const statusStyles: Record<SortableStatus, string> = {
  "to-do": "bg-gray-200 text-gray-800",
  "in-progress": "bg-yellow-200 text-yellow-800",
  done: "bg-green-200 text-green-800",
  canceled: "bg-red-200 text-red-800",
};

/**
 * Иконки для статусов
 */
export const statusIcons: Record<SortableStatus, React.ReactNode> = {
  "to-do": <Hourglass size={16} />,
  "in-progress": <BadgeCheck size={16} />,
  done: <CheckCircle size={16} />,
  canceled: <XCircle size={16} />,
};
