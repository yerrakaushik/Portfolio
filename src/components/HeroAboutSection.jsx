import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Home from '../Pages/Home';
import About from '../Pages/About';
import AvatarAnimation from './AvatarAnimation';

export default function HeroAboutSection() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth horizontal slide: starts right-center, ends left-center
  const canvasX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile ? ['0%', '0%', '0%'] : ['18vw', '0%', '-32vw']
  );

  const canvasScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile ? [0.85, 0.85, 0.85] : [1, 0.95, 0.9]
  );

  const canvasOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.85, 1],
    [0, 1, 1, 0.6]
  );

  return (
    <div ref={containerRef} className="relative" style={{ height: '200vh' }}>
      {/* Sticky avatar layer */}
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-10">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="absolute"
            style={{
              x: canvasX,
              scale: canvasScale,
              opacity: canvasOpacity,
              width: isMobile ? '280px' : '700px',
              height: isMobile ? '280px' : '700px',
            }}
          >
            <AvatarAnimation progress={scrollYProgress} />
          </motion.div>
        </div>
      </div>

      {/* Content layer — sits on top, pointer-events enabled */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-auto">
        <Home />
        <About />
      </div>
    </div>
  );
}
