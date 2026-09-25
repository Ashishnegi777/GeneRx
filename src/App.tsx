import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { SolutionsSection } from './components/SolutionsSection';
import { PlatformSection } from './components/PlatformSection';
import { CompanySection } from './components/CompanySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="bg-black text-white min-h-screen relative selection:bg-white/20 selection:text-white font-body">
      {/* Fixed Liquid-Glass Navbar with active link indicator and mobile dropdown */}
      <Navbar />

      {/* Main Single-Page Sections */}
      <main>
        {/* Section 1: Hero (#top) */}
        <HeroSection />

        {/* Section 2: Capabilities (#research) */}
        <CapabilitiesSection />

        {/* Section 3: Solutions (#solutions) */}
        <SolutionsSection />

        {/* Section 4: Platform (#platform) */}
        <PlatformSection />

        {/* Section 5: Company (#company) */}
        <CompanySection />

        {/* Section 6: Contact (#contact) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
