// tasker/src/components/DashboardView.tsx
import React, { useMemo } from "react";
import DashboardLayout from "./DashboardLayout";
import { mockTasks } from "@/mocks/tasks";
import { mockDashboards } from "@/mocks/dashboards";
import { SortField, SortOrder, useSortedTasks } from "@/hooks/dashboardHooks";

type Props = {
  dashboardId?: string; // теперь необязательный
};

const DashboardView: React.FC<Props> = ({ dashboardId }) => {
  // Если dashboardId не передан, берем id первого дашборда
  const activeDashboardId = dashboardId ?? mockDashboards[0]?.id ?? "";

  // Фильтруем задачи по dashboardId
  const filteredTasks = useMemo(() => {
    if (dashboardId === 'all') return mockTasks;
    return mockTasks.filter((task) => task.dashboardId === activeDashboardId);
  }, [activeDashboardId]);

  // Используем хук сортировки для фильтрованных задач
  const { sortedTasks, sortField, sortOrder, toggleSort } = useSortedTasks(filteredTasks);

  const title = mockDashboards.find((d) => d.id === activeDashboardId)?.name ?? "Дашборд";

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
