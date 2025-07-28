/**
 * Импортируем необходимые библиотеки и компоненты:
 * - React и useMemo для создания компонента и оптимизации вычислений
 * - DashboardLayout — компонент для отображения таблицы задач
 * - mockTasks и mockDashboards — моковые данные для задач и дашбордов
 * - useSortedTasks — пользовательский хук для сортировки задач
 */
import React, { useMemo } from "react";
import DashboardLayout from "./DashboardLayout";
import { mockTasks } from "@/mocks/tasks";
import { mockDashboards } from "@/mocks/dashboards";

// Импортируем useSortedTasks из отдельного файла
import { useSortedTasks } from "@/hooks/useSortedTasks";

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
   * - useMemo гарантирует пересчёт только при изменении dashboardId или activeDashboardId
   */
  const filteredTasks = useMemo(() => {
    if (dashboardId === "all") return mockTasks;
    return mockTasks.filter((task) => task.dashboardId === activeDashboardId);
  }, [dashboardId, activeDashboardId]);

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
