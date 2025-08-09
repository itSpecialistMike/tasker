// tasker/src/components/UnauthorizedMessage.tsx
import React from 'react';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

const UnauthorizedMessage = () => {
    return (
        <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500 bg-white rounded-lg shadow-sm m-4">
            <LogIn size={48} className="mb-4" />
            <h2 className="text-xl font-semibold mb-2">Вы не авторизованы</h2>
            <p className="mb-4">Пожалуйста, войдите в свой аккаунт, чтобы просматривать и управлять задачами.</p>
            <Link href="/login" className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors">
                Войти
            </Link>
        </div>
    );
};

export default UnauthorizedMessage;