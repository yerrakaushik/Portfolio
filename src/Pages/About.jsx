import React, { useEffect, memo, useRef } from "react";
import { FileText, Code, Award, Globe, ArrowUpRight, ShieldCheck, Zap } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const StatCard = ({ icon: Icon, color, value, label, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x);
  const mouseY = useSpring(y);
  const rotateX = useTransform(mouseY, [-100, 100], [15, -15]);
  const rotateY = useTransform(mouseX, [-100, 100], [-15, 15]);

  function onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = (mouseXPos / width - 0.5) * 200;
    const yPct = (mouseYPos / height - 0.5) * 200;
    x.set(xPct);
    y.set(yPct);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative flex flex-col gap-3 p-8 rounded-3xl border bg-white/80 backdrop-blur-md shadow-sm transition-shadow hover:shadow-2xl perspective-1000"
    >
      <div 
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2"
        style={{ backgroundColor: `${color}15`, color: color, transform: "translateZ(30px)" }}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div style={{ transform: "translateZ(50px)" }}>
        <h4 className="text-4xl font-black tracking-tighter" style={{ color: "var(--text-primary)" }}>{value}</h4>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">{label}</p>
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <div className="min-h-screen py-32 relative overflow-hidden bg-white" id="About">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Left Column - Space for Avatar (Managed by parent) */}
          <div className="w-full lg:w-[40%] min-h-[500px]" />

          {/* Right Column - Content */}
          <div className="w-full lg:w-[60%] space-y-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[var(--primary)] text-xs font-bold uppercase tracking-widest"
              >
                Philosophy
              </motion.div>
              
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-black tracking-tighter leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                Designing with <br />
                <span className="text-[var(--primary)]">Precision</span>, <br />
                Building for <br />
                <span className="text-[var(--secondary)]">Impact</span>.
              </motion.h3>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-500 text-lg leading-relaxed max-w-2xl font-medium"
              >
                I am a technical visionary specializing in the intersection of high-fidelity design and cloud-native architecture. My approach combines the aesthetic rigour of modern UI with the robust performance of scalable backend systems.
              </motion.p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <StatCard icon={Code} color="#0055FF" value="2+" label="Years of Dev" index={0} />
              <StatCard icon={Award} color="#FF6B00" value="15+" label="Projects Built" index={1} />
              <StatCard icon={ShieldCheck} color="#10B981" value="Secure" label="Cloud Infrastructure" index={2} />
              <StatCard icon={Zap} color="#8B5CF6" value="Fast" label="Performance First" index={3} />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              <button 
                className="px-10 py-5 rounded-2xl font-black uppercase tracking-tighter flex items-center gap-3 bg-black text-white hover:bg-gray-900 transition-colors shadow-2xl"
              >
                Get Full Resume
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(About);
