// src/hooks/useRegister.ts
import { useState } from 'react';
import API from '@/lib/axios';
import axios from 'axios';

interface RegisterData {
  name: string;
  surname: string;
  login: string;
  roleID: number;
  password: string;
}

export const useRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const registerUser = async (data: RegisterData) => {
    setError(null);
    setLoading(true);
    try {
      const response = await API.post('/api/register', data);
      return response.data;
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Ошибка регистрации');
      } else {
        setError('Неизвестная ошибка');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, error, loading };
};
