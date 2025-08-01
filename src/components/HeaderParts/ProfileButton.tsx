// tasker/src/components/HeaderParts/ProfileButton.tsx
// Этот файл содержит компонент ProfileButton, который отображает выпадающее меню пользователя
"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, User as UserIcon, UserPlus } from "lucide-react";
import { useRouter } from 'next/navigation'; // ✔️ Импортируем useRouter для навигации

/**
 * Интерфейс для данных пользователя, основанный на предоставленной структуре JWT-ответа.
 */
interface User {
    id: number;
    name: string;
    surname: string;
    login: string;
    roleID: number;
}

/**
 * Пропсы для ProfileButton:
 * - user: объект пользователя, может быть null
 * - loading: флаг загрузки
 */
interface Props {
    user: User | null;
    loading: boolean;
}

const ProfileButton = ({ user, loading }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter(); // ✔️ Инициализируем useRouter

    // Функция для закрытия меню
    const handleClose = () => setIsOpen(false);

    // ✔️ Обновленная функция для выхода из системы
    const handleLogout = () => {
        // Удаляем токен из localStorage
        localStorage.removeItem('jwtToken');
        // Закрываем выпадающее меню
        handleClose();
        // Перенаправляем пользователя на главную страницу
        router.push('/');
        // Возможно, потребуется обновить глобальное состояние или контекст
        // для сброса данных пользователя в приложении.
        // Здесь можно было бы вызвать функцию из контекста, например, `userContext.logout()`
    };

    // Отображение состояния загрузки
    if (loading) {
        return <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />;
    }

    // Логика для авторизованного пользователя
    if (user) {
        return (
            <div className="relative inline-block text-left">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900 text-white hover:bg-indigo-700 transition-colors transform duration-300"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                >
                    <span className="font-bold hidden sm:inline">
                        Привет, {user.login}
                    </span>
                    <UserIcon size={18} />
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                        >
                            <div className="py-2 px-4 border-b border-gray-100">
                                <p className="text-sm font-medium text-gray-900">
                                    {user.name} {user.surname}
                                </p>
                                <p className="text-xs text-gray-500">
                                    @{user.login}
                                </p>
                            </div>
                            <div className="py-1">
                                <Link
                                    href="/profile"
                                    onClick={handleClose}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    <UserIcon size={16} />
                                    <span>Профиль</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut size={16} />
                                    <span>Выйти</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    // Логика для неавторизованного пользователя
    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900 text-white hover:bg-indigo-700 transition-colors transform duration-300"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <span className="font-bold hidden sm:inline">Войти</span>
                <ChevronDown size={18} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 origin-top-right rounded-2xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    >
                        <div className="py-1">
                            <Link
                                href="/login"
                                onClick={handleClose}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                <UserIcon size={16} />
                                <span>Авторизация</span>
                            </Link>
                            <Link
                                href="/register"
                                onClick={handleClose}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                <UserPlus size={16} />
                                <span>Регистрация</span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileButton;
