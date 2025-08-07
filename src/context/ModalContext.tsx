// context/ModalContext.tsx
// Этот файл содержит провайдер контекста для управления модальными окнами.

// Указываем, что это клиентский компонент, так как он использует хуки и интерактивные элементы.
"use client";

import React, { createContext, useContext, useState } from "react";

// Определяем тип контекста. Он содержит две функции:
// openModal - для открытия модального окна с заданным содержимым.
// closeModal - для закрытия модального окна.
type ModalContextType = {
    openModal: (content: React.ReactNode) => void;
    closeModal: () => void;
};

// Создаем сам контекст с начальным значением undefined.
const ModalContext = createContext<ModalContextType | undefined>(undefined);

/**
 * useModal - кастомный хук для использования модального контекста.
 * Он позволяет компонентам-потомкам провайдера получать доступ к функциям openModal и closeModal.
 *
 * @returns {ModalContextType} Объект с функциями для управления модальным окном.
 * @throws {Error} Если хук вызывается вне ModalProvider.
 */
export const useModal = () => {
    const context = useContext(ModalContext);
    // Выбрасываем ошибку, если контекст не был предоставлен.
    if (!context) throw new Error("useModal must be used within ModalProvider");
    return context;
};

/**
 * ModalProvider - компонент-провайдер, который оборачивает часть приложения.
 * Он управляет состоянием содержимого модального окна и рендерит его, когда оно есть.
 *
 * @param {React.FC<{ children: React.ReactNode }>} { children } - Дочерние компоненты, которые будут иметь доступ к контексту.
 */
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Состояние для хранения содержимого модального окна.
    // Если modalContent равно null, модальное окно не отображается.
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);

    // Функция для открытия модального окна: просто обновляет состояние с новым содержимым.
    const openModal = (content: React.ReactNode) => setModalContent(content);
    // Функция для закрытия: устанавливает содержимое в null, что скрывает окно.
    const closeModal = () => setModalContent(null);

    return (
        // Предоставляем контекст всем дочерним компонентам.
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {/* Отрисовываем дочерние компоненты */}
            {children}

            {/* Условный рендеринг: модальное окно отображается только если modalContent не null. */}
            {modalContent && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    // При клике на затемненную область, закрываем модальное окно.
                    onClick={closeModal}
                >
                    {/* Контейнер самого модального окна */}
                    <div
                        className="bg-white rounded-4xl p-6 w-full lg:max-w-1/3 relative shadow-lg z-50"
                        // Предотвращаем всплытие события клика, чтобы клик внутри окна
                        // не закрывал его.
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Кнопка закрытия модального окна */}
                        <button
                            className="absolute top-4 right-6 text-4xl text-gray-400 hover:text-black hover:shadow-4xl"
                            onClick={closeModal}
                        >
                            ×
                        </button>
                        {/* Рендерим динамическое содержимое модального окна */}
                        {modalContent}
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};