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
    offset: ["start start", "end end"]
  });

  // Desktop: move from right (approx 55% of width) to left (approx 10% of width)
  // Mobile: stay mostly centered
  const canvasX = useTransform(
    scrollYProgress, 
    [0, 1], 
    isMobile ? ["0%", "0%"] : ["25vw", "-35vw"]
  );

  const canvasY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0vh", "20vh"] : ["0vh", "0vh"]
  );

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center mix-blend-multiply">
           <motion.div 
             className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[800px] lg:h-[800px] absolute"
             style={{ 
               x: canvasX,
               y: canvasY
             }}
           >
             <AvatarAnimation progress={scrollYProgress} />
           </motion.div>
        </div>
      </div>
      
      <div className="relative z-20 pointer-events-auto">
        <Home />
        <About />
      </div>
    </div>
  );
}
