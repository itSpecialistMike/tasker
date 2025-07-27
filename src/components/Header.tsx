// tasker/src/components/header.tsx
'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './HeaderParts/Logo';
import NavDesktop from './HeaderParts/NavDesktop';
import NavMobile from './HeaderParts/NavMobile';
import ProfileButton from './HeaderParts/ProfileButton';

type Props = {
  selectedDashboardId: string;
  onDashboardChange: (id: string) => void;
};

const Header: React.FC<Props> = ({ selectedDashboardId, onDashboardChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-2xl px-4 sm:px-6 md:px-10 lg:px-100 py-4 flex items-center justify-between relative mb-20">
      <Logo />

      <NavDesktop
        selectedDashboardId={selectedDashboardId}
        onDashboardChange={onDashboardChange}
      />

      <div className="hidden md:flex items-center space-x-4">
        
        <ProfileButton />
      </div>

      <button
        className="md:hidden flex items-center"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

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
