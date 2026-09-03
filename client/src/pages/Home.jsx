import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github, Database, Code, Cpu, Server, BookOpen, Layers, CheckCircle2, GraduationCap, Trophy, GitPullRequest, MapPin, Calendar, Terminal } from 'lucide-react';
import Hero from '../components/Hero';
import OpenSourceContributions from '../components/OpenSourceContributions';
import GitHubActivity from '../components/GitHubActivity';
import LeetCodeStats from '../components/LeetCodeStats';

import { SkeletonGrid, SkeletonProjectCard } from '../components/SkeletonLoader';

const FALLBACK_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%230c0d14"/><rect x="30" y="30" width="740" height="440" rx="16" fill="%23050508" stroke="%2315D8B3" stroke-width="2" stroke-opacity="0.3"/><text x="400" y="230" fill="%2315D8B3" font-family="monospace" font-size="28" font-weight="bold" text-anchor="middle">&lt;Vishal Baraiya /&gt;</text><text x="400" y="280" fill="%23F8FAFC" font-family="sans-serif" font-size="16" fill-opacity="0.7" text-anchor="middle">Software Engineering Project Showcase</text></svg>';

export const Home = ({ profile, projects, skills, experiences }) => {

  // Dynamically load the 4 featured projects selected in Admin Profile Settings dropdowns
  const selectedIds = Array.isArray(profile?.featuredProjectIds) && profile.featuredProjectIds.length > 0
    ? profile.featuredProjectIds
    : ['proj-13', 'proj-12', 'proj-19', 'proj-16'];

  const matchedProjects = selectedIds
    .map(id => (Array.isArray(projects) ? projects.find(p => p._id === id || p.title === id) : null))
    .filter(Boolean);

  const displayFeaturedProjects = matchedProjects.length > 0 
    ? matchedProjects.slice(0, 4) 
    : (Array.isArray(projects) && projects.length > 0 ? projects.slice(0, 4) : []);

  // Dynamically group skills by category from MongoDB database
  const skillCategories = Array.isArray(skills) && skills.length > 0
    ? Object.entries(
        skills.reduce((acc, s) => {
          const cat = s.category || 'General';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(s);
          return acc;
        }, {})
      ).map(([catName, items]) => ({
        category: catName,
        tags: items.map(s => s.name),
        description: `Proficient in ${items.map(s => s.name).slice(0, 4).join(', ')} and modern development workflows.`
      }))
    : [];

  // Dynamically load experiences from MongoDB database
  const displayExperiences = Array.isArray(experiences) ? experiences : [];

  return (
    <div className="bg-[#050508] text-[#F8FAFC]">
      {/* 1. Hero Section */}
      <Hero profile={profile} />

      {/* 2. Featured Projects Preview */}
      <section id="projects" className="py-12 md:py-16 bg-[#050508]">
        <div className="container-fluid space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-5 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-medium text-[#15D8B3] uppercase tracking-wider">Projects</span>
              <h2 className="text-2xl font-bold tracking-tight text-[#F8FAFC]">Featured Work</h2>
            </div>
            <Link to="/projects" className="px-4 py-2 rounded-lg bg-[#0c0d14] border border-white/15 text-xs font-mono font-medium text-[#F8FAFC]/90 hover:border-[#15D8B3] hover:text-[#15D8B3] transition-all no-underline flex items-center gap-2">
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#15D8B3]" />
            </Link>
          </div>

          {/* 4 Cards per Row Desktop Grid */}
          {displayFeaturedProjects.length === 0 ? (
            <SkeletonGrid count={4} Component={SkeletonProjectCard} gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayFeaturedProjects.map((p) => {
              const techList = Array.isArray(p.techStack) 
                ? p.techStack 
                : (Array.isArray(p.tech) ? p.tech : (p.techStack || p.tech || '').split(','));

              return (
                <div key={p._id || p.title} className="p-5 rounded-xl bg-[#0c0d14] border border-white/10 flex flex-col justify-between group hover:border-white/20 transition-all">
                  <div className="space-y-3">
                    <div className="h-40 overflow-hidden bg-[#050508] relative flex items-center justify-center p-2 rounded-lg border border-white/10">
                      <img
                        src={p.image || FALLBACK_IMAGE}
                        alt={p.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
                        className="w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded bg-[#050508]/90 text-[10px] font-mono text-[#15D8B3] border border-[#15D8B3]/30 font-medium">
                        {p.category}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-[#F8FAFC] group-hover:text-[#15D8B3] transition-colors leading-snug line-clamp-2">
                        {p.title}
                      </h3>

                      {p.highlights && Array.isArray(p.highlights) && p.highlights.length > 0 ? (
                        <ul className="space-y-1 text-xs text-[#F8FAFC]/75 font-light leading-relaxed">
                          {p.highlights.slice(0, 2).map((h, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#15D8B3] shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{h}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-[#F8FAFC]/75 font-light leading-relaxed line-clamp-2">
                          {p.description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {techList.slice(0, 4).map((t, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#15D8B3]">
                            {typeof t === 'string' ? t.trim() : t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-3 text-xs font-mono">
                    {p.liveUrl ? (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" className="font-medium text-[#15D8B3] hover:underline flex items-center gap-1 no-underline">
                        <span>Live App</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <div className="text-[#15D8B3] flex items-center gap-1">
                        <Terminal className="w-3 h-3" />
                        <span>REST API</span>
                      </div>
                    )}
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-[#F8FAFC]/70 hover:text-[#15D8B3] flex items-center gap-1 no-underline">
                        <Github className="w-3.5 h-3.5 text-[#15D8B3]" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </section>

      {/* 3. Core Tech Stack Section */}
      <section id="skills" className="py-12 md:py-16 bg-[#050508]">
        <div className="container-fluid space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-5 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-medium text-[#15D8B3] uppercase tracking-wider">Stack</span>
              <h2 className="text-2xl font-bold tracking-tight text-[#F8FAFC]">Technical Skills &amp; Domains</h2>
            </div>
            <Link to="/skills" className="px-4 py-2 rounded-lg bg-[#0c0d14] border border-white/15 text-xs font-mono font-medium text-[#F8FAFC]/90 hover:border-[#15D8B3] hover:text-[#15D8B3] transition-all no-underline flex items-center gap-2">
              <span>View All Skills</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#15D8B3]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((item, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[#0c0d14] border border-white/10 space-y-3 flex flex-col justify-between group hover:border-white/20 transition-all">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#050508] border border-white/10 flex items-center justify-center text-[#15D8B3] shrink-0 font-bold font-mono text-xs">
                      {idx + 1}
                    </div>
                    <h3 className="font-bold text-[#F8FAFC] text-sm group-hover:text-[#15D8B3] transition-colors">{item.category}</h3>
                  </div>
                  <p className="text-xs text-[#F8FAFC]/75 leading-relaxed font-light">{item.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#15D8B3]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Open Source Contributions */}
      <OpenSourceContributions />

      {/* 5. LeetCode DSA Metrics */}
      <LeetCodeStats />

      {/* 6. GitHub Activity Graph */}
      <GitHubActivity />

      {/* 7. Experience Timeline */}
      <section id="experience" className="py-12 md:py-16 bg-[#050508]">
        <div className="container-fluid space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-5 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-medium text-[#15D8B3] uppercase tracking-wider">Experience</span>
              <h2 className="text-2xl font-bold tracking-tight text-[#F8FAFC]">Work History &amp; Roles</h2>
            </div>
            <Link to="/journey" className="px-4 py-2 rounded-lg bg-[#0c0d14] border border-white/15 text-xs font-mono font-medium text-[#F8FAFC]/90 hover:border-[#15D8B3] hover:text-[#15D8B3] transition-all no-underline flex items-center gap-2">
              <span>View Timeline</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#15D8B3]" />
            </Link>
          </div>

          <div className="space-y-4">
            {displayExperiences.map((item, idx) => (
              <div key={item._id || idx} className="p-5 rounded-xl bg-[#0c0d14] border border-white/10 space-y-2 group hover:border-white/20 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-semibold text-[#15D8B3] uppercase">
                      {item.type || 'Role'}
                    </span>
                    <span className="text-xs font-mono text-[#F8FAFC]/60">
                      • {item.period || item.location}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#15D8B3] transition-colors">
                  {item.role} <span className="text-[#15D8B3] font-normal text-xs sm:text-sm">— {item.company}</span>
                </h3>

                <p className="text-xs text-[#F8FAFC]/80 font-light leading-relaxed">
                  {item.description || (Array.isArray(item.highlights) ? item.highlights[0] : item.highlights)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact Banner */}
      <section className="py-16 bg-[#050508] text-center border-t border-white/10">
        <div className="container max-w-2xl space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">Interested in Collaborating?</h2>
          <p className="text-[#F8FAFC]/75 font-light max-w-lg mx-auto text-xs sm:text-sm leading-relaxed">
            Feel free to reach out for software engineering opportunities, web application development, or technical inquiries.
          </p>
          <div>
            <Link to="/contact" className="px-6 py-2.5 rounded-lg bg-[#0c0d14] border border-[#15D8B3]/60 text-white font-medium text-xs sm:text-sm hover:bg-[#15D8B3] hover:text-[#050508] transition-all no-underline inline-flex items-center gap-2">
              <span>Send Message</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
