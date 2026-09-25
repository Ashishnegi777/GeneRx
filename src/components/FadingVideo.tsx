import React, { useEffect, useRef, useState, useCallback } from 'react';

interface FadingVideoProps {
  src: string | string[];
  className?: string;
  style?: React.CSSProperties;
  poster?: string;
}

export const FadingVideo: React.FC<FadingVideoProps> = ({
  src,
  className = '',
  style = {},
  poster,
}) => {
  const sources = Array.isArray(src) ? src : [src];
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSrc = sources[currentIndex % sources.length];

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isFadingOutRef = useRef(false);
  const animFrameRef = useRef<number>(0);

  const fadeIn = useCallback((duration = 500) => {
    const video = videoRef.current;
    if (!video) return;

    cancelAnimationFrame(animFrameRef.current);
    isFadingOutRef.current = false;
    let start: number | null = null;
    const initialOpacity = parseFloat(video.style.opacity || '0');
    const targetOpacity = 1;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const currentVal = initialOpacity + (targetOpacity - initialOpacity) * progress;
      video.style.opacity = currentVal.toString();

      if (progress < 1 && !isFadingOutRef.current) {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  const fadeOut = useCallback((duration = 550) => {
    const video = videoRef.current;
    if (!video || isFadingOutRef.current) return;

    cancelAnimationFrame(animFrameRef.current);
    isFadingOutRef.current = true;
    let start: number | null = null;
    const initialOpacity = parseFloat(video.style.opacity || '1');
    const targetOpacity = 0;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const currentVal = initialOpacity + (targetOpacity - initialOpacity) * progress;
      video.style.opacity = currentVal.toString();

      if (progress < 1 && isFadingOutRef.current) {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  const handleLoadedData = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
    fadeIn(500);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const remainingTime = video.duration - video.currentTime;
    if (remainingTime <= 0.55 && !isFadingOutRef.current) {
      fadeOut(550);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    if (sources.length === 1) {
      video.currentTime = 0;
      video.play().catch(() => {});
      fadeIn(500);
    } else {
      setCurrentIndex((prev) => (prev + 1) % sources.length);
    }
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      key={currentSrc}
      src={currentSrc}
      poster={poster}
      className={className}
      style={{
        opacity: 0,
        ...style,
      }}
      autoPlay
      muted
      playsInline
      preload="auto"
      onLoadedData={handleLoadedData}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
    />
  );
};
