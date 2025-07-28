/**
 * Импортируем:
 * - React и useMemo: для создания компонента и мемоизации вычислений
 * - DashboardLayout: компонент, отображающий таблицу задач
 * - mockTasks: список всех задач (мока)
 * - mockDashboards: список доступных дашбордов (мока)
 * - useSortedTasks: хук для сортировки задач
 */
import React, { useMemo } from "react";
import DashboardLayout from "./DashboardLayout";
import { mockTasks } from "@/mocks/tasks";
import { mockDashboards } from "@/mocks/dashboards";
import { useSortedTasks} from "@/hooks/dashboardHooks";

/**
 * Тип пропсов компонента DashboardView:
 * - dashboardId: необязательный идентификатор выбранного дашборда
 */
type Props = {
  dashboardId?: string;
};

/**
 * Компонент DashboardView:
 * - отображает отфильтрованные и отсортированные задачи для выбранного дашборда
 * - при отсутствии dashboardId используется второй (mockDashboards[1]) по умолчанию
 */
const DashboardView: React.FC<Props> = ({ dashboardId }) => {
  /**
   * Выбор активного dashboardId:
   * - если передан явно, используем его
   * - иначе берём ID второго дашборда из моков
   * - если и он не доступен, возвращаем пустую строку
   */
  const activeDashboardId = dashboardId ?? mockDashboards[1]?.id ?? "";

  /**
   * Мемоизированная фильтрация задач:
   * - если передан dashboardId === 'all', возвращаем все задачи
   * - иначе фильтруем задачи по текущему дашборду
   */
  const filteredTasks = useMemo(() => {
    if (dashboardId === 'all') return mockTasks;
    return mockTasks.filter((task) => task.dashboardId === activeDashboardId);
  }, [dashboardId, activeDashboardId]);

  /**
   * Хук сортировки:
   * - возвращает отсортированные задачи, активное поле сортировки и направление
   * - также предоставляет функцию toggleSort для изменения порядка сортировки
   */
  const { sortedTasks, sortField, sortOrder, toggleSort } = useSortedTasks(filteredTasks);

  /**
   * Определяем заголовок таблицы:
   * - ищем имя активного дашборда по его ID
   * - если не найден, используем дефолтное название "Дашборд"
   */
  const title = mockDashboards.find((d) => d.id === activeDashboardId)?.name ?? "Дашборд";

  /**
   * Отображаем компонент DashboardLayout с нужными данными:
   * - title: название текущего дашборда
   * - items: отсортированные задачи
   * - sortField, sortOrder, toggleSort: параметры и функция сортировки
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
 * Экспорт компонента DashboardView:
 * - используется для отображения задач в рамках одного дашборда
 */
export default DashboardView;
