import React from 'react';

interface SectionLabelProps {
  text: string;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ text, className = '' }) => {
  return (
    <div className={`text-sm font-mono text-white/70 mb-6 tracking-wider select-none ${className}`}>
      {text.startsWith('//') ? text : `// ${text}`}
    </div>
  );
};
