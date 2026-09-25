import React from 'react';

export const SignalFallback: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`absolute inset-0 bg-black flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 500"
        className="w-[70vw] max-w-[500px] h-[70vw] max-h-[500px] text-white/30"
        fill="none"
      >
        {/* Concentric swirling thin curves */}
        {Array.from({ length: 24 }).map((_, i) => {
          const r = 40 + i * 8.5;
          const offset = i * 15;
          return (
            <path
              key={i}
              d={`M ${250 + r * 0.9} 250 C ${250 + r} ${250 - r * 0.8}, ${250 - r * 0.6} ${250 - r}, ${250 - r} 250 C ${250 - r} ${250 + r * 0.8}, ${250 + r * 0.7} ${250 + r}, ${250 + r * 0.9} 250`}
              stroke="currentColor"
              strokeWidth={i % 2 === 0 ? '1' : '0.6'}
              strokeDasharray={i % 3 === 0 ? '6 3' : undefined}
              transform={`rotate(${offset} 250 250)`}
              opacity={0.25 + (i / 24) * 0.3}
            />
          );
        })}

        {/* Glossy Black Core indicator in center */}
        <circle cx="250" cy="250" r="32" fill="#000000" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <ellipse cx="242" cy="242" rx="10" ry="5" fill="rgba(255,255,255,0.6)" transform="rotate(-30 242 242)" />
      </svg>
    </div>
  );
};
