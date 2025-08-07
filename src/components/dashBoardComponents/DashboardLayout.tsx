// tasker/src/components/dashBoardComponents/DashboardLayout.tsx
// Этот файл содержит компонент DashboardLayout, который отображает таблицу задач в приложении Tasker

// Указание, что этот компонент является клиентским,
// так как он использует хуки, такие как useState, useEffect и useRouter.
"use client";

import React from "react";
// clsx - небольшая утилита для условного объединения строк классов.
import clsx from "clsx";

// Импорт стилей, иконок и проверки сортируемости статусов из statusUtils.tsx.
// Эти утилиты помогают отображать статусы задач единообразно.
import {
  statusStyles,
  statusIcons,
  isSortableStatus,
} from "@/hooks/statusUtils";

// Импорт кастомного хука для отображения индикатора сортировки.
// Этот хук возвращает стрелку вверх или вниз в зависимости от текущего состояния сортировки.
import { getSortIndicator } from "@/hooks/useSortIndicator";

// Импорт кастомного хука для поиска пользователя по ID.
// Он используется для отображения имени исполнителя задачи.
import { findUser } from "@/hooks/useFindUser";

// useRouter - хук Next.js для программной навигации между страницами.
import { useRouter } from "next/navigation";
// Импорт хука useDashboard для доступа к состоянию дашбордов
import { useDashboard } from "@/hooks/useDashboard";

// Импорт типов данных для задач, полей сортировки и порядка сортировки.
import type { Task, SortField, SortOrder } from "@/types/task";

/**
 * Интерфейс пропсов для компонента DashboardLayout.
 * Определяет ожидаемые данные для компонента.
 * @param title - Заголовок таблицы (например, "Мои задачи").
 * @param items - Массив объектов задач, которые будут отображаться в таблице.
 * @param sortField - Текущее поле, по которому отсортирован список задач.
 * @param @param sortOrder - Текущий порядок сортировки (по возрастанию 'asc' или по убыванию 'desc').
 * @param toggleSort - Функция-коллбэк для изменения поля сортировки.
 */
interface DashboardLayoutProps {
  title: string;
  items: Task[];
  sortField: SortField;
  sortOrder: SortOrder;
  toggleSort: (field: SortField) => void;
}

/**
 * Компонент ClientDate.
 * Этот компонент преобразует строку даты в локализованный формат,
 * что позволяет избежать ошибок при рендеринге на стороне сервера (SSR),
 * так как локализация зависит от настроек браузера пользователя.
 * @param dateStr - Строка даты в формате ISO (например, '2025-01-01T12:00:00Z').
 */
const ClientDate: React.FC<{ dateStr: string }> = ({ dateStr }) => {
  // Состояние для хранения отформатированной даты.
  const [dateString, setDateString] = React.useState("");

  // useEffect гарантирует, что преобразование даты произойдет только на клиенте.
  // Это предотвращает несоответствие между SSR и клиентом.
  React.useEffect(() => {
    // Преобразует строку в объект Date и форматирует её.
    setDateString(new Date(dateStr).toLocaleString());
  }, [dateStr]); // Зависимость от dateStr, чтобы обновлять дату, если она изменится.

  return <>{dateString}</>;
};

