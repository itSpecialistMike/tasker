// tasker/src/components/dashBoardComponents/DashboardDropdown.tsx
"use client"; // Указывает, что этот компонент должен выполняться на стороне клиента.

import { useState } from "react";
import { ChevronDown } from "lucide-react"; // Импорт иконки "стрелка вниз" из библиотеки lucide-react.
import { useDashboard } from "@/hooks/useDashboard"; // Кастомный хук для доступа к состоянию дашбордов (выбранный дашборд, список и т.д.).
import { AnimatePresence, motion } from "framer-motion"; // Библиотека для анимации UI. AnimatePresence управляет анимацией при входе/выходе, motion используется для анимированных элементов.
import { useTasks } from "@/hooks/useTasks"; // добавили импорт кастомного хука для получения задач.

/**
 * DashboardDropdown - компонент выпадающего списка для выбора дашборда.
 * Он использует хук useDashboard для получения списка доступных дашбордов,
 * а также для определения текущего выбранного и для обработки смены выбора.
 */
const DashboardDropdown: React.FC = () => {
    // Получаем необходимые данные и функции из хука useDashboard.
    const {
        dashboards,           // Массив дашбордов, который уже включает пункт "Все дашборды".
        selectedDashboardId,  // ID текущего выбранного дашборда.
        onDashboardChange,    // Функция для обновления выбранного дашборда.
        loading,              // Флаг состояния загрузки.
    } = useDashboard();

    // Состояние для управления видимостью выпадающего списка.
    const [open, setOpen] = useState(false);

    // Функция, которая обрабатывает выбор дашборда из выпадающего списка.
    const handleSelect = (id: string) => {
        // Теперь мы явно передаем `{ navigate: true }`,
        // чтобы инициировать навигацию в DashboardContext.
        onDashboardChange(id, { navigate: true });
        setOpen(false); // Закрываем выпадающий список после выбора.
    };

    // Определяем имя выбранного дашборда для отображения в кнопке.
    const selectedDashboardName =
        dashboards.find((db) => db.id === selectedDashboardId)?.name ??
        "Выберите дашборд";

    // Получаем функцию refetchTasks из useTasks для ручного обновления данных
    const { refetch: refetchTasks } = useTasks();

    // Обработчик для кнопки "Обновить", которая повторно запрашивает задачи.
    const handleRefresh = async () => {
        await refetchTasks();
    };

    if (loading) {
        return <div className="p-2 text-gray-500">Загрузка...</div>;
    }

    return (
        <div className="relative">
            {/* Кнопка, которая открывает/закрывает выпадающий список. */}
            <button
                // Обновленные классы: убраны 'border', 'shadow-sm' и 'focus:ring'
                className="flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-xl hover:bg-gray-100 focus:outline-none"
                onClick={() => setOpen(!open)}
                type="button"
                aria-haspopup="listbox" // Указывает, что элемент управляет выпадающим списком.
                aria-expanded={open} // Указывает, открыт ли список.
            >
                {selectedDashboardName}
                <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        role="listbox" // Указывает на роль списка.
                        // Настройка анимации с помощью Framer Motion.
                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute mt-1 bg-white rounded-2xl shadow w-48 z-50 overflow-hidden origin-top"
                    >
                        {/* Итерация по списку дашбордов для создания кнопок. */}
                        {dashboards.map((db) => (
                            <button
                                key={db.id}
                                role="option" // Указывает на роль элемента списка.
                                aria-selected={db.id === selectedDashboardId} // Указывает, выбран ли данный пункт.
                                onClick={() => handleSelect(db.id)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-200 transition"
                                type="button"
                            >
                                {db.name}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DashboardDropdown; // Экспорт компонента по умолчанию.