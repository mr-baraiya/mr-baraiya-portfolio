import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Eye, X, Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SkeletonGrid, SkeletonProjectCard } from './SkeletonLoader';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';

export const Projects = ({ projects = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All', 'Full-Stack', 'Frontend', 'Backend', 'AI & ML'];

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
    <section id="projects" className="pt-8 pb-20 relative bg-[#050508] text-[#F8FAFC]">
      <div className="container-fluid space-y-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c0d14] border border-[#15D8B3]/30 text-xs font-mono text-[#15D8B3]">
              <Layers className="w-3.5 h-3.5" />
              <span>Selected Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
              Featured Projects
            </h2>
            <p className="text-xs sm:text-sm text-[#F8FAFC]/75 font-light max-w-xl">
              Web platforms, REST APIs, and AI applications built with modern tools and clean architecture.
            </p>
          </div>

          {/* Desktop Filter Tabs */}
          <div className="hidden sm:flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#15D8B3] text-[#050508] font-bold shadow-md shadow-[#15D8B3]/20'
                    : 'bg-[#0c0d14] text-[#F8FAFC]/75 border border-white/10 hover:border-[#15D8B3]/50 hover:text-[#15D8B3]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile Dropdown Filter */}
          <div className="block sm:hidden w-full">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d14] text-[#15D8B3] border border-[#15D8B3]/40 text-xs font-mono font-bold outline-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#050508] text-[#F8FAFC]">
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <SkeletonGrid count={6} Component={SkeletonProjectCard} gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                onClick={() => setActiveModalProject(project)}
                className="group bg-[#0c0d14] border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-[#15D8B3]/60 hover:-translate-y-1.5 transition-all duration-300 shadow-xl cursor-pointer justify-between"
              >
                {/* Image Preview */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#050508] border-b border-white/10 flex items-center justify-center p-2">
                  <img
                    src={project.image || FALLBACK_IMAGE}
                    alt={project.title}
                    loading="lazy"
                    onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
                    className="w-full h-full object-contain p-1 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#050508]/90 backdrop-blur-md text-[10px] font-mono font-semibold text-[#15D8B3] border border-[#15D8B3]/40">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#15D8B3] transition-colors leading-snug line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-xs text-[#F8FAFC]/75 leading-relaxed line-clamp-2 font-light">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(Array.isArray(project.techStack) ? project.techStack : (project.techStack || '').split(',')).slice(0, 4).map((tech, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-[#15D8B3]">
                          {typeof tech === 'string' ? tech.trim() : tech}
                        </span>
                      ))}
                      {(Array.isArray(project.techStack) ? project.techStack : (project.techStack || '').split(',')).length > 4 && (
                        <span className="px-2 py-0.5 rounded-lg bg-white/5 text-[10px] font-mono text-[#F8FAFC]/60">
                          +{(Array.isArray(project.techStack) ? project.techStack : (project.techStack || '').split(',')).length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Links */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#15D8B3] group-hover:translate-x-0.5 transition-transform">
                      <span>View Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="Live Demo App"
                          className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#15D8B3] hover:text-white hover:border-[#15D8B3] transition-colors cursor-pointer no-underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="GitHub Repository"
                          className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#F8FAFC]/70 hover:text-[#15D8B3] hover:border-[#15D8B3] transition-colors cursor-pointer no-underline"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setActiveModalProject(null); }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050508]/90 backdrop-blur-md animate-fadeIn"
        >
          <div className="relative bg-[#0c0d14] border border-[#15D8B3]/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto no-scrollbar p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-[#F8FAFC]/70 hover:text-white hover:bg-white/10 transition-colors border border-white/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[16/10] bg-[#050508] rounded-xl overflow-hidden border border-white/10 p-3 flex items-center justify-center">
              <img
                src={activeModalProject.image || FALLBACK_IMAGE}
                alt={activeModalProject.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Modal Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#15D8B3]/10 text-[#15D8B3] text-xs font-mono font-semibold border border-[#15D8B3]/30">
                  {activeModalProject.category}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white">
                {activeModalProject.title}
              </h3>

              <p className="text-sm text-[#F8FAFC]/80 font-light leading-relaxed">
                {activeModalProject.longDescription || activeModalProject.description}
              </p>

              {/* Highlights List if present */}
              {activeModalProject.highlights && activeModalProject.highlights.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-mono text-[#15D8B3] uppercase tracking-wider font-bold">Key Technical Features</h4>
                  <ul className="space-y-1.5">
                    {activeModalProject.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#F8FAFC]/80 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#15D8B3] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack List */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-mono text-[#15D8B3] uppercase tracking-wider font-bold">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(activeModalProject.techStack) ? activeModalProject.techStack : (activeModalProject.techStack || '').split(',')).map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white">
                      {typeof tech === 'string' ? tech.trim() : tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-[#15D8B3] text-[#050508] font-bold text-xs hover:bg-[#12be9d] transition-all flex items-center gap-2 no-underline shadow-md shadow-[#15D8B3]/20"
                  >
                    <span>Launch Live App</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-white/5 text-[#F8FAFC] font-semibold text-xs border border-white/10 hover:border-white transition-all flex items-center gap-2 no-underline"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
