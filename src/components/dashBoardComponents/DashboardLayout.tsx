"use client";

import React from "react";
import clsx from "clsx";

// Импорт стилей, иконок и проверки сортируемости статусов из statusUtils.tsx
import {
  statusStyles,
  statusIcons,
  isSortableStatus,
} from "@/hooks/statusUtils";

// Импорт кастомного хука для отображения индикатора сортировки из useSortIndicator.ts
import { getSortIndicator } from "@/hooks/useSortIndicator";

// Импорт кастомного хука для поиска пользователя по ID из useFindUser.ts
import { findUser } from "@/hooks/useFindUser";

import { useRouter } from "next/navigation";

import type { Task, SortField, SortOrder } from "@/types/task";

/**
 * Интерфейс пропсов для компонента DashboardLayout
 * - title: заголовок таблицы
 * - items: массив задач типа Task
 * - sortField: поле сортировки (status, deadline, createdAt и т.д.)
 * - sortOrder: порядок сортировки (asc/desc)
 * - toggleSort: функция для переключения сортировки по полю
 */
interface DashboardLayoutProps {
  title: string;
  items: Task[];
  sortField: SortField;
  sortOrder: SortOrder;
  toggleSort: (field: SortField) => void;
}

/**
 * Компонент ClientDate
 * - Преобразует дату из строки в локализованный формат
 * - Использует React.useEffect для обновления при изменении даты
 */
const ClientDate: React.FC<{ dateStr: string }> = ({ dateStr }) => {
  const [dateString, setDateString] = React.useState("");

  React.useEffect(() => {
    setDateString(new Date(dateStr).toLocaleString());
  }, [dateStr]);

  return <>{dateString}</>;
};

/**
 * Основной компонент DashboardLayout
 * - Отображает таблицу задач с возможностью сортировки по нескольким полям
 * - Позволяет кликать по задаче для перехода на страницу с детальной информацией
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title,
  items,
  sortField,
  sortOrder,
  toggleSort,
}) => {
  const router = useRouter();

  /**
   * Обработчик клика по строке задачи
   * - Переходит на страницу задачи по её ID
   */
  const handleTaskClick = (taskId: string) => {
    router.push(`/task/${taskId}`);
  };

  return (
    <section className="bg-white border border-gray-200 shadow-2xl rounded-4xl p-4 md:p-6 mb-10 mx-auto max-w-6xl">
      {/* Заголовок таблицы */}
      <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">{title}</h2>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full text-sm text-left border-collapse">
          {/* Заголовок с названиями колонок и сортировкой */}
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs cursor-pointer select-none">
            <tr>
              <th className="px-3 py-2 md:px-4 md:py-2 max-w-[150px]">Задача</th>

              <th
                className="px-3 py-2 md:px-4 md:py-2"
                onClick={() => toggleSort("status")}
                title="Сортировка по статусу"
              >
                Статус {getSortIndicator(sortField, sortOrder, "status")}
              </th>

              <th
                className="hidden sm:table-cell px-3 py-2 md:px-4 md:py-2"
                onClick={() => toggleSort("deadline")}
                title="Сортировка по дедлайну"
              >
                Дедлайн {getSortIndicator(sortField, sortOrder, "deadline")}
              </th>

              <th
                className="hidden md:table-cell px-3 py-2 md:px-4 md:py-2"
                onClick={() => toggleSort("createdAt")}
                title="Сортировка по времени создания"
              >
                Создано {getSortIndicator(sortField, sortOrder, "createdAt")}
              </th>

              <th className="hidden sm:table-cell px-3 py-2 md:px-4 md:py-2 max-w-[130px]">
                Исполнитель
              </th>
            </tr>
          </thead>

          {/* Тело таблицы с задачами */}
          <tbody className="divide-y divide-gray-100">
            {items.map((task) => {
              // Проверяем, является ли статус задачи сортируемым
              const status = isSortableStatus(task.status) ? task.status : null;

              return (
                <tr
                  key={task.id}
                  className="hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => handleTaskClick(task.id)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleTaskClick(task.id);
                    }
                  }}
                  role="button"
                  aria-label={`Открыть задачу ${task.title}`}
                >
                  {/* Название задачи, с обрезкой, если длинное */}
                  <td className="px-3 py-2 md:px-4 md:py-3 font-medium text-gray-900 max-w-[150px] truncate">
                    {task.title}
                  </td>

                  {/* Статус задачи с цветом и иконкой */}
                  <td className="px-3 py-2 md:px-4 md:py-3">
                    {status ? (
                      <span
                        className={clsx(
                          "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap",
                          statusStyles[status]
                        )}
                      >
                        {statusIcons[status]} {status}
                      </span>
                    ) : (
                      <span className="text-gray-500 italic">{task.status}</span>
                    )}
                  </td>

                  {/* Дедлайн (показывается на экранах >= sm) */}
                  <td className="hidden sm:table-cell px-3 py-2 md:px-4 md:py-3 text-gray-700 whitespace-nowrap">
                    {task.deadline}
                  </td>

                  {/* Дата создания (показывается на экранах >= md) */}
                  <td className="hidden md:table-cell px-3 py-2 md:px-4 md:py-3 text-gray-700 whitespace-nowrap">
                    <ClientDate dateStr={task.createdAt} />
                  </td>

                  {/* Имя исполнителя (показывается на экранах >= sm) */}
                  <td className="hidden sm:table-cell px-3 py-2 md:px-4 md:py-3 text-gray-700 max-w-[130px] truncate">
                    {findUser(task.assignerId ?? "")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DashboardLayout;
