import React, { useState, useEffect, useRef, memo } from "react";
import { motion, useAnimation } from "framer-motion";
import { 
  Code, Server, Globe, Palette, Cloud, Database, Cpu, Terminal, 
  Component, MonitorPlay, Layers, Layout, Smartphone, PenTool 
} from "lucide-react";

const skillItems = [
  { label: "React", icon: Code, color: "#61dafb" },
  { label: "Node.js", icon: Server, color: "#68a063" },
  { label: "TypeScript", icon: Code, color: "#3178c6" },
  { label: "Tailwind CSS", icon: Palette, color: "#06b6d4" },
  { label: "Next.js", icon: Globe, color: "#ffffff" },
  { label: "Firebase", icon: Database, color: "#ffca28" },
  { label: "AWS", icon: Cloud, color: "#ff9900" },
  { label: "MongoDB", icon: Database, color: "#47a248" },
  { label: "PostgreSQL", icon: Database, color: "#336791" },
  { label: "Docker", icon: Cpu, color: "#2496ed" },
  { label: "Git", icon: Terminal, color: "#f05032" },
  { label: "Figma", icon: PenTool, color: "#f24e1e" },
  { label: "Framer Motion", icon: MonitorPlay, color: "#0055ff" },
  { label: "GSAP", icon: Layers, color: "#88ce02" },
];

const CubeSkill = ({ item, containerDimensions }) => {
  const controls = useAnimation();
  const [position, setPosition] = useState({
    x: Math.random() * (containerDimensions.width - 100),
    y: Math.random() * (containerDimensions.height - 100),
    z: Math.random() * -200,
  });

  useEffect(() => {
    if (!containerDimensions.width) return;

    const roaming = async () => {
      while (true) {
        await controls.start({
          x: Math.random() * (containerDimensions.width - 100),
          y: Math.random() * (containerDimensions.height - 100),
          rotateX: [0, 360],
          rotateY: [0, 360],
          transition: { 
            duration: 15 + Math.random() * 10, 
            ease: "linear" 
          }
        });
      }
    };
    roaming();
  }, [containerDimensions, controls]);

  return (
    <motion.div
      animate={controls}
      initial={{ x: position.x, y: position.y, z: position.z }}
      className="absolute perspective-1000 group cursor-grab active:cursor-grabbing"
      style={{ preserve3d: "true" }}
    >
      <div className="relative w-20 h-20 transition-transform duration-500 preserve-3d group-hover:scale-125">
        {/* 3D Cube Faces */}
        {[
          "rotateY(0deg) translateZ(40px)",    // Front
          "rotateY(180deg) translateZ(40px)",  // Back
          "rotateY(90deg) translateZ(40px)",   // Right
          "rotateY(-90deg) translateZ(40px)",  // Left
          "rotateX(90deg) translateZ(40px)",   // Top
          "rotateX(-90deg) translateZ(40px)",  // Bottom
        ].map((transform, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center border bg-white/80 backdrop-blur-sm rounded-lg"
            style={{ 
              transform, 
              borderColor: "rgba(0,0,0,0.1)",
              boxShadow: "inset 0 0 15px rgba(0,0,0,0.05)"
            }}
          >
            {i === 0 && (
              <div className="flex flex-col items-center gap-1">
                <item.icon className="w-8 h-8" style={{ color: item.color }} />
                <span className="text-[8px] font-bold uppercase tracking-tighter opacity-50">{item.label}</span>
              </div>
            )}
            {i !== 0 && (
              <div className="w-4 h-4 rounded-full opacity-20" style={{ background: item.color }} />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div id="Skills" className="min-h-screen py-24 relative overflow-hidden bg-white">
      {/* 3D Space Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--primary)] opacity-5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Mastery<span className="text-[var(--primary)]">.</span>
          </motion.h2>
          <p className="max-w-2xl mx-auto text-xl font-medium text-gray-500 uppercase tracking-widest">
            A 3D Interactive Ecosystem of Technical Expertise
          </p>
        </div>

        {/* Floating 3D Cube Field */}
        <div 
          ref={containerRef} 
          className="relative w-full h-[600px] perspective-2000"
          style={{ transformStyle: "preserve-3d" }}
        >
          {dimensions.width > 0 && skillItems.map((item, index) => (
            <CubeSkill 
              key={index} 
              item={item} 
              containerDimensions={dimensions} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
