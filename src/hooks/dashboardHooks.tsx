// tasker/src/hooks/dashboardHooks.tsx
import { useState, useMemo } from "react";
import { BadgeCheck, Hourglass, XCircle, CheckCircle } from "lucide-react";
import React from "react";
import { mockUsers } from "../mocks/users";

import type {
  Task,
  TaskStatus,
  SortableStatus,
  SortField,
  SortOrder,
} from "../types/task";

/**
 * Функция поиска пользователя по ID.
 * Ищет в массиве mockUsers пользователя с заданным id.
 * Если пользователь найден — возвращает его имя, иначе — дефолтный символ "—".
 */
export const findUser = (id: string): string =>
  mockUsers.find((u) => u.id === id)?.name || "—";

/**
 * Объект со стилями для разных статусов задачи.
 * Используется для динамического присвоения CSS классов, определяющих цвет и фон.
 */
export const statusStyles: Record<SortableStatus, string> = {
  "to-do": "bg-gray-200 text-gray-800",
  "in-progress": "bg-yellow-200 text-yellow-800",
  done: "bg-green-200 text-green-800",
  canceled: "bg-red-200 text-red-800",
};

/**
 * Объект с иконками для разных статусов задачи.
 * Иконки импортированы из библиотеки lucide-react.
 */
export const statusIcons: Record<SortableStatus, React.ReactNode> = {
  "to-do": <Hourglass size={16} />,
  "in-progress": <BadgeCheck size={16} />,
  done: <CheckCircle size={16} />,
  canceled: <XCircle size={16} />,
};

/**
 * Массив определяет порядок сортировки задач по статусу.
 * Статусы идут в порядке возрастания важности/прогресса.
 * Используется для сравнения при сортировке.
 */
export const statusOrder: SortableStatus[] = [
  "to-do",
  "in-progress",
  "done",
  "canceled",
];

/**
 * Функция-предикат для проверки, является ли переданный статус сортируемым.
 * Проверяет, содержится ли статус в массиве statusOrder.
 * Используется для безопасного определения типа статуса.
 */
export const isSortableStatus = (status: string): status is SortableStatus =>
  statusOrder.includes(status as SortableStatus);

/**
 * Функция для определения индикатора сортировки в UI.
 * Принимает:
 * - sortField — текущее поле сортировки,
 * - sortOrder — направление сортировки ("asc" или "desc"),
 * - field — поле, по которому строится индикатор.
 *
 * Возвращает:
 * - "⇅" — если сортировка по другому полю,
 * - "↑" — если сортировка по этому полю по возрастанию,
 * - "↓" — если сортировка по этому полю по убыванию.
 */
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

/**
 * Кастомный React-хук для сортировки массива задач.
 * Поддерживает сортировку по статусу, дедлайну и дате создания.
 *
 * Использует локальное состояние для хранения текущего поля и порядка сортировки:
 * - sortField: поле сортировки (или null, если сортировка неактивна)
 * - sortOrder: направление сортировки ("asc", "desc" или null)
 *
 * toggleSort — функция, которая переключает состояние сортировки при клике на заголовок столбца.
 * Алгоритм переключения:
 * - Если выбрано новое поле сортировки — активируем сортировку по возрастанию.
 * - Если по тому же полю — переключаем между возрастанием, убыванием и отсутствием сортировки.
 *
 * sortedTasks — мемоизированный массив задач, отсортированный согласно текущему состоянию.
 * При изменении tasks, sortField или sortOrder пересчитывается сортировка.
 */
export const useSortedTasks = (tasks: Task[]) => {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const toggleSort = (field: SortField) => {
    if (sortField !== field) {
      // Если выбран новый столбец сортировки — активируем сортировку по возрастанию
      setSortField(field);
      setSortOrder("asc");
    } else {
      // Если кликнули по уже активному столбцу — переключаем порядок сортировки
      if (sortOrder === "asc") setSortOrder("desc");
      else if (sortOrder === "desc") {
        // Если сортировка была по убыванию — отключаем сортировку
        setSortField(null);
        setSortOrder(null);
      } else {
        // Если сортировка отсутствовала — включаем по возрастанию
        setSortOrder("asc");
      }
    }
  };

  const sortedTasks = useMemo(() => {
    if (!sortField || !sortOrder) return tasks;

    return [...tasks].sort((a, b) => {
      let comp = 0;

      if (sortField === "status") {
        // Для статуса используем порядок из statusOrder для сравнения
        const aStatus = isSortableStatus(a.status) ? a.status : "to-do";
        const bStatus = isSortableStatus(b.status) ? b.status : "to-do";
        comp = statusOrder.indexOf(aStatus) - statusOrder.indexOf(bStatus);
      } else if (sortField === "deadline") {
        // Сортируем по дате дедлайна
        comp = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      } else if (sortField === "createdAt") {
        // Сортируем по дате создания задачи
        comp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      // Возвращаем значение с учётом направления сортировки
      return sortOrder === "asc" ? comp : -comp;
    });
  }, [tasks, sortField, sortOrder]);

  // Возвращаем текущие параметры сортировки и отсортированный массив задач
  return { sortField, sortOrder, toggleSort, sortedTasks };
};
