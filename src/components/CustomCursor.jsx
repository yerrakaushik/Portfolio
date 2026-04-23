import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring config for the outer geometric shape
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Rotation value for the geometric shape
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let lastTime = performance.now();
    let lastX = cursorX.get();
    let lastY = cursorY.get();

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const currentTime = performance.now();
      const dt = currentTime - lastTime;
      if (dt > 0) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const speed = Math.sqrt(dx * dx + dy * dy) / dt;
        setRotation((prev) => prev + speed * 15);
      }
      
      lastTime = currentTime;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseOver = (e) => {
      const isClickable = window.getComputedStyle(e.target).cursor === "pointer" || 
                          e.target.tagName.toLowerCase() === "a" || 
                          e.target.tagName.toLowerCase() === "button";
      setIsHovering(isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Dot config
  const dotSize = 8;
  const shapeSize = 40;

  return (
    <>
      {/* Outer Geometric Shape */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            rotate: rotation,
            scale: isHovering ? 1.5 : 1,
            borderRadius: isHovering ? "50%" : "20%",
          }}
          transition={{
            rotate: { type: "tween", ease: "linear", duration: 0.1 },
            scale: { type: "spring", stiffness: 300, damping: 20 },
            borderRadius: { duration: 0.2 }
          }}
          style={{
            width: shapeSize,
            height: shapeSize,
            border: "2px solid var(--primary)",
            backgroundColor: isHovering ? "rgba(37, 99, 235, 0.05)" : "transparent",
            boxSizing: "border-box"
          }}
        />
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block rounded-full bg-[var(--primary)]"
        style={{
          width: dotSize,
          height: dotSize,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
};

export default CustomCursor;
