import React, { useEffect, memo } from "react";
import { FileText, Code, Award, Globe, ArrowUpRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const StatCard = ({ icon: Icon, color, value, label, delay }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={delay}
    className="flex items-center gap-4 p-6 rounded-2xl border bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    style={{ borderColor: "var(--border-color)" }}
  >
    <div 
      className="p-3 rounded-xl"
      style={{ backgroundColor: `${color}15`, color: color }}
    >
      <Icon className="w-8 h-8" />
    </div>
    <div>
      <h4 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>{value}</h4>
      <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{label}</p>
    </div>
  </div>
);

const About = () => {
  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  return (
    <div
      className="py-20 relative"
      id="About"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[10%]">
        
        {/* Header section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            About Me
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: "var(--primary)" }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Avatar Space */}
          <div className="lg:col-span-5 h-[400px]" data-aos="fade-right">
             {/* The avatar canvas will be rendered here by the parent wrapper */}
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-7 space-y-8" data-aos="fade-left">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-semibold" style={{ color: "var(--text-primary)" }}>
                Bridging the gap between <span style={{ color: "var(--primary)" }}>design</span> and <span style={{ color: "var(--secondary)" }}>technology</span>
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                I'm a passionate frontend developer and cloud enthusiast with a strong foundation in modern web technologies. As a student and freelancer, I love creating clean, scalable, and user-centric applications.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                My journey in tech is driven by curiosity and a constant desire to learn. Whether it's architecting a scalable backend or polishing a beautiful UI, I bring dedication and attention to detail to every project.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <StatCard icon={Code} color="var(--primary)" value="2+" label="Years Experience" delay={100} />
              <StatCard icon={Award} color="var(--secondary)" value="15+" label="Projects Completed" delay={200} />
              <StatCard icon={Globe} color="#22c55e" value="5+" label="Happy Clients" delay={300} />
              <StatCard icon={FileText} color="#8b5cf6" value="100k+" label="Lines of Code" delay={400} />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              <button 
                className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:shadow-md text-white hover:-translate-y-1"
                style={{ backgroundColor: "var(--text-primary)" }}
              >
                Download Resume
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default memo(About);
