import React, { useState } from 'react';
import { Cpu, Cloud, Database } from 'lucide-react';
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
    if (n === 'javascript' || n.includes('javascript')) return <SiJavascript className="w-6 h-6 text-[#F7DF1E]" />;
    if (n === 'typescript' || n.includes('typescript')) return <SiTypescript className="w-6 h-6 text-[#3178C6]" />;
    if (n === 'python' || n.includes('python')) return <SiPython className="w-6 h-6 text-[#3776AB]" />;
    if (n === 'c#' || n.includes('c#') || n.includes('.net') || n.includes('blazor')) return <SiDotnet className="w-6 h-6 text-[#512BD4]" />;
    if (n === 'java' || n.includes('java')) return <SiDotnet className="w-6 h-6 text-[#ED8B00]" />;
    if (n === 'c' || n === 'c lang') return <SiC className="w-6 h-6 text-[#A8B9CC]" />;

    // Frontend
    if (n.includes('react')) return <SiReact className="w-6 h-6 text-[#61DAFB]" />;
    if (n.includes('next')) return <SiNextdotjs className="w-6 h-6 text-white" />;
    if (n.includes('tailwind')) return <SiTailwindcss className="w-6 h-6 text-[#06B6D4]" />;
    if (n.includes('bootstrap')) return <SiBootstrap className="w-6 h-6 text-[#7952B3]" />;

    // Backend
    if (n.includes('node')) return <SiNodedotjs className="w-6 h-6 text-[#5FA04E]" />;
    if (n.includes('express')) return <SiExpress className="w-6 h-6 text-white" />;
    if (n.includes('fastapi')) return <SiFastapi className="w-6 h-6 text-[#009688]" />;
    if (n.includes('nest')) return <SiNestjs className="w-6 h-6 text-[#E0234E]" />;
    if (n.includes('n8n')) return <SiN8N className="w-6 h-6 text-[#FF6584]" />;
    if (n.includes('flask')) return <SiFlask className="w-6 h-6 text-white" />;

    // Databases & Cloud
    if (n.includes('mongo')) return <SiMongodb className="w-6 h-6 text-[#47A248]" />;
    if (n.includes('sql server') || n.includes('sql')) return <Database className="w-6 h-6 text-[#CC292B]" />;
    if (n.includes('azure')) return <Cloud className="w-6 h-6 text-[#0089D6]" />;
    if (n.includes('firebase')) return <SiFirebase className="w-6 h-6 text-[#FFCA28]" />;
    if (n.includes('supabase')) return <SiSupabase className="w-6 h-6 text-[#3ECF8E]" />;
    if (n.includes('postgres')) return <SiPostgresql className="w-6 h-6 text-[#4169E1]" />;

    // DevOps & Tools
    if (n.includes('docker')) return <SiDocker className="w-6 h-6 text-[#2496ED]" />;
    if (n.includes('git')) return <SiGit className="w-6 h-6 text-[#F05032]" />;
    if (n.includes('github')) return <SiGithub className="w-6 h-6 text-white" />;
    if (n.includes('postman')) return <SiPostman className="w-6 h-6 text-[#FF6C37]" />;
    if (n.includes('swagger')) return <SiSwagger className="w-6 h-6 text-[#85EA2D]" />;
    if (n.includes('vercel')) return <SiVercel className="w-6 h-6 text-white" />;
    if (n.includes('render')) return <SiRender className="w-6 h-6 text-white" />;

    // Coursework
    if (n.includes('data structures') || n.includes('dsa') || n.includes('leetcode')) return <SiLeetcode className="w-6 h-6 text-[#FFA116]" />;

    return <Cpu className="w-6 h-6 text-[#15D8B3]" />;
  };

  return (
    <section id="skills" className="pt-4 sm:pt-6 pb-16 sm:pb-20 relative bg-[#050508] text-[#F8FAFC]">
      <div className="container-fluid">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-[#49A4BB]/20 pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#15D8B3]">
              <Cpu className="w-3.5 h-3.5 text-[#15D8B3]" />
              <span>Technical Skills</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
              Skills & Expertise
            </h2>
          </div>

          {/* Desktop Category Filter Tabs */}
          <div className="hidden sm:flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${activeTab === cat
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
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
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

        {/* 5-Cards per Row Responsive Grid with Official Tech Brand Icons */}
        {skills.length === 0 ? (
          <SkeletonGrid count={5} Component={SkeletonSkillCard} gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
            {filteredSkills.map((skill, index) => (
              <div
                key={skill._id || index}
                className="bg-[#050508] border border-[#49A4BB]/30 rounded-xl p-5 hover:border-[#15D8B3] hover:-translate-y-1 transition-all duration-300 shadow-lg space-y-3 group flex flex-col justify-between"
              >
                <div className="space-y-3">

                  {/* 1. Official Tech Brand Icon + Category Pill */}
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-[#050814] border border-[#49A4BB]/30 group-hover:border-[#15D8B3] transition-colors flex items-center justify-center">
                      {getOfficialTechIcon(skill.name)}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#050814] text-[#15D8B3] text-[10px] font-mono font-semibold border border-[#15D8B3]/30">
                      {skill.category}
                    </span>
                  </div>

                  {/* 2. Technology Title */}
                  <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#15D8B3] transition-colors leading-snug">
                    {skill.name}
                  </h3>

                  {/* 3. Technology Description */}
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