/**
 * Основной компонент DashboardLayout.
 * Отображает интерактивную таблицу задач.
 * @param props - Пропсы, соответствующие интерфейсу DashboardLayoutProps.
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
                                                           title,
                                                           items,
                                                           sortField,
                                                           sortOrder,
                                                           toggleSort,
                                                         }) => {
  const router = useRouter(); // Инициализация хука для навигации.
  // Получаем функцию onDashboardChange из хука useDashboard
  const { onDashboardChange } = useDashboard();

  /**
   * Обработчик клика по строке задачи.
   * Принимает ID задачи и перенаправляет пользователя на страницу с деталями этой задачи.
   * @param taskId - Уникальный идентификатор задачи.
   * @param taskDashboardId - ID дашборда, к которому относится задача.
   */
  const handleTaskClick = (taskId: string, taskDashboardId: string | undefined) => {
    // ✅ Переключаем дашборд перед навигацией
    if (taskDashboardId) {
      onDashboardChange(taskDashboardId, { navigate: true });
    }
    router.push(`/task/${taskId}`);
  };

  return (
      // Главный контейнер компонента. Применяются стили для центрирования, тени, скругления углов и отступов.
      <section className="bg-white border border-gray-200 shadow-2xl rounded-4xl p-4 md:p-6 mb-10 mx-auto max-w-6xl mt-20">
        {/* Заголовок таблицы */}
        <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">
          {title}
        </h2>

        {/* Контейнер для таблицы с горизонтальным скроллом на маленьких экранах */}
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm text-left border-collapse">
            {/* Заголовок таблицы с колонками */}
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs cursor-pointer select-none">
            <tr>
              {/* Колонка "Задача" - заголовок, который не сортируется */}
              <th className="px-3 py-2 md:px-4 md:py-2 max-w-[150px]">
                Задача
              </th>

              {/* Колонка "Статус" - кликабельный заголовок для сортировки по статусу */}
              <th
                  className="px-3 py-2 md:px-4 md:py-2"
                  onClick={() => toggleSort("status")}
                  title="Сортировка по статусу"
              >
                Статус {getSortIndicator(sortField, sortOrder, "status")}
              </th>

              {/* Колонка "Дедлайн" - скрыта на экранах меньше sm, кликабельный заголовок */}
              <th
                  className="hidden sm:table-cell px-3 py-2 md:px-4 md:py-2"
                  onClick={() => toggleSort("deadline")}
                  title="Сортировка по дедлайну"
              >
                Дедлайн {getSortIndicator(sortField, sortOrder, "deadline")}
              </th>

              {/* Колонка "Создано" - скрыта на экранах меньше md, кликабельный заголовок */}
              <th
                  className="hidden md:table-cell px-3 py-2 md:px-4 md:py-2"
                  onClick={() => toggleSort("createdAt")}
                  title="Сортировка по времени создания"
              >
                Создано {getSortIndicator(sortField, sortOrder, "createdAt")}
              </th>

              {/* Колонка "Исполнитель" - скрыта на экранах меньше sm, не сортируется */}
              <th className="hidden sm:table-cell px-3 py-2 md:px-4 md:py-2 max-w-[130px]">
                Исполнитель
              </th>
            </tr>
            </thead>

            {/* Тело таблицы с данными задач */}
            <tbody className="divide-y divide-gray-100">
            {/* Итерация по массиву задач, если он существует. Пустой массив в случае null или undefined предотвращает ошибки. */}
            {(items ?? []).map((task) => {
              // Проверяем, является ли статус задачи одним из сортируемых статусов.
              const status = isSortableStatus(task.status) ? task.status : null;

              return (
                  <tr
                      key={task.id}
                      // Динамические классы для эффекта наведения и курсора-указателя.
                      className="hover:bg-gray-50 transition cursor-pointer"
                      // Обновленный обработчик клика, передающий dashboardId
                      onClick={() => handleTaskClick(task.id, task.dashboardId)}
                      tabIndex={0} // Делает элемент фокусируемым для доступности.
                      // Обработчик нажатия клавиш Enter или пробел для доступности.
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleTaskClick(task.id, task.dashboardId);
                        }
                      }}
                      role="button" // Указывает, что элемент выполняет роль кнопки для ассистивных технологий.
                      aria-label={`Открыть задачу ${task.title}`} // Описание для скринридеров.
                  >
                    {/* Ячейка с названием задачи */}
                    <td className="px-3 py-2 md:px-4 md:py-3 font-medium text-gray-900 max-w-[150px] truncate">
                      {task.title}
                    </td>

                    {/* Ячейка со статусом задачи */}
                    <td className="px-3 py-2 md:px-4 md:py-3">
                      {status ? (
                          // Используем clsx для объединения базовых и динамических классов в зависимости от статуса.
                          <span
                              className={clsx(
                                  "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap",
                                  statusStyles[status]
                              )}
                          >
                        {statusIcons[status]} {status}
                      </span>
                      ) : (
                          // Если статус не является сортируемым, отображаем его как обычный текст.
                          <span className="text-gray-500 italic">
                        {task.status}
                      </span>
                      )}
                    </td>

                    {/* Ячейка с дедлайном. Скрыта на маленьких экранах. */}
                    <td className="hidden sm:table-cell px-3 py-2 md:px-4 md:py-3 text-gray-700 whitespace-nowrap">
                      {task.deadline}
                    </td>

                    {/* Ячейка с датой создания. Скрыта на средних экранах и меньше. */}
                    {/* Используем компонент ClientDate для корректного отображения даты. */}
                    <td className="hidden md:table-cell px-3 py-2 md:px-4 md:py-3 text-gray-700 whitespace-nowrap">
                      <ClientDate dateStr={task.createdAt} />
                    </td>

                    {/* Ячейка с именем исполнителя. Скрыта на маленьких экранах. */}
                    <td className="hidden sm:table-cell px-3 py-2 md:px-4 md:py-3 text-gray-700 max-w-[130px] truncate">
                      {/* Используем findUser для получения имени по ID. */}
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