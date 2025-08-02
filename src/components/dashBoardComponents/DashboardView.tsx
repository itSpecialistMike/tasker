import React, { useMemo } from "react";
import DashboardLayout from "./DashboardLayout";
import { useTasks } from "@/hooks/useTasks";
import { useSortedTasks } from "@/hooks/useSortedTasks";
import { useFetchDashboards } from "@/hooks/useFetchDashboards";

type Props = {
  dashboardId?: string;
};

const DashboardView: React.FC<Props> = ({ dashboardId }) => {
  const { tasks, loading: tasksLoading, error: tasksError } = useTasks();
  const { data: dashboards, loading: dashboardsLoading, error: dashboardsError } = useFetchDashboards();

  // Выбираем ID активного дашборда (хуки выше — так правильно)
  const activeDashboardId = dashboardId ?? dashboards[1]?.id ?? "";

  // Фильтрация задач — хук useMemo должен идти здесь, а не после return
  const filteredTasks = useMemo(() => {
    if (dashboardId === "all") return tasks;
    return tasks.filter((task) => task.dashboardId === activeDashboardId);
  }, [dashboardId, activeDashboardId, tasks]);

  // Сортировка — тоже хук, должен быть выше return
  const { sortedTasks, sortField, sortOrder, toggleSort } = useSortedTasks(filteredTasks);

  // А вот состояние загрузки и ошибки — их можно обрабатывать после вызова хуков

  if (dashboardsLoading || tasksLoading)
    return <div className="p-4 text-gray-500">Загрузка...</div>;

  if (dashboardsError)
    return <div className="p-4 text-red-500">Ошибка загрузки дашбордов: {dashboardsError}</div>;

  if (tasksError)
    return <div className="p-4 text-red-500">Ошибка загрузки задач: {tasksError}</div>;

  // Название дашборда
  const title = dashboards.find((d) => d.id === activeDashboardId)?.name ?? "Дашборд";

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


export default DashboardView;
