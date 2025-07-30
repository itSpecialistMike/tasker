// tasker/src/components/forms/RegisterForm.tsx
// Этот файл содержит компонент формы регистрации в приложении Tasker
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRegister } from "@/hooks/useRegister";
import { useRouter } from "next/navigation";

/**
 * Тип данных формы регистрации.
 */
type RegisterFormInputs = {
  name: string;
  surname: string;
  login: string;
  roleID: number;
  password: string;
};

export default function RegisterForm() {
  // Навигация через роутер Next.js
  const router = useRouter();

  /**
   * Инициализация React Hook Form:
   * - register — регистрирует инпуты
   * - handleSubmit — обрабатывает отправку формы
   * - errors — содержит ошибки валидации
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  /**
   * Кастомный хук для регистрации пользователя:
   * - registerUser — функция отправки данных на сервер
   * - serverError — текст ошибки от сервера
   * - loading — флаг загрузки
   */
  const { registerUser, error: serverError, loading } = useRegister();

  /**
   * Обработчик отправки формы.
   * Отправляет данные на сервер, при успехе — редирект на страницу логина.
   */
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const result = await registerUser({ ...data, roleID: Number(data.roleID) });

    if (result && result.id) {
      console.log("Регистрация прошла успешно, ID:", result.id);
      router.push("/login"); // Переход на страницу входа
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-black/40 backdrop-blur-sm">
      {/* Обёртка формы */}
      <div className="bg-white p-8 rounded-4xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>

        {/* Отображение ошибки сервера */}
        {serverError && (
          <p className="text-red-600 text-center mb-4">{serverError}</p>
        )}

        {/* Форма регистрации */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Поле имя */}
          <input
            type="text"
            placeholder="Имя"
            className={`w-full p-3 mb-4 border rounded-2xl ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            {...register("name", { required: "Имя обязательно" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>
          )}

          {/* Поле фамилия */}
          <input
            type="text"
            placeholder="Фамилия"
            className={`w-full p-3 mb-4 border rounded-2xl ${
              errors.surname ? "border-red-500" : "border-gray-300"
            }`}
            {...register("surname", { required: "Фамилия обязательна" })}
          />
          {errors.surname && (
            <p className="text-red-500 text-sm mb-2">
              {errors.surname.message}
            </p>
          )}

          {/* Поле логин */}
          <input
            type="text"
            placeholder="Логин"
            className={`w-full p-3 mb-4 border rounded-2xl ${
              errors.login ? "border-red-500" : "border-gray-300"
            }`}
            {...register("login", { required: "Логин обязателен" })}
          />
          {errors.login && (
            <p className="text-red-500 text-sm mb-2">{errors.login.message}</p>
          )}

          {/* Поле ID роли */}
          <input
            type="number"
            placeholder="ID роли (например, 1)"
            className={`w-full p-3 mb-4 border rounded-2xl ${
              errors.roleID ? "border-red-500" : "border-gray-300"
            }`}
            {...register("roleID", {
              required: "roleID обязателен",
              valueAsNumber: true,
            })}
          />
          {errors.roleID && (
            <p className="text-red-500 text-sm mb-2">{errors.roleID.message}</p>
          )}

          {/* Поле пароль */}
          <input
            type="password"
            placeholder="Пароль"
            className={`w-full p-3 mb-6 border rounded-2xl ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            {...register("password", {
              required: "Пароль обязателен",
              minLength: { value: 6, message: "Минимум 6 символов" },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password.message}
            </p>
          )}

          {/* Кнопка отправки */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 text-white rounded-4xl bg-indigo-900 hover:bg-indigo-700 transition"
          >
            {loading ? "Отправка..." : "Зарегистрироваться"}
          </button>
        </form>

        {/* Ссылка на логин */}
        <p className="mt-4 text-center text-sm">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
