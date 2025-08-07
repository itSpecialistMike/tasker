// src/context/UserContext.tsx
// Этот файл содержит провайдер контекста для управления данными о текущем пользователе.

"use client";

import React, { createContext, useContext, ReactNode } from "react";
// Импортируем хуки из TanStack Query для управления состоянием сервера.
import { useQuery, useQueryClient } from "@tanstack/react-query";
import API from "@/lib/axios"; // Импорт настроенного экземпляра axios для API-запросов.

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
 * Функция для получения данных пользователя с сервера.
 * Отправляет GET-запрос на эндпоинт "/api/getuserbyJWT".
 * @returns {Promise<User>} Промис, который разрешается в объект User.
 */
const fetchUser = async (): Promise<User> => {
    const response = await API.get<User>("/api/getuserbyJWT");
    return response.data;
};

/**
 * Интерфейс, описывающий тип возвращаемого значения хука useUserContext.
 * Он включает данные о пользователе, статусы загрузки и ошибки, а также функцию для повторной выборки.
 */
interface UserContextType {
    user: User | null;
    loading: boolean;
    error: Error | null;
    refetchUser: () => void;
}

// Создаем контекст, который будет использоваться для предоставления данных о пользователе.
// Начальное значение undefined, так как оно будет предоставлено провайдером.
const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * UserProvider - компонент, который оборачивает часть приложения и предоставляет
 * доступ к контексту пользователя.
 * Он использует `useQuery` для получения и кэширования данных о пользователе.
 */
export const UserProvider = ({ children }: { children: ReactNode }) => {
    // Используем useQuery для получения данных пользователя.
    // - queryKey: уникальный ключ для кэширования запроса.
    // - queryFn: асинхронная функция для выполнения запроса.
    // - staleTime: время в миллисекундах, в течение которого данные считаются "свежими" (не будут повторно запрашиваться).
    // - retry: количество попыток повторного выполнения запроса в случае ошибки.
    // - initialData: начальные данные для запроса (могут быть использованы для SSR).
    const {
        data: user, // Переименовываем 'data' в 'user' для удобства.
        isLoading, // Флаг, указывающий на первую загрузку данных.
        isFetching, // Флаг, указывающий на любую загрузку данных (включая фоновые обновления).
        error, // Объект ошибки, если запрос завершился неудачно.
        refetch, // Функция для принудительного повторного выполнения запроса.
    } = useQuery({
        queryKey: ["currentUser"],
        queryFn: fetchUser,
        staleTime: Infinity, // Данные никогда не устаревают, пока их не invalidate.
        retry: 1,
    });

    // Объединяем флаги isLoading и isFetching, чтобы показывать индикатор загрузки
    // как при первой загрузке, так и при фоновом обновлении.
    const loading = isLoading || isFetching;

    // Функция для принудительного обновления данных пользователя.
    // В TanStack Query `refetch` является асинхронной, но для контекста
    // мы можем предоставить синхронный интерфейс, как в исходном коде.
    const refetchUser = () => {
        refetch();
    };

    // Значение, которое будет передано в контекст.
    const value = {
        user: user ?? null, // Предоставляем null, если данных нет.
        loading,
        error: error as Error | null, // Приводим тип ошибки.
        refetchUser,
    };

    return (
        // Предоставляем контекст всем дочерним компонентам.
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