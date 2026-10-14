import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { SolutionsSection } from './components/SolutionsSection';
import { PlatformSection } from './components/PlatformSection';
import { CompanySection } from './components/CompanySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectsPage } from './components/ProjectsPage';
import { ContactModal } from './components/ContactModal';
import { ArrowUpRight } from './components/Icons';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<'home' | 'projects'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash.includes('projects') || path.includes('/projects')) {
        return 'projects';
      }
    }
    return 'home';
  });

  const [isContactOpen, setIsContactOpen] = useState(false);

  // Sync route with browser history & URL changes
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash.includes('projects') || path.includes('/projects')) {
        setCurrentRoute('projects');
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Update page title based on current view
  useEffect(() => {
    if (currentRoute === 'projects') {
      document.title = 'Projects & Prototypes — GeneRx Solutions';
    } else {
      document.title = 'GeneRx Solutions — Deep-Tech AI, IoT & Biosensing Systems';
    }
  }, [currentRoute]);

  const handleNavigate = (route: string, hash?: string) => {
    if (route === 'projects') {
      setCurrentRoute('projects');
      window.history.pushState({ route: 'projects' }, '', '#/projects');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentRoute('home');
      window.history.pushState({ route: 'home' }, '', hash || '#top');
      if (hash && hash !== '#top') {
        setTimeout(() => {
          const targetId = hash.replace('#', '');
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-black text-white min-h-screen relative selection:bg-white/20 selection:text-white font-body">
      {/* Top Floating Glass Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Conditional View: Projects Separate Page vs. Main Landing Overview */}
      {currentRoute === 'projects' ? (
        <main>
          <ProjectsPage
            onBackToHome={() => handleNavigate('home', '#top')}
            onOpenContact={() => setIsContactOpen(true)}
          />
        </main>
      ) : (
        <main>
          {/* Section 1: Hero (#top) */}
          <HeroSection />

          {/* Section 2: Capabilities (#research) */}
          <CapabilitiesSection />

          {/* Section 3: Solutions (#solutions) */}
          <SolutionsSection />

          {/* Main Page Bridge / Teaser to Projects Page */}
          <section className="bg-black px-5 sm:px-8 md:px-16 lg:px-20 py-20 relative z-10 border-t border-white/10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="space-y-3 max-w-xl">
                <div className="font-mono text-xs text-white/40 tracking-wider">
                  // DEPLOYED INITIATIVES
                </div>
                <h3 className="font-heading italic text-3xl sm:text-4xl text-white font-normal leading-tight">
                  Three proprietary systems engineered from sensor to silicon.
                </h3>
                <p className="font-body text-sm text-white/65 font-light leading-relaxed">
                  Mass face recognition biometrics, rapid HPV point-of-care molecular kits, and autonomous AI wound care dispensing.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleNavigate('projects')}
                className="liquid-glass rounded-full px-6 py-3 font-mono text-xs text-white/80 hover:text-white border border-white/20 hover:border-white/50 transition-all duration-200 flex items-center gap-2"
              >
                <span>View Engineering Records (03)</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </section>

          {/* Section 4: Platform (#platform) */}
          <PlatformSection />

          {/* Section 5: Company (#company) */}
          <CompanySection />

          {/* Section 6: Contact (#contact) */}
          <ContactSection />
        </main>
      )}

      {/* Global Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Universal Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
