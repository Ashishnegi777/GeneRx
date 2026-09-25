import React from 'react';
import { motion } from 'framer-motion';
import { FadingVideo } from './FadingVideo';
import { GridBackdrop } from './GridBackdrop';
import { SectionLabel } from './SectionLabel';
import { BlurText } from './BlurText';
import { Reveal } from './Reveal';
import { SenseIcon, TransmitIcon, ProcessIcon, LearnIcon, ActIcon } from './Icons';

interface PipelineStep {
  step: string;
  title: string;
  icon: React.ReactNode;
  body: string;
}

const pipelineSteps: PipelineStep[] = [
  {
    step: '01',
    title: 'Sense',
    icon: <SenseIcon size={20} />,
    body: 'Sensors capture signals from bodies, rooms, and machines.',
  },
  {
    step: '02',
    title: 'Transmit',
    icon: <TransmitIcon size={20} />,
    body: 'Secure, low-power connectivity moves data reliably.',
  },
  {
    step: '03',
    title: 'Process',
    icon: <ProcessIcon size={20} />,
    body: 'Edge and cloud pipelines clean and structure it.',
  },
  {
    step: '04',
    title: 'Learn',
    icon: <LearnIcon size={20} />,
    body: 'AI models find patterns and make predictions.',
  },
  {
    step: '05',
    title: 'Act',
    icon: <ActIcon size={20} />,
    body: 'Dashboards and automations turn insight into action.',
  },
];

const techStack = [
  'Python',
  'PyTorch',
  'TensorFlow',
  'OpenCV',
  'MQTT',
  'React',
  'Embedded C',
  'Cloud',
];

export const PlatformSection: React.FC = () => {
  return (
    <section
      id="platform"
      className="min-h-screen overflow-hidden bg-black relative flex flex-col justify-between"
    >
      {/* Layer 1: Ambient Tech Pipeline Video */}
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{
          filter: 'brightness(0.32) contrast(1.2)',
          opacity: 0.4,
        }}
      />

      {/* Layer 2: Circuit Grid Backdrop */}
      <GridBackdrop variant="circuit" />

      {/* Layer 3: Contrast Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black pointer-events-none z-[1]" />

      <div className="relative z-10 px-6 sm:px-8 md:px-16 lg:px-20 pt-28 pb-16 max-w-7xl mx-auto w-full flex flex-col justify-between min-h-screen">
        {/* Header */}
        <div>
          <SectionLabel text="// Platform" />
          <h2 className="font-heading italic text-6xl md:text-7xl lg:text-[6rem] leading-[0.95] md:leading-[0.9] tracking-[-3px] text-white max-w-4xl">
            <BlurText text="One pipeline, sensor to insight" align="start" />
          </h2>
        </div>

        {/* 5-Step Horizontal Flow */}
        <div className="mt-16 relative">
          {/* Desktop Connecting Line with animated traveling signal dot */}
          <div className="hidden md:block absolute top-[28px] left-[5%] right-[5%] z-0 pointer-events-none">
            <div className="h-px bg-white/15 w-full relative">
              <motion.div
                animate={{ left: ['0%', '100%'] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
            {pipelineSteps.map((item, idx) => (
              <Reveal key={item.step} delay={idx * 0.1}>
                <div className="liquid-glass rounded-[1.25rem] p-5 h-full flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
                  {/* Step number and icon badge */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs text-white/50">{item.step}</span>
                    <div className="liquid-glass w-9 h-9 rounded-lg flex items-center justify-center text-white/80">
                      {item.icon}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading italic text-2xl text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/80 font-body font-light leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Tech Marquee Strip (mt-12) */}
        <Reveal delay={0.4} className="mt-16">
          <div className="liquid-glass rounded-full px-6 py-3.5 max-w-4xl mx-auto overflow-hidden relative shadow-lg">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee items-center gap-8">
              {/* First list */}
              {techStack.map((tech, i) => (
                <span
                  key={`tech-1-${i}`}
                  className="font-mono text-xs tracking-wider text-white/70 hover:text-white transition-colors cursor-default whitespace-nowrap flex items-center gap-8"
                >
                  <span>{tech}</span>
                  <span className="text-white/20 select-none">/</span>
                </span>
              ))}

              {/* Second list for seamless loop */}
              {techStack.map((tech, i) => (
                <span
                  key={`tech-2-${i}`}
                  className="font-mono text-xs tracking-wider text-white/70 hover:text-white transition-colors cursor-default whitespace-nowrap flex items-center gap-8"
                >
                  <span>{tech}</span>
                  <span className="text-white/20 select-none">/</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
