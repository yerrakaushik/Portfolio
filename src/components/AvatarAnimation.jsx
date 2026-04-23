import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useMotionValueEvent } from 'framer-motion';

const frameCount = 240;
const currentFrame = (index) =>
  `/avatra/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

export default function AvatarAnimation({ progress }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const currentFrameRef = useRef(0);

  useEffect(() => {
    let loadedCount = 0;
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) setLoaded(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) setLoaded(true);
      };
      imagesRef.current[i - 1] = img;
    }
  }, []);

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    const imgW = img.naturalWidth || 1280;
    const imgH = img.naturalHeight || 720;
    canvas.width = imgW;
    canvas.height = imgH;
    ctx.clearRect(0, 0, imgW, imgH);
    ctx.drawImage(img, 0, 0, imgW, imgH);
  }, []);

  useEffect(() => {
    if (loaded) drawFrame(0);
  }, [loaded, drawFrame]);

  useMotionValueEvent(progress, 'change', (latest) => {
    if (!loaded) return;
    const frameIndex = Math.min(frameCount - 1, Math.max(0, Math.floor(latest * frameCount)));
    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      drawFrame(frameIndex);
    }
  });

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
          <div className="w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            Loading avatar... {loadProgress}%
          </span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
      />
    </div>
  );
}
