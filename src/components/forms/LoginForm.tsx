// tasker/src/components/forms/LoginForm.tsx
// Этот файл содержит компонент формы входа в приложение Tasker
"use client";

/**
 * Импортируем зависимости:
 * - useForm и SubmitHandler из react-hook-form: для обработки формы и валидации
 * - Link из next/link: для навигации без перезагрузки страницы
 * - useLogin — кастомный хук для авторизации
 * - useRouter — навигация из Next.js
 * - useState — для локального состояния ошибки
 */
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Описание формы входа.
 * Содержит два обязательных поля:
 * - login: строка (имя пользователя)
 * - password: строка (пароль)
 */
type LoginFormInputs = {
  login: string;
  password: string;
};

/**
 * Компонент Login:
 * - отображает форму авторизации
 * - выполняет валидацию с помощью react-hook-form
 * - вызывает loginUser и перенаправляет при успехе
 */
export default function Login() {
  // Инициализация формы
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  // Кастомный хук авторизации
  const { loginUser, error: serverError, loading } = useLogin();

  // Навигация
  const router = useRouter();

  // Локальная ошибка при неверных данных
  const [localError, setLocalError] = useState<string | null>(null);

  /**
   * Обработчик отправки формы:
   * - вызывает loginUser с данными
   * - при успехе — редирект на главную
   * - при ошибке — отображается сообщение
   */
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const result = await loginUser({
      login: data.login,
      password: data.password,
    });

    if (result?.success) {
      router.push("/");
    } else {
      setLocalError("Неверный логин или пароль");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-4xl md:shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Авторизация</h2>

        {/* Вывод ошибки — либо с сервера, либо локальной */}
        {(serverError || localError) && (
          <p className="text-red-600 text-center mb-4">
            {serverError || localError}
          </p>
        )}

        {/* Форма входа */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/**
           * Поле "Логин"
           * - обязательно для заполнения
           * - минимум 3 символа
           */}
          <input
            type="text"
            placeholder="Логин"
            className={`w-full p-3 mb-4 border rounded-2xl ${
              errors.login ? "border-red-500" : "border-gray-300"
            }`}
            {...register("login", {
              required: "Логин обязателен",
              minLength: { value: 3, message: "Минимум 3 символа" },
            })}
          />
          {errors.login && (
            <p className="text-red-500 text-sm mb-2">{errors.login.message}</p>
          )}

          {/**
           * Поле "Пароль"
           * - обязательно для заполнения
           * - минимум 6 символов
           */}
          <input
            type="password"
            placeholder="Пароль"
            className={`w-full p-3 mb-6 border rounded-2xl ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            {...register("password", {
              required: "Пароль обязателен",
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password.message}
            </p>
          )}

          {/**
           * Кнопка отправки формы
           * - дизейблится во время загрузки
           */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white rounded-4xl hover:bg-indigo-700 bg-indigo-900 transition"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        {/**
         * Ссылка на регистрацию
         */}
        <p className="mt-4 text-center text-sm">
          Нет аккаунта?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Зарегистрироваться
          </Link>
        </p>

        <hr className="my-6 border-gray-200 sm:mx-auto" />

        {/**
         * Ссылка на главную страницу
         */}
        <p className="mt-2 text-center text-sm">
          <Link href="/" className="text-blue-600 hover:underline">
            Вернуться на главную
          </Link>
        </p>
      </div>
    </div>
  );
}
