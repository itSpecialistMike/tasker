// tasker/src/components/loadingComp.tsx
"use client";

import React from "react";
import { Loader2 } from "lucide-react"; // Импортируем иконку-спиннер из Lucide React

/**
 * Компонент Loading.
 * Отображает индикатор загрузки с сообщением.
 * Используется, пока данные загружаются.
 */
const LoadingComp = () => {
    return (
        <div className="flex flex-col items-center mt-20 w-full min-h-screen p-4 text-gray-500">
            <Loader2 size={48} className="animate-spin text-indigo-600" />
            <p className="mt-4 text-lg font-medium">Загрузка...</p>
        </div>
    );
};

export default LoadingComp;