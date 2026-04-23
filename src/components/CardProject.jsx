import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      console.log("ProjectLink kosong");
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };
  
  const handleDetails = (e) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="group relative w-full h-full flex">
      <div 
        className="relative overflow-hidden rounded-2xl bg-white border flex flex-col w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="relative p-5 z-10 flex flex-col flex-grow">
          <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-video mb-4">
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <div className="flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              {Title}
            </h3>
            
            <p className="text-sm leading-relaxed line-clamp-2 flex-grow" style={{ color: "var(--text-secondary)" }}>
              {Description}
            </p>
            
            <div className="pt-6 flex items-center justify-between mt-auto">
              {ProjectLink ? (
                <a
                  href={ProjectLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 font-medium transition-colors duration-200"
                  style={{ color: "var(--primary)" }}
                >
                  <span className="text-sm">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Demo Not Available</span>
              )}

              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{ backgroundColor: "var(--text-primary)", color: "white" }}
                >
                  <span className="text-sm">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Details Not Available</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;