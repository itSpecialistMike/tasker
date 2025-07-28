// tasker/src/components/taskComponents/TaskDetails.tsx
"use client";

/**
 * Импорт React-хуков и типов/данных:
 * - useMemo: мемоизация вычислений
 * - mockTasks: моковые задачи
 * - Task, TaskStatus, ApproveStatus: типы задач и статусов
 */
import { useMemo } from "react";
import {
  mockTasks,
  type Task,
  type TaskStatus,
  type ApproveStatus,
} from "@/mocks/tasks";

/**
 * Пропсы компонента TaskDetails:
 * - taskId: строковый ID задачи, которую нужно отобразить
 */
type Props = {
  taskId: string;
};

/**
 * Локализация статусов задач:
 * Преобразует значения enum `TaskStatus` в читаемые строки
 */
const statusLabels: Record<TaskStatus, string> = {
  "to-do": "К выполнению",
  "in-progress": "В процессе",
  review: "На проверке",
  blocked: "Заблокирована",
  done: "Завершена",
  canceled: "Отменена",
};

/**
 * Локализация статусов согласования:
 * Преобразует значения enum `ApproveStatus` в читаемые строки
 */
const approveLabels: Record<ApproveStatus, string> = {
  "need-approval": "Требует одобрения",
  approval: "Ожидает одобрения",
  approved: "Одобрена",
  rejected: "Отклонена",
};

/**
 * Утилита форматирования дат:
 * - Преобразует строку ISO в формат dd.mm.yyyy
 * - Если null/undefined — возвращает прочерк
 */
const formatDate = (dateString: string | null | undefined): string =>
  dateString
    ? new Date(dateString).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "—";

/**
 * Основной компонент TaskDetails:
 * Отображает подробную информацию о задаче по ID
 */
export default function TaskDetails({ taskId }: Props) {
  /**
   * Получение задачи по ID из моков:
   * - useMemo предотвращает повторные вычисления
   */
  const task: Task | undefined = useMemo(
    () => mockTasks.find((t) => t.id === taskId),
    [taskId]
  );

  /**
   * Если задача не найдена — показываем сообщение об ошибке
   */
  if (!task) {
    return <p className="text-red-500 font-semibold">Задача не найдена.</p>;
  }

  return (
    /**
     * Основной блок отображения деталей задачи:
     * - Заголовок, описание, статус, даты
     * - При необходимости отображаются поля "Начата", "Завершена"
     * - Если есть блокирующие задачи — показывается предупреждение
     */
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{task.title}</h1>
      <p className="text-gray-700 text-base">{task.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        {/** Иконка */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          fill="currentColor"
          viewBox="0 0 512 512"
        >
          {/* ...icon path (можно вынести в отдельный компонент) */}
          <path d="..." />
        </svg>

        <div>
          <span className="font-medium">Статус:</span>{" "}
          {statusLabels[task.status]}
        </div>
        <div>
          <span className="font-medium">Согласование:</span>{" "}
          {approveLabels[task.approveStatus]}
        </div>
        <div>
          <span className="font-medium">Создана:</span>{" "}
          {formatDate(task.createdAt)}
        </div>
        <div>
          <span className="font-medium">Дедлайн:</span>{" "}
          {formatDate(task.deadline)}
        </div>
        {task.startedAt && (
          <div>
            <span className="font-medium">Начата:</span>{" "}
            {formatDate(task.startedAt)}
          </div>
        )}
        {task.completedAt && (
          <div>
            <span className="font-medium">Завершена:</span>{" "}
            {formatDate(task.completedAt)}
          </div>
        )}
      </div>

      {/** Если задача заблокирована другими задачами */}
      {task.blockedBy.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          Задача заблокирована задачами:{" "}
          <strong>{task.blockedBy.join(", ")}</strong>
        </div>
      )}
    </div>
  );
}
