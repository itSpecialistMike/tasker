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
        // 💡 Оптимизация: если ошибка 401, не выбрасываем ее дальше.
        if (axios.isAxiosError(e) && e.response?.status === 401) {
          // Если это ожидаемая ошибка авторизации, просто возвращаем null.
          return null;
        }
        // Если это другая, непредвиденная ошибка, выбрасываем ее.
        throw e;
      }
    },
    staleTime: 1000 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    // Отключаем повторные попытки для ошибок 401, так как они теперь не считаются ошибками.
    retry: false,
  });

  return {
    user: user ?? null,
    loading,
    error: isError ? error.message : null,
    refetchUser: refetch,
  };
}