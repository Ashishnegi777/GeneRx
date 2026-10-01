import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadingVideo } from './FadingVideo';
import { GridBackdrop } from './GridBackdrop';
import { SectionLabel } from './SectionLabel';
import { BlurText } from './BlurText';
import { Reveal } from './Reveal';
import video from '../video/DNA.mp4';

interface DomainItem {
  id: string;
  index: string;
  name: string;
  description: string;
  tags: string[];
  renderDiagram: () => React.ReactNode;
}

const domains: DomainItem[] = [
  {
    id: 'healthcare',
    index: '01',
    name: 'Healthcare',
    description:
      'Connected devices and software for monitoring, diagnostics support, and care workflows.',
    tags: ['Remote Monitoring', 'Clinical Software', 'Data Pipelines'],
    renderDiagram: () => (
      <svg viewBox="0 0 320 80" className="w-full h-20 text-white/50 overflow-visible" fill="none">
        <motion.path
          d="M 0 40 H 60 L 75 20 L 90 60 L 105 12 L 120 68 L 135 40 H 180 L 195 28 L 210 52 L 225 40 H 320"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.0, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="105"
          cy="12"
          r="3"
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ delay: 0.6 }}
        />
      </svg>
    ),
  },
  {
    id: 'biosensing',
    index: '02',
    name: 'Biosensing',
    description:
      'Sensor hardware and signal processing that turn biological signals into reliable data.',
    tags: ['Bio-signals', 'Sensor Design', 'Signal Processing'],
    renderDiagram: () => (
      <svg viewBox="0 0 320 80" className="w-full h-20 text-white/50 overflow-visible" fill="none">
        <motion.path
          d="M 0 40 Q 40 10, 80 40 T 160 40 T 240 40 T 320 40"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.0, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 0 40 Q 40 70, 80 40 T 160 40 T 240 40 T 320 40"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="text-white/20"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.0, delay: 0.2 }}
        />
      </svg>
    ),
  },
  {
    id: 'vision',
    index: '03',
    name: 'Computer Vision',
    description:
      'Vision models and camera systems that detect, measure, and understand what they see.',
    tags: ['Detection', 'Inspection', 'Edge Inference'],
    renderDiagram: () => (
      <svg viewBox="0 0 320 80" className="w-full h-20 text-white/50 overflow-visible" fill="none">
        <motion.rect
          x="50"
          y="10"
          width="220"
          height="60"
          rx="6"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="6 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6 }}
        />
        <motion.path
          d="M 40 20 H 50 V 10 M 270 10 V 20 H 280 M 40 60 H 50 V 70 M 270 70 V 60 H 280"
          stroke="white"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
        />
        <motion.circle
          cx="160"
          cy="40"
          r="6"
          stroke="white"
          strokeWidth="1.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        />
        <line x1="160" y1="20" x2="160" y2="30" stroke="white" strokeWidth="1" />
        <line x1="160" y1="50" x2="160" y2="60" stroke="white" strokeWidth="1" />
        <line x1="140" y1="40" x2="150" y2="40" stroke="white" strokeWidth="1" />
        <line x1="170" y1="40" x2="180" y2="40" stroke="white" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 'smart-environments',
    index: '04',
    name: 'Smart Environments',
    description:
      'Sensor networks and automation that make spaces aware and responsive.',
    tags: ['IoT Networks', 'Automation', 'Analytics'],
    renderDiagram: () => (
      <svg viewBox="0 0 320 80" className="w-full h-20 text-white/50 overflow-visible" fill="none">
        <motion.path
          d="M 30 40 L 95 18 L 165 48 L 240 22 L 290 42 M 95 18 L 150 65 L 240 22"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.0, ease: 'easeInOut' }}
        />
        {[
          { cx: 30, cy: 40 },
          { cx: 95, cy: 18 },
          { cx: 150, cy: 65 },
          { cx: 165, cy: 48 },
          { cx: 240, cy: 22 },
          { cx: 290, cy: 42 },
        ].map((pt, i) => (
          <motion.circle
            key={i}
            cx={pt.cx}
            cy={pt.cy}
            r="3"
            fill="white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 + i * 0.08 }}
          />
        ))}
      </svg>
    ),
  },
];

