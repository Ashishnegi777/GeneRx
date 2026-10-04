import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../images/creation of adamm.png';
import { GlassCube3D } from './GlassCube3D';

const ease = [0.16, 1, 0.3, 1] as const;

export const HeroSection: React.FC = () => {
  return (
    <section
      id="top"
      className="h-screen min-h-[100dvh] overflow-hidden bg-black relative select-none"
    >
      {/* Full-bleed hero image */}
      <img
        src={heroImage}
        alt="Human and robotic hand reaching toward each other"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{ objectPosition: 'center 46%' }}
      />

      {/* Subtle edge vignette — leaves hands crystal-clear while softly framing borders */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 95% 85% at 50% 48%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.35) 78%, rgba(0,0,0,0.92) 100%)',
        }}
      />
      {/* Top and bottom feathering for seamless header and section transition */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.0) 18%, rgba(0,0,0,0.0) 78%, rgba(0,0,0,0.95) 100%)',
        }}
      />

      {/* 3D Glass "x" centered between the outstretched fingertips */}
      <GlassCube3D
        headlineLines={[]}
        fontFamily="'Instrument Serif', serif"
        fontWeight={400}
        textColor="#ffffff"
        bgColor="#000000"
        bgImage={heroImage}
        scaleFactor={0.78}
        cubeCenter={{
          desktop: { x: 0.515, y: 0.488 },
          mobile: { x: 0.5, y: 0.48 },
        }}
      />

      {/* ── Content layer ── */}
      <div className="relative z-10 h-full w-full pointer-events-none">
        {/* Top-Right Title Block (editorial layout matching reference) */}
        <div className="absolute top-[12vh] sm:top-[14vh] lg:top-[16vh] right-[6vw] sm:right-[8vw] lg:right-[10vw] max-w-[88vw] sm:max-w-lg lg:max-w-2xl text-left pointer-events-auto">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease, delay: 0.25 }}
            className="font-heading italic text-white font-normal leading-[1.08] tracking-[-0.015em] text-[2.2rem] sm:text-[3.25rem]"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.85)' }}
          >
            Intelligence, builds
            <br />
            into the physical world
          </motion.h1>
        </div>

        {/* Bottom-Left Paragraph (descriptive tagline matching reference) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease, delay: 0.55 }}
          className="absolute bottom-[8vh] sm:bottom-[9vh] lg:bottom-[11vh] left-[6vw] sm:left-[8vw] lg:left-[10vw] max-w-[320px] sm:max-w-[420px] lg:max-w-[460px] pointer-events-auto"
        >
          <p
            className="font-body italic text-white/85 font-light text-[13.5px] sm:text-[14.5px] md:text-[15.5px] leading-[1.55] tracking-normal text-left"
            style={{ textShadow: '0 1px 14px rgba(0,0,0,0.95)' }}
          >
            Sensors and devices designed in-house: from bio-signal capture{' '}
            <span className="block sm:inline lg:block">
              to connected nodes that stay reliable in the field.
            </span>
          </p>
        </motion.div>

        {/* Subtle, minimal scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease, delay: 1.1 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto"
        >
          <a
            href="#research"
            aria-label="Scroll to Capabilities"
            className="group flex flex-col items-center gap-1.5 opacity-35 hover:opacity-90 transition-opacity duration-300 cursor-pointer"
          >
            <div className="relative w-px h-7 bg-white/25 overflow-hidden">
              <motion.div
                animate={{ y: [-8, 28] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-1 -left-[1.5px] relative rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]"
              />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
