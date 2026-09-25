import React, { useEffect, useRef } from 'react';

interface HeroSignalBackdropProps {
  className?: string;
  opacity?: number;
}

export const HeroSignalBackdrop: React.FC<HeroSignalBackdropProps> = ({
  className = '',
  opacity = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    let animId = 0;
    let isVisible = true;
    let isTabActive = true;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0, dpr = 1;
    let t = 0;              // master time (seconds-ish)
    let globalAngle = 0;   // slow global rotation

    // ─── Seeded LCG ──────────────────────────────────────────────────────────
    let _seed = 0x9e3779b9;
    const srng = () => {
      _seed ^= _seed << 13; _seed ^= _seed >> 17; _seed ^= _seed << 5;
      return (_seed >>> 0) / 0xffffffff;
    };
    const sreset = (s: number) => { _seed = s; };

    // ─── Strand (stores BASE geometry + per-strand animation params) ──────────
    interface Strand {
      // Base polar control points (relative to vortex center)
      p0a: number; p0r: number;   // start  angle / radius
      cp1a: number; cp1r: number; // ctrl-1 angle / radius
      cp2a: number; cp2r: number; // ctrl-2 angle / radius
      p3a: number; p3r: number;   // end    angle / radius

      // Per-strand animation
      flutterFreq: number;   // how fast this strand oscillates
      flutterPhase: number;  // unique phase offset
      flutterAmp: number;    // how much cp1r & cp2r oscillate (radial "curl")
      twistFreq: number;     // angular flutter frequency
      twistAmp: number;      // angular flutter amplitude (radians)

      // Radial pulse sensitivity — how much this strand responds to wave
      pulseWeight: number;   // 0–1
      baseRadius: number;    // the "rest" end-radius (for pulse scaling)

      // Visual
      width: number;
      baseAlpha: number;
      isHighlight: boolean;
      isLight: boolean;
      depth: number;
    }

    let strands: Strand[] = [];

    function buildStrands(w: number, h: number) {
      sreset(0xdeadbeef);
      strands = [];

      const isMobile = w < 768;
      const total    = isMobile ? 800 : 1600;
      const LOBES    = 9;
      const maxR     = Math.min(w, h) * (isMobile ? 0.33 : 0.37);
      const innerR   = maxR * 0.17;

      for (let i = 0; i < total; i++) {
        const u        = i / total;
        const lobeIdx  = Math.floor(u * LOBES);
        const lobeU    = u * LOBES - lobeIdx;
        const lobeAng  = (lobeIdx / LOBES) * Math.PI * 2;
        const lobeSep  = Math.PI * 2 / LOBES;

        const p0r = innerR * (0.65 + srng() * 0.7);
        const p0a = lobeAng + (srng() - 0.5) * lobeSep * 0.85;

        const endDrift = (lobeU - 0.5) * lobeSep * 1.45;
        const p3a = lobeAng + endDrift + (srng() - 0.5) * 0.28;
        const petalMod = 0.80 + 0.24 * Math.abs(Math.cos(LOBES * p3a / 2));
        const p3r = maxR * petalMod * (0.68 + srng() * 0.48);

        const swirl  = 1.3 + srng() * 0.9;
        const cp1a   = p0a + swirl * lobeSep * (srng() > 0.5 ? 1 : -1);
        const cp1r   = p0r * (1.9 + srng() * 1.6);
        const cp2a   = p3a - swirl * 0.22 + (srng() - 0.5) * 0.45;
        const cp2r   = p3r * (0.52 + srng() * 0.42);

        const rand        = srng();
        const isHighlight = rand > 0.88;
        const isLight     = rand > 0.70 && !isHighlight;
        const depth       = srng();

        strands.push({
          p0a, p0r, cp1a, cp1r, cp2a, cp2r, p3a, p3r,
          // Per-strand animation — give each its own personality
          flutterFreq:  0.4 + srng() * 1.8,
          flutterPhase: srng() * Math.PI * 2,
          flutterAmp:   cp1r * (0.06 + srng() * 0.14),  // radial curl oscillation
          twistFreq:    0.3 + srng() * 1.4,
          twistAmp:     0.04 + srng() * 0.12,            // angular flutter
          pulseWeight:  0.2 + srng() * 0.8,
          baseRadius:   p3r,
          width:     0.45 + srng() * (isHighlight ? 0.85 : 1.35),
          baseAlpha: isHighlight ? (0.35 + srng() * 0.55) : (0.10 + srng() * 0.22),
          isHighlight, isLight, depth,
        });
      }

      strands.sort((a, b) => a.depth - b.depth);
    }

    // ─── Resize ───────────────────────────────────────────────────────────────
    function resize() {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      W = rect.width; H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
      buildStrands(W, H);
    }

    resize();
    window.addEventListener('resize', resize);

    // ─── Mouse ────────────────────────────────────────────────────────────────
    const onMouse = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouseRef.current.tx = ((e.clientX - r.left) / W - 0.5) * 30;
      mouseRef.current.ty = ((e.clientY - r.top)  / H - 0.5) * 20;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    // ─── Visibility ───────────────────────────────────────────────────────────
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        isVisible = e.isIntersecting;
        if (isVisible && isTabActive && !animId) animId = requestAnimationFrame(render);
      });
    }, { threshold: 0.05 });
    io.observe(container);

    const onViz = () => {
      isTabActive = document.visibilityState === 'visible';
      if (isVisible && isTabActive && !animId) animId = requestAnimationFrame(render);
    };
    document.addEventListener('visibilitychange', onViz);

    // ─── Polar → Cartesian ────────────────────────────────────────────────────
    const p2c = (ocx: number, ocy: number, angle: number, radius: number, rot: number) => ({
      x: ocx + Math.cos(angle + rot) * radius,
      y: ocy + Math.sin(angle + rot) * radius,
    });

    // ─── RENDER ───────────────────────────────────────────────────────────────
    function render() {
      if (!isVisible || !isTabActive) { animId = 0; return; }

      const m = mouseRef.current;
      m.x += (m.tx - m.x) * 0.05;
      m.y += (m.ty - m.y) * 0.05;

      if (!prefersReducedMotion) {
        t           += 0.016;    // ~60 fps → 1 t-unit per second
        globalAngle += 0.00035;  // ~21°/min slow rotation
      }

      // Macro breathe — whole vortex slowly inhales / exhales
      const breatheScale = 1 + Math.sin(t * 0.38) * 0.022;
      // Pulse wave: expands radially from center every ~4s
      const pulseCycle   = (t * 0.25) % 1;          // 0→1 over 4s
      const pulseRadius  = pulseCycle;               // 0→1 (normalised)
      const pulseStrength= Math.sin(pulseCycle * Math.PI) * 0.055; // bell-shaped

      const cx = W / 2 + m.x;
      const cy = H / 2 + m.y;
      const maxR = Math.min(W, H) * (W < 768 ? 0.33 : 0.37);
      const coreR = maxR * breatheScale * 0.17;

      // ── Background ───────────────────────────────────────────────────────
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);

      // Deep purple-black ambient glow at center
      const amb = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 1.1);
      amb.addColorStop(0,   'rgba(16, 10, 28, 0.92)');
      amb.addColorStop(0.55,'rgba(5,  3, 12, 0.96)');
      amb.addColorStop(1,   'rgba(0,  0,  0, 1.0)');
      ctx.fillStyle = amb;
      ctx.fillRect(0, 0, W, H);

      // ── Strands ──────────────────────────────────────────────────────────
      ctx.save();
      for (const s of strands) {

        // --- Per-strand live animation ---

        // 1. Radial flutter on cp1r (makes strands curl in/out)
        const flutter  = Math.sin(t * s.flutterFreq + s.flutterPhase);
        const animCp1r = s.cp1r + flutter * s.flutterAmp;

        // 2. Angular twist on cp1a & cp2a (writhes like hair)
        const twist    = Math.sin(t * s.twistFreq + s.flutterPhase * 0.7);
        const animCp1a = s.cp1a + twist * s.twistAmp;
        const animCp2a = s.cp2a - twist * s.twistAmp * 0.6;

        // 3. End-radius pulse — ripple wave moves from inner→outer ring
        // Strands near the pulse front get boosted, rest get a slight squeeze
        const strandNormR = s.baseRadius / maxR; // 0–1
        const pulseDist   = Math.abs(strandNormR - pulseRadius);
        const pulseFactor = 1 + pulseStrength * s.pulseWeight * Math.exp(-pulseDist * 14);
        const animP3r     = s.p3r * breatheScale * pulseFactor;

        // 4. Subtle slow secondary wobble on start radius
        const wobble  = Math.sin(t * 0.22 + s.flutterPhase * 1.3) * 0.012;
        const animP0r = s.p0r * (1 + wobble);

        // Convert to cartesian with global rotation
        const rot = globalAngle;
        const p0  = p2c(cx, cy, s.p0a,   animP0r,              rot);
        const cp1 = p2c(cx, cy, animCp1a, animCp1r,            rot);
        const cp2 = p2c(cx, cy, animCp2a, s.cp2r * breatheScale, rot);
        const p3  = p2c(cx, cy, s.p3a,   animP3r,              rot);

        // --- Per-strand alpha pulse tied to flutter ---
        const alphaMod = 1 + flutter * 0.18;
        const alpha    = Math.min(1, s.baseAlpha * alphaMod);

        // --- Color ---
        let color: string;
        if (s.isHighlight) {
          // Bright specular filament — pure steel white
          color = `rgba(215,222,238,${alpha.toFixed(3)})`;
        } else if (s.isLight) {
          // Mid-tone graphite-steel
          color = `rgba(70,82,108,${alpha.toFixed(3)})`;
        } else {
          // Dark base — warm or cool depending on depth
          color = s.depth > 0.58
            ? `rgba(36,26,18,${alpha.toFixed(3)})`   // warm graphite
            : `rgba(20,22,32,${alpha.toFixed(3)})`;  // cool graphite
        }

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, p3.x, p3.y);
        ctx.strokeStyle = color;
        ctx.lineWidth   = s.width;
        ctx.lineCap     = 'round';
        ctx.stroke();
      }
      ctx.restore();

      // ── Pulse ring — visible wave crest radiating from core ───────────────
      if (!prefersReducedMotion && pulseStrength > 0.003) {
        const ringR    = pulseRadius * maxR * breatheScale;
        const ringAlpha= Math.sin(pulseCycle * Math.PI) * 0.12;
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(180,195,220,${ringAlpha.toFixed(3)})`;
        ctx.lineWidth   = 0.8;
        ctx.stroke();
      }

      // ── Inner shadow well (pulls strands into core) ───────────────────────
      const well = ctx.createRadialGradient(cx, cy, coreR * 0.4, cx, cy, coreR * 3.8);
      well.addColorStop(0,   'rgba(0,0,0,0.95)');
      well.addColorStop(0.45,'rgba(0,0,0,0.60)');
      well.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = well;
      ctx.fillRect(0, 0, W, H);

      // ── Glossy core ───────────────────────────────────────────────────────
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,1)';
      ctx.shadowBlur  = 44;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR + 5, 0, Math.PI * 2);
      ctx.fillStyle = '#000';
      ctx.fill();
      ctx.restore();

      // Core gradient body
      const cGrad = ctx.createRadialGradient(
        cx - coreR * 0.3, cy - coreR * 0.3, coreR * 0.04,
        cx, cy, coreR,
      );
      cGrad.addColorStop(0,    '#1c1e2c');
      cGrad.addColorStop(0.38, '#0a0b12');
      cGrad.addColorStop(0.78, '#040508');
      cGrad.addColorStop(1,    '#000000');
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fillStyle = cGrad;
      ctx.fill();

      // Rim stroke
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(145,158,190,0.16)';
      ctx.lineWidth   = 1;
      ctx.stroke();

      // Specular — mouse-reactive position
      ctx.save();
      ctx.beginPath();
      const hx = cx - coreR * 0.28 + m.x * 0.09;
      const hy = cy - coreR * 0.28 + m.y * 0.09;
      ctx.ellipse(hx, hy, coreR * 0.46, coreR * 0.16, -Math.PI / 4.1, 0, Math.PI * 2);
      const spec = ctx.createLinearGradient(hx - coreR * 0.3, hy - 0.3 * coreR, hx + 0.2 * coreR, hy + 0.2 * coreR);
      spec.addColorStop(0,    'rgba(255,255,255,0.80)');
      spec.addColorStop(0.45, 'rgba(220,232,252,0.30)');
      spec.addColorStop(1,    'rgba(255,255,255,0)');
      ctx.fillStyle = spec;
      ctx.fill();

      // Blue rim crescent
      ctx.beginPath();
      ctx.arc(cx, cy, coreR - 1.5, Math.PI * 0.07, Math.PI * 0.60);
      ctx.strokeStyle = 'rgba(75,108,160,0.24)';
      ctx.lineWidth   = 1.4;
      ctx.stroke();
      ctx.restore();

      // ── Outer vignette to black ───────────────────────────────────────────
      const vig = ctx.createRadialGradient(cx, cy, maxR * breatheScale * 0.68, cx, cy, Math.max(W, H) * 0.84);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      if (!prefersReducedMotion) animId = requestAnimationFrame(render);
    }

    if (prefersReducedMotion) render();
    else animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      io.disconnect();
      document.removeEventListener('visibilitychange', onViz);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden select-none ${className}`}
      style={{ opacity }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};

export default HeroSignalBackdrop;
