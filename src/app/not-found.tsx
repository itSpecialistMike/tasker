import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-center p-8 md:p-16 max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl border-gray-500 transform transition-all duration-500 hover:scale-105">
                <h1 className="text-9xl font-extrabold text-indigo-600  animate-pulse">404</h1>
                <h2 className="text-4xl font-bold mt-4 mb-4">Ой-ой! Страница не найдена.</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                    Кажется, вы забрели не туда. Но не волнуйтесь, это бывает даже с лучшими из нас.
                </p>
                <Link
                    href="/"
                    className="inline-block px-8 py-3 text-lg font-medium text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                >
                    Вернуться на главную
                </Link>
            </div>
        </div>
    );
}
