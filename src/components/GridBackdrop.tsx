import React from 'react';

export type GridVariant = 'grid' | 'dots' | 'circuit';

interface GridBackdropProps {
  variant?: GridVariant;
  className?: string;
}

export const CircuitLines: React.FC = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="traceGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
        </linearGradient>
      </defs>

      {/* Static Base Traces */}
      <g stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" fill="none">
        {/* Trace 1 */}
        <path d="M 0 150 H 300 V 280 H 550" />
        <circle cx="550" cy="280" r="3" fill="rgba(255, 255, 255, 0.25)" />

        {/* Trace 2 */}
        <path d="M 200 800 V 550 H 450 V 400 H 700" />
        <circle cx="700" cy="400" r="3" fill="rgba(255, 255, 255, 0.25)" />

        {/* Trace 3 */}
        <path d="M 1200 250 H 950 V 120 H 750" />
        <circle cx="750" cy="120" r="3" fill="rgba(255, 255, 255, 0.25)" />

        {/* Trace 4 */}
        <path d="M 1000 800 V 600 H 800 V 480 H 600" />
        <circle cx="600" cy="480" r="3" fill="rgba(255, 255, 255, 0.25)" />

        {/* Trace 5 */}
        <path d="M 400 0 V 180 H 650 V 320" />
        <circle cx="650" cy="320" r="3" fill="rgba(255, 255, 255, 0.25)" />
      </g>

      {/* Animated Signal Segments */}
      <g stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.5" fill="none">
        <path
          d="M 0 150 H 300 V 280 H 550"
          className="circuit-signal"
          style={{ animationDelay: '0s' }}
        />
        <path
          d="M 200 800 V 550 H 450 V 400 H 700"
          className="circuit-signal"
          style={{ animationDelay: '1.8s' }}
        />
        <path
          d="M 1200 250 H 950 V 120 H 750"
          className="circuit-signal"
          style={{ animationDelay: '3.2s' }}
        />
        <path
          d="M 1000 800 V 600 H 800 V 480 H 600"
          className="circuit-signal"
          style={{ animationDelay: '4.5s' }}
        />
        <path
          d="M 400 0 V 180 H 650 V 320"
          className="circuit-signal"
          style={{ animationDelay: '2.4s' }}
        />
      </g>
    </svg>
  );
};

export const GridBackdrop: React.FC<GridBackdropProps> = ({
  variant = 'grid',
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {variant === 'grid' && (
        <div className="absolute inset-0 overflow-hidden">
          {/* 3D Perspective Grid Floor */}
          <div className="absolute inset-0 h-[140%] -top-[10%] perspective-grid pointer-events-none" />

          {/* Looping 8s Scanline */}
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent animate-scanline pointer-events-none" />

          {/* Vignette fade to dark */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
        </div>
      )}

      {variant === 'dots' && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Radial Dot Matrix (24px spacing, white/10) */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.1) 1.2px, transparent 0)',
              backgroundSize: '24px 24px',
              maskImage:
                'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)',
              WebkitMaskImage:
                'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
        </div>
      )}

      {variant === 'circuit' && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid substrate + Circuit traces */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <CircuitLines />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>
      )}
    </div>
  );
};
