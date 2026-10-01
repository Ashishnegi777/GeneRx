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

      {/* Left gradient — keeps text legible without killing the image */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'linear-gradient(105deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.50) 35%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0.0) 100%)',
        }}
      />
      {/* Top + bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.0) 25%, rgba(0,0,0,0.0) 72%, rgba(0,0,0,0.80) 100%)',
        }}
      />

      {/* ── Content layer ── */}
      <div className="relative z-10 h-full flex flex-col justify-between">

        {/* TEXT BLOCK — upper-left, matching reference */}
        <div className="px-8 sm:px-12 md:px-16 lg:px-20 pt-[18vh]">

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.35 }}
            className="font-heading italic text-white font-normal leading-[1.06] tracking-[-1px]"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', maxWidth: '38vw' }}
          >
            Intelligence, Built Into the Physical World
          </motion.h1>

          {/* Subtitle — compact, italic, muted */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.65 }}
            className="font-heading italic text-white/55 font-normal leading-[1.55] mt-5"
            style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)', maxWidth: '26vw' }}
          >
            GeneRx designs AI, sensors, and integrated systems that see, sense, and respond. From research to deployed hardware.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.95 }}
            className="mt-8 flex flex-wrap items-center gap-5"
          >
            <a
              href="#solutions"
              className="group inline-flex items-center gap-2 border border-white/30 hover:border-white/65 text-white text-[0.8rem] font-body font-normal px-5 py-2 rounded-full transition-all duration-300 hover:bg-white/5"
            >
              Explore Solutions
              <svg width="11" height="11" viewBox="0 0 13 13" fill="none" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <path d="M1 12L12 1M12 1H4M12 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#platform" className="text-[0.8rem] text-white/40 hover:text-white/70 font-body transition-colors duration-200">
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
