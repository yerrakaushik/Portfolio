import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x);
  const mouseY = useSpring(y);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative w-full perspective-1000"
    >
      <div 
        className="relative overflow-hidden rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-500 preserve-3d"
        style={{ transform: "translateZ(0px)" }}
      >
        <div className="p-6 flex flex-col h-full preserve-3d">
          <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-video mb-6" style={{ transform: "translateZ(40px)" }}>
            <motion.img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
          
          <div className="flex flex-col flex-grow preserve-3d">
            <h3 
              className="text-2xl font-black tracking-tight mb-3 uppercase" 
              style={{ color: "var(--text-primary)", transform: "translateZ(60px)" }}
            >
              {Title}
            </h3>
            
            <p 
              className="text-sm font-medium leading-relaxed text-gray-500 line-clamp-3 mb-8" 
              style={{ transform: "translateZ(30px)" }}
            >
              {Description}
            </p>
            
            <div className="flex items-center justify-between mt-auto" style={{ transform: "translateZ(50px)" }}>
              {ProjectLink ? (
                <motion.a
                  whileHover={{ x: 5 }}
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 font-bold text-xs uppercase tracking-widest text-[var(--primary)]"
                >
                  <span>Launch</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>
              ) : (
                <span className="text-xs uppercase tracking-widest font-bold text-gray-400">Offline</span>
              )}

              {id && (
                <Link to={`/project/${id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest bg-black text-white hover:bg-gray-900 transition-all shadow-lg"
                  >
                    View Info
                  </motion.button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CardProject;