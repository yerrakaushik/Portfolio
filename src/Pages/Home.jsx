import React, { useState, useEffect, memo } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, Code2, Briefcase } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Spline from "@splinetool/react-spline";



// Typewriter effect component
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
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group relative p-3 rounded-full border transition-all duration-300 hover:scale-105"
    style={{ borderColor: "var(--border-color)", background: "var(--card-bg)" }}
    aria-label={label}
  >
    <Icon className="w-5 h-5 transition-colors duration-300 group-hover:text-[var(--primary)] text-[var(--text-secondary)]" />
  </a>
);

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 100]);
  const yAvatar = useTransform(scrollY, [0, 500], [0, -50]);

  useEffect(() => { setIsLoaded(true); }, []);

  const roles = [
    "Full Stack Developer",
    "Freelancer",
    "Tech Innovator"
  ];

  return (
    <div
      className="min-h-screen overflow-hidden relative"
      id="Home"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[10%] pt-32 pb-20">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
          
          {/* Left column - Text Content */}
          <motion.div
            style={{ y: yText }}
            className="w-full lg:w-[55%] space-y-8 text-left order-2 lg:order-1 mt-12 lg:mt-0"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm bg-white"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                Available for Projects & Internships
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                Crafting digital <br />
                experiences as a <br />
                <TypeWriter words={roles} />
              </h1>
              
              <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-xl leading-relaxed">
                I bridge the gap between design and technical implementation, creating robust cloud solutions and intuitive frontend interfaces.
              </p>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white" style={{ borderColor: "var(--border-color)" }}>
                <Code2 className="w-4 h-4 text-[var(--primary)]" />
                <span className="font-medium text-sm text-[var(--text-primary)]">Student</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white" style={{ borderColor: "var(--border-color)" }}>
                <Briefcase className="w-4 h-4 text-[var(--secondary)]" />
                <span className="font-medium text-sm text-[var(--text-primary)]">Freelancer</span>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <a href="#Contact">
                <button
                  className="px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 text-white"
                  style={{ background: "var(--primary)" }}
                >
                  Start a Project
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </a>
              
              <div className="flex items-center gap-3 ml-4">
                <SocialLink icon={Github} href="https://github.com/KaushikYerra" label="GitHub" />
                <SocialLink icon={Linkedin} href="https://linkedin.com/in/kaushikyerra" label="LinkedIn" />
                <SocialLink icon={Mail} href="mailto:kaushik.yerra@example.com" label="Email" />
              </div>
            </motion.div>
          </motion.div>

        {/* Right column - Avatar Space */}
          <motion.div
            style={{ y: yAvatar }}
            className="w-full lg:w-[45%] order-1 lg:order-2 flex items-center justify-center relative min-h-[400px]"
          >
            {/* The avatar canvas will be rendered here by the parent wrapper */}
          </motion.div>

        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest font-semibold text-[var(--text-secondary)]">Scroll</span>
        <div className="w-[1px] h-12 bg-gray-200 relative overflow-hidden">
          <div className="w-full h-1/2 bg-[var(--primary)] absolute top-0 left-0 animate-scroll-indicator" />
        </div>
      </motion.div>
      
    </div>
  );
};

export default memo(Home);
