import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from './Icons';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            exit={{ scale: 0.95, opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass-strong rounded-3xl p-6 md:p-8 w-full max-w-lg relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-white/60 font-body block mb-1">
                  Connect With GeneRx
                </span>
                <h3 className="font-heading italic text-3xl text-white">
                  Pilot & Research Partnerships
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="liquid-glass rounded-full w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="py-12 text-center">
                <div className="text-2xl font-heading italic text-white mb-2">
                  Message Transmitted
                </div>
                <p className="text-sm text-white/80 font-body">
                  Our engineering & research team will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-body uppercase tracking-wider text-white/70 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Eleanor Vance"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40 transition-colors font-body"
                  />
                </div>

                <div>
                  <label className="block text-xs font-body uppercase tracking-wider text-white/70 mb-1.5">
                    Institutional / Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="eleanor@institution.org"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40 transition-colors font-body"
                  />
                </div>

                <div>
                  <label className="block text-xs font-body uppercase tracking-wider text-white/70 mb-1.5">
                    Project or Pilot Focus
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Detail your requirements for biosensing, vision systems, or hardware deployment..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40 transition-colors font-body resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <a
                    href="mailto:hello@generx.in"
                    className="text-xs text-white/60 hover:text-white font-body underline underline-offset-4"
                  >
                    Or write directly to hello@generx.in
                  </a>

                  <button
                    type="submit"
                    className="bg-white text-black hover:bg-white/90 px-5 py-2.5 rounded-full text-sm font-medium font-body flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105 active:scale-95"
                  >
                    <span>Submit</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
