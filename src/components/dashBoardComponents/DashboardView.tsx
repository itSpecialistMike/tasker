import React from "react";
// Импорт компонента DashboardLayout, который отвечает за отображение таблицы задач.
import DashboardLayout from "./DashboardLayout";
// Импорт кастомных хуков для получения и управления данными.
// useTasks: хук для получения всех задач пользователя.
import { useTasks } from "@/hooks/useTasks";
// useTasksByDB: хук для получения задач, относящихся к конкретному дашборду.
import { useTasksByDB } from "@/hooks/UseTasksByDB";
// useSortedTasks: хук для управления сортировкой задач на клиенте.
import { useSortedTasks } from "@/hooks/useSortedTasks";
// useFetchDashboards: хук для получения списка всех дашбордов.
import { useFetchDashboards } from "@/hooks/useFetchDashboards";

// Определение типа для пропсов компонента DashboardView.
// dashboardId: опциональный пропс, который может быть строкой.
type Props = {
  dashboardId?: string;
};

// Компонент DashboardView отвечает за логику получения данных и их передачу в DashboardLayout.
// Он управляет загрузкой, ошибками и отображением данных.
const DashboardView: React.FC<Props> = ({ dashboardId }) => {
  // Хук для получения списка дашбордов.
  // data: массив дашбордов, isLoading: флаг загрузки, error: объект ошибки.
  const {
    data: dashboards = [],
    isLoading: dashboardsLoading,
    error: dashboardsError,
  } = useFetchDashboards();

  // Определение ID активного дашборда.
  // Приоритет:
  // 1. Пропс dashboardId, если он существует.
  // 2. ID первого дашборда из списка, если он существует.
  // 3. Пустая строка, если ни одно из условий не выполнилось.
  const activeDashboardId: string =
      typeof dashboardId === "string"
          ? dashboardId
          : typeof dashboards[0]?.id === "string"
              ? dashboards[0].id
              : "";

  // Проверка, выбран ли режим "все дашборды".
  const isAllDashboardsSelected = activeDashboardId === "" || activeDashboardId === "all";

  // Условный вызов хуков для получения задач.
  // Хук useTasks вызывается, если выбраны все дашборды.
  const allTasks = useTasks(isAllDashboardsSelected);
  // Хук useTasksByDB вызывается, если выбран конкретный дашборд.
  const tasksByDB = useTasksByDB(!isAllDashboardsSelected ? activeDashboardId : null);

  // Определение финального массива задач для отображения.
  // Если выбраны все дашборды, берем задачи из allTasks.
  // В противном случае, берем задачи из tasksByDB.
  const tasks = isAllDashboardsSelected ? allTasks.tasks : tasksByDB.data ?? [];
  // Флаги загрузки объединяются, чтобы отображать индикатор, пока загружается любой из хуков.
  const tasksLoading = allTasks.loading || tasksByDB.isLoading;
  // Сообщения об ошибках также объединяются.
  const tasksError = allTasks.error || tasksByDB.error?.message;

  // Хук useSortedTasks принимает массив задач и предоставляет
  // отсортированный массив, текущее поле/порядок сортировки и функцию-переключатель.
  const { sortedTasks, sortField, sortOrder, toggleSort } = useSortedTasks(tasks);

  // Обработка состояния загрузки.
  // Если загружаются дашборды или задачи, показываем индикатор загрузки.
  if (dashboardsLoading || tasksLoading) {
    return <div className="p-4 text-gray-500">Загрузка...</div>;
  }

  // Обработка состояния ошибки.
  // Если произошла ошибка при загрузке дашбордов, отображаем соответствующее сообщение.
  if (dashboardsError) {
    return <div className="p-4 text-red-500">Ошибка загрузки дашбордов: {dashboardsError.message}</div>;
  }

  // Если произошла ошибка при загрузке задач, отображаем соответствующее сообщение.
  if (tasksError) {
    return <div className="p-4 text-red-500">Ошибка загрузки задач: {tasksError}</div>;
  }

  // Определение заголовка таблицы.
  // Находим дашборд по ID и используем его имя. Если дашборд не найден, используем "Дашборд" по умолчанию.
  const title = dashboards.find((d) => d.id === activeDashboardId)?.name ?? "Дашборд";

  // Возвращаем основной компонент DashboardLayout, передавая ему все необходимые данные и функции.
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