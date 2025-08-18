// tasker/src/components/taskComponents/TaskDetails.tsx
"use client";
import { Task, TaskStatus, ApproveStatus } from "@/types/task";
import TaskEditForm from "@/components/forms/TaskEditForm"; // Импортируем нашу форму редактирования
import { useModal } from "@/context/ModalContext"; //  Импортируем хук для модального окна

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
 */
const approveLabels: Record<ApproveStatus, string> = {
    "need-approval": "Требует одобрения",
    approval: "Ожидает одобрения",
    approved: "Одобрена",
    rejected: "Отклонена",
};

/**
 * Вспомогательная функция для форматирования даты.
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
 */
export default function TaskDetails({ task }: Props) {
    //  Используем хук useModal для управления модальным окном
    const { openModal, closeModal } = useModal();

    // Функция для открытия модального окна с формой редактирования
    const handleEditClick = () => {
        // Мы передаем компонент TaskEditForm в качестве содержимого модального окна
        // и передаем ему пропсы task и closeModal
        openModal(
            <TaskEditForm
                task={task}
                onCancel={closeModal} // Закрываем модалку при отмене
                onSuccess={closeModal} // Закрываем модалку после успешного сохранения
            />
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold">{task.title}</h1>
                <button
                    onClick={handleEditClick}
                    aria-label="Редактировать задачу"
                    className="text-black hover:text-indigo-700 transition-colors duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="2em" fill="currentColor" viewBox="0 0 512 512">
                        <path d="M 0 84.88888888888889 Q 0.8888888888888888 60.888888888888886 16.88888888888889 44.888888888888886 L 16.88888888888889 44.888888888888886 L 16.88888888888889 44.888888888888886 Q 32.888888888888886 28.88888888888889 56.888888888888886 28 L 199.11111111111111 28 L 199.11111111111111 28 L 199.11111111111111 141.77777777777777 L 199.11111111111111 141.77777777777777 Q 199.11111111111111 154.22222222222223 207.11111111111111 162.22222222222223 Q 215.11111111111111 170.22222222222223 227.55555555555554 170.22222222222223 L 341.3333333333333 170.22222222222223 L 341.3333333333333 170.22222222222223 L 341.3333333333333 294.6666666666667 L 341.3333333333333 294.6666666666667 L 256.8888888888889 378.22222222222223 L 256.8888888888889 378.22222222222223 Q 246.22222222222223 389.77777777777777 242.66666666666666 404.8888888888889 L 229.33333333333334 458.22222222222223 L 229.33333333333334 458.22222222222223 Q 225.77777777777777 470.6666666666667 230.22222222222223 483.1111111111111 L 56.888888888888886 483.1111111111111 L 56.888888888888886 483.1111111111111 Q 32.888888888888886 482.22222222222223 16.88888888888889 466.22222222222223 Q 0.8888888888888888 450.22222222222223 0 426.22222222222223 L 0 84.88888888888889 L 0 84.88888888888889 Z M 341.3333333333333 141.77777777777777 L 227.55555555555554 141.77777777777777 L 341.3333333333333 141.77777777777777 L 227.55555555555554 141.77777777777777 L 227.55555555555554 28 L 227.55555555555554 28 L 341.3333333333333 141.77777777777777 L 341.3333333333333 141.77777777777777 Z M 488.8888888888889 237.77777777777777 L 501.3333333333333 250.22222222222223 L 488.8888888888889 237.77777777777777 L 501.3333333333333 250.22222222222223 Q 512 260.8888888888889 512 275.1111111111111 Q 512 289.3333333333333 501.3333333333333 300.8888888888889 L 475.55555555555554 326.6666666666667 L 475.55555555555554 326.6666666666667 L 412.44444444444446 263.55555555555554 L 412.44444444444446 263.55555555555554 L 438.22222222222223 237.77777777777777 L 438.22222222222223 237.77777777777777 Q 449.77777777777777 227.11111111111111 463.1111111111111 227.11111111111111 Q 477.3333333333333 227.11111111111111 488.8888888888889 237.77777777777777 L 488.8888888888889 237.77777777777777 Z M 277.3333333333333 398.6666666666667 L 392 284 L 277.3333333333333 398.6666666666667 L 392 284 L 455.1111111111111 347.1111111111111 L 455.1111111111111 347.1111111111111 L 340.44444444444446 461.77777777777777 L 340.44444444444446 461.77777777777777 Q 335.1111111111111 467.1111111111111 327.1111111111111 468.8888888888889 L 273.77777777777777 482.22222222222223 L 273.77777777777777 482.22222222222223 Q 265.77777777777777 484 260.44444444444446 478.6666666666667 Q 255.11111111111111 473.3333333333333 256 465.3333333333333 L 269.3333333333333 412 L 269.3333333333333 412 Q 272 404 277.3333333333333 398.6666666666667 L 277.3333333333333 398.6666666666667 Z" />
                    </svg>
                </button>
            </div>
            {/* Заголовок задачи */}

            {/* Описание задачи */}
            <p className="text-gray-700 text-base">{task.description}</p>

            {/* Сетка для отображения ключевых деталей задачи */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                    <span className="font-medium">Исполнитель:</span>{" "}
                    {task.assignerName}
                </div>
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
            {task.blockedBy && task.blockedBy.length > 0 && (
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