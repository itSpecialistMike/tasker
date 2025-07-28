// tasker/src/hooks/useSortedTasks.ts
import { useState, useMemo } from "react";
import type { Task, SortField, SortOrder, SortableStatus } from "../types/task";
import { statusOrder, isSortableStatus } from "./statusUtils";

/**
 * Хук для сортировки задач с переключением сортировки по полям и направлению
 */
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
