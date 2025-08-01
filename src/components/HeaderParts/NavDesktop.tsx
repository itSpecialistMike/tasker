// tasker/src/components/HeaderParts/NavDesktop.tsx
"use client";

import Link from "next/link";
import DashboardDropdown from "./DashboardDropdown";
import { useDashboard } from "@/hooks/useDashboard"; // / ✔️ Импортируем хук

/**
 * Компонент NavDesktop:
 * - Отображает навигационное меню в десктопной версии (md и выше)
 * - Включает выпадающий список дашбордов и кнопку "Создать задачу"
 */
const NavDesktop: React.FC = () => {
    // ✔️ Получаем данные из контекста
    const { selectedDashboardId, onDashboardChange } = useDashboard();

    return (
        <nav className="hidden md:flex items-center text-gray-700">
            {/* ❌ Убираем пропсы, так как DashboardDropdown теперь использует контекст */}
            <DashboardDropdown />
            <button className="flex items-center px-4 py-2 rounded-2xl hover:bg-gray-100 hover:scale-105 transform duration-300">
                Создать задачу
            </button>
        </nav>
    );
};

export default NavDesktop;
