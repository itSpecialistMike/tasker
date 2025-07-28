/**
 * Импортируем необходимые библиотеки и компоненты:
 * - React и useMemo для создания компонента и оптимизации вычислений
 * - DashboardLayout — компонент для отображения таблицы задач
 * - useTasks — хук получения задач с API
 * - mockDashboards — моковые данные для дашбордов (пока настоящих нет)
 * - useSortedTasks — пользовательский хук для сортировки задач
 */
import React, { useMemo } from "react";
import DashboardLayout from "./DashboardLayout";
import { mockDashboards } from "@/mocks/dashboards";
import { useTasks } from "@/hooks/useTasks"; // Новый хук
import { useSortedTasks } from "@/hooks/useSortedTasks"; // Хук сортировки

/**
 * Тип пропсов компонента DashboardView:
 * - dashboardId (необязательный): идентификатор выбранного дашборда
 */
type Props = {
  dashboardId?: string;
};

/**
 * Компонент DashboardView:
 * - отображает список задач, отфильтрованных и отсортированных по выбранному дашборду
 * - если dashboardId не передан, по умолчанию используется второй дашборд из моков
 */
const DashboardView: React.FC<Props> = ({ dashboardId }) => {
  /**
   * Загружаем задачи с сервера:
   * - tasks — массив задач
   * - loading — индикатор загрузки
   * - error — сообщение об ошибке (если есть)
   */
  const { tasks, loading, error } = useTasks();

  /**
   * Выбираем активный dashboardId:
   * - используем переданный dashboardId, если он есть
   * - иначе используем ID второго дашборда из mockDashboards
   * - если и он отсутствует, используем пустую строку
   */
  const activeDashboardId = dashboardId ?? mockDashboards[1]?.id ?? "";

  /**
   * Мемоизированный фильтр задач:
   * - если dashboardId === "all", возвращаем все задачи без фильтрации
   * - иначе фильтруем задачи по полю dashboardId, чтобы показать задачи только выбранного дашборда
   * - useMemo гарантирует пересчёт только при изменении dashboardId, activeDashboardId или tasks
   */
  const filteredTasks = useMemo(() => {
    if (dashboardId === "all") return tasks;
    return tasks.filter((task) => task.dashboardId === activeDashboardId);
  }, [dashboardId, activeDashboardId, tasks]);

  /**
   * Хук useSortedTasks:
   * - принимает отфильтрованные задачи
   * - возвращает отсортированный список задач,
   *   а также параметры текущей сортировки и функцию для переключения сортировки
   */
  const { sortedTasks, sortField, sortOrder, toggleSort } = useSortedTasks(filteredTasks);

  /**
   * Заголовок дашборда:
   * - ищем в mockDashboards дашборд с текущим activeDashboardId
   * - если не найден, показываем дефолтное название "Дашборд"
   */
  const title = mockDashboards.find((d) => d.id === activeDashboardId)?.name ?? "Дашборд";

  /**
   * Обработка состояний загрузки и ошибок:
   * - показываем сообщение при загрузке
   * - либо ошибку, если что-то пошло не так
   */
  if (loading) return <div className="p-4 text-gray-500">Загрузка задач...</div>;
  if (error) return <div className="p-4 text-red-500">Ошибка: {error}</div>;

  /**
   * Рендер компонента DashboardLayout:
   * - передаём название дашборда, отсортированные задачи
   * - также передаём параметры сортировки и функцию переключения
   */
  return (
    <DashboardLayout
      title={title}
      items={sortedTasks}
      sortField={sortField}
      sortOrder={sortOrder}
      toggleSort={toggleSort}
    />
  );
};

/**
 * Экспортируем DashboardView для использования в приложении
 */
export default DashboardView;
