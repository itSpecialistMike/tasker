// tasker/src/components/RegisterForm.tsx
'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = data => {
    // Логика отправки данных регистрации на сервер
    console.log('Register data:', data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-4xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Name"
            className={`w-full p-3 mb-4 border rounded-2xl ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            {...register('name', { required: 'Имя обязательно' })}
          />
          {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>}

          <input
            type="email"
            placeholder="Email"
            className={`w-full p-3 mb-4 border rounded-2xl ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            {...register('email', { 
              required: 'Email обязателен', 
              pattern: { value: /^\S+@\S+$/i, message: 'Неверный формат email' } 
            })}
          />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            className={`w-full p-3 mb-6 border rounded-2xl ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            {...register('password', { 
              required: 'Пароль обязателен', 
              minLength: { value: 6, message: 'Минимум 6 символов' } 
            })}
          />
          {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}

          <button
            type="submit"
            className="w-full px-4 py-3 text-white rounded-4xl hover:bg-[#40739e] bg-[#353b48] transition"
          >
            Отправить
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Уже есть аккаунт?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Войти
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
