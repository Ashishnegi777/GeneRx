import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../images/ChatGPT Image Oct 1, 2026, 08_48_06 PM.png';

const ease = [0.16, 1, 0.3, 1] as const;

export const HeroSection: React.FC = () => {
  return (
    <section
      id="top"
      className="h-screen overflow-hidden bg-black relative select-none"
    >
      {/* Full-bleed hero image */}
      <img
        src={heroImage}
        alt="Human and robotic hand reaching toward each other"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{ objectPosition: 'center 45%' }}
      />

      {/* Center atmospheric vignette — keeps centered text legible while showcasing the background visual */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 80% 65% at 50% 45%, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.40) 55%, rgba(0,0,0,0.75) 100%)',
        }}
      />
      {/* Top + bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.0) 22%, rgba(0,0,0,0.0) 68%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      {/* ── Content layer ── */}
      <div className="relative z-10 h-full flex flex-col justify-between items-center">

        {/* TEXT BLOCK — centered */}
        <div className="px-6 sm:px-10 lg:px-12 pt-[18vh] sm:pt-[20vh] max-w-4xl mx-auto flex flex-col items-center text-center">

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.35 }}
            className="font-heading italic text-white font-normal leading-[1.08] tracking-[-1px] text-center"
            style={{ fontSize: 'clamp(2.5rem, 5.2vw, 4.75rem)', maxWidth: '850px' }}
          >
            Intelligence, Built Into the Physical World
          </motion.h1>

          {/* Subtitle — compact, italic, muted */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.65 }}
            className="font-heading italic text-white/65 font-normal leading-[1.6] mt-6 text-center"
            style={{ fontSize: 'clamp(0.85rem, 1.25vw, 1.1rem)', maxWidth: '580px' }}
          >
            GeneRx designs AI, sensors, and integrated systems that see, sense, and respond. From research to deployed hardware.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.95 }}
            className="mt-8 sm:mt-9 flex flex-wrap items-center justify-center gap-5"
          >
            <a
              href="#solutions"
              className="group inline-flex items-center gap-2 border border-white/30 hover:border-white/65 text-white text-[0.82rem] font-body font-normal px-6 py-2.5 rounded-full transition-all duration-300 hover:bg-white/10 active:scale-95"
            >
              Explore Solutions
              <svg width="11" height="11" viewBox="0 0 13 13" fill="none" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <path d="M1 12L12 1M12 1H4M12 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#platform" className="text-[0.82rem] text-white/45 hover:text-white/80 font-body transition-colors duration-200">
              How We Work ↓
            </a>
          </motion.div>
        </div>

        {/* ── Bottom Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease, delay: 1.2 }}
          className="flex flex-col items-center gap-3 pb-8 px-4"
        >
          <div
            className="text-[11px] font-mono text-white/45 tracking-[0.08em] uppercase text-center"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,1)' }}
          >
            Healthcare · Biosensing · Computer Vision · Smart Environments
          </div>

          <a
            href="#research"
            aria-label="Scroll to Capabilities"
            className="relative w-px h-8 bg-white/20 overflow-hidden cursor-pointer mt-1"
          >
            <motion.div
              animate={{ y: [-8, 32] }}
              transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 -left-[2.5px] relative rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
