'use client';

/**
 * Импортируем зависимости:
 * - useForm и SubmitHandler из react-hook-form: для обработки формы и валидации
 * - Link из next/link: для навигации без перезагрузки страницы
 */
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useLogin } from '@/hooks/useLogin';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

/**
 * Тип данных, которые ожидает форма входа:
 * - login: строка
 * - password: строка
 */
type LoginFormInputs = {
  login: string;
  password: string;
};

/**
 * Компонент Login:
 * - отображает форму авторизации с валидацией
 * - использует react-hook-form для управления формой
 */
export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const { loginUser, error: serverError, loading } = useLogin();
  const router = useRouter();
  const [localError, setLocalError] = useState<string | null>(null);

  /**
   * Обработчик отправки формы:
   * - получает данные формы в виде объекта
   * - отправляет login и password на сервер
   */
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const result = await loginUser({
      login: data.login,
      password: data.password,
    });

    if (result?.success) {
      router.push('/');
    } else {
      setLocalError('Неверный логин или пароль');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-4xl md:shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Авторизация</h2>

        {(serverError || localError) && (
          <p className="text-red-600 text-center mb-4">{serverError || localError}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Поле Login */}
          <input
            type="text"
            placeholder="Логин"
            className={`w-full p-3 mb-4 border rounded-2xl ${errors.login ? 'border-red-500' : 'border-gray-300'}`}
            {...register('login', {
              required: 'Логин обязателен',
              minLength: { value: 3, message: 'Минимум 3 символа' },
            })}
          />
          {errors.login && (
            <p className="text-red-500 text-sm mb-2">{errors.login.message}</p>
          )}

          {/* Поле Пароль */}
          <input
            type="password"
            placeholder="Пароль"
            className={`w-full p-3 mb-6 border rounded-2xl ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            {...register('password', {
              required: 'Пароль обязателен',
              minLength: {
                value: 6,
                message: 'Минимум 6 символов',
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white rounded-4xl hover:bg-indigo-700 bg-indigo-900 transition"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Нет аккаунта?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Зарегистрироваться
          </Link>
        </p>

        <hr className="my-6 border-gray-200 sm:mx-auto" />

        <p className="mt-2 text-center text-sm">
          <Link href="/" className="text-blue-600 hover:underline">
            Вернуться на главную
          </Link>
        </p>
      </div>
    </div>
  );
}
