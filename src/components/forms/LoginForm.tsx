// tasker/src/components/forms/LoginForm.tsx
'use client';

/**
 * Импортируем зависимости:
 * - useForm и SubmitHandler из react-hook-form: для обработки формы и валидации
 * - Link из next/link: для навигации без перезагрузки страницы
 */
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';

/**
 * Тип данных, которые ожидает форма входа:
 * - email: строка
 * - password: строка
 */
type LoginFormInputs = {
  email: string;
  password: string;
};

/**
 * Компонент Login:
 * - отображает форму авторизации с валидацией
 * - использует react-hook-form для управления формой
 */
export default function Login() {
  /**
   * Инициализация useForm:
   * - register: регистрация полей формы
   * - handleSubmit: обработка события отправки
   * - formState.errors: объект ошибок валидации
   */
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  /**
   * Обработчик отправки формы:
   * - получает данные формы в виде объекта
   * - пока только выводит данные в консоль (заглушка под будущую авторизацию)
   */
  const onSubmit: SubmitHandler<LoginFormInputs> = data => {
    // Тут будет логика отправки данных на сервер
    console.log('Login data:', data);
  };

  return (
    /**
     * Основная обёртка:
     * - центрирует форму по вертикали и горизонтали
     * - добавляет размытие фона и затемнение
     */
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-black/40 backdrop-blur-sm">

      {/** 
       * Блок с формой:
       * - белый фон, скругления, тень и ограниченная ширина
       */}
      <div className="bg-white  p-8 rounded-4xl md:shadow-2xl w-full max-w-md">

        {/** Заголовок формы */}
        <h2 className="text-2xl font-bold mb-6 text-center">Авторизация</h2>

        {/** Форма входа */}
        <form onSubmit={handleSubmit(onSubmit)}>

          {/** Поле Email */}
          <input
            type="email"
            placeholder="Email"
            className={`w-full p-3 mb-4 border rounded-2xl ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            {...register('email', {
              required: 'Email обязателен',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Неверный формат email'
              }
            })}
          />
          {/** Отображение ошибки для email, если она есть */}
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
          )}

          {/** Поле Пароль */}
          <input
            type="password"
            placeholder="Password"
            className={`w-full p-3 mb-6 border rounded-2xl ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            {...register('password', {
              required: 'Пароль обязателен',
              minLength: {
                value: 6,
                message: 'Минимум 6 символов'
              }
            })}
          />
          {/** Отображение ошибки для пароля, если она есть */}
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
          )}

          {/** Кнопка отправки формы */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white rounded-4xl hover:bg-indigo-700 bg-indigo-900 transition"
          >
            Войти
          </button>
        </form>

        {/** Ссылка на регистрацию */}
        <p className="mt-4 text-center text-sm">
          Нет аккаунта?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Зарегистрироваться
          </Link>
        </p>

        {/** Разделительная линия */}
        <hr className="my-6 border-gray-200 sm:mx-auto" />

        {/** Ссылка на главную страницу */}
        <p className="mt-2 text-center text-sm">
          <Link href="/" className="text-blue-600 hover:underline">
            Вернуться на главную
          </Link>
        </p>
      </div>
    </div>
  );
}
