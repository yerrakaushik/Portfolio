import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardProject from "../components/CardProject";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import { projects as localProjects } from "../data/projects.js";

// ── Toggle Button ─────────────────────────────────────────────────────
const ToggleButton = ({ onClick, isShowingMore }) => (
  <div className="flex justify-center mt-6">
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-white border shadow-sm transition-all hover:shadow-md"
      style={{
        borderColor: "var(--border-color)",
        color: "var(--text-primary)",
      }}
    >
      {isShowingMore ? "See Less" : "See More"}
      {isShowingMore ? <ChevronUp className="w-4 h-4 text-[var(--primary)]" /> : <ChevronDown className="w-4 h-4 text-[var(--primary)]" />}
    </motion.button>
  </div>
);

// ── Section Header ────────────────────────────────────────────────────
const SectionHeader = () => (
  <div className="text-center pb-12">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <h2
        className="text-4xl md:text-5xl font-bold"
        style={{ color: "var(--text-primary)" }}
      >
        Projects
      </h2>
      <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-[var(--primary)]" />
      <p className="mt-4 max-w-2xl mx-auto text-sm md:text-lg font-medium" style={{ color: "var(--text-secondary)" }}>
        A collection of my technical work, showcasing problem-solving and full-stack development.
      </p>
    </motion.div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────
export default function Projects() {
  const [projects] = useState(localProjects);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);

  return (
    <div
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-12 overflow-hidden py-20 relative bg-white"
      id="Projects"
    >
      <SectionHeader />

      <AnimatePresence mode="wait">
        <motion.div
          key="projects"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
            {displayedProjects.map((project, i) => (
              <motion.div
                key={project.id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
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
          </div>
          {projects.length > initialItems && (
            <div className="mt-6">
              <ToggleButton
                onClick={() => setShowAllProjects(p => !p)}
                isShowingMore={showAllProjects}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
