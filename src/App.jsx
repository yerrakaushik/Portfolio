import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import "./index.css";
import Home from "./Pages/Home";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import HeroAboutSection from "./components/HeroAboutSection";
import Skills from "./Pages/Skills";
import Projects from "./Pages/Projects";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import CustomCursor from "./components/CustomCursor";
import { AnimatePresence } from 'framer-motion';

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <HeroAboutSection />
          <Skills />
          <Projects />
          <ContactPage />
          <footer style={{ background: "var(--bg-color)", borderTop: "1px solid var(--border-color)" }}>
            <center>
              <span className="block text-sm py-6" style={{ color: "var(--text-secondary)" }}>
                © 2025 <span style={{ color: "var(--primary)", fontWeight: 600 }}>Kaushik Yerra</span>. All Rights Reserved.
              </span>
            </center>
          </footer>
        </>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <footer style={{ background: "var(--bg-color)", borderTop: "1px solid var(--border-color)" }}>
      <center>
        <span className="block text-sm py-6" style={{ color: "var(--text-secondary)" }}>
          © 2025 <span style={{ color: "var(--primary)", fontWeight: 600 }}>Kaushik Yerra</span>. All Rights Reserved.
        </span>
      </center>
    </footer>
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <>
      <CustomCursor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;