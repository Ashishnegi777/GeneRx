import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadingVideo } from './FadingVideo';
import { GridBackdrop } from './GridBackdrop';
import { SectionLabel } from './SectionLabel';
import { BlurText } from './BlurText';
import { Reveal } from './Reveal';
import { BrainIcon, ChipIcon, LayersIcon } from './Icons';
import video from '../video/DNA.mp4';

/* =========================================================================
   MINIMALIST VECTOR SCHEMATICS (CLEAN, AIRY & MONOCHROMATIC)
   ========================================================================= */

/** 01. Intelligence: Pure Neural Synapse Network */
const IntelligenceSchematic: React.FC = () => {
  return (
    <div className="w-full h-24 flex items-center justify-center my-4">
      <svg viewBox="0 0 320 80" className="w-full h-full text-white/50 overflow-visible" fill="none">
        {/* Synaptic connection paths */}
        <g stroke="currentColor" strokeOpacity="0.2" strokeWidth="1">
          <line x1="40" y1="20" x2="120" y2="15" />
          <line x1="40" y1="20" x2="120" y2="40" />
          <line x1="40" y1="40" x2="120" y2="40" />
          <line x1="40" y1="60" x2="120" y2="40" />
          <line x1="40" y1="60" x2="120" y2="65" />

          <line x1="120" y1="15" x2="200" y2="25" />
          <line x1="120" y1="40" x2="200" y2="25" />
          <line x1="120" y1="40" x2="200" y2="55" />
          <line x1="120" y1="65" x2="200" y2="55" />

          <line x1="200" y1="25" x2="280" y2="40" />
          <line x1="200" y1="55" x2="280" y2="40" />
        </g>

        {/* Dynamic Signal Pulses */}
        <motion.circle
          r="2.5"
          fill="white"
          animate={{
            cx: [40, 120, 200, 280],
            cy: [20, 40, 25, 40],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.circle
          r="2.5"
          fill="white"
          animate={{
            cx: [40, 120, 200, 280],
            cy: [60, 65, 55, 40],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            delay: 1.0,
            ease: 'easeInOut',
          }}
        />

        {/* Input Nodes */}
        <circle cx="40" cy="20" r="3" fill="black" stroke="white" strokeWidth="1.2" />
        <circle cx="40" cy="40" r="3" fill="black" stroke="white" strokeWidth="1.2" />
        <circle cx="40" cy="60" r="3" fill="black" stroke="white" strokeWidth="1.2" />

        {/* Hidden Layer 1 */}
        <circle cx="120" cy="15" r="2.5" fill="black" stroke="white" strokeOpacity="0.7" strokeWidth="1" />
        <circle cx="120" cy="40" r="2.5" fill="black" stroke="white" strokeOpacity="0.7" strokeWidth="1" />
        <circle cx="120" cy="65" r="2.5" fill="black" stroke="white" strokeOpacity="0.7" strokeWidth="1" />

        {/* Hidden Layer 2 */}
        <circle cx="200" cy="25" r="2.5" fill="black" stroke="white" strokeOpacity="0.7" strokeWidth="1" />
        <circle cx="200" cy="55" r="2.5" fill="black" stroke="white" strokeOpacity="0.7" strokeWidth="1" />

        {/* Output Node with subtle ring */}
        <circle cx="280" cy="40" r="4" fill="black" stroke="white" strokeWidth="1.4" />
        <motion.circle
          cx="280"
          cy="40"
          r="8"
          stroke="white"
          strokeWidth="0.8"
          strokeDasharray="2 2"
          fill="none"
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.05, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
};

/** 02. Hardware: Clean Bio-Signal to Silicon ASIC Path */
const HardwareSchematic: React.FC = () => {
  return (
    <div className="w-full h-24 flex items-center justify-center my-4">
      <svg viewBox="0 0 320 80" className="w-full h-full text-white/50 overflow-visible" fill="none">
        {/* Analog Bio-signal Wave flowing from left */}
        <motion.path
          d="M 20 40 H 45 Q 55 18, 65 40 T 85 62 T 100 22 T 115 40 H 130"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.0, repeat: Infinity, ease: 'linear' }}
        />

        {/* Minimalist Silicon Die */}
        <rect
          x="130"
          y="20"
          width="70"
          height="40"
          rx="4"
          fill="#050505"
          stroke="white"
          strokeOpacity="0.5"
          strokeWidth="1.2"
        />
        <rect
          x="138"
          y="26"
          width="54"
          height="28"
          rx="2"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeDasharray="2 2"
          strokeWidth="1"
        />

        {/* IC Pinouts */}
        {[-16, 0, 16].map((offset) => (
          <g key={offset}>
            <line x1={165 + offset} y1="14" x2={165 + offset} y2="20" stroke="white" strokeOpacity="0.4" strokeWidth="1" />
            <line x1={165 + offset} y1="60" x2={165 + offset} y2="66" stroke="white" strokeOpacity="0.4" strokeWidth="1" />
          </g>
        ))}

        {/* Digital Bus lines exiting right */}
        <line x1="200" y1="30" x2="290" y2="30" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
        <line x1="200" y1="40" x2="290" y2="40" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
        <line x1="200" y1="50" x2="290" y2="50" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />

        {/* Bus packet pulses */}
        <motion.circle
          r="2"
          fill="white"
          animate={{ cx: [200, 290], cy: [30, 30], opacity: [0, 0.9, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
        />
        <motion.circle
          r="2"
          fill="white"
          animate={{ cx: [200, 290], cy: [40, 40], opacity: [0, 0.9, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: 0.5, ease: 'linear' }}
        />
        <motion.circle
          r="2"
          fill="white"
          animate={{ cx: [200, 290], cy: [50, 50], opacity: [0, 0.9, 0] }}
          transition={{ duration: 1.3, repeat: Infinity, delay: 0.9, ease: 'linear' }}
        />

        {/* Bus terminal nodes */}
        <circle cx="290" cy="30" r="2.5" fill="black" stroke="white" strokeWidth="1" />
        <circle cx="290" cy="40" r="2.5" fill="black" stroke="white" strokeWidth="1" />
        <circle cx="290" cy="50" r="2.5" fill="black" stroke="white" strokeWidth="1" />
      </svg>
    </div>
  );
};

/** 03. Systems: Clean Multi-Node Distributed Stream */
const SystemsSchematic: React.FC = () => {
  return (
    <div className="w-full h-24 flex items-center justify-center my-4">
      <svg viewBox="0 0 320 80" className="w-full h-full text-white/50 overflow-visible" fill="none">
        {/* Inter-Node Data Pipeline Channels */}
        <line x1="45" y1="40" x2="275" y2="40" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.2" />
        <line
          x1="45"
          y1="40"
          x2="275"
          y2="40"
          stroke="white"
          strokeOpacity="0.3"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Packet flow animation */}
        <motion.circle
          r="2.5"
          fill="white"
          animate={{
            cx: [45, 120, 200, 275],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.circle
          r="2"
          fill="white"
          animate={{
            cx: [45, 120, 200, 275],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: 1.2,
            ease: 'easeInOut',
          }}
        />

        {/* 4 Pipeline Stations */}
        <circle cx="45" cy="40" r="6" fill="#050505" stroke="white" strokeWidth="1.2" />
        <circle cx="45" cy="40" r="2" fill="white" />

        <circle cx="120" cy="40" r="7" fill="#050505" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" />
        <circle cx="120" cy="40" r="2" fill="white" />

        <circle cx="200" cy="40" r="8" fill="#050505" stroke="white" strokeWidth="1.2" />
        <circle cx="200" cy="40" r="2.5" fill="white" />
        <motion.circle
          cx="200"
          cy="40"
          r="14"
          stroke="white"
          strokeWidth="0.8"
          strokeDasharray="2 2"
          fill="none"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.05, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <circle cx="275" cy="40" r="6" fill="#050505" stroke="white" strokeWidth="1.2" />
        <circle cx="275" cy="40" r="2" fill="white" />
      </svg>
    </div>
  );
};

/* =========================================================================
   CAPABILITY DATA
   ========================================================================= */

interface CapabilityCardData {
  id: string;
  index: string;
  title: string;
  icon: React.ReactNode;
  body: string;
  renderSchematic: () => React.ReactNode;
}

const capabilitiesData: CapabilityCardData[] = [
  {
    id: 'intelligence',
    index: '01',
    title: 'Intelligence',
    icon: <BrainIcon size={20} />,
    body: 'Models that learn from signals, images, and context, built in the lab and tuned to run where the data is.',
    renderSchematic: () => <IntelligenceSchematic />,
  },
  {
    id: 'hardware',
    index: '02',
    title: 'Hardware',
    icon: <ChipIcon size={20} />,
    body: 'Sensors and devices designed in-house: from bio-signal capture to connected nodes that stay reliable in the field.',
    renderSchematic: () => <HardwareSchematic />,
  },
  {
    id: 'systems',
    index: '03',
    title: 'Systems',
    icon: <LayersIcon size={20} />,
    body: 'Hardware, firmware, and software joined into one working system, ready to deploy in clinics, homes, and built environments.',
    renderSchematic: () => <SystemsSchematic />,
  },
];

/* =========================================================================
   MINIMALIST DESKTOP SPOTLIGHT CARD
   ========================================================================= */

const SpotlightCard: React.FC<{
  card: CapabilityCardData;
}> = ({ card }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="liquid-glass rounded-[1.25rem] p-7 min-h-[380px] h-full flex flex-col justify-between group transition-all duration-300 relative border border-white/[0.08] hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
    >
      {/* Soft Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.06), transparent 70%)`
            : undefined,
        }}
      />

      {/* Top Header: Simple Icon & Index */}
      <div className="relative z-10 flex items-center justify-between pb-3">
        <div className="liquid-glass h-10 w-10 rounded-xl flex items-center justify-center text-white/80 border border-white/10 group-hover:text-white group-hover:border-white/25 transition-colors">
          {card.icon}
        </div>
        <span className="font-mono text-xs text-white/40 tracking-widest select-none">
          {card.index}
        </span>
      </div>

      {/* Center: Delicate Animated Vector Graphic */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-2">
        {card.renderSchematic()}
      </div>

      {/* Bottom: Typography */}
      <div className="relative z-10 pt-2">
        <h3 className="font-heading italic text-3xl lg:text-4xl tracking-[-1px] leading-none mb-3 text-white">
          {card.title}
        </h3>
        <p className="text-sm text-white/70 font-body font-light leading-relaxed max-w-[34ch]">
          {card.body}
        </p>
      </div>
    </div>
  );
};

/* =========================================================================
   MAIN CAPABILITIES SECTION
   ========================================================================= */

export const CapabilitiesSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeCard = capabilitiesData[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % capabilitiesData.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + capabilitiesData.length) % capabilitiesData.length);
  };

  return (
    <section
      id="research"
      className="min-h-screen overflow-hidden bg-black relative flex flex-col justify-between"
    >
      {/* Layer 1: Ambient Tech Refraction Video */}
      <FadingVideo
        src={video}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{
          filter: 'brightness(0.35) contrast(1.2)',
          opacity: 0.5,
        }}
      />

      {/* Layer 2: Perspective Floor Grid & Scanline */}
      <GridBackdrop variant="grid" />

      {/* Layer 3: Contrast Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black pointer-events-none z-[1]" />

      {/* Content */}
      <div className="relative z-10 px-5 sm:px-8 md:px-16 lg:px-20 pt-24 sm:pt-28 pb-16 flex flex-col min-h-screen justify-between max-w-7xl mx-auto w-full">
        {/* Header */}
        <div>
          <SectionLabel text="// Capabilities" />
          <h2 className="font-heading italic text-3xl sm:text-5xl md:text-6xl lg:text-[6rem] leading-[1.05] sm:leading-[0.95] md:leading-[0.9] tracking-[-1px] sm:tracking-[-2px] md:tracking-[-3px] text-white max-w-4xl">
            <BlurText text="From research, to real systems" align="start" />
          </h2>
        </div>

        {/* =================================================================
            MOBILE VIEW (< md): Clean Segmented HUD
            ================================================================= */}
        <div className="mt-8 md:hidden">
          {/* Segmented Controller Dock */}
          <div className="flex items-center p-1 rounded-2xl liquid-glass border border-white/10 mb-4 bg-black/50 backdrop-blur-md">
            {capabilitiesData.map((item, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`flex-1 py-2 px-2 text-center text-xs font-mono tracking-wider transition-all duration-200 relative z-10 rounded-xl flex items-center justify-center gap-1.5 ${
                    isActive ? 'text-white font-medium' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-capability-pill"
                      className="absolute inset-0 rounded-xl bg-white/10 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.08)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="text-[10px] opacity-50">0{idx + 1}</span>
                  <span className="truncate">{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Card Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass rounded-2xl p-6 border border-white/10 shadow-2xl relative overflow-hidden"
            >
              {/* Top row */}
              <div className="flex items-center justify-between pb-2">
                <div className="liquid-glass h-9 w-9 rounded-lg flex items-center justify-center text-white/80 border border-white/10">
                  {activeCard.icon}
                </div>
                <span className="font-mono text-xs text-white/40 tracking-widest">
                  {activeCard.index}
                </span>
              </div>

              {/* Animated Schematic */}
              <div className="my-2">
                {activeCard.renderSchematic()}
              </div>

              {/* Content */}
              <div>
                <h3 className="font-heading italic text-2xl text-white mb-2">
                  {activeCard.title}
                </h3>
                <p className="text-xs text-white/75 font-body font-light leading-relaxed">
                  {activeCard.body}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick HUD Navigation Dots & Arrows */}
          <div className="flex items-center justify-between mt-3 px-1">
            <button
              onClick={handlePrev}
              className="text-white/40 hover:text-white font-mono text-xs px-2 py-1 transition-colors"
              aria-label="Previous capability"
            >
              ← PREV
            </button>
            <div className="flex items-center gap-1.5">
              {capabilitiesData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIdx === i ? 'w-5 bg-white' : 'w-1.5 bg-white/20'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="text-white/40 hover:text-white font-mono text-xs px-2 py-1 transition-colors"
              aria-label="Next capability"
            >
              NEXT →
            </button>
          </div>
        </div>

        {/* =================================================================
            DESKTOP VIEW (md+): 3-Column Minimalist Bento Grid
            ================================================================= */}
        <div className="mt-12 hidden md:grid md:grid-cols-3 gap-6">
          {capabilitiesData.map((card, idx) => (
            <Reveal key={card.id} delay={idx * 0.1}>
              <SpotlightCard card={card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
