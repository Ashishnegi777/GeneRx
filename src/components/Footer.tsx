import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="px-6 sm:px-8 md:px-16 lg:px-20 py-8 border-t border-white/10 bg-black relative z-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-white/60">
      <div>© 2026 GeneRx Solutions Pvt Ltd</div>

      <nav aria-label="Footer Navigation" className="flex items-center gap-6">
        <a href="#research" className="hover:text-white transition-colors">
          Research
        </a>
        <a href="#solutions" className="hover:text-white transition-colors">
          Solutions
        </a>
        <a href="#platform" className="hover:text-white transition-colors">
          Platform
        </a>
        <a href="#company" className="hover:text-white transition-colors">
          Company
        </a>
      </nav>
    </footer>
  );
};
