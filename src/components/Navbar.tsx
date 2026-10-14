import React, { useState, useEffect } from 'react';

interface NavbarProps {
  currentRoute?: string; // 'home' | 'projects'
  onNavigate?: (route: string, hash?: string) => void;
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute = 'home',
  onNavigate,
  onOpenContact,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isProjects = currentRoute === 'projects';

  const handleConnectClick = () => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      if (isProjects && onNavigate) {
        onNavigate('home', '#contact');
      } else {
        const el = document.getElementById('contact');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = 'mailto:hello@generx.in';
        }
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('home', '#top');
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleProjectsClick = () => {
    if (onNavigate) {
      if (isProjects) {
        onNavigate('home', '#top');
      } else {
        onNavigate('projects');
      }
    } else {
      window.location.hash = isProjects ? '' : '/projects';
    }
  };

  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex items-center justify-center px-4 pointer-events-none select-none">
      <nav
        aria-label="Minimal Navigation"
        className={`pointer-events-auto transition-all duration-300 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 inline-flex items-center gap-3.5 sm:gap-5 border ${
          scrolled || isProjects
            ? 'liquid-glass-strong border-white/15 bg-black/85 shadow-[0_8px_32px_rgba(0,0,0,0.8)]'
            : 'liquid-glass border-white/10 bg-black/50 backdrop-blur-md'
        }`}
      >
        {/* Left: Connect */}
        <button
          type="button"
          onClick={handleConnectClick}
          className="font-mono text-[10px] sm:text-[11px] text-white/60 hover:text-white transition-colors duration-200 tracking-wider active:scale-95 whitespace-nowrap"
          aria-label="Connect with GeneRx"
        >
          Connect
        </button>

        {/* Center: GeneRx Logo */}
        <a
          href="#top"
          onClick={handleLogoClick}
          aria-label="GeneRx Solutions – Home"
          className="inline-flex items-center transition-opacity hover:opacity-80 active:scale-95 duration-200 shrink-0"
        >
          <img
            src="/logo.svg"
            alt="GeneRx Solutions"
            className="h-6 sm:h-7 w-auto object-contain select-none"
            draggable={false}
          />
        </a>

        {/* Right: Projects */}
        <button
          type="button"
          onClick={handleProjectsClick}
          className={`font-mono text-[10px] sm:text-[11px] transition-colors duration-200 tracking-wider active:scale-95 whitespace-nowrap ${
            isProjects
              ? 'text-white underline underline-offset-4 decoration-white/60'
              : 'text-white/60 hover:text-white'
          }`}
          aria-label="View Projects"
        >
          Projects
        </button>
      </nav>
    </header>
  );
};

export const Header = Navbar;
