// src/context/ModalContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Определяем тип контекста.
type ModalContextType = {
    openModal: (content: React.ReactNode) => void;
    closeModal: () => void;
};

// Создаем сам контекст с начальным значением undefined.
const ModalContext = createContext<ModalContextType | undefined>(undefined);

/**
 * useModal - кастомный хук для использования модального контекста.
 */
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used within ModalProvider");
    return context;
};

/**
 * ModalProvider - компонент-провайдер, который управляет состоянием модальных окон.
 */
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);

    const openModal = (content: React.ReactNode) => setModalContent(content);
    const closeModal = () => setModalContent(null);

    // --- ИСПРАВЛЕНИЕ: Добавляем useEffect для управления прокруткой тела документа ---
    useEffect(() => {
        // Проверяем, есть ли содержимое для модалки.
        if (modalContent) {
            // Если модалка открыта, добавляем класс overflow-hidden к элементу body.
            document.body.style.overflow = "hidden";
        } else {
            // Если модалка закрыта, возвращаем стандартное поведение прокрутки.
            document.body.style.overflow = "unset";
        }

        // Возвращаем функцию очистки, которая сработает при размонтировании
        // или перед следующим обновлением зависимости.
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [modalContent]); // Зависимость: эффект сработает при изменении modalContent.

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}

            {modalContent && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto pt-12 pb-12"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-4xl p-6 w-full lg:max-w-1/3 relative shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-6 text-4xl text-gray-400 hover:text-black hover:shadow-4xl"
                            onClick={closeModal}
                        >
                            ×
                        </button>
                        {modalContent}
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};