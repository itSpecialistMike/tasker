import React from "react";
import DashboardLayout from "./DashboardLayout";
import { useTasks } from "@/hooks/useTasks";
import { useTasksByDB } from "@/hooks/UseTasksByDB";
import { useSortedTasks } from "@/hooks/useSortedTasks";
import { useFetchDashboards } from "@/hooks/useFetchDashboards";

type Props = {
  dashboardId?: string;
};

const DashboardView: React.FC<Props> = ({ dashboardId }) => {
  const {
    data: dashboards = [],
    isLoading: dashboardsLoading,
    error: dashboardsError,
  } = useFetchDashboards();

  const activeDashboardId: string =
      typeof dashboardId === "string"
          ? dashboardId
          : typeof dashboards[0]?.id === "string"
              ? dashboards[0].id
              : "";

  const isAllDashboardsSelected = activeDashboardId === "" || activeDashboardId === "all";

  const allTasks = useTasks(isAllDashboardsSelected);
  const tasksByDB = useTasksByDB(!isAllDashboardsSelected ? activeDashboardId : null);

  const tasks = isAllDashboardsSelected ? allTasks.tasks : tasksByDB.data ?? [];
  const tasksLoading = allTasks.loading || tasksByDB.isLoading;
  const tasksError = allTasks.error || tasksByDB.error?.message;

  const { sortedTasks, sortField, sortOrder, toggleSort } = useSortedTasks(tasks);

  if (dashboardsLoading || tasksLoading) {
    return <div className="p-4 text-gray-500">Загрузка...</div>;
  }



  if (dashboardsError) {
    return <div className="p-4 text-red-500">Ошибка загрузки дашбордов: {dashboardsError.message}</div>;
  }

  if (tasksError) {
    return <div className="p-4 text-red-500">Ошибка загрузки задач: {tasksError}</div>;
  }

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
