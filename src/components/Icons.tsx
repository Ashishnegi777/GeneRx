import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const ArrowUpRight: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

export const Play: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <polygon points="6 4 20 12 6 20 6 4" />
  </svg>
);

export const ChevronDown: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const Menu: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="4" y1="8" x2="20" y2="8" />
    <line x1="4" y1="16" x2="20" y2="16" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="6" y1="18" x2="18" y2="6" />
  </svg>
);

export const CpuIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3M15 1v3" />
    <path d="M9 20v3M15 20v3" />
    <path d="M1 9h3M1 15h3" />
    <path d="M20 9h3M20 15h3" />
  </svg>
);

export const GlobeIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <path d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z" />
  </svg>
);

export const BrainIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="12" y1="4" x2="12" y2="20" />
    <path d="M12 5a3.5 3.5 0 0 0-3.5-2 3.5 3.5 0 0 0-3.5 3.5c0 .5.1 1 .3 1.5A3.5 3.5 0 0 0 4 12a3.5 3.5 0 0 0 1.5 2.9A3.5 3.5 0 0 0 8.5 21a3.5 3.5 0 0 0 3.5-3" />
    <path d="M12 5a3.5 3.5 0 0 1 3.5-2 3.5 3.5 0 0 1 3.5 3.5c0 .5-.1 1-.3 1.5A3.5 3.5 0 0 1 20 12a3.5 3.5 0 0 1-1.5 2.9A3.5 3.5 0 0 1 15.5 21a3.5 3.5 0 0 1-3.5-3" />
    <circle cx="8" cy="9.5" r="0.8" fill="currentColor" />
    <circle cx="16" cy="9.5" r="0.8" fill="currentColor" />
    <circle cx="8.5" cy="14.5" r="0.8" fill="currentColor" />
    <circle cx="15.5" cy="14.5" r="0.8" fill="currentColor" />
  </svg>
);

export const ChipIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <rect x="5" y="5" width="14" height="14" rx="2" fill="currentColor" />
    <rect x="8" y="8" width="8" height="8" rx="1" fill="#000" />
    <rect x="8" y="2" width="2" height="3" fill="currentColor" />
    <rect x="14" y="2" width="2" height="3" fill="currentColor" />
    <rect x="8" y="19" width="2" height="3" fill="currentColor" />
    <rect x="14" y="19" width="2" height="3" fill="currentColor" />
    <rect x="2" y="8" width="3" height="2" fill="currentColor" />
    <rect x="2" y="14" width="3" height="2" fill="currentColor" />
    <rect x="19" y="8" width="3" height="2" fill="currentColor" />
    <rect x="19" y="14" width="3" height="2" fill="currentColor" />
  </svg>
);

export const LayersIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <polygon points="12 2 22 7 12 12 2 7" fill="currentColor" />
    <path d="M2 12l10 5 10-5-2.2-1.1L12 14.8 4.2 10.9 2 12z" fill="currentColor" />
    <path d="M2 17l10 5 10-5-2.2-1.1L12 19.8 4.2 15.9 2 17z" fill="currentColor" />
  </svg>
);

/* Platform step icons */
export const SenseIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Radio waves */}
    <circle cx="12" cy="18" r="2" fill="currentColor" />
    <path d="M8.5 14.5a5 5 0 0 1 7 0" />
    <path d="M5.5 11.5a9.2 9.2 0 0 1 13 0" />
    <path d="M2.5 8.5a13.5 13.5 0 0 1 19 0" />
  </svg>
);

export const TransmitIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Transmit bidirectional arrows */}
    <path d="M4 17h12m0 0l-4-4m4 4l-4 4" />
    <path d="M20 7H8m0 0l4-4m-4 4l4 4" />
  </svg>
);

export const ProcessIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Gear icon */}
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export const LearnIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Nodes / AI network */}
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <circle cx="12" cy="18" r="2.5" />
    <path d="M8.2 7.2l7.6 0" />
    <path d="M7.3 8.3l3.4 7.4" />
    <path d="M16.7 8.3l-3.4 7.4" />
  </svg>
);

export const ActIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Lightning bolt */}
    <polygon points="13 2 4 13 11 13 10 22 20 11 13 11 14 2" />
  </svg>
);
