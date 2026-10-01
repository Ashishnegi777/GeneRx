import React from 'react';
import { FadingVideo } from './FadingVideo';
import { GridBackdrop } from './GridBackdrop';
import { SectionLabel } from './SectionLabel';
import { BlurText } from './BlurText';
import { Reveal } from './Reveal';
import { BrainIcon, ChipIcon, LayersIcon } from './Icons';
import video from '../video/DNA.mp4';

interface CapabilityCardData {
  title: string;
  icon: React.ReactNode;
  tags: string[];
  body: string;
}

const capabilitiesData: CapabilityCardData[] = [
  {
    title: 'Intelligence',
    icon: <BrainIcon size={22} />,
    tags: ['Machine Learning', 'Computer Vision', 'Edge AI', 'Research'],
    body: 'Models that learn from signals, images, and context, built in the lab and tuned to run where the data is.',
  },
  {
    title: 'Hardware',
    icon: <ChipIcon size={22} />,
    tags: ['IoT Devices', 'Biosensing', 'Embedded', 'Prototyping'],
    body: 'Sensors and devices designed in-house: from bio-signal capture to connected nodes that stay reliable in the field.',
  },
  {
    title: 'Systems',
    icon: <LayersIcon size={22} />,
    tags: ['Healthcare', 'Smart Spaces', 'Integration', 'Software'],
    body: 'Hardware, firmware, and software joined into one working system, ready to deploy in clinics, homes, and built environments.',
  },
];

export const CapabilitiesSection: React.FC = () => {
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
      <div className="relative z-10 px-6 sm:px-8 md:px-16 lg:px-20 pt-28 pb-16 flex flex-col min-h-screen justify-between max-w-7xl mx-auto w-full">
        {/* Header */}
        <div>
          <SectionLabel text="// Capabilities" />
          <h2 className="font-heading italic text-6xl md:text-7xl lg:text-[6rem] leading-[0.95] md:leading-[0.9] tracking-[-3px] text-white max-w-4xl">
            <BlurText text="From research, to real systems" align="start" />
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilitiesData.map((card, idx) => (
            <Reveal key={card.title} delay={idx * 0.1}>
              <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] h-full flex flex-col justify-between group hover:scale-[1.01] transition-transform duration-300">
                {/* Top row: Icon & Tags */}
                <div className="flex items-start justify-between gap-3">
                  <div className="liquid-glass h-11 w-11 rounded-[0.75rem] flex items-center justify-center shrink-0 text-white/90">
                    {card.icon}
                  </div>

                  <div className="flex flex-wrap justify-end gap-1.5 max-w-[200px]">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="liquid-glass rounded-full px-3 py-1 text-[11px] font-mono text-white/90 whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Middle spacer */}
                <div className="flex-1 min-h-[48px]" />

                {/* Bottom: Title & Body */}
                <div>
                  <h3 className="font-heading italic text-3xl md:text-4xl tracking-[-1px] leading-none mb-3 text-white">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
                    {card.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
