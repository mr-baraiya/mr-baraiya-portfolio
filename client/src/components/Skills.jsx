import React, { useState } from 'react';
import { Cpu, Cloud, Database, Code2 } from 'lucide-react';
import { SkeletonGrid, SkeletonSkillCard } from './SkeletonLoader';
import {
  SiJavascript, SiTypescript, SiPython, SiDotnet, SiC,
  SiReact, SiNextdotjs, SiTailwindcss, SiBootstrap,
  SiNodedotjs, SiExpress, SiFastapi, SiNestjs, SiN8N, SiFlask,
  SiMongodb, SiFirebase, SiSupabase,
  SiDocker, SiGit, SiGithub, SiPostman, SiSwagger, SiVercel, SiRender,
  SiLeetcode, SiPostgresql
} from 'react-icons/si';

export const Skills = ({ skills = [] }) => {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Coursework', 'Languages', 'Frontend', 'Backend', 'Database', 'Deployment', 'DevOps & Tools'];

  const filteredSkills = activeTab === 'All' 
    ? skills 
    : skills.filter(s => {
        const cat = (s.category || '').toLowerCase();
        const active = activeTab.toLowerCase();
        return cat.includes(active) || active.includes(cat);
      });

  // Helper function for Official Technology Icons with Brand Colors
  const getOfficialTechIcon = (name = '') => {
    const n = name.toLowerCase();

    // Languages
    if (n === 'javascript' || n.includes('javascript')) return <SiJavascript className="w-5 h-5 text-[#F7DF1E]" />;
    if (n === 'typescript' || n.includes('typescript')) return <SiTypescript className="w-5 h-5 text-[#3178C6]" />;
    if (n === 'python' || n.includes('python')) return <SiPython className="w-5 h-5 text-[#3776AB]" />;
    if (n === 'c#' || n.includes('c#') || n.includes('.net') || n.includes('blazor')) return <SiDotnet className="w-5 h-5 text-[#512BD4]" />;
    if (n === 'java' || n.includes('java')) return <SiDotnet className="w-5 h-5 text-[#ED8B00]" />;
    if (n === 'c' || n === 'c lang') return <SiC className="w-5 h-5 text-[#A8B9CC]" />;

    // Frontend
    if (n.includes('react')) return <SiReact className="w-5 h-5 text-[#61DAFB]" />;
    if (n.includes('next')) return <SiNextdotjs className="w-5 h-5 text-white" />;
    if (n.includes('tailwind')) return <SiTailwindcss className="w-5 h-5 text-[#06B6D4]" />;
    if (n.includes('bootstrap')) return <SiBootstrap className="w-5 h-5 text-[#7952B3]" />;

    // Backend
    if (n.includes('node')) return <SiNodedotjs className="w-5 h-5 text-[#5FA04E]" />;
    if (n.includes('express')) return <SiExpress className="w-5 h-5 text-white" />;
    if (n.includes('fastapi')) return <SiFastapi className="w-5 h-5 text-[#009688]" />;
    if (n.includes('nest')) return <SiNestjs className="w-5 h-5 text-[#E0234E]" />;
    if (n.includes('n8n')) return <SiN8N className="w-5 h-5 text-[#FF6584]" />;
    if (n.includes('flask')) return <SiFlask className="w-5 h-5 text-white" />;

    // Databases & Cloud
    if (n.includes('mongo')) return <SiMongodb className="w-5 h-5 text-[#47A248]" />;
    if (n.includes('sql server') || n.includes('sql')) return <Database className="w-5 h-5 text-[#CC292B]" />;
    if (n.includes('azure')) return <Cloud className="w-5 h-5 text-[#0089D6]" />;
    if (n.includes('firebase')) return <SiFirebase className="w-5 h-5 text-[#FFCA28]" />;
    if (n.includes('supabase')) return <SiSupabase className="w-5 h-5 text-[#3ECF8E]" />;
    if (n.includes('postgres')) return <SiPostgresql className="w-5 h-5 text-[#4169E1]" />;

    // DevOps & Tools
    if (n.includes('docker')) return <SiDocker className="w-5 h-5 text-[#2496ED]" />;
    if (n.includes('git') && !n.includes('github')) return <SiGit className="w-5 h-5 text-[#F05032]" />;
    if (n.includes('github')) return <SiGithub className="w-5 h-5 text-white" />;
    if (n.includes('postman')) return <SiPostman className="w-5 h-5 text-[#FF6C37]" />;
    if (n.includes('swagger')) return <SiSwagger className="w-5 h-5 text-[#85EA2D]" />;
    if (n.includes('vercel')) return <SiVercel className="w-5 h-5 text-white" />;
    if (n.includes('render')) return <SiRender className="w-5 h-5 text-white" />;
    if (n.includes('leetcode')) return <SiLeetcode className="w-5 h-5 text-[#FFA116]" />;

    return <Code2 className="w-5 h-5 text-[#15D8B3]" />;
  };

  return (
    <section id="skills" className="pt-8 pb-20 relative bg-[#050508] text-[#F8FAFC]">
      <div className="container-fluid space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c0d14] border border-[#15D8B3]/30 text-xs font-mono text-[#15D8B3]">
              <Cpu className="w-3.5 h-3.5" />
              <span>Core Stack</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
              Skills &amp; Technical Capabilities
            </h2>
            <p className="text-xs sm:text-sm text-[#F8FAFC]/75 font-light max-w-xl">
              Languages, frameworks, database systems, and infrastructure tools I work with daily.
            </p>
          </div>

          {/* Desktop Category Filter Tabs */}
          <div className="hidden sm:flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  activeTab === cat
                    ? 'bg-[#15D8B3] text-[#050508] font-bold shadow-md shadow-[#15D8B3]/20'
                    : 'bg-[#0c0d14] text-[#F8FAFC]/75 border border-white/10 hover:border-[#15D8B3]/50 hover:text-[#15D8B3]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile Select Dropdown Filter */}
          <div className="block sm:hidden w-full">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
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

        {/* Responsive Grid with Official Tech Brand Icons */}
        {skills.length === 0 ? (
          <SkeletonGrid count={6} Component={SkeletonSkillCard} gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSkills.map((skill, index) => (
              <div
                key={skill._id || index}
                className="bg-[#0c0d14] border border-white/10 rounded-2xl p-5 hover:border-[#15D8B3]/50 hover:-translate-y-1.5 transition-all duration-300 shadow-xl space-y-4 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  
                  {/* Brand Icon + Category Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#050508] border border-white/10 group-hover:border-[#15D8B3]/50 transition-colors flex items-center justify-center">
                      {getOfficialTechIcon(skill.name)}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-[#15D8B3] text-[10px] font-mono font-semibold border border-white/10">
                      {skill.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#15D8B3] transition-colors leading-snug">
                    {skill.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#F8FAFC]/75 font-light leading-relaxed">
                    {skill.description || `Specialized technical proficiency in ${skill.name}.`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Skills;
