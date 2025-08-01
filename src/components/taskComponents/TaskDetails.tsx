// tasker/src/components/taskComponents/TaskDetails.tsx
// Этот файл содержит компонент TaskDetails, который отображает детали задачи в приложении Tasker

"use client";

import { useMemo } from "react";
import { Task, TaskStatus, ApproveStatus } from "@/types/task";
// ✔️ Убираем импорт useTasks, так как данные будут передаваться через пропсы
// import { useTasks } from "@/hooks/useTasks";

/**
 * Пропсы компонента TaskDetails:
 * ✔️ Теперь компонент принимает полный объект задачи (task)
 */
type Props = {
    task: Task;
};

/**
 * Локализация статусов задач:
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
 */
const approveLabels: Record<ApproveStatus, string> = {
    "need-approval": "Требует одобрения",
    approval: "Ожидает одобрения",
    approved: "Одобрена",
    rejected: "Отклонена",
};

/**
 * Форматирование даты
 */
const formatDate = (dateString: string | null | undefined): string =>
    dateString
        ? new Date(dateString).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
        : "—";

// ✔️ Обновляем компонент, чтобы он принимал пропс task
export default function TaskDetails({ task }: Props) {
    // ✔️ Убираем логику поиска задачи, так как она уже найдена в родительском компоненте
    // const { tasks, loading, error } = useTasks();
    // const task: Task | undefined = useMemo(() => tasks.find((t) => t.id === taskId), [tasks, taskId]);

    // ✔️ Убираем проверку на null, так как мы гарантируем, что task существует в родительском компоненте
    // if (loading) return <p>Загрузка...</p>;
    // if (error) return <p>Ошибка: {error}</p>;
    // if (!task) return <p className="text-red-500">Задача не найдена.</p>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">{task.title}</h1>
            <p className="text-gray-700 text-base">{task.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
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

            {task.blockedBy.length > 0 && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <span className="font-medium text-red-700">Заблокирована задачами:</span>
                    <ul className="list-disc list-inside mt-1 space-y-1 text-red-600">
                        {task.blockedBy.map((blockId) => (
                            <li key={blockId}>Задача с ID: {blockId}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
