import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from './SectionLabel';
import { BlurText } from './BlurText';
import { Reveal } from './Reveal';
import { GridBackdrop } from './GridBackdrop';
import { ArrowLeft, ArrowUpRight } from './Icons';
import { ProjectData, ProjectDetailModal } from './ProjectDetailModal';

/* ──────────────────────────────────────────────────────────────────────────
   PROJECTS DATA DEFINITION (CLEAN, EDITORIAL, PRECISE)
   ────────────────────────────────────────────────────────────────────────── */

const projectsData: ProjectData[] = [
  {
    id: 'face-recognition',
    tagNumber: '01',
    category: 'Computer Vision · Edge AI',
    title: 'AI — Mass Face Recognition System',
    status: 'working-prototype',
    statusLabel: 'Working Prototype',
    headline:
      'A real-time, contactless AI-based identity verification system for attendance management and secure access control.',
    fullDescription:
      'Designed for high-throughput pedestrian corridors and secure facility gates. The system processes simultaneous video streams directly on local neural accelerators, matching identities against verified cryptographic directories without streaming unencrypted facial data to the cloud.',
    architectureSteps: [
      {
        step: '01',
        title: 'Optical Acquisition',
        detail:
          'High-dynamic-range image capture optimized for variable ambient illumination and crowd flow.',
      },
      {
        step: '02',
        title: 'Edge Tensor Alignment',
        detail:
          'Local convolutional embeddings compute 512-D biometric vectors with continuous 3D depth liveness validation.',
      },
      {
        step: '03',
        title: 'Sub-120ms Access Sync',
        detail:
          'Turnstile relay actuation and encrypted cryptographic ledger logging for zero-touch attendance.',
      },
    ],
    hardwareSpecs: [
      { label: 'Compute Engine', value: 'Edge Neural Accelerator (Embedded NPU)' },
      { label: 'Optical Module', value: 'HDR Global Shutter + Near-Infrared Filter' },
      { label: 'Concurrent Tracking', value: 'Up to 30 subjects per frame' },
      { label: 'Effective Standoff', value: '0.8m to 6.0m operational radius' },
    ],
    softwareSpecs: [
      { label: 'Model Backbone', value: 'Quantized Mobile-Retina Architecture' },
      { label: 'Inference Latency', value: '< 110ms per batch stream' },
      { label: 'Liveness Defense', value: 'Gradient texture & 3D micro-depth estimation' },
      { label: 'Integration', value: 'Local LDAP / Zero-Trust API / Turnstile Relays' },
    ],
    keyHighlights: [
      'Contactless biometric verification eliminates bottleneck congestion during shift changes.',
      'Hardware-level 3D anti-spoofing defeats photos, video replays, and silicone masks.',
      '100% on-premise edge execution: sensitive biometric vectors remain strictly local.',
      'Direct turnstile and attendance ledger synchronization with discrepancy alerting.',
    ],
    clinicalOrFieldStatus:
      'Working functional prototype validated in active facility testing corridors.',
  },
  {
    id: 'hpv-kit',
    tagNumber: '02',
    category: 'Biotechnology · Molecular Diagnostics',
    title: 'Bio — HPV Diagnostic Kit',
    status: 'verification-completed',
    statusLabel: 'Completed Ideation & Verification · Prototyping Pipeline',
    headline:
      'A rapid point-of-care screening kit for early HPV detection. Completed ideation and verification phase, transitioning to prototype development.',
    fullDescription:
      'Engineered for decentralized clinics and community healthcare settings. The kit provides definitive molecular-level detection of oncogenic HPV genotypes in under 15 minutes, removing the dependency on costly thermal cyclers and centralized lab logistics.',
    architectureSteps: [
      {
        step: '01',
        title: 'Sample Solubilization',
        detail:
          'Gentle swab preparation in an ambient-temperature buffer requiring no electrical heat block.',
      },
      {
        step: '02',
        title: 'Lateral Capillary Flow',
        detail:
          'Precision microfluidic channel migration guiding the analyte across immobilized probe arrays.',
      },
      {
        step: '03',
        title: 'Molecular Readout',
        detail:
          'Chromogenic dual-band visualization confirming oncogenic target presence and test validity.',
      },
    ],
    hardwareSpecs: [
      { label: 'Format', value: 'Single-use microfluidic test cartridge' },
      { label: 'Target Analytes', value: 'High-risk HPV genotypes (16, 18)' },
      { label: 'Storage Requirement', value: 'Room temperature ambient (2°C to 30°C)' },
      { label: 'Incubation Power', value: 'Passive capillary flow (Zero electrical draw)' },
    ],
    softwareSpecs: [
      { label: 'Detection Method', value: 'Isothermal synthetic oligonucleotide hybridization' },
      { label: 'Analytical Limit', value: '< 15 pg/mL target viral protein' },
      { label: 'Specificity', value: '98.6% cross-reactivity clearance in verification' },
      { label: 'Time-to-Result', value: '12 to 15 minutes' },
    ],
    keyHighlights: [
      'Ideation and biochemical verification completed; transitioning into physical cartridge fabrication.',
      'Designed for accessible cervical oncology screening in resource-limited clinics.',
      'Eliminates requirements for expensive laboratory infrastructure and cold-chain storage.',
      'Clear, definitive dual-band readout for immediate point-of-care clinical decisions.',
    ],
    clinicalOrFieldStatus:
      'Analytical ideation and chemical verification complete; physical tooling & prototype underway.',
  },
  {
    id: 'first-aid-box',
    tagNumber: '03',
    category: 'Autonomous Triage · Embedded Robotics',
    title: 'AI First Aid Box',
    status: 'working-prototype',
    statusLabel: 'Working Prototype',
    headline:
      'An intelligent first aid system that captures wound images, identifies the wound type using AI, and automatically dispenses the appropriate bandage or medicine.',
    fullDescription:
      'A smart, standalone emergency station for workplaces, schools, and industrial sites. When an injury is presented to the optical chamber, on-device vision models segment and classify the lesion, automatically driving a motorized carousel to dispense the exact sterile supplies needed.',
    architectureSteps: [
      {
        step: '01',
        title: 'Optical Acquisition',
        detail:
          'Cross-polarized macro chamber captures glare-free true-color dermoscopic wound images.',
      },
      {
        step: '02',
        title: 'Edge Classification',
        detail:
          'Neural network segments the wound perimeter and classifies lacerations, burns, or abrasions.',
      },
      {
        step: '03',
        title: 'Motorized Dispense',
        detail:
          'Rotary carousel actuates to index and dispense sterile dressings, hydrogel, or antiseptic.',
      },
    ],
    hardwareSpecs: [
      { label: 'Dispenser Cartridge', value: '6-Bay motorized rotational carousel with stepper drive' },
      { label: 'Optical Module', value: 'Cross-polarized macro sensor with ring illumination' },
      { label: 'Processor', value: 'Embedded ARM compute core with on-device tensor unit' },
      { label: 'Feedback Screen', value: 'Minimal high-contrast visual guidance display' },
    ],
    softwareSpecs: [
      { label: 'Classification Model', value: 'Lightweight quantized convolutional segmentation' },
      { label: 'Recognized Classes', value: 'Abrasion, Thermal Burn, Linear Laceration, Puncture' },
      { label: 'Response Latency', value: '< 400ms from image capture to motor actuation' },
      { label: 'Telemetry', value: 'Automatic inventory restock notification via local mesh' },
    ],
    keyHighlights: [
      'Removes user hesitation and errors in dressing wounds during high-stress emergencies.',
      'Automated motorized carousel dispenses only the correct, sterile medical consumable.',
      'Clear step-by-step visual dressing guidance presented immediately after dispensing.',
      'Integrated hardware prototype linking optical capture, AI inference, and mechanical dispensing.',
    ],
    clinicalOrFieldStatus:
      'Working functional prototype integrating optics, AI model, and motorized mechanical carousel.',
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   SCHEMATIC 1: MINIMALIST FACE TOPOLOGY & VECTOR MESH (PURE MONOCHROME)
   ────────────────────────────────────────────────────────────────────────── */

const FaceTopologySchematic: React.FC = () => {
  return (
    <div className="w-full h-56 sm:h-64 flex items-center justify-center relative select-none">
      <svg
        viewBox="0 0 360 220"
        className="w-full h-full text-white overflow-visible"
        fill="none"
      >
        {/* Subtle coordinate alignment grid */}
        <g stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.8">
          <line x1="30" y1="110" x2="330" y2="110" />
          <line x1="180" y1="20" x2="180" y2="200" />
          <circle cx="180" cy="110" r="75" strokeDasharray="3 3" />
          <circle cx="180" cy="110" r="95" strokeOpacity="0.04" />
        </g>

        {/* Minimal Outer Framing Brackets */}
        <g stroke="currentColor" strokeOpacity="0.4" strokeWidth="1">
          <path d="M 120 40 H 105 V 55" />
          <path d="M 240 40 H 255 V 55" />
          <path d="M 105 165 V 180 H 120" />
          <path d="M 255 165 V 180 H 240" />
        </g>

        {/* Delicate Facial Topology Outline */}
        <ellipse
          cx="180"
          cy="110"
          rx="52"
          ry="68"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1"
        />

        {/* Eye line and Interpupillary axis */}
        <line
          x1="140"
          y1="95"
          x2="220"
          y2="95"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1"
          strokeDasharray="2 2"
        />

        {/* Eye nodes and focus rings */}
        <circle cx="155" cy="95" r="5" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
        <circle cx="155" cy="95" r="1.5" fill="white" />
        <circle cx="205" cy="95" r="5" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
        <circle cx="205" cy="95" r="1.5" fill="white" />

        {/* Geometric Nasal Bridge & Symmetry lines */}
        <polyline
          points="180,85 180,122 173,126 187,126"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1"
        />

        {/* Mouth arc */}
        <path
          d="M 162 145 Q 180 152 198 145"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1"
        />

        {/* Polygonal biometric mesh vectors */}
        <g stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.8">
          <line x1="155" y1="95" x2="180" y2="85" />
          <line x1="205" y1="95" x2="180" y2="85" />
          <line x1="155" y1="95" x2="173" y2="126" />
          <line x1="205" y1="95" x2="187" y2="126" />
          <line x1="173" y1="126" x2="180" y2="145" />
          <line x1="187" y1="126" x2="180" y2="145" />
          <line x1="155" y1="95" x2="135" y2="110" />
          <line x1="205" y1="95" x2="225" y2="110" />
          <line x1="135" y1="110" x2="162" y2="145" />
          <line x1="225" y1="110" x2="198" y2="145" />
          <line x1="180" y1="145" x2="180" y2="175" />
        </g>

        {/* Pulsing Landmark Points */}
        {[
          [180, 50],
          [155, 95],
          [205, 95],
          [180, 85],
          [180, 122],
          [162, 145],
          [198, 145],
          [180, 175],
          [135, 110],
          [225, 110],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="2"
            fill="white"
            animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.25, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}

        {/* Subtle, Slow-Sweeping Scan Line */}
        <motion.line
          x1="100"
          x2="260"
          stroke="white"
          strokeOpacity="0.45"
          strokeWidth="1"
          animate={{ y1: [45, 175, 45], y2: [45, 175, 45] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Technical Annotations */}
        <text x="32" y="32" fill="white" fillOpacity="0.35" fontSize="8" fontFamily="'JetBrains Mono', monospace">
          FOV: 68° · HDR MULTI-TARGET
        </text>
        <text x="328" y="32" textAnchor="end" fill="white" fillOpacity="0.35" fontSize="8" fontFamily="'JetBrains Mono', monospace">
          LATENCY: &lt;110MS
        </text>
        <text x="180" y="206" textAnchor="middle" fill="white" fillOpacity="0.4" fontSize="8" fontFamily="'JetBrains Mono', monospace">
          512-D BIOMETRIC EMBEDDING // 3D ANTI-SPOOF
        </text>
      </svg>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
   SCHEMATIC 2: MINIMALIST MOLECULAR MICROFLUIDIC STRIP (PURE MONOCHROME)
   ────────────────────────────────────────────────────────────────────────── */

const MicrofluidicSchematic: React.FC = () => {
  return (
    <div className="w-full h-56 sm:h-64 flex items-center justify-center relative select-none">
      <svg
        viewBox="0 0 360 220"
        className="w-full h-full text-white overflow-visible"
        fill="none"
      >
        {/* Architectural dimension markings */}
        <g stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.8">
          <line x1="40" y1="50" x2="320" y2="50" />
          <line x1="40" y1="46" x2="40" y2="54" />
          <line x1="110" y1="46" x2="110" y2="54" />
          <line x1="205" y1="46" x2="205" y2="54" />
          <line x1="270" y1="46" x2="270" y2="54" />
          <line x1="320" y1="46" x2="320" y2="54" />
        </g>
        <text x="40" y="42" fill="white" fillOpacity="0.3" fontSize="7" fontFamily="'JetBrains Mono', monospace">
          0mm
        </text>
        <text x="110" y="42" fill="white" fillOpacity="0.3" fontSize="7" fontFamily="'JetBrains Mono', monospace">
          SAMPLE
        </text>
        <text x="205" y="42" fill="white" fillOpacity="0.3" fontSize="7" fontFamily="'JetBrains Mono', monospace">
          TEST [T]
        </text>
        <text x="270" y="42" fill="white" fillOpacity="0.3" fontSize="7" fontFamily="'JetBrains Mono', monospace">
          CONTROL [C]
        </text>

        {/* Microfluidic Outer Cartridge Outline */}
        <rect
          x="40"
          y="65"
          width="280"
          height="80"
          rx="6"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1"
        />

        {/* Sample Reservoir Well (Left) */}
        <circle cx="85" cy="105" r="20" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
        <circle cx="85" cy="105" r="8" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="2 2" />
        <circle cx="85" cy="105" r="2.5" fill="white" fillOpacity="0.8" />

        {/* Flow Channel Conduit */}
        <line x1="105" y1="105" x2="305" y2="105" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
        <line
          x1="105"
          y1="97"
          x2="305"
          y2="97"
          stroke="currentColor"
          strokeOpacity="0.08"
          strokeWidth="0.8"
        />
        <line
          x1="105"
          y1="113"
          x2="305"
          y2="113"
          stroke="currentColor"
          strokeOpacity="0.08"
          strokeWidth="0.8"
        />

        {/* Animated Traveling Capillary Wave Particles */}
        <motion.circle
          r="2"
          fill="white"
          animate={{ cx: [105, 305], opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
          cy="105"
        />
        <motion.circle
          r="1.5"
          fill="white"
          animate={{ cx: [105, 305], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: 1.2, ease: 'linear' }}
          cy="105"
        />
        <motion.circle
          r="1.5"
          fill="white"
          animate={{ cx: [105, 305], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: 2.1, ease: 'linear' }}
          cy="105"
        />

        {/* Test Band Capture Line [T] */}
        <g>
          <line x1="205" y1="80" x2="205" y2="130" stroke="white" strokeWidth="1.5" strokeOpacity="0.8" />
          <circle cx="205" cy="72" r="2" fill="white" />
          <text x="205" y="142" textAnchor="middle" fill="white" fillOpacity="0.6" fontSize="8" fontFamily="'JetBrains Mono', monospace">
            T
          </text>
        </g>

        {/* Control Band Capture Line [C] */}
        <g>
          <line x1="270" y1="80" x2="270" y2="130" stroke="white" strokeWidth="1.5" strokeOpacity="0.8" />
          <circle cx="270" cy="72" r="2" fill="white" />
          <text x="270" y="142" textAnchor="middle" fill="white" fillOpacity="0.6" fontSize="8" fontFamily="'JetBrains Mono', monospace">
            C
          </text>
        </g>

        {/* Molecular DNA Probe Hybridization Motif (Bottom Detail) */}
        <g stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.8">
          <path d="M 120 175 Q 135 165 150 175 T 180 175 T 210 175 T 240 175" />
          <path d="M 120 175 Q 135 185 150 175 T 180 175 T 210 175 T 240 175" />
          <line x1="135" y1="168" x2="135" y2="182" />
          <line x1="165" y1="168" x2="165" y2="182" />
          <line x1="195" y1="168" x2="195" y2="182" />
          <line x1="225" y1="168" x2="225" y2="182" />
        </g>

        <text x="180" y="202" textAnchor="middle" fill="white" fillOpacity="0.4" fontSize="8" fontFamily="'JetBrains Mono', monospace">
          SYNTHETIC OLIGONUCLEOTIDE PROBE HYBRIDIZATION // &lt;15 MIN
        </text>
      </svg>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
   SCHEMATIC 3: MINIMALIST ROTARY DISPENSER & OPTICAL CAROUSEL (PURE MONOCHROME)
   ────────────────────────────────────────────────────────────────────────── */

const RotaryDispenserSchematic: React.FC = () => {
  return (
    <div className="w-full h-56 sm:h-64 flex items-center justify-center relative select-none">
      <svg
        viewBox="0 0 360 220"
        className="w-full h-full text-white overflow-visible"
        fill="none"
      >
        {/* Subtle radial reference circles */}
        <circle cx="180" cy="105" r="82" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.8" />
        <circle cx="180" cy="105" r="68" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
        <circle cx="180" cy="105" r="28" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />

        {/* Central Stepper Axis */}
        <circle cx="180" cy="105" r="7" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
        <circle cx="180" cy="105" r="2" fill="white" />

        {/* 6-Bay Rotary Carousel Chamber Partitions (Animated Slow Rotation) */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '180px', originY: '105px' }}
        >
          {/* 6 Radial Partition Spokes */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line
              key={deg}
              x1="180"
              y1="105"
              x2={180 + 68 * Math.cos((deg * Math.PI) / 180)}
              y2={105 + 68 * Math.sin((deg * Math.PI) / 180)}
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
          ))}

          {/* Compartment Node Indicators */}
          {[30, 90, 150, 210, 270, 330].map((deg, idx) => (
            <circle
              key={deg}
              cx={180 + 48 * Math.cos((deg * Math.PI) / 180)}
              cy={105 + 48 * Math.sin((deg * Math.PI) / 180)}
              r="2"
              fill="white"
              fillOpacity={idx === 0 ? 0.9 : 0.3}
            />
          ))}
        </motion.g>

        {/* Active Dispensing Ejection Gate (Top Right Indicator) */}
        <g stroke="currentColor" strokeWidth="1">
          <path d="M 248 105 H 280" strokeOpacity="0.4" />
          <path d="M 280 95 V 115" strokeOpacity="0.4" />
          <motion.circle
            cx="280"
            cy="105"
            r="3"
            fill="white"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </g>
        <text x="290" y="108" fill="white" fillOpacity="0.6" fontSize="7" fontFamily="'JetBrains Mono', monospace">
          GATE ACTUATION
        </text>

        {/* Optical Sensor Crosshairs (Left Framing) */}
        <g stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.8">
          <circle cx="70" cy="105" r="28" strokeDasharray="3 3" />
          <line x1="70" y1="72" x2="70" y2="138" />
          <line x1="37" y1="105" x2="103" y2="105" />
          <circle cx="70" cy="105" r="4" stroke="white" strokeWidth="1" />
          <circle cx="70" cy="105" r="1.5" fill="white" />
        </g>
        <text x="70" y="146" textAnchor="middle" fill="white" fillOpacity="0.4" fontSize="7" fontFamily="'JetBrains Mono', monospace">
          OPTICAL MACRO
        </text>

        {/* Technical Footer Annotation */}
        <text x="180" y="202" textAnchor="middle" fill="white" fillOpacity="0.4" fontSize="8" fontFamily="'JetBrains Mono', monospace">
          6-BAY MOTORIZED STEPPER ROTATION // CLOSED-LOOP TRIAGE
        </text>
      </svg>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
   MAIN MINIMALIST PROJECTS PAGE
   ────────────────────────────────────────────────────────────────────────── */

interface ProjectsPageProps {
  onBackToHome: () => void;
  onOpenContact?: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onBackToHome,
  onOpenContact,
}) => {
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ProjectData | null>(null);

  const handleInquireFromModal = (projectName: string) => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      window.location.href = `mailto:hello@generx.in?subject=Inquiry: ${encodeURIComponent(projectName)}`;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-body selection:bg-white/20 selection:text-white pb-32">
      {/* Background Matrix */}
      <GridBackdrop variant="circuit" className="opacity-25" />

      {/* Top Contrast Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 px-5 sm:px-8 md:px-14 lg:px-20 max-w-7xl mx-auto pt-32 sm:pt-40">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10 mb-14">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white hover:-translate-x-0.5 transition-all duration-200"
          >
            <ArrowLeft size={14} />
            <span>Return to overview</span>
          </button>

          <span className="font-mono text-xs text-white/40 tracking-wider">
            GeneRx Engineering Records // 03 Systems
          </span>
        </div>

        {/* Header Hero */}
        <div className="max-w-4xl space-y-4 mb-20">
          <SectionLabel text="// Systems & Engineering" />

          <h1 className="font-heading italic text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white font-normal leading-[1.02] tracking-[-1.5px] sm:tracking-[-3px]">
            <BlurText text="Physical intelligence, engineered end to end." align="start" />
          </h1>

          <Reveal delay={0.2}>
            <p className="font-body text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl pt-2">
              A record of proprietary platforms developed across computer vision, molecular diagnostics, and autonomous medical hardware.
            </p>
          </Reveal>
        </div>

        {/* Project Showcase List (Generous, Clean Editorial Rows) */}
        <div className="space-y-16">
          {projectsData.map((project) => (
            <Reveal key={project.id}>
              <article className="liquid-glass rounded-[1.75rem] p-7 sm:p-10 md:p-12 border border-white/10 relative overflow-hidden hover:border-white/20 transition-colors duration-300">
                {/* Card Top: Index and Status */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8 font-mono text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-white/40">{project.tagNumber} //</span>
                    <span className="text-white/70 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                    <span>{project.statusLabel}</span>
                  </div>
                </div>

                {/* 2-Column Split: Editorial Description & Minimalist Vector Blueprint */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                  {/* Left Column: Title, Quote, and Action */}
                  <div className="lg:col-span-6 space-y-5">
                    <h2 className="font-heading italic text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight">
                      {project.title}
                    </h2>

                    {/* Exact User Provided Quote */}
                    <blockquote className="border-l border-white/30 pl-4 py-0.5 italic font-body text-base sm:text-lg text-white/90 font-light leading-relaxed">
                      "{project.headline}"
                    </blockquote>

                    {/* Action Link */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProjectForModal(project)}
                        className="inline-flex items-center gap-2 text-xs font-mono text-white/80 hover:text-white transition-colors group"
                      >
                        <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-white">
                          View details &amp; architecture
                        </span>
                        <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Architectural Vector Blueprint */}
                  <div className="lg:col-span-6 liquid-glass rounded-2xl p-4 sm:p-6 border border-white/10 flex items-center justify-center">
                    {project.id === 'face-recognition' && <FaceTopologySchematic />}
                    {project.id === 'hpv-kit' && <MicrofluidicSchematic />}
                    {project.id === 'first-aid-box' && <RotaryDispenserSchematic />}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Minimal Bottom Inquiries Section */}
        <Reveal delay={0.2}>
          <div className="mt-24 liquid-glass rounded-2xl p-8 sm:p-12 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="font-mono text-xs text-white/40 uppercase tracking-wider block">
                // System Inquiries &amp; Deployments
              </span>
              <h3 className="font-heading italic text-2xl sm:text-3xl text-white">
                Interested in testing or piloting these platforms?
              </h3>
              <p className="font-body text-sm text-white/70 font-light leading-relaxed">
                We work directly with partners to adapt our prototypes for real-world enterprise, clinical, and industrial environments.
              </p>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  if (onOpenContact) {
                    onOpenContact();
                  } else {
                    window.location.href = 'mailto:hello@generx.in?subject=Prototype Inquiry';
                  }
                }}
                className="liquid-glass-strong rounded-full px-6 py-3 font-mono text-xs text-white border border-white/20 hover:bg-white hover:text-black transition-all duration-200 flex items-center gap-2"
              >
                <span>Initiate Inquiry</span>
                <ArrowUpRight size={14} />
              </button>

              <button
                type="button"
                onClick={onBackToHome}
                className="font-mono text-xs text-white/50 hover:text-white transition-colors"
              >
                Return to home
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Deep-Dive Technical Architecture Modal */}
      <ProjectDetailModal
        project={selectedProjectForModal}
        isOpen={!!selectedProjectForModal}
        onClose={() => setSelectedProjectForModal(null)}
        onInquire={handleInquireFromModal}
      />
    </div>
  );
};
