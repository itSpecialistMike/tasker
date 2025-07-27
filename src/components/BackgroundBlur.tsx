// tasker/src/components/BackgroundBlur.tsx
'use client';

import React from 'react';

const BackgroundBlur: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      <div className="absolute top-[-250px] left-[-250px] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 opacity-40 blur-[100px]" />
      <div className="absolute bottom-[-250px] right-[-250px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-green-400 via-yellow-400 to-red-400 opacity-30 blur-[90px]" />
    </div>
  );
};

export default BackgroundBlur;
