import React from 'react';
import { motion } from 'framer-motion';
import { HeroSignalBackdrop } from './HeroSignalBackdrop';
import { BlurText } from './BlurText';
import { ArrowUpRight, ChevronDown, CpuIcon, GlobeIcon } from './Icons';

const motionTransition = (delay: number) => ({
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
  delay,
});

export const HeroSection: React.FC = () => {
  return (
    <section
      id="top"
      className="h-screen overflow-hidden bg-black relative flex flex-col justify-between select-none"
    >
      {/* Ultra-lightweight, instant-loading signal filament vortex with glossy core */}
      <HeroSignalBackdrop opacity={1.0} />

      {/* Gradient overlay – top & bottom darkened for type legibility */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 22%, rgba(0,0,0,0.10) 50%, rgba(0,0,0,0.22) 72%, rgba(0,0,0,0.80) 100%)' }} />

      {/* Content Layer (on top with z-10) */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Main Content Centered */}
        <div className="flex-1 flex flex-col items-center justify-center pt-24 px-4 text-center max-w-5xl mx-auto w-full">
          {/* Badge (delay 0.4) */}
          <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={motionTransition(0.4)}
            className="liquid-glass rounded-full pl-1.5 pr-4 py-1.5 flex items-center cursor-default shadow-lg"
          >
            <span className="bg-white text-black text-[11px] font-semibold px-2 py-0.5 rounded-full mr-2.5 font-mono uppercase tracking-wider">
              New
            </span>
            <span className="text-xs md:text-sm text-white/90 font-body font-light">
              Now partnering on healthcare and smart-environment pilots
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mt-6 max-w-3xl w-full">
            <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.85] md:leading-[0.8] tracking-[-3px] md:tracking-[-4px]" style={{ textShadow: '0 2px 24px rgba(0,0,0,0.95), 0 1px 8px rgba(0,0,0,1), 0 0 60px rgba(0,0,0,0.8)' }}>
              <BlurText text="Intelligence, Built Into the Physical World" align="center" />
            </h1>
          </div>

          {/* Subtext (delay 0.8) */}
          <motion.p
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={motionTransition(0.8)}
            className="mt-4 text-sm md:text-base text-white/90 max-w-xl font-body font-light leading-snug md:leading-tight px-4"
            style={{ textShadow: '0 1px 12px rgba(0,0,0,1), 0 2px 32px rgba(0,0,0,0.9)' }}
          >
            GeneRx designs AI, sensors, and integrated systems that see, sense, and respond.
            From research to deployed hardware.
          </motion.p>

          {/* Buttons (delay 1.1) */}
          <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={motionTransition(1.1)}
            className="mt-6 flex flex-wrap items-center justify-center gap-6"
          >
            <a
              href="#solutions"
              className="liquid-glass-strong rounded-full px-5 py-2.5 flex items-center gap-2 text-sm text-white font-medium hover:scale-105 active:scale-95 transition-transform duration-200 group cursor-pointer"
            >
              <span>Explore Solutions</span>
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <a
              href="#platform"
              className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors duration-200 py-2.5 px-2 group cursor-pointer"
            >
              <span className="font-body font-normal">How We Work</span>
              <ChevronDown
                size={15}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </a>
          </motion.div>

          {/* Info cards (delay 1.3) */}
          <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={motionTransition(1.3)}
            className="mt-8 flex gap-4 flex-wrap justify-center"
          >
            {/* Card 1 */}
            <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] text-left hover:scale-[1.02] transition-transform duration-300">
              <div className="text-white/90">
                <CpuIcon size={22} />
              </div>
              <div className="text-4xl font-heading italic tracking-[-1px] leading-none mt-4 text-white">
                AI + IoT
              </div>
              <p className="text-xs text-white/80 font-body font-light mt-2 leading-relaxed">
                Research, software, and hardware under one roof
              </p>
            </div>

            {/* Card 2 */}
            <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] text-left hover:scale-[1.02] transition-transform duration-300">
              <div className="text-white/90">
                <GlobeIcon size={22} />
              </div>
              <div className="text-4xl font-heading italic tracking-[-1px] leading-none mt-4 text-white">
                4 Domains
              </div>
              <p className="text-xs text-white/80 font-body font-light mt-2 leading-relaxed">
                Healthcare, biosensing, vision, smart environments
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar (delay 1.4) with animated scroll indicator */}
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={motionTransition(1.4)}
          className="flex flex-col items-center gap-3 pb-8 px-4"
        >
          <div className="text-[11px] md:text-xs font-mono text-white/70 tracking-[0.2em] md:tracking-widest uppercase text-center" style={{ textShadow: '0 1px 10px rgba(0,0,0,1), 0 0 24px rgba(0,0,0,0.9)' }}>
            Healthcare · Biosensing · Computer Vision · Smart Environments
          </div>

          {/* Animated 1px x 32px scroll line with moving dot */}
          <a
            href="#research"
            aria-label="Scroll to Capabilities"
            className="relative w-px h-8 bg-white/20 overflow-hidden cursor-pointer mt-1 group"
          >
            <motion.div
              animate={{ y: [-8, 32] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-1.5 h-1.5 -left-[2.5px] relative rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
