import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OverviewModal: React.FC<OverviewModalProps> = ({ isOpen, onClose }) => {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            exit={{ scale: 0.95, opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass-strong rounded-3xl p-2 md:p-3 w-full max-w-4xl relative overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Title & Close */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <span className="font-heading italic text-xl text-white">
                GeneRx Overview Reel
              </span>
              <button
                type="button"
                onClick={onClose}
                className="liquid-glass rounded-full w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Close overview"
              >
                ✕
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black mt-2">
              <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4 text-xs text-white/60 font-body text-center">
              Deep-tech research in AI, biosensing, and edge intelligence.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
