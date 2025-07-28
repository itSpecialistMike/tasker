// tasker/src/components/header.tsx
'use client';

/**
 * Импорт React и состояний, иконок, и внутренних компонентов шапки:
 * - Logo: логотип компании/приложения
 * - NavDesktop: навигация для десктопа
 * - NavMobile: навигация для мобилок
 * - ProfileButton: кнопка профиля пользователя
 */
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './HeaderParts/Logo';
import NavDesktop from './HeaderParts/NavDesktop';
import NavMobile from './HeaderParts/NavMobile';
import ProfileButton from './HeaderParts/ProfileButton';

/**
 * Пропсы Header:
 * - selectedDashboardId: текущий ID выбранного дашборда
 * - onDashboardChange: функция смены дашборда
 */
type Props = {
  selectedDashboardId: string;
  onDashboardChange: (id: string) => void;
};

/**
 * Компонент Header:
 * - Отображает логотип, навигацию, кнопку профиля
 * - Поддерживает переключение мобильного меню
 */
const Header: React.FC<Props> = ({ selectedDashboardId, onDashboardChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-xl border border-gray-200 px-4 sm:px-6 md:px-10 lg:px-100 py-4 flex items-center justify-between relative mb-20">
      {/** Логотип */}
      <Logo />

      {/** Навигация для десктопной версии */}
      <NavDesktop
        selectedDashboardId={selectedDashboardId}
        onDashboardChange={onDashboardChange}
      />

      {/** Блок профиля (показывается только на десктопе) */}
      <div className="hidden md:flex items-center space-x-4">
        <ProfileButton />
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
        <NavMobile
          onClose={() => setMobileMenuOpen(false)}
          selectedDashboardId={selectedDashboardId}
          onDashboardChange={onDashboardChange}
        />
      )}
    </header>
  );
};

export default Header;
