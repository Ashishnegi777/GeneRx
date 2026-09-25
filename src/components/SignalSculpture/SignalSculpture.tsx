import React, { useEffect, useRef, useState, useMemo, Component, ErrorInfo, ReactNode } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { FilamentMesh } from './FilamentMesh';
import { SensorCore } from './SensorCore';
import { generateFilamentGeometry } from './generateFilaments';
import { SignalFallback } from './SignalFallback';

interface SignalSculptureProps {
  scrollMorph?: boolean;
  className?: string;
  opacity?: number;
}

// Cubic ease in-out
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

interface SceneProps {
  geometry: THREE.BufferGeometry;
  pointerNdc: THREE.Vector2;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  scrollMorph: boolean;
  scrollProgress: number;
  opacity?: number;
}

const SculptureScene: React.FC<SceneProps> = ({
  geometry,
  pointerNdc,
  isMobile,
  prefersReducedMotion,
  scrollMorph,
  scrollProgress,
  opacity = 1.0,
}) => {
  const groupRef = useRef<THREE.Group | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const idleYRef = useRef<number>(0);
  const [currentMorph, setCurrentMorph] = useState(prefersReducedMotion ? 1.0 : 0.0);

  useFrame((state, delta) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.getElapsedTime();
    }
    const elapsed = state.clock.getElapsedTime() - startTimeRef.current;

    // Morph timeline calculation
    let m = 1.0;
    if (!prefersReducedMotion) {
      const delay = 0.6;
      const duration = 4.0;
      if (elapsed < delay) {
        m = 0.0;
      } else if (elapsed < delay + duration) {
        const t = (elapsed - delay) / duration;
        m = easeInOutCubic(t);
      } else {
        m = 1.0;
      }

      // Scroll link: morph dips back towards 0.6 as user scrolls hero out
      if (scrollMorph && scrollProgress > 0) {
        const dip = Math.min(scrollProgress * 0.4, 0.4);
        m = Math.max(0.6, m - dip);
      }
    }
    setCurrentMorph(m);

    // Group movement & idle rotation
    if (groupRef.current) {
      if (!prefersReducedMotion) {
        // Idle Y rotation (~0.05 rad/s)
        idleYRef.current += 0.05 * delta;

        // Damped pointer tilt up to 8° (~0.14 rad)
        const targetRotX = -pointerNdc.y * 0.14;
        const targetRotY = idleYRef.current + pointerNdc.x * 0.14;

        groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.06;
        groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.06;

        // Float on Y (±0.03)
        groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.9) * 0.03;
      } else {
        groupRef.current.rotation.set(0, 0, 0);
        groupRef.current.position.set(0, 0, 0);
      }
    }
  });

  return (
    <group ref={groupRef} scale={1.05}>
      {/* Sensor Core at center with reflections and look tracking */}
      <SensorCore pointerNdc={pointerNdc} />

      {/* Filaments Geometry with custom shader */}
      <FilamentMesh
        geometry={geometry}
        morph={currentMorph}
        pointerNdc={pointerNdc}
        enableRipple={!isMobile && !prefersReducedMotion}
        opacity={opacity}
      />
    </group>
  );
};

// WebGL Error Boundary
class WebGLErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL Rendering Failed, using static fallback:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const SignalSculpture: React.FC<SignalSculptureProps> = ({
  scrollMorph = true,
  className = '',
  opacity = 1.0,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pointerNdcRef = useRef(new THREE.Vector2(0, 0));

  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handleMql = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handleMql);

    // Scroll progress tracking for scrollMorph
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight || 1;
      setScrollProgress(Math.min(scrollY / vh, 1.0));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Page visibility
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Intersection observer
    const container = containerRef.current;
    if (container) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsIntersecting(entry.isIntersecting);
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
      return () => {
        observer.disconnect();
        window.removeEventListener('resize', checkMobile);
        mql.removeEventListener('change', handleMql);
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('visibilitychange', handleVisibility);
      };
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      mql.removeEventListener('change', handleMql);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Filaments geometry: 2,500 on desktop, 900 on mobile
  const strandCount = isMobile ? 900 : 2500;
  const geometry = useMemo(() => {
    return generateFilamentGeometry(strandCount);
  }, [strandCount]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  // Pointer tracking
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    pointerNdcRef.current.set(x, y);
  };

  const handlePointerLeave = () => {
    pointerNdcRef.current.set(0, 0);
  };

  const shouldRender = isIntersecting && isTabVisible;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`absolute inset-0 z-0 pointer-events-auto overflow-hidden bg-black select-none ${className}`}
    >
      <WebGLErrorBoundary fallback={<SignalFallback />}>
        {shouldRender && (
          <Canvas
            camera={{ position: [0, 0, 5.2], fov: 35 }}
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: 'high-performance',
            }}
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            className="w-full h-full block"
          >
            <SculptureScene
              geometry={geometry}
              pointerNdc={pointerNdcRef.current}
              isMobile={isMobile}
              prefersReducedMotion={prefersReducedMotion}
              scrollMorph={scrollMorph}
              scrollProgress={scrollProgress}
              opacity={opacity}
            />
          </Canvas>
        )}
      </WebGLErrorBoundary>

      {/* Soft vignette overlay so canvas merges seamlessly into pure black background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.65)_70%,rgba(0,0,0,0.98)_100%)] pointer-events-none" />
    </div>
  );
};

export default SignalSculpture;
