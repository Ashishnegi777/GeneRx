import React from 'react';

interface FooterProps {
  onNavigate?: (route: string, hash?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent, route: string, hash?: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(route, hash);
    }
  };

  return (
    <footer className="px-6 sm:px-8 md:px-16 lg:px-20 py-8 border-t border-white/10 bg-black relative z-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-white/60">
      <div>© 2026 GeneRx Solutions Pvt Ltd · Intelligence Built into the Physical World</div>

      <nav aria-label="Footer Navigation" className="flex items-center flex-wrap justify-center gap-6">
        <a
          href="#research"
          onClick={(e) => handleNav(e, 'home', '#research')}
          className="hover:text-white transition-colors"
        >
          Research
        </a>
        <a
          href="#solutions"
          onClick={(e) => handleNav(e, 'home', '#solutions')}
          className="hover:text-white transition-colors"
        >
          Solutions
        </a>
        <a
          href="#platform"
          onClick={(e) => handleNav(e, 'home', '#platform')}
          className="hover:text-white transition-colors"
        >
          Platform
        </a>
        <a
          href="#/projects"
          onClick={(e) => handleNav(e, 'projects')}
          className="hover:text-white transition-colors"
        >
          Projects
        </a>
        <a
          href="#company"
          onClick={(e) => handleNav(e, 'home', '#company')}
          className="hover:text-white transition-colors"
        >
          Company
        </a>
        <a
          href="#contact"
          onClick={(e) => handleNav(e, 'home', '#contact')}
          className="hover:text-white transition-colors"
        >
          Contact
        </a>
      </nav>
    </footer>
  );
};
