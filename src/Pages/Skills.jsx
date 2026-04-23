import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Code, Layout, Database, Server, Smartphone, Globe, Cloud, Cpu, Terminal, Palette, MonitorPlay, Component } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const skillItems = [
  { label: "React", icon: Code, color: "#61dafb" },
  { label: "Node.js", icon: Server, color: "#68a063" },
  { label: "TypeScript", icon: FileCode2, color: "#3178c6" },
  { label: "Tailwind CSS", icon: Palette, color: "#06b6d4" },
  { label: "Next.js", icon: Globe, color: "#000000" },
  { label: "Firebase", icon: Database, color: "#ffca28" },
  { label: "AWS", icon: Cloud, color: "#ff9900" },
  { label: "MongoDB", icon: Database, color: "#47a248" },
  { label: "PostgreSQL", icon: Database, color: "#336791" },
  { label: "Express.js", icon: Server, color: "#000000" },
  { label: "Docker", icon: Cpu, color: "#2496ed" },
  { label: "Git", icon: Terminal, color: "#f05032" },
  { label: "Figma", icon: Component, color: "#f24e1e" },
  { label: "Framer Motion", icon: MonitorPlay, color: "#0055ff" },
];

function FileCode2(props) {
  return <Code {...props} />;
}

const RoamingBadge = ({ item, containerWidth, containerHeight }) => {
  const controls = useAnimation();
  const badgeRef = useRef(null);

  // Randomize initial position
  const [position, setPosition] = useState({
    x: Math.random() * (containerWidth - 150),
    y: Math.random() * (containerHeight - 50),
  });

  // Start continuous slow roaming
  useEffect(() => {
    if (!containerWidth || !containerHeight) return;

    const floatAround = async () => {
      while (true) {
        const nextX = Math.random() * (containerWidth - 150);
        const nextY = Math.random() * (containerHeight - 50);
        
        await controls.start({
          x: nextX,
          y: nextY,
          transition: { duration: 10 + Math.random() * 10, ease: "linear" }
        });
      }
    };

    floatAround();
  }, [containerWidth, containerHeight, controls]);

  // Jump away on hover
  const handleHover = () => {
    controls.stop();
    const jumpX = Math.random() * (containerWidth - 150);
    const jumpY = Math.random() * (containerHeight - 50);
    
    controls.start({
      x: jumpX,
      y: jumpY,
      scale: [1, 1.2, 1],
      transition: { duration: 0.6, type: "spring", stiffness: 300, damping: 15 }
    });
  };

  return (
    <motion.div
      ref={badgeRef}
      animate={controls}
      initial={{ x: position.x, y: position.y }}
      onHoverStart={handleHover}
      onTouchStart={handleHover}
      className="absolute flex items-center gap-2 px-4 py-2 rounded-full border bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      style={{
        borderColor: "var(--border-color)",
      }}
    >
      <item.icon className="w-5 h-5" style={{ color: item.color }} />
      <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{item.label}</span>
    </motion.div>
  );
};

export default function Skills() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    AOS.init({ once: true });
    
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div id="Skills" className="py-20 relative w-full overflow-hidden bg-gray-50 border-y" style={{ borderColor: "var(--border-color)" }}>
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-5 bg-grid-pattern pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>
              Tech Stack
            </h2>
            <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-[var(--primary)]" />
            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-lg font-medium" style={{ color: "var(--text-secondary)" }}>
              Hover or touch the skills to see them jump! Interactive tools representing my expertise.
            </p>
          </motion.div>
        </div>

        {/* Roaming Area */}
        <div 
          ref={containerRef} 
          className="relative w-full h-[500px] rounded-3xl border bg-white overflow-hidden shadow-inner"
          style={{ borderColor: "var(--border-color)" }}
        >
          {dimensions.width > 0 && skillItems.map((item, index) => (
            <RoamingBadge 
              key={index} 
              item={item} 
              containerWidth={dimensions.width} 
              containerHeight={dimensions.height} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
