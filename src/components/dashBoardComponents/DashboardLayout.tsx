"use client";

/** 
 * Импорт библиотек:
 * - React: для построения интерфейса
 * - clsx: условное объединение CSS классов
 */
import React from "react";
import clsx from "clsx";

/** 
 * Импорт вспомогательных функций и типов из dashboardHooks:
 * - statusStyles, statusIcons: соответствие статуса стилю и иконке
 * - isSortableStatus: проверка, можно ли сортировать по статусу
 * - getSortIndicator: возврат символа сортировки (стрелка вверх/вниз)
 */
import {
  statusStyles,
  statusIcons,
  isSortableStatus,
  getSortIndicator,
} from "@/hooks/dashboardHooks";

/** 
 * Импорт функции для поиска пользователя по ID
 */
import { findUser } from "@/hooks/dashboardHooks";

/** 
 * Хук для навигации между страницами в Next.js
 */
import { useRouter } from "next/navigation";

/**
 * Импорт типов из файла типов:
 * - Task: описание задачи
 * - SortField, SortOrder: типы для сортировки
 */
import type { Task, SortField, SortOrder } from "@/types/task";

/**
 * Пропсы для компонента DashboardLayout:
 * - title: заголовок таблицы
 * - items: массив задач
 * - sortField, sortOrder: текущее состояние сортировки
 * - toggleSort: функция переключения сортировки
 */
interface DashboardLayoutProps {
  title: string;
  items: Task[];
  sortField: SortField;
  sortOrder: SortOrder;
  toggleSort: (field: SortField) => void;
}

/**
 * Компонент ClientDate:
 * - принимает строку даты
 * - отображает локализованную версию этой даты
 */
const ClientDate: React.FC<{ dateStr: string }> = ({ dateStr }) => {
  const [dateString, setDateString] = React.useState("");

  React.useEffect(() => {
    setDateString(new Date(dateStr).toLocaleString());
  }, [dateStr]);

  return <>{dateString}</>;
};

/**
 * Основной компонент DashboardLayout:
 * - отображает таблицу задач с возможностью сортировки и перехода к деталям задачи
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
   * Обработчик клика по строке задачи:
   * - перенаправляет пользователя на страницу задачи
   */
  const handleTaskClick = (taskId: string) => {
    router.push(`/task/${taskId}`);
  };

  return (
    <section className="bg-white border border-gray-200 shadow-2xl rounded-4xl p-4 md:p-6 mb-10 mx-auto max-w-6xl">
      {/* Заголовок таблицы */}
      <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">{title}</h2>

      <div className="overflow-x-auto rounded-lg ">
        <table className="min-w-full text-sm text-left border-collapse">
          {/* Шапка таблицы с заголовками колонок и иконками сортировки */}
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs cursor-pointer select-none">
            <tr>
              {/* Название задачи (не сортируемое) */}
              <th className="px-3 py-2 md:px-4 md:py-2 max-w-[150px]">Задача</th>

              {/* Сортировка по статусу */}
              <th
                className="px-3 py-2 md:px-4 md:py-2"
                onClick={() => toggleSort("status")}
                title="Сортировка по статусу"
              >
                Статус {getSortIndicator(sortField, sortOrder, "status")}
              </th>

              {/* Сортировка по дедлайну (видна только на >= sm экранах) */}
              <th
                className="hidden sm:table-cell px-3 py-2 md:px-4 md:py-2"
                onClick={() => toggleSort("deadline")}
                title="Сортировка по дедлайну"
              >
                Дедлайн {getSortIndicator(sortField, sortOrder, "deadline")}
              </th>

              {/* Сортировка по дате создания (видна только на >= md экранах) */}
              <th
                className="hidden md:table-cell px-3 py-2 md:px-4 md:py-2"
                onClick={() => toggleSort("createdAt")}
                title="Сортировка по времени создания"
              >
                Создано {getSortIndicator(sortField, sortOrder, "createdAt")}
              </th>

              {/* Исполнитель (виден на >= sm экранах) */}
              <th className="hidden sm:table-cell px-3 py-2 md:px-4 md:py-2 max-w-[130px]">
                Исполнитель
              </th>
            </tr>
          </thead>

          {/* Тело таблицы: список задач */}
          <tbody className="divide-y divide-gray-100">
            {items.map((task) => {
              // Если статус задачи подходит для сортировки — используем его
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
                  {/* Название задачи, обрезается при переполнении */}
                  <td className="px-3 py-2 md:px-4 md:py-3 font-medium text-gray-900 max-w-[150px] truncate">
                    {task.title}
                  </td>

                  {/* Статус задачи: цвет + иконка (если статус валиден), иначе серый курсив */}
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

                  {/* Дедлайн (только sm+) */}
                  <td className="hidden sm:table-cell px-3 py-2 md:px-4 md:py-3 text-gray-700 whitespace-nowrap">
                    {task.deadline}
                  </td>

                  {/* Дата создания, отрисована через ClientDate (только md+) */}
                  <td className="hidden md:table-cell px-3 py-2 md:px-4 md:py-3 text-gray-700 whitespace-nowrap">
                    <ClientDate dateStr={task.createdAt} />
                  </td>

                  {/* Имя исполнителя (только sm+) */}
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

/**
 * Экспорт компонента DashboardLayout:
 * - используется для отображения задач в интерфейсе пользователя
 */
export default DashboardLayout;
