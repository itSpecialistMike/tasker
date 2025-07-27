// tasker/src/components/BackgroundBlur.tsx
'use client';

import React from 'react';

const BackgroundBlur: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
      <div className="absolute top-[-300px] left-[-300px] w-[800px] h-[800px] rounded-full 
                      bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-800 
                      opacity-70 blur-[120px]" />
      <div className="absolute bottom-[-250px] right-[-250px] w-[600px] h-[600px] rounded-full 
                      bg-gradient-to-br from-blue-800 via-cyan-700 to-teal-600 
                      opacity-60 blur-[100px]" />
    </div>
  );
};

export default BackgroundBlur;