export const SolutionsSection: React.FC = () => {
  const [activeDomainIndex, setActiveDomainIndex] = useState<number>(0);
  const activeDomain = domains[activeDomainIndex];

  return (
    <section
      id="solutions"
      className="min-h-screen overflow-hidden bg-black relative flex flex-col justify-between"
    >
      {/* Layer 1: Ambient Tech Video */}
      <FadingVideo
        src={video}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{
          filter: 'brightness(0.3) contrast(1.2)',
          opacity: 0.4,
        }}
      />

      {/* Layer 2: Dots Matrix Backdrop */}
      <GridBackdrop variant="dots" />

      {/* Layer 3: Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black pointer-events-none z-[1]" />

      <div className="relative z-10 px-6 sm:px-8 md:px-16 lg:px-20 pt-28 pb-20 max-w-7xl mx-auto w-full flex flex-col justify-between min-h-screen">
        {/* Header */}
        <div>
          <SectionLabel text="// Solutions" />
          <h2 className="font-heading italic text-6xl md:text-7xl lg:text-[6rem] leading-[0.95] md:leading-[0.9] tracking-[-3px] text-white max-w-4xl">
            <BlurText text="Four domains, one engineering core" align="start" />
          </h2>
        </div>

        {/* Two-Column Split Layout */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          {/* Left: Domain Rows */}
          <Reveal delay={0.1} className="flex flex-col gap-4">
            {domains.map((item, idx) => {
              const isActive = activeDomainIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveDomainIndex(idx)}
                  onMouseEnter={() => setActiveDomainIndex(idx)}
                  className={`text-left group flex items-baseline justify-between py-4 px-2 border-b border-white/10 transition-colors duration-200 cursor-pointer ${
                    isActive ? 'text-white' : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs tracking-wider text-white/50 group-hover:text-white/80 transition-colors">
                      {item.index}
                    </span>
                    <span className="font-heading italic text-3xl md:text-4xl lg:text-[2.75rem] tracking-[-1px] leading-none transition-colors">
                      {item.name}
                    </span>
                  </div>

                  <span
                    className={`font-mono text-xs transition-opacity duration-200 ${
                      isActive ? 'opacity-100 text-white/80' : 'opacity-0'
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </Reveal>

          {/* Right: Active Domain Panel with Diagram */}
          <Reveal delay={0.2}>
            <div className="liquid-glass-strong rounded-[1.25rem] p-8 md:p-10 min-h-[420px] flex flex-col justify-between relative shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDomain.id}
                  initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  exit={{ opacity: 0, filter: 'blur(8px)', y: -15 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col justify-between h-full flex-1"
                >
                  {/* Top: Animated Diagram */}
                  <div className="pb-6 border-b border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
                        System Architecture // {activeDomain.index}
                      </span>
                      <span className="font-mono text-xs text-white/70">
                        {activeDomain.name}
                      </span>
                    </div>
                    <div className="py-2">
                      {activeDomain.renderDiagram()}
                    </div>
                  </div>

                  {/* Description & Tags */}
                  <div className="pt-8">
                    <h3 className="font-heading italic text-3xl md:text-4xl text-white mb-4">
                      {activeDomain.name}
                    </h3>
                    <p className="text-white/90 font-body font-light text-base md:text-lg leading-relaxed tracking-normal max-w-xl">
                      {activeDomain.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {activeDomain.tags.map((tag) => (
                        <span
                          key={tag}
                          className="liquid-glass rounded-full px-3.5 py-1.5 text-xs font-mono tracking-normal text-white/90"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
