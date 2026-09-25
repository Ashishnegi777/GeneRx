import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, CloseIcon } from './Icons';

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const navItems: NavItem[] = [
  { label: 'Research', href: '#research', id: 'research' },
  { label: 'Solutions', href: '#solutions', id: 'solutions' },
  { label: 'Platform', href: '#platform', id: 'platform' },
  { label: 'Company', href: '#company', id: 'company' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('top');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const sectionIds = ['top', 'research', 'solutions', 'platform', 'company', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-8 lg:px-16 pointer-events-none">
        {/* Left: Brand Logo linking to #top (no circle or boundary) */}
        <div className="flex items-center md:min-w-[140px]">
          <a
            href="#top"
            aria-label="GeneRx Solutions – Home"
            className="pointer-events-auto inline-flex items-center transition-opacity hover:opacity-80 active:scale-95 duration-200"
          >
            <img
              src="/logo.svg"
              alt="GeneRx Solutions"
              className="h-8 sm:h-9 w-auto object-contain select-none"
              draggable={false}
            />
          </a>
        </div>

        {/* Center: Desktop Nav Pill */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center liquid-glass rounded-full p-1.5 pointer-events-auto gap-0.5 shadow-2xl"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                className="relative px-3.5 py-2 text-sm font-medium text-white/90 hover:text-white font-body transition-colors rounded-full"
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute bottom-1 left-3 right-3 h-[1.5px] bg-white/60 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}

          {/* White CTA Talk to Us linking to #contact */}
          <a
            href="#contact"
            className="bg-white text-black hover:bg-white/90 transition-all duration-200 ml-1.5 px-4 py-2 rounded-full text-sm font-medium font-body flex items-center gap-1.5 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Talk to Us</span>
            <ArrowUpRight size={15} />
          </a>
        </nav>

        {/* Right: Desktop spacer */}
        <div className="hidden md:block md:min-w-[140px]" aria-hidden="true" />

        {/* Right: Mobile Menu Button */}
        <div className="md:hidden pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="liquid-glass h-12 w-12 rounded-full flex items-center justify-center text-white/90 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <CloseIcon size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Glass Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 left-4 right-4 z-40 md:hidden liquid-glass-strong rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border border-white/10"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-base font-body text-white/90 hover:text-white rounded-xl hover:bg-white/5 transition-colors flex items-center justify-between"
                >
                  <span className={activeSection === item.id ? 'text-white font-medium' : 'text-white/70'}>
                    {item.label}
                  </span>
                  {activeSection === item.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                  )}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-white text-black text-center font-body font-medium text-sm py-3 rounded-full flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Talk to Us</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
