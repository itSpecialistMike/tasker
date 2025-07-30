// src/components/HomeInfo.tsx
import React from "react";

/**
 * Компонент HomeInfo:
 * - отображает основную информацию о сайте
 * - предназначен для неавторизованных пользователей
 */
const HomeInfo: React.FC = () => {
  return (
    <section className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-4">Добро пожаловать на Tasker!</h1>
      <p className="mb-4 text-gray-700">
        Tasker — это простой и удобный сервис для управления вашими задачами и
        проектами. Вы можете создавать задачи, отслеживать прогресс и
        распределять роли внутри команды.
      </p>
      <p className="mb-4 text-gray-700">
        Чтобы начать работу, пожалуйста, зарегистрируйтесь или войдите в
        систему. После авторизации вы получите доступ к полному функционалу
        приложения.
      </p>
      <p className="text-gray-600 text-sm">
        Если у вас есть вопросы, свяжитесь с нами через форму обратной связи или
        на почту support@tasker.com.
      </p>
    </section>
  );
};

export default HomeInfo;
