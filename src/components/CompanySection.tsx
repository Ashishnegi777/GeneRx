import React from 'react';
import { FadingVideo } from './FadingVideo';
import { GridBackdrop } from './GridBackdrop';
import { SectionLabel } from './SectionLabel';
import { BlurText } from './BlurText';
import { Reveal } from './Reveal';

interface ValueCard {
  title: string;
  body: string;
}

const valueCards: ValueCard[] = [
  {
    title: 'Research-led',
    body: 'Every product starts as a question worth investigating.',
  },
  {
    title: 'Built end to end',
    body: 'Hardware, firmware, software, and AI from a single team.',
  },
  {
    title: 'Made to deploy',
    body: 'Systems designed for real clinics, homes, and sites, not demos.',
  },
];

export const CompanySection: React.FC = () => {
  return (
    <section
      id="company"
      className="min-h-[80vh] overflow-hidden bg-black relative flex flex-col justify-between py-28"
    >
      {/* Layer 1: Ambient Tech Video */}
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{
          filter: 'brightness(0.3) contrast(1.2)',
          opacity: 0.35,
        }}
      />

      {/* Layer 2: Dots Matrix */}
      <GridBackdrop variant="dots" />

      {/* Layer 3: Contrast Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black pointer-events-none z-[1]" />

      <div className="relative z-10 px-6 sm:px-8 md:px-16 lg:px-20 max-w-6xl mx-auto w-full flex flex-col items-center justify-center text-center">
        {/* Section Label */}
        <SectionLabel text="// Company" className="text-center" />

        {/* Large Statement Heading */}
        <div className="max-w-4xl mt-2">
          <h2 className="font-heading italic text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-3px] text-white">
            <BlurText
              text="We build technology that measures, understands, and improves the world around us."
              align="center"
            />
          </h2>
        </div>

        {/* Three Value Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full text-left">
          {valueCards.map((card, idx) => (
            <Reveal key={card.title} delay={idx * 0.15}>
              <div className="liquid-glass rounded-[1.25rem] p-6 h-full flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
                <div className="font-mono text-xs text-white/40 mb-6">
                  0{idx + 1} //
                </div>
                <div>
                  <h3 className="font-heading italic text-2xl md:text-3xl text-white mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/80 font-body font-light leading-relaxed">
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
