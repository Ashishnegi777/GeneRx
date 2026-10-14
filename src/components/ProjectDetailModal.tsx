import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CloseIcon } from './Icons';

export interface ProjectData {
  id: string;
  tagNumber: string;
  category: string;
  title: string;
  status: 'working-prototype' | 'verification-completed' | 'active-development';
  statusLabel: string;
  headline: string;
  fullDescription: string;
  architectureSteps: { step: string; title: string; detail: string }[];
  hardwareSpecs: { label: string; value: string }[];
  softwareSpecs: { label: string; value: string }[];
  keyHighlights: string[];
  clinicalOrFieldStatus: string;
}

interface ProjectDetailModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
  onInquire: (projectName: string) => void;
}

type TabType = 'pipeline' | 'specs' | 'highlights';

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  onInquire,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('pipeline');

  // Reset tab on project change or open
  useEffect(() => {
    if (isOpen) {
      setActiveTab('pipeline');
    }
  }, [isOpen, project?.id]);

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

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[120] overflow-y-auto overscroll-contain bg-black/90 backdrop-blur-xl p-3 sm:p-6 md:p-8 flex min-h-screen items-center justify-center"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass-strong rounded-2xl md:rounded-3xl border border-white/15 w-full max-w-2xl my-auto relative shadow-2xl overflow-hidden pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Status & Close */}
            <div className="sticky top-0 z-20 bg-black/85 backdrop-blur-md px-5 sm:px-8 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs text-white/40">
                  {project.tagNumber} //
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-white/15 text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                  {project.statusLabel}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="liquid-glass rounded-full w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <CloseIcon size={14} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-8 space-y-6 font-body">
              {/* Title & Core Statement (Clean, Zero Duplication) */}
              <div className="space-y-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 block">
                  {project.category}
                </span>
                <h3 className="font-heading italic text-3xl sm:text-4xl text-white font-normal leading-tight">
                  {project.title}
                </h3>
                <p className="font-body text-sm sm:text-base text-white/85 leading-relaxed italic border-l border-white/30 pl-3.5 py-0.5 font-light">
                  "{project.headline}"
                </p>
              </div>

              {/* Navigation Tabs (Progressive Disclosure for Superior UX) */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-3 pt-1">
                {[
                  { id: 'pipeline' as TabType, label: '01 // Architecture Pipeline' },
                  { id: 'specs' as TabType, label: '02 // Specifications' },
                  { id: 'highlights' as TabType, label: '03 // Highlights' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`font-mono text-xs px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-white text-black font-medium shadow-sm'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Architecture Pipeline (Inspired by PlatformSection flow) */}
              {activeTab === 'pipeline' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3 pt-1"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {project.architectureSteps.map((step) => (
                      <div
                        key={step.step}
                        className="liquid-glass rounded-xl p-4 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-colors"
                      >
                        <div>
                          <span className="font-mono text-xs text-white/40 block mb-1">
                            STAGE {step.step}
                          </span>
                          <h4 className="font-heading italic text-xl text-white mb-2">
                            {step.title}
                          </h4>
                        </div>
                        <p className="font-body text-xs text-white/70 font-light leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-white/50 font-body font-light pt-2 leading-relaxed">
                    {project.fullDescription}
                  </p>
                </motion.div>
              )}

              {/* Tab 2: Technical Specifications (Clean Tabular Rows, Human-Readable Font) */}
              {activeTab === 'specs' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6 pt-1"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {/* Hardware Column */}
                    <div>
                      <div className="text-[11px] font-mono uppercase text-white/40 tracking-wider pb-2 border-b border-white/10">
                        Hardware Platform
                      </div>
                      <div className="divide-y divide-white/5">
                        {project.hardwareSpecs.map((spec) => (
                          <div
                            key={spec.label}
                            className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs"
                          >
                            <span className="font-mono text-white/45 shrink-0 sm:w-2/5">
                              {spec.label}
                            </span>
                            <span className="font-body text-white/90 font-light sm:text-right sm:w-3/5">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Software Column */}
                    <div>
                      <div className="text-[11px] font-mono uppercase text-white/40 tracking-wider pb-2 border-b border-white/10">
                        Software &amp; Intelligence Stack
                      </div>
                      <div className="divide-y divide-white/5">
                        {project.softwareSpecs.map((spec) => (
                          <div
                            key={spec.label}
                            className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs"
                          >
                            <span className="font-mono text-white/45 shrink-0 sm:w-2/5">
                              {spec.label}
                            </span>
                            <span className="font-body text-white/90 font-light sm:text-right sm:w-3/5">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Key Engineering Highlights */}
              {activeTab === 'highlights' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 pt-1"
                >
                  <div className="space-y-3">
                    {project.keyHighlights.map((hl, i) => (
                      <div
                        key={i}
                        className="liquid-glass rounded-xl p-3.5 border border-white/10 flex items-start gap-3 text-xs text-white/80 font-body font-light leading-relaxed"
                      >
                        <span className="font-mono text-white/40 shrink-0 mt-0.5">
                          0{i + 1} //
                        </span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-xs font-mono text-white/45 flex items-center gap-2">
                    <span>Validation Status:</span>
                    <span className="text-white/80 font-normal">{project.clinicalOrFieldStatus}</span>
                  </div>
                </motion.div>
              )}

              {/* Modal Bottom Actions */}
              <div className="pt-4 flex items-center justify-between border-t border-white/10 gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={onClose}
                  className="font-mono text-xs text-white/50 hover:text-white transition-colors"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onInquire(project.title);
                  }}
                  className="liquid-glass-strong rounded-full px-5 py-2 text-xs font-mono text-white border border-white/20 hover:bg-white hover:text-black transition-all duration-200 flex items-center gap-1.5"
                >
                  <span>Request Full Architecture Specs</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
