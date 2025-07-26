'use client';

import Header from './components/Header';
import MainDash from './components/MainDash';
import BackgroundBlur from './components/BackgroundBlur';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundBlur />

      <Header />
      <MainDash />
    </main>
  );
}
