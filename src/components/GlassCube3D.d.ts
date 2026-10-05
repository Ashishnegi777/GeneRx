import React from 'react';

export interface GlassCube3DProps {
  headlineLines?: string[] | { desktop?: string[]; mobile?: string[] };
  fontFamily?: string;
  fontWeight?: number;
  fontStyle?: string;
  textColor?: string;
  bgColor?: string;
  bgImage?: string;
  headlineCenter?: { x: number; y: number } | { desktop?: { x: number; y: number }; mobile?: { x: number; y: number } };
  headlineFontSizePx?: (W: number, H?: number, mobile?: boolean) => number;
  cubeCenter?: { x: number; y: number } | { desktop?: { x: number; y: number }; mobile?: { x: number; y: number } };
  arms?: number;
  scaleFactor?: number;
  xLetterScale?: number;
  showDysonRings?: boolean;
  dysonRingRadii?: number[];
  dysonRingTube?: number;
  dysonRingSpeeds?: number[];
  dysonCycleDuration?: number;
  dysonActiveDuration?: number;
  dysonPeakSpeed?: number;
  dysonDelays?: number[];
  dysonMoveDuration?: number;
  dysonPauseDuration?: number;
  dysonStrokeAngle?: number;
}

export interface GlassCube3DHandle {
  rotateBy: (radians: number) => void;
}

export declare const GlassCube3D: React.ForwardRefExoticComponent<
  GlassCube3DProps & React.RefAttributes<GlassCube3DHandle>
>;

export default GlassCube3D;
