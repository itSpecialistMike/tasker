"use client";

import DashboardDropdown from "./DashboardDropdown";
import { useModal } from "@/context/ModalContext";
import TaskForm from "@/components/forms/TaskForm";
import { useUserContext } from "@/context/UserContext";

/**
 * Компонент NavDesktop:
 * - Показывает меню только авторизованным пользователям
 */
const NavDesktop: React.FC = () => {
    const { openModal } = useModal();
    const { user, loading } = useUserContext();

    if (loading || !user) {
        return null; // не показываем меню, пока идёт загрузка или если неавторизован
    }

    return (
        <nav className="hidden md:flex items-center text-gray-700">
            <DashboardDropdown />
            <button
                onClick={() => openModal(<TaskForm />)}
                className="flex items-center px-4 py-2 rounded-2xl hover:bg-gray-100 hover:scale-105 transform duration-300"
            >
                Создать задачу
            </button>
        </nav>
    );
};

export default NavDesktop;
