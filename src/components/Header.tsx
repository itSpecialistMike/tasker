// tasker/src/components/header.tsx
"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./HeaderParts/Logo";
import NavDesktop from "./HeaderParts/NavDesktop";
import NavMobile from "./HeaderParts/NavMobile";
import ProfileButton from "./HeaderParts/ProfileButton";
import { useUser } from "@/hooks/useUser";// ✔️ Импортируем хук useUser

/**
 * Компонент Header:
 * - Отображает логотип, навигацию, кнопку профиля
 * - Поддерживает переключение мобильного меню
 */
const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="w-full bg-white shadow-xl border border-gray-200 px-4 sm:px-6 md:px-10 lg:px-100 py-4 flex items-center justify-between relative">
            {/** Логотип */}
            <Logo />

            {/** Навигация для десктопной версии */}
            <NavDesktop />

            {/** Блок профиля (показывается только на десктопе) */}
            <div className="hidden md:flex items-center space-x-4">
                <ProfileButton/>
            </div>

            {/** Кнопка меню для мобильной версии */}
            <button
                className="md:hidden flex items-center"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/** Мобильное меню при открытии */}
            {mobileMenuOpen && (
                <NavMobile onClose={() => setMobileMenuOpen(false)} />
            )}
        </header>
    );
};

export default Header;
