// Указывает, что этот компонент должен выполняться на стороне клиента.
"use client";

import ProfileButton from "./ProfileButton"; // Импортируем компонент кнопки профиля.
import { useDashboard } from "@/hooks/useDashboard"; // Импортируем кастомный хук для работы с дашбордами.
import { useRouter } from "next/navigation"; // Импортируем хук для навигации.

// Определяем тип пропсов для компонента NavMobile.
type Props = {
    onClose: () => void; // Функция для закрытия мобильного меню.
};

/**
 * Компонент NavMobile.
 *
 * Это мобильное навигационное меню, которое отображается на маленьких экранах.
 * Оно содержит список дашбордов и кнопки для выполнения основных действий.
 *
 * @param {Props} { onClose } - Пропсы компонента, включающие функцию для закрытия меню.
 */
const NavMobile: React.FC<Props> = ({ onClose }) => {
    // Получаем данные и функции из хука useDashboard.
    const { selectedDashboardId, onDashboardChange, dashboards } = useDashboard();
    // Инициализируем роутер для навигации.
    const router = useRouter();

    /**
     * Обрабатывает выбор дашборда из списка.
     *
     * @param {string} id - ID выбранного дашборда.
     */
    const handleDashboardSelect = (id: string) => {
        onDashboardChange(id); // Обновляем выбранный дашборд через хук.
        onClose(); // Закрываем мобильное меню.
    };

    // Если список дашбордов ещё не загружен, показываем индикатор загрузки.
    if (!dashboards.length) {
        return <div>Загрузка дашбордов...</div>;
    }

    // Рендерим мобильное меню.
    return (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-10 flex flex-col items-start px-6 py-4 space-y-4 md:hidden">
            {/* Секция с дашбордами, реализованная с помощью тега details для сворачивания/разворачивания. */}
            <details className="w-full" open>
                <summary className="cursor-pointer text-gray-700 text-3xl">
                    Дашборды
                </summary>
                <div className="ml-4 mt-2 space-y-1">
                    {/* Маппинг по массиву дашбордов для создания кнопок. */}
                    {dashboards.map((db) => (
                        <button
                            key={db.id}
                            className={`block text-left text-2xl w-full ${
                                db.id === selectedDashboardId
                                    ? "text-blue-600 font-semibold" // Стили для активного (выбранного) дашборда.
                                    : "text-gray-700" // Стандартные стили.
                            }`}
                            onClick={() => handleDashboardSelect(db.id)}
                        >
                            {db.name}
                        </button>
                    ))}
                </div>
            </details>
            {/* Контейнер для кнопок действий. */}
            <div className="flex items-center justify-self-auto space-x-4 w-full">
                {/* Кнопка для создания задачи. На данный момент не имеет обработчика onClick. */}
                <button className="bg-indigo-900 text-white text-2xl text-center px-4 py-2 rounded-2xl transition">
                    Создать задачу
                </button>
                {/* Компонент кнопки профиля. */}
                <ProfileButton />
            </div>
        </div>
    );
};

export default NavMobile; // Экспортируем компонент.