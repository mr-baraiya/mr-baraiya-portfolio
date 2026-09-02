import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Eye, X, Layers, ArrowUpRight } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';

export const Projects = ({ projects = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All', 'Full-Stack', 'Frontend', 'Backend', 'AI & ML'];

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModalProject(null);
    };
    if (activeModalProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalProject]);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="projects" className="pt-4 sm:pt-6 pb-16 sm:pb-20 relative bg-[#050508] text-[#F8FAFC]">
      <div className="container-fluid">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#15D8B3]">
              <Layers className="w-3.5 h-3.5 text-[#15D8B3]" />
              <span>Portfolio Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
              Featured Projects
            </h2>
          </div>

          {/* Desktop Filter Tabs */}
          <div className="hidden sm:flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#15D8B3] text-[#050508] font-bold shadow-md'
                    : 'bg-[#050814] text-[#F8FAFC]/75 border border-[#49A4BB]/20 hover:border-[#15D8B3] hover:text-[#15D8B3]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile Select Dropdown Filter */}
          <div className="block sm:hidden w-full">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#050814] text-[#15D8B3] border border-[#15D8B3]/50 text-xs font-mono font-bold outline-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#050508] text-[#F8FAFC]">
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 5-Cards per Row Responsive Grid on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              onClick={() => setActiveModalProject(project)}
              className="group bg-[#050508] border border-[#49A4BB]/30 rounded-xl overflow-hidden flex flex-col hover:border-[#15D8B3] hover:-translate-y-1 transition-all duration-300 shadow-xl cursor-pointer justify-between"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#050814] border-b border-[#49A4BB]/20 flex items-center justify-center p-1.5">
                <img
                  src={project.image || FALLBACK_IMAGE}
                  alt={project.title}
                  loading="lazy"
                  onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
                  className="w-full h-full object-contain p-1 transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#050508]/90 backdrop-blur-md text-[10px] font-mono font-semibold text-[#15D8B3] border border-[#15D8B3]/40">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#15D8B3] transition-colors leading-snug line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#F8FAFC]/75 leading-relaxed line-clamp-2 font-light">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {(Array.isArray(project.techStack) ? project.techStack : (project.techStack || '').split(',')).slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-[#050814] border border-[#49A4BB]/20 text-[9px] font-mono text-[#F8FAFC]/80">
                        {typeof tech === 'string' ? tech.trim() : tech}
                      </span>
                    ))}
                    {(Array.isArray(project.techStack) ? project.techStack : (project.techStack || '').split(',')).length > 3 && (
                      <span className="px-1.5 py-0.5 rounded bg-[#050814] text-[9px] font-mono text-[#15D8B3]">
                        +{(Array.isArray(project.techStack) ? project.techStack : (project.techStack || '').split(',')).length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-[#49A4BB]/20 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#15D8B3] group-hover:underline">
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="Live Demo App"
                        className="p-1 text-[#15D8B3] hover:text-white transition-colors cursor-pointer no-underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="GitHub Repository"
                        className="p-1 text-[#F8FAFC]/70 hover:text-[#15D8B3] transition-colors cursor-pointer no-underline"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Optimized Slim Width & Tall Image Project Detail Modal */}
      {activeModalProject && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setActiveModalProject(null); }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#050508]/95 backdrop-blur-md animate-fadeIn"
        >
          <div className="relative bg-[#050508] border border-[#15D8B3]/60 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto no-scrollbar p-5 sm:p-6 shadow-2xl space-y-4">
            
            {/* Close Modal Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              aria-label="Close modal"
              className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1 text-[#F8FAFC]/70 hover:text-[#15D8B3] transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5 text-[#15D8B3]" />
            </button>

            {/* Decreased Width & Increased Height Image Preview */}
            <div className="w-full h-52 sm:h-64 md:h-72 bg-[#050814] rounded-xl overflow-hidden border border-[#49A4BB]/30 flex items-center justify-center p-1">
              <img
                src={activeModalProject.image || FALLBACK_IMAGE}
                alt={activeModalProject.title}
                onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Metadata & Title */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#15D8B3]/10 text-[#15D8B3] text-[11px] font-mono font-bold border border-[#15D8B3]/30">
                  {activeModalProject.category}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#F8FAFC] leading-tight">
                {activeModalProject.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#F8FAFC]/85 leading-relaxed font-light">
                {activeModalProject.longDescription || activeModalProject.description}
              </p>

              {/* Complete Tech Stack Tags */}
              <div className="space-y-1.5 pt-1">
                <h4 className="text-[10px] font-mono font-bold text-[#15D8B3] uppercase tracking-wider">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(Array.isArray(activeModalProject.techStack) ? activeModalProject.techStack : (activeModalProject.techStack || '').split(',')).map((tech, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-md bg-[#050814] border border-[#49A4BB]/30 text-[11px] font-mono text-[#15D8B3] font-semibold">
                      {typeof tech === 'string' ? tech.trim() : tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[#49A4BB]/20 flex items-center gap-3">
              {activeModalProject.liveUrl && (
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Live Application Demo"
                  className="px-3.5 sm:px-5 py-2.5 rounded-lg bg-[#15D8B3] text-[#050508] text-xs font-mono font-bold tracking-wide hover:bg-[#15D8B3]/90 transition-all flex items-center gap-2 no-underline shadow-lg shadow-[#15D8B3]/20 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">Live Application Demo ↗</span>
                </a>
              )}

              {activeModalProject.githubUrl && (
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub Source Code"
                  className="px-3.5 sm:px-4 py-2.5 rounded-lg bg-[#050814] border border-[#49A4BB]/30 text-[#F8FAFC] hover:text-[#15D8B3] hover:border-[#15D8B3] text-xs font-mono font-bold transition-all flex items-center gap-2 no-underline cursor-pointer"
                >
                  <Github className="w-4 h-4 text-[#15D8B3] shrink-0" />
                  <span className="hidden sm:inline">GitHub Source Code</span>
                </a>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
