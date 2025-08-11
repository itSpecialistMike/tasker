// src/context/UserContext.tsx
// Этот файл содержит провайдер контекста для управления данными о текущем пользователе.

"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useUser } from "@/hooks/useUser"; // <-- Импортируем хук useUser

/**
 * Интерфейс, описывающий структуру объекта пользователя.
 */
interface User {
    id: number;
    name: string;
    surname: string;
    middlename: string;
    login: string;
    roleID: number;
}

/**
 * Интерфейс, описывающий тип возвращаемого значения хука useUserContext.
 * Он включает данные о пользователе, статусы загрузки и ошибки, а также функцию для повторной выборки.
 */
interface UserContextType {
    user: User | null;
    loading: boolean;
    error: Error | null;
    refetchUser: () => Promise<any>;
}

// Создаем контекст, который будет использоваться для предоставления данных о пользователе.
const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * UserProvider - компонент, который оборачивает часть приложения и предоставляет
 * доступ к контексту пользователя.
 */
export const UserProvider = ({ children }: { children: ReactNode }) => {
    // Используем хук useUser для получения данных о пользователе.
    const {
        user,
        loading,
        error,
        refetchUser,
    } = useUser();

    // Значение, которое будет передано в контекст.
    const value = {
        user,
        loading,
        error,
        refetchUser,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

/**
 * Хук useUserContext.
 * Позволяет дочерним компонентам получать доступ к данным пользователя из контекста.
 * @returns {UserContextType} Объект с данными о пользователе и функциями.
 * @throws {Error} Если хук используется вне UserProvider.
 */
export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};