// Указывает, что этот компонент должен выполняться на стороне клиента.
"use client";

import Link from "next/link"; // Компонент Next.js для навигации.
import { useState } from "react"; // Хук для управления состоянием.
import { AnimatePresence, motion } from "framer-motion"; // Библиотека для анимации UI.
import { ChevronDown, LogOut, User as UserIcon, UserPlus } from "lucide-react"; // Импорт иконок.
import { useRouter } from 'next/navigation'; // Хук Next.js для программной навигации.
import { useUserContext } from "@/context/UserContext"; // Импорт кастомного хука для доступа к данным пользователя.
import { User } from '@/types/user'

/**
 * Интерфейс для данных пользователя.
 * Описывает структуру объекта пользователя, получаемого после аутентификации.
 */

/**
 * Компонент ProfileButton.
 * Этот компонент отображает кнопку профиля, которая меняется в зависимости от
 * статуса аутентификации пользователя (авторизован или нет). При клике
 * открывается выпадающее меню с опциями.
 */
const ProfileButton = () => {
    // Состояние для управления видимостью выпадающего меню.
    const [isOpen, setIsOpen] = useState(false);
    // Инициализация роутера для навигации.
    const router = useRouter();
    // Получение данных пользователя и статуса загрузки из контекста.
    const { user, loading } = useUserContext();

    // Функция для закрытия выпадающего меню.
    const handleClose = () => setIsOpen(false);

    /**
     * Обработчик выхода из системы.
     * Закрывает меню и перенаправляет пользователя на страницу входа.
     * В реальном приложении здесь должен быть вызов API для очистки сессии на сервере.
     */
    const handleLogout = () => {
        handleClose();
        router.push('/login'); // Перенаправляем на страницу входа.
        // TODO: Добавить вызов API для выхода из системы, чтобы сервер очистил куки сессии.
        // Например: API.post('/api/logout');
    };

    // --- Логика рендеринга в зависимости от состояния ---

    // Если данные пользователя загружаются, отображаем "скелетон" (пульсирующий кружок).
    if (loading) {
        return <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />;
    }

    // Если пользователь авторизован (объект user существует), отображаем меню профиля.
    if (user) {
        return (
            <div className="relative inline-block text-left">
                {/* Кнопка для открытия/закрытия меню */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900 text-white hover:bg-indigo-700 transition-colors transform duration-300"
                    aria-haspopup="true" // Атрибут для доступности, указывает, что кнопка открывает выпадающее меню.
                    aria-expanded={isOpen} // Атрибут для доступности, указывает, открыто ли меню.
                >
                    <span className="font-bold hidden sm:inline">
                        Привет, {user.login}
                    </span>
                    <UserIcon size={18} />
                </button>
                {/* Контейнер для анимации выпадающего меню */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                        >
                            {/* Секция с информацией о пользователе */}
                            <div className="py-2 px-4 border-b border-gray-100">
                                <p className="text-sm font-medium text-gray-900">
                                    {user.name} {user.surname} {user.middlename}
                                </p>
                                <p className="text-xs text-gray-500">
                                    @{user.login}
                                </p>
                            </div>
                            {/* Секция с кнопками-ссылками */}
                            <div className="py-1">
                                {/* Ссылка на страницу профиля */}
                                <Link
                                    href="/profile"
                                    onClick={handleClose}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    <UserIcon size={16} />
                                    <span>Профиль</span>
                                </Link>
                                {/* Кнопка "Выйти" */}
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

    // Если пользователь не авторизован (user === null), отображаем меню входа/регистрации.
    return (
        <div className="relative inline-block text-left">
            {/* Кнопка для открытия/закрытия меню */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900 text-white hover:bg-indigo-700 transition-colors transform duration-300"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <span className="font-bold hidden sm:inline">Войти</span>
                <ChevronDown size={18} />
            </button>
            {/* Контейнер для анимации выпадающего меню */}
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
                            {/* Ссылка на страницу авторизации */}
                            <Link
                                href="/login"
                                onClick={handleClose}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                <UserIcon size={16} />
                                <span>Авторизация</span>
                            </Link>
                            {/* Ссылка на страницу регистрации */}
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

export default ProfileButton; // Экспортируем компонент.