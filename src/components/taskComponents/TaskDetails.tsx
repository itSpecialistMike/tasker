// tasker/src/components/taskComponents/TaskDetails.tsx
// Этот файл содержит компонент TaskDetails, который отображает детали задачи в приложении Tasker

// Указывает, что это клиентский компонент, так как он использует хуки.
"use client";

import { useMemo } from "react"; // Хук для мемоизации. Хотя в обновленной версии он не используется, оставлен для примера.
import { Task, TaskStatus, ApproveStatus } from "@/types/task"; // Импорт типов данных для задач.
// ✔️ Убираем импорт useTasks, так как данные будут передаваться через пропсы,
// что делает компонент более гибким и переиспользуемым.
// import { useTasks } from "@/hooks/useTasks";

/**
 * Пропсы компонента TaskDetails.
 * Компонент теперь принимает полный объект задачи в качестве пропса.
 * @param task - Объект задачи типа Task.
 */
type Props = {
    task: Task;
};

/**
 * Объект для локализации статусов задач.
 * Сопоставляет значения из `TaskStatus` с читаемыми строками на русском языке.
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
 * Объект для локализации статусов согласования.
 * Сопоставляет значения из `ApproveStatus` с читаемыми строками на русском языке.
 */
const approveLabels: Record<ApproveStatus, string> = {
    "need-approval": "Требует одобрения",
    approval: "Ожидает одобрения",
    approved: "Одобрена",
    rejected: "Отклонена",
};

/**
 * Вспомогательная функция для форматирования даты.
 * Преобразует строку даты в локализованный формат (дд.мм.гггг).
 * Возвращает "—", если дата не задана.
 * @param dateString - Строка даты (может быть null или undefined).
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
 * Компонент TaskDetails.
 * Отображает подробную информацию о задаче.
 * Теперь он не занимается загрузкой данных, а просто отображает их,
 * что соответствует принципам разделения ответственности.
 * @param {Props} { task } - Пропсы компонента, содержащие объект задачи.
 */
export default function TaskDetails({ task }: Props) {
    // ✔️ Убрана логика поиска и загрузки, так как эти операции выполняются в родительском компоненте.
    // Это упрощает TaskDetails, делая его "глупым" (stateless) компонентом.

    // ✔️ Убрана проверка на null, так как родительский компонент гарантирует, что `task`
    // будет предоставлен. Это делает код более чистым.

    return (
        <div className="space-y-6">
            {/* Заголовок задачи */}
            <h1 className="text-3xl font-bold">{task.title}</h1>
            {/* Описание задачи */}
            <p className="text-gray-700 text-base">{task.description}</p>

            {/* Сетка для отображения ключевых деталей задачи */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                    <span className="font-medium">Статус:</span>{" "}
                    {/* Отображаем локализованный статус */}
                    {statusLabels[task.status]}
                </div>
                <div>
                    <span className="font-medium">Согласование:</span>{" "}
                    {/* Отображаем локализованный статус согласования */}
                    {approveLabels[task.approveStatus]}
                </div>
                <div>
                    <span className="font-medium">Создана:</span>{" "}
                    {/* Форматируем дату создания */}
                    {formatDate(task.createdAt)}
                </div>
                <div>
                    <span className="font-medium">Дедлайн:</span>{" "}
                    {/* Форматируем дату дедлайна */}
                    {formatDate(task.deadline)}
                </div>
                {/* Условное отображение даты начала, если она существует */}
                {task.startedAt && (
                    <div>
                        <span className="font-medium">Начата:</span>{" "}
                        {formatDate(task.startedAt)}
                    </div>
                )}
                {/* Условное отображение даты завершения, если она существует */}
                {task.completedAt && (
                    <div>
                        <span className="font-medium">Завершена:</span>{" "}
                        {formatDate(task.completedAt)}
                    </div>
                )}
            </div>

            {/* Условное отображение списка блокирующих задач, если они есть */}
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