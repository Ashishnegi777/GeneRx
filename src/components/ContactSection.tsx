import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadingVideo } from './FadingVideo';
import { NetworkField } from './NetworkField';
import { BlurText } from './BlurText';
import { Reveal } from './Reveal';
import { ArrowUpRight } from './Icons';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="min-h-[70vh] overflow-hidden bg-black relative flex flex-col justify-center items-center py-28"
    >
      {/* Layer 1: Ambient Tech Wave Video */}
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{
          filter: 'brightness(0.35) contrast(1.2)',
          opacity: 0.35,
        }}
      />

      {/* Layer 2: Background Canvas Network at reduced density and 50% opacity */}
      <NetworkField densityMultiplier={0.5} opacity={0.5} />

      {/* Layer 3: Contrast Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black pointer-events-none z-[1]" />

      <div className="relative z-10 px-6 sm:px-8 md:px-16 max-w-3xl mx-auto w-full flex flex-col items-center text-center">
        {/* Centered Heading */}
        <h2 className="text-6xl md:text-7xl font-heading italic tracking-[-3px] text-white">
          <BlurText text="Have a system to build?" align="center" />
        </h2>

        {/* Short Line */}
        <Reveal delay={0.2}>
          <p className="mt-4 text-base md:text-lg text-white/80 font-body font-light">
            Tell us the problem. We'll help shape the system.
          </p>
        </Reveal>

        {/* Direct Email CTA */}
        <Reveal delay={0.4} className="mt-8">
          <a
            href="mailto:hello@generx.in"
            className="liquid-glass-strong rounded-full px-6 py-3 text-sm md:text-base font-body text-white flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-transform duration-200 group shadow-xl"
          >
            <span>hello@generx.in</span>
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </Reveal>

        {/* Compact Glass Contact Form */}
        <Reveal delay={0.6} className="mt-12 w-full max-w-lg">
          <div className="liquid-glass rounded-2xl p-6 md:p-8 text-left shadow-2xl">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-8 text-center"
                >
                  <div className="font-heading italic text-3xl text-white mb-2">
                    Thanks, we'll be in touch.
                  </div>
                  <p className="text-sm font-body text-white/70">
                    We have received your note and will follow up shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="mt-6 text-xs font-mono text-white/50 hover:text-white underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full liquid-glass rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30 font-body"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@organization.com"
                      className="w-full liquid-glass rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30 font-body"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Brief description of the challenge or hardware requirement..."
                      className="w-full liquid-glass rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30 font-body resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="bg-white text-black rounded-full px-6 py-2.5 text-sm font-medium font-body hover:bg-white/90 transition-transform active:scale-95 shadow-md flex items-center gap-1.5"
                    >
                      <span>Send</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
