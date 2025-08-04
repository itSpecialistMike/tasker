"use client";

import React, { useEffect, useRef } from "react";
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
    loading: dashboardsLoading,
    error: dashboardsError,
  } = useFetchDashboards();

  const activeDashboardId: string =
      typeof dashboardId === "string"
          ? dashboardId
          : typeof dashboards[0]?.id === "string"
              ? dashboards[0].id
              : "";

  // Хук для всех задач (если "all")
  const {
    tasks: allTasksList,
    loading: allLoading,
    error: allError,
    refetch: refetchAll,
  } = useTasks(activeDashboardId === "" || activeDashboardId === "all");

  // Хук для задач по дашборду
  const {
    tasks: dbTasksList,
    loading: dbLoading,
    error: dbError,
  } = useTasksByDB(
      activeDashboardId !== "" && activeDashboardId !== "all"
          ? activeDashboardId
          : null
  );

  // 🔁 Ре-фетч при повторном выборе "Все дашборды"
  const prevDashboardId = useRef<string | null>(null);
  useEffect(() => {
    if (
        activeDashboardId === "all" &&
        prevDashboardId.current === "all"
    ) {
      refetchAll();
    }
    prevDashboardId.current = activeDashboardId;
  }, [activeDashboardId, refetchAll]);

  const tasks =
      activeDashboardId === "" || activeDashboardId === "all"
          ? allTasksList
          : dbTasksList;

  const tasksLoading = allLoading || dbLoading;
  const tasksError = allError || dbError;

  const { sortedTasks, sortField, sortOrder, toggleSort } =
      useSortedTasks(tasks);

  if (dashboardsLoading || tasksLoading)
    return <div className="p-4 text-gray-500">Загрузка...</div>;

  if (dashboardsError)
    return (
        <div className="p-4 text-red-500">
          Ошибка загрузки дашбордов: {dashboardsError}
        </div>
    );

  if (tasksError)
    return (
        <div className="p-4 text-red-500">
          Ошибка загрузки задач: {tasksError}
        </div>
    );

  const title =
      dashboards.find((d) => d.id === activeDashboardId)?.name ?? "Дашборд";

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
