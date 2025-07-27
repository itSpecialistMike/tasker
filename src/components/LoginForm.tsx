// tasker/src/components/LoginForm.tsx
'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = data => {
    // Тут будет логика отправки данных на сервер
    console.log('Login data:', data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white  p-8 rounded-4xl md:shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Авторизация</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            className={`w-full p-3 mb-4 border rounded-2xl ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            {...register('email', { required: 'Email обязателен', pattern: { value: /^\S+@\S+$/i, message: 'Неверный формат email' } })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            className={`w-full p-3 mb-6 border rounded-2xl ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            {...register('password', { required: 'Пароль обязателен', minLength: { value: 6, message: 'Минимум 6 символов' } })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 text-white rounded-4xl hover:bg-[#40739e] bg-[#353b48] transition"
          >
            Войти
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
