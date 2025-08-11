// tasker/src/components/ProfileButton.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, User as UserIcon, UserPlus } from "lucide-react";
import { useUserContext } from "@/context/UserContext";
import useLogout from "@/hooks/useLogout";
import { useQueryClient } from "@tanstack/react-query";
import { useTasks } from "@/hooks/useTasks";
import { useDashboard } from "@/hooks/useDashboard";

const ProfileButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, loading } = useUserContext();
    const logout = useLogout();
    const queryClient = useQueryClient();

    // 💡 Исправлено: вызываем useTasks с опцией { enabled: false }
    // Это предотвратит автоматический запрос, но даст доступ к refetch.
    const { refetch: refetchTasks } = useTasks({ enabled: false });

    // 💡 Корректное получение функции refetch из хука useDashboard
    const { refetchDashboards } = useDashboard();

    const handleClose = () => setIsOpen(false);

    const handleLogout = async () => {
        try {
            await logout();

            queryClient.setQueryData(["currentUser"], null);

            // Вызываем refetch. Благодаря опции 'enabled' в хуках,
            // запросы на сервер не будут выполнены, так как user будет null.
            refetchDashboards();
            refetchTasks();

            handleClose();
        } catch (error) {
            console.error("Ошибка при выходе из системы", error);
        }
    };

    if (loading) {
        return <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />;
    }

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
                            className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl bg-white shadow-xl z-50"
                        >
                            <div className="py-2 px-4 border-b border-gray-100">
                                <p className="text-sm font-medium text-gray-900">
                                    {user.name} {user.surname} {user.middlename}
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
                        className="absolute right-0 mt-2 w-48 origin-top-right rounded-2xl bg-white shadow-xl focus:outline-none z-50"
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