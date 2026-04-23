import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, Github, Code2, Star,
  ChevronRight, Layers, Layout, Globe, Package, Cpu, Code,
} from "lucide-react";
import Swal from 'sweetalert2';
import { projects } from '../data/projects';

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];

  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gray-50 rounded-xl border transition-all duration-300 hover:shadow-sm" style={{ borderColor: "var(--border-color)" }}>
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-[var(--primary)]" />
        <span className="text-xs md:text-sm font-medium text-[var(--text-primary)]">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }) => {
  return (
    <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-[var(--border-color)]">
      <div className="relative mt-2">
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[var(--primary)] group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
        {feature}
      </span>
    </li>
  );
};

const ProjectStats = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl overflow-hidden relative border" style={{ borderColor: "var(--border-color)" }}>
      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white p-2 md:p-3 rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-md" style={{ borderColor: "var(--border-color)" }}>
        <div className="bg-blue-50 p-1.5 md:p-2 rounded-full">
          <Code2 className="text-[var(--primary)] w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-bold text-[var(--text-primary)]">{techStackCount}</div>
          <div className="text-[10px] md:text-xs font-medium text-[var(--text-secondary)]">Total Technologies</div>
        </div>
      </div>

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white p-2 md:p-3 rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-md" style={{ borderColor: "var(--border-color)" }}>
        <div className="bg-orange-50 p-1.5 md:p-2 rounded-full">
          <Layers className="text-[var(--secondary)] w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-bold text-[var(--text-primary)]">{featuresCount}</div>
          <div className="text-[10px] md:text-xs font-medium text-[var(--text-secondary)]">Key Features</div>
        </div>
      </div>
    </div>
  );
};

const handleGithubClick = (githubLink) => {
  if (githubLink === 'Private') {
    Swal.fire({
      icon: 'info',
      title: 'Source Code Private',
      text: 'Sorry, the source code for this project is private.',
      confirmButtonText: 'Understood',
      confirmButtonColor: '#0055FF',
    });
    return false;
  }
  return true;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const selectedProject = projects.find((p) => String(p.id) === id);

    if (selectedProject) {
      const enhancedProject = {
        ...selectedProject,
        Features: selectedProject.Features || [],
        TechStack: selectedProject.TechStack || [],
        Github: selectedProject.Github || 'https://github.com/KaushikYerra',
      };
      setProject(enhancedProject);
    } else {
      console.error(`Project with id ${id} not found`);
      navigate('/projects');
    }
  }, [id, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[var(--bg-color)] flex items-center justify-center">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-gray-200 border-t-[var(--primary)] rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-[var(--text-primary)]">Loading Project...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-color)] px-[2%] sm:px-0 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12 animate-fadeIn">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white rounded-xl text-[var(--text-primary)] hover:bg-gray-50 transition-all duration-300 border shadow-sm hover:shadow text-sm md:text-base font-medium"
              style={{ borderColor: "var(--border-color)" }}
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base font-medium text-[var(--text-secondary)]">
              <span>Projects</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-[var(--text-primary)] truncate">{project.Title}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6 md:space-y-10 animate-slideInLeft">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-6xl font-bold text-[var(--text-primary)] leading-tight tracking-tight">
                  {project.Title}
                </h1>
                <div className="w-16 md:w-24 h-1 bg-[var(--primary)] rounded-full" />
              </div>

              <div className="prose max-w-none">
                <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
                  {project.Description}
                </p>
              </div>

              <ProjectStats project={project} />

              <div className="flex flex-wrap gap-3 md:gap-4">
                <a
                  href={project.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-6 py-3 md:px-8 md:py-4 bg-[var(--primary)] text-white rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 font-semibold text-sm md:text-base"
                >
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                  <span>Live Demo</span>
                </a>

                <a
                  href={project.Github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-6 py-3 md:px-8 md:py-4 bg-white text-[var(--text-primary)] rounded-xl transition-all duration-300 border hover:-translate-y-1 hover:shadow-lg active:scale-95 font-semibold text-sm md:text-base"
                  style={{ borderColor: "var(--border-color)" }}
                  onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
                >
                  <Github className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                  <span>Github</span>
                </a>
              </div>

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mt-12 md:mt-0 flex items-center gap-2 md:gap-3">
                  <Code2 className="w-4 h-4 md:w-5 md:h-5 text-[var(--primary)]" />
                  Technologies Used
                </h3>
                {project.TechStack.length > 0 ? (
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.TechStack.map((tech, index) => (
                      <TechBadge key={index} tech={tech} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm md:text-base text-[var(--text-secondary)]">No technologies added.</p>
                )}
              </div>
            </div>

            <div className="space-y-6 md:space-y-10 animate-slideInRight">
              <div className="relative rounded-2xl overflow-hidden border shadow-xl group bg-white p-2" style={{ borderColor: "var(--border-color)" }}>
                <div className="rounded-xl overflow-hidden bg-gray-100 aspect-video relative">
                  <img
                    src={project.Img}
                    alt={project.Title}
                    className="w-full h-full object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105"
                    onLoad={() => setIsImageLoaded(true)}
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border shadow-sm space-y-6 transition-all hover:shadow-md" style={{ borderColor: "var(--border-color)" }}>
                <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-3">
                  <Star className="w-5 h-5 text-[var(--secondary)] group-hover:rotate-[20deg] transition-transform duration-300" />
                  Key Features
                </h3>
                {project.Features.length > 0 ? (
                  <ul className="list-none space-y-2">
                    {project.Features.map((feature, index) => (
                      <FeatureItem key={index} feature={feature} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-[var(--text-secondary)]">No features added.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;
