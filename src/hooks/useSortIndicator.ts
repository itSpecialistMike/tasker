// tasker/src/hooks/useSortIndicator.ts
// Этот файл содержит функцию для получения индикатора сортировки

import type { SortField, SortOrder } from "../types/task";

/**
 * Возвращает символ для индикатора сортировки в UI для заголовков таблиц
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
