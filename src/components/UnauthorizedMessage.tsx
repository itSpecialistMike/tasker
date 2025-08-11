// tasker/src/components/UnauthorizedMessage.tsx
import React from 'react';
import Link from 'next/link';

const UnauthorizedMessage = () => {
    return (

        <div className="flex flex-col items-center my-20">
            <div className="text-center p-8 md:p-16 max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl border-gray-500 transform transition-all duration-500 hover:scale-105">
                <h1 className="text-4xl font-extrabold text-indigo-600  animate-pulse">Вы не авторизованы</h1>
                <h2 className="text-2xl font-bold mt-4 mb-4">Пожалуйста, войдите в свой аккаунт, чтобы просматривать и управлять задачами.</h2>
                <Link
                    href="/login"
                    className="inline-block px-8 py-3 text-lg font-medium text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                >
                    Войти
                </Link>
            </div>
        </div>
    );
};

export default UnauthorizedMessage;