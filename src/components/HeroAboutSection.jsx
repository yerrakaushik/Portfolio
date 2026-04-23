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
    isMobile ? [0.85, 0.85, 0.85] : [1.1, 1, 0.9]
  );

  const canvasRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 5, -5]
  );

  const canvasZ = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [100, 0, -100]
  );

  const canvasOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.85, 1],
    [0, 1, 1, 0.6]
  );

  return (
    <div ref={containerRef} className="relative bg-white" style={{ height: '200vh' }}>
      {/* Decorative 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-24 w-80 h-80 bg-orange-100/50 rounded-full blur-3xl" 
        />
      </div>

      {/* Sticky avatar layer */}
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-10 perspective-2000">
        <div className="absolute inset-0 flex items-center justify-center preserve-3d">
          <motion.div
            className="absolute"
            style={{
              x: canvasX,
              z: canvasZ,
              rotateY: canvasRotate,
              scale: canvasScale,
              opacity: canvasOpacity,
              width: isMobile ? '300px' : '850px',
              height: isMobile ? '300px' : '850px',
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

