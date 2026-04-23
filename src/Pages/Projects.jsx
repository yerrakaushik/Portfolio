import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardProject from "../components/CardProject";
import { ChevronDown, ChevronUp } from "lucide-react";
import { projects as localProjects } from "../data/projects.js";

const ToggleButton = ({ onClick, isShowingMore }) => (
  <div className="flex justify-center mt-16">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex items-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest bg-white border border-gray-100 shadow-2xl transition-all"
    >
      {isShowingMore ? "Collapse Grid" : "Expand Grid"}
      {isShowingMore ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
    </motion.button>
  </div>
);

export default function Projects() {
  const [projects] = useState(localProjects);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);

  return (
    <div className="min-h-screen py-32 relative bg-white overflow-hidden" id="Projects">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-50 opacity-50 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-blue-50 opacity-50 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6"
          >
            Showcase<span className="text-[var(--primary)]">.</span>
          </motion.h2>
          <p className="max-w-2xl mx-auto text-xl font-medium text-gray-500 uppercase tracking-widest">
            A Curated Selection of High-Impact Technical Solutions
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={showAllProjects ? "all" : "limited"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {displayedProjects.map((project, i) => (
              <motion.div
                key={project.id || i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.8 }}
              >
                <CardProject
                  Img={project.Img}
                  Title={project.Title}
                  Description={project.Description}
                  Link={project.Link}
                  id={project.id}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {projects.length > initialItems && (
          <ToggleButton
            onClick={() => setShowAllProjects(p => !p)}
            isShowingMore={showAllProjects}
          />
        )}
      </div>
    </div>
  );
}
