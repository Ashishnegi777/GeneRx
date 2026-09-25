import React, { useEffect, useRef } from 'react';

interface NetworkFieldProps {
  densityMultiplier?: number;
  opacity?: number;
  className?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Packet {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
}

export const NetworkField: React.FC<NetworkFieldProps> = ({
  densityMultiplier = 1,
  opacity = 1,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number = 0;
    let isVisible = true;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let lastPacketTime = performance.now();

    const resize = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      // Node count: ~70 desktop, ~35 mobile, scaled by densityMultiplier
      const isMobile = width < 768;
      const baseCount = isMobile ? 35 : 70;
      const targetCount = Math.round(baseCount * densityMultiplier);

      nodes = Array.from({ length: targetCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 1.5,
      }));
      packets = [];
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      mouseRef.current.targetX = (e.clientX - rect.left - centerX) * -0.02;
      mouseRef.current.targetY = (e.clientY - rect.top - centerY) * -0.02;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !prefersReducedMotion && !animId) {
            animId = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    resize();
    window.addEventListener('resize', resize);

    const render = (time: number) => {
      if (!isVisible) {
        animId = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse parallax interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      const offsetX = mouseRef.current.x;
      const offsetY = mouseRef.current.y;

      // Update & Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0) n.x = width;
          else if (n.x > width) n.x = 0;
          if (n.y < 0) n.y = height;
          else if (n.y > height) n.y = 0;
        }

        ctx.beginPath();
        ctx.arc(n.x + offsetX, n.y + offsetY, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 * opacity})`;
        ctx.fill();
      }

      // Track connected pairs for packet dispatch
      const connectedPairs: [number, number][] = [];

      // Draw connection lines
      const maxDist = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            connectedPairs.push([i, j]);
            const alpha = (1 - dist / maxDist) * 0.18 * opacity;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x + offsetX, nodes[i].y + offsetY);
            ctx.lineTo(nodes[j].x + offsetX, nodes[j].y + offsetY);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Trigger packet every ~2.5 to 3.5 seconds
      if (!prefersReducedMotion && time - lastPacketTime > 2600 && connectedPairs.length > 0) {
        const pair = connectedPairs[Math.floor(Math.random() * connectedPairs.length)];
        packets.push({
          fromIndex: pair[0],
          toIndex: pair[1],
          progress: 0,
          speed: 0.015 + Math.random() * 0.01,
        });
        lastPacketTime = time;
      }

      // Update and draw packets
      if (!prefersReducedMotion) {
        for (let p = packets.length - 1; p >= 0; p--) {
          const pkt = packets[p];
          pkt.progress += pkt.speed;
          if (pkt.progress >= 1) {
            packets.splice(p, 1);
            continue;
          }

          const nodeA = nodes[pkt.fromIndex];
          const nodeB = nodes[pkt.toIndex];
          if (!nodeA || !nodeB) {
            packets.splice(p, 1);
            continue;
          }

          const px = nodeA.x + (nodeB.x - nodeA.x) * pkt.progress + offsetX;
          const py = nodeA.y + (nodeB.y - nodeA.y) * pkt.progress + offsetY;

          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * opacity})`;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      render(0);
    } else {
      animId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [densityMultiplier, opacity]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      {/* Radial gradient mask: transparent center to black edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_60%,rgba(0,0,0,0.95)_100%)] pointer-events-none" />
    </div>
  );
};
