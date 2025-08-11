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
          if (e.response?.status === 401) {
            throw new Error("Не авторизован");
          }
          if (e.response?.status === 401 && e.response.data.error === "Token not found") {
            throw new Error("Токен не найден. Пожалуйста, войдите снова.");
          }
        }
        throw e;
      }
    },
    // 💡 Добавляем staleTime: данные считаются свежими 5 минут (300 000 мс)
    staleTime: 1000 * 60 * 5,
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