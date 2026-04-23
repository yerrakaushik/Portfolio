import React, { useState, useEffect, memo, useRef } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, Code2, Briefcase } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

const TypeWriter = ({ words }) => {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (isTyping) {
      if (charIdx < word.length) {
        timeout = setTimeout(() => {
          setText((prev) => prev + word[charIdx]);
          setCharIdx(charIdx + 1);
        }, 80);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setText((prev) => prev.slice(0, -1));
          setCharIdx(charIdx - 1);
        }, 40);
      } else {
        setIsTyping(true);
        setWordIdx((prev) => (prev + 1) % words.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIdx, isTyping, wordIdx, words]);

  return (
    <span className="inline-block relative">
      <span className="text-[var(--primary)] font-bold">{text}</span>
      <span className="absolute -right-2 top-0 bottom-0 w-1 bg-[var(--primary)] animate-pulse" />
    </span>
  );
};

const SocialLink = ({ icon: Icon, href, label }) => (
  <motion.a
    whileHover={{ y: -5, scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group relative p-4 rounded-2xl border transition-all duration-300 backdrop-blur-sm"
    style={{ borderColor: "rgba(0,0,0,0.1)", background: "rgba(255,255,255,0.8)" }}
    aria-label={label}
  >
    <Icon className="w-5 h-5 transition-colors duration-300 group-hover:text-[var(--primary)] text-gray-500" />
  </motion.a>
);

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  
  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [-300, 300], [10, -10]);
  const rotateY = useTransform(springX, [-300, 300], [-10, 10]);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const roles = ["Full Stack Developer", "Freelancer", "Tech Innovator"];

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden flex items-center justify-center py-20" id="Home">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
          
          {/* Left column - Text Content */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="w-full lg:w-[60%] space-y-10 text-left order-2 lg:order-1 mt-16 lg:mt-0 perspective-1000"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl border shadow-xl bg-white/90 backdrop-blur-md"
              style={{ borderColor: "rgba(0,0,0,0.05)", transform: "translateZ(50px)" }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Available for New Challenges
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-6" style={{ transform: "translateZ(80px)" }}>
              <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black leading-[0.9] tracking-tight uppercase">
                Digital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-blue-400">Architect</span>
              </h1>
              
              <div className="flex flex-col gap-4">
                <p className="text-xl sm:text-2xl text-gray-500 font-medium max-w-xl leading-relaxed">
                  Building the future with <br />
                  <TypeWriter words={roles} />
                </p>
              </div>
            </div>

            {/* Badges/Info */}
            <div className="flex flex-wrap gap-6" style={{ transform: "translateZ(40px)" }}>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Specialization</p>
                <p className="font-bold text-lg">Cloud Infrastructure</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Experience</p>
                <p className="font-bold text-lg">2+ Years Active</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-6 pt-8" style={{ transform: "translateZ(60px)" }}>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#Contact"
              >
                <button
                  className="px-10 py-5 rounded-2xl font-black uppercase tracking-tighter flex items-center justify-center gap-3 transition-shadow hover:shadow-[0_20px_50px_rgba(0,85,255,0.3)] text-white"
                  style={{ background: "var(--primary)" }}
                >
                  Contact Me
                  <ArrowUpRight className="w-6 h-6" />
                </button>
              </motion.a>
              
              <div className="flex items-center gap-4">
                <SocialLink icon={Github} href="https://github.com/yerrakaushik" label="GitHub" />
                <SocialLink icon={Linkedin} href="https://linkedin.com/in/kaushikyerra" label="LinkedIn" />
              </div>
            </div>
          </motion.div>

          {/* Right column - Reserved for Avatar */}
          <div className="w-full lg:w-[40%] order-1 lg:order-2 min-h-[500px]" />

        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-12 flex flex-col items-center gap-4"
      >
        <div className="w-px h-24 bg-gradient-to-b from-[var(--primary)] to-transparent opacity-50" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] rotate-180 [writing-mode:vertical-lr] text-gray-400">Explore</span>
      </motion.div>
    </div>
  );
};

export default memo(Home);
