// context/ModalContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

type ModalContextType = {
    openModal: (content: React.ReactNode) => void;
    closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used within ModalProvider");
    return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);

    const openModal = (content: React.ReactNode) => setModalContent(content);
    const closeModal = () => setModalContent(null);

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {modalContent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div
                        className="bg-white rounded-4xl p-6 w-full lg:max-w-1/3 relative shadow-lg z-50"
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
