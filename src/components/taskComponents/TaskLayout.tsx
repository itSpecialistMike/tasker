// tasker/src/components/taskComponents/TaskLayout.tsx
// Этот файл содержит компонент TaskLayout, который используется для обертки страниц задач в приложении Tasker
"use client";

import BackgroundBlur from "../BackgroundBlur";

/**
 * Тип пропсов для TaskLayout:
 * - children: дочерние компоненты, которые будут отображаться внутри обертки
 */
type Props = {
    children: React.ReactNode;
};

/**
 * Компонент TaskLayout:
 * - Предоставляет стилизованный контейнер для контента страниц задач
 * - Не содержит Header и Footer, так как они определены в RootLayout
 */
export default function TaskLayout({ children }: Props) {
    return (
        <div className="flex flex-col min-h-screen">
            <BackgroundBlur />
            <main className="flex-1 px-4 py-8 max-w-6xl mx-auto w-full ">
                <div className="bg-white p-6 rounded-4xl shadow-2xl border border-gray-200">
                    {children}
                </div>
            </main>
        </div>
    );
}
