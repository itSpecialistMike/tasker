// src/hooks/useLogin.ts
import { useState } from 'react';
import API from '@/lib/axios';

interface LoginData {
  login: string;
  password: string;
}

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (data: LoginData) => {
    setError(null);
    setLoading(true);

    try {
      const response = await API.post('/api/login', data);

      if (response.status === 200 && response.data.token) {
        // Сохраняем токен в localStorage (или в контекст/глобальное состояние)
        localStorage.setItem('jwtToken', response.data.token);
        return { success: true, data: response.data };
      } else {
        return { success: false };
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка авторизации');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, error, loading };
};
