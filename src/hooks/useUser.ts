// src/hooks/useUser.ts
import { useQuery } from "@tanstack/react-query";
import API from "@/lib/axios";
import { User } from '@/types/user';
import axios from 'axios';

export function useUser() {
  const {
    data: user,
    isLoading: loading,
    isError,
    error,
    refetch,
  } = useQuery<User, Error>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const response = await API.get<User>("/api/getuserbyJWT");
        return response.data;
      } catch (e) {
        if (axios.isAxiosError(e)) {
          // Проверяем, что это ошибка от сервера
          if (e.response?.status === 401) {
            // Если статус 401, это явно ошибка авторизации.
            // Можно добавить более конкретную обработку,
            // например, очистку токена в localStorage.
            // localStorage.removeItem("authToken");
            throw new Error("Не авторизован");
          }
          // Если ошибка 401 содержит в теле "Token not found"
          // Это можно обрабатывать так:
          if (e.response?.status === 401 && e.response.data.error === "Token not found") {
            // Дополнительная логика для "Token not found"
            // Например, перенаправление на страницу входа
            // router.push('/login');
            throw new Error("Токен не найден. Пожалуйста, войдите снова.");
          }
        }
        // Если это другая ошибка (например, сетевая),
        // просто выбрасываем её дальше
        throw e;
      }
    },
    // Отключаем повторные попытки для ошибок 401
    retry: (failureCount, error) => {
      return !(axios.isAxiosError(error) && error.response?.status === 401) && failureCount < 3;
    }
  });

  return {
    user: user ?? null,
    loading,
    error: isError ? error.message : null,
    refetchUser: refetch,
  };
}