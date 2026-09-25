import React, { lazy, Suspense } from 'react';
import { SignalFallback } from './SignalFallback';

export const LazySignalSculpture = lazy(() => import('./SignalSculpture'));

export interface SignalSculptureWrapperProps {
  scrollMorph?: boolean;
  className?: string;
  opacity?: number;
}

export const SignalSculpture: React.FC<SignalSculptureWrapperProps> = (props) => (
  <Suspense fallback={<SignalFallback />}>
    <LazySignalSculpture {...props} />
  </Suspense>
);

export default SignalSculpture;
