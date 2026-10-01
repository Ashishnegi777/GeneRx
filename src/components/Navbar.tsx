import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-5 sm:top-6 left-0 right-0 z-50 flex items-center justify-center pointer-events-none">
      <a
        href="#top"
        aria-label="GeneRx Solutions – Home"
        className="pointer-events-auto inline-flex items-center transition-opacity hover:opacity-80 active:scale-95 duration-200"
      >
        <img
          src="/logo.svg"
          alt="GeneRx Solutions"
          className="h-8 sm:h-9 md:h-10 w-auto object-contain select-none"
          draggable={false}
        />
      </a>
    </header>
  );
};

export const Header = Navbar;
