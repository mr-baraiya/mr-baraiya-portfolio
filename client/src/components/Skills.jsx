import React, { useState } from 'react';
import { Cpu, Mail, Globe, Zap, BookOpen, Brain, Key, Server, Shield, Code2, Cloud } from 'lucide-react';
import { VscVscode } from 'react-icons/vsc';
import { SkeletonGrid, SkeletonSkillCard } from './SkeletonLoader';
import {
  // Languages
  SiJavascript, SiTypescript, SiPython, SiDotnet, SiC, SiOpenjdk,
  SiHtml5, SiCss,
  // Frontend
  SiReact, SiNextdotjs, SiTailwindcss, SiBootstrap,
  SiRedux, SiThreedotjs, SiFramer, SiVite,
  // Backend
  SiNodedotjs, SiExpress, SiFastapi, SiNestjs, SiN8N, SiFlask,
  SiGraphql, SiSocketdotio, SiPrisma,
  // Databases & Cloud
  SiMongodb, SiFirebase, SiSupabase,
  SiPostgresql, SiRedis,
  // Deployment
  SiVercel, SiRender, SiNetlify, SiRailway, SiCloudflare,
  // DevOps & Tools
  SiDocker, SiGit, SiGithub, SiPostman, SiSwagger,
  SiGithubactions, SiLinux, SiGnubash, SiFigma, SiWebpack, SiKubernetes,
  // AI & ML
  SiHuggingface, SiLangchain, SiNumpy, SiPandas,
  // Coursework
  SiLeetcode,
} from 'react-icons/si';

export const Skills = ({ skills = [] }) => {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Coursework', 'Languages', 'Frontend', 'Backend', 'Databases & Cloud', 'AI & ML', 'Deployment', 'DevOps & Tools'];

  const filteredSkills = activeTab === 'All'
    ? skills
    : skills.filter(s => {
      const cat = (s.category || '').toLowerCase().trim();
      const active = activeTab.toLowerCase().trim();
      if (active === 'devops & tools' || active === 'tools & devops') {
        return cat === 'devops & tools' || cat === 'tools & devops';
      }
      return cat.includes(active) || active.includes(cat);
    });

  // Official Technology Icons with Brand Colors
  const getOfficialTechIcon = (name = '') => {
    const n = name.toLowerCase();

    // ─── Languages ───────────────────────────────────────────────────────────
    if (n.includes('javascript')) return <SiJavascript className="w-6 h-6 text-[#F7DF1E]" />;
    if (n.includes('typescript')) return <SiTypescript className="w-6 h-6 text-[#3178C6]" />;
    if (n.includes('python'))     return <SiPython className="w-6 h-6 text-[#3776AB]" />;
    if (n.includes('java') && !n.includes('javascript')) return <SiOpenjdk className="w-6 h-6 text-[#ED8B00]" />;
    if (n.includes('html'))       return <SiHtml5 className="w-6 h-6 text-[#E34F26]" />;
    if (n.includes('css'))        return <SiCss className="w-6 h-6 text-[#1572B6]" />;
    if (n === 'c' || n === 'c lang' || n === 'c language') return <SiC className="w-6 h-6 text-[#A8B9CC]" />;
    if (n.includes('c#') || (n.includes('.net') && !n.includes('asp')) || n.includes('blazor')) return <SiDotnet className="w-6 h-6 text-[#512BD4]" />;
    if (n.includes('sql') && !n.includes('sql server') && !n.includes('mssql') && !n.includes('nosql')) return <SiPostgresql className="w-6 h-6 text-[#4169E1]" />;

    // ─── Frontend ────────────────────────────────────────────────────────────
    if (n.includes('react') && !n.includes('native')) return <SiReact className="w-6 h-6 text-[#61DAFB]" />;
    if (n.includes('next'))       return <SiNextdotjs className="w-6 h-6 text-white" />;
    if (n.includes('tailwind'))   return <SiTailwindcss className="w-6 h-6 text-[#06B6D4]" />;
    if (n.includes('bootstrap'))  return <SiBootstrap className="w-6 h-6 text-[#7952B3]" />;
    if (n.includes('redux'))      return <SiRedux className="w-6 h-6 text-[#764ABC]" />;
    if (n.includes('zustand') && !n.includes('redux')) return <SiRedux className="w-6 h-6 text-[#764ABC]" />;
    if (n.includes('three'))      return <SiThreedotjs className="w-6 h-6 text-white" />;
    if (n.includes('framer'))     return <SiFramer className="w-6 h-6 text-[#0055FF]" />;
    if (n === 'vite')             return <SiVite className="w-6 h-6 text-[#646CFF]" />;
    if (n.includes('shadcn'))     return <SiReact className="w-6 h-6 text-[#18181B]" />;
    if (n.includes('asp.net mvc') || n.includes('asp.net core')) return <SiDotnet className="w-6 h-6 text-[#512BD4]" />;
    if (n.includes('asp.net'))    return <SiDotnet className="w-6 h-6 text-[#512BD4]" />;
    if (n.includes('emailjs'))    return <Mail className="w-6 h-6 text-[#EA4335]" />;

    // ─── Backend ─────────────────────────────────────────────────────────────
    if (n.includes('node'))       return <SiNodedotjs className="w-6 h-6 text-[#5FA04E]" />;
    if (n.includes('express'))    return <SiExpress className="w-6 h-6 text-white" />;
    if (n.includes('fastapi'))    return <SiFastapi className="w-6 h-6 text-[#009688]" />;
    if (n.includes('nest'))       return <SiNestjs className="w-6 h-6 text-[#E0234E]" />;
    if (n.includes('n8n'))        return <SiN8N className="w-6 h-6 text-white" />;
    if (n.includes('flask'))      return <SiFlask className="w-6 h-6 text-white" />;
    if (n.includes('graphql'))    return <SiGraphql className="w-6 h-6 text-[#E10098]" />;
    if (n.includes('socket'))     return <SiSocketdotio className="w-6 h-6 text-white" />;
    if (n.includes('prisma'))     return <SiPrisma className="w-6 h-6 text-[#5A67D8]" />;
    if (n.includes('websocket'))  return <Zap className="w-6 h-6 text-[#F59E0B]" />;
    if (n.includes('rest api'))   return <Globe className="w-6 h-6 text-[#15D8B3]" />;
    if (n.includes('rest apis'))  return <Globe className="w-6 h-6 text-[#15D8B3]" />;
    if (n.includes('jwt') || n.includes('oauth')) return <Key className="w-6 h-6 text-[#F59E0B]" />;
    if (n.includes('nodemailer')) return <Mail className="w-6 h-6 text-[#15D8B3]" />;

    // ─── Databases & Cloud ───────────────────────────────────────────────────
    if (n.includes('mongo'))      return <SiMongodb className="w-6 h-6 text-[#47A248]" />;
    if (n.includes('sql server') || n.includes('mssql')) return <Server className="w-6 h-6 text-[#CC2927]" />;
    if (n.includes('azure'))      return <Cloud className="w-6 h-6 text-[#0089D6]" />;
    if (n.includes('firebase'))   return <SiFirebase className="w-6 h-6 text-[#FFCA28]" />;
    if (n.includes('supabase'))   return <SiSupabase className="w-6 h-6 text-[#3ECF8E]" />;
    if (n.includes('postgres'))   return <SiPostgresql className="w-6 h-6 text-[#4169E1]" />;
    if (n.includes('redis'))      return <SiRedis className="w-6 h-6 text-[#DC382D]" />;
    if (n.includes('aws') || n.includes('s3')) return <Server className="w-6 h-6 text-[#FF9900]" />;
    if (n.includes('vercel blob')) return <SiVercel className="w-6 h-6 text-white" />;

    // ─── Deployment ──────────────────────────────────────────────────────────
    if (n.includes('vercel'))     return <SiVercel className="w-6 h-6 text-white" />;
    if (n.includes('render'))     return <SiRender className="w-6 h-6 text-white" />;
    if (n.includes('netlify'))    return <SiNetlify className="w-6 h-6 text-[#00C7B7]" />;
    if (n.includes('railway'))    return <SiRailway className="w-6 h-6 text-white" />;
    if (n.includes('cloudflare')) return <SiCloudflare className="w-6 h-6 text-[#F38020]" />;
    if (n.includes('smartasp'))   return <SiDotnet className="w-6 h-6 text-[#512BD4]" />;

    // ─── DevOps & Tools ──────────────────────────────────────────────────────
    if (n.includes('kubernetes') || n === 'k8s') return <SiKubernetes className="w-6 h-6 text-[#326CE5]" />;
    if (n.includes('docker'))     return <SiDocker className="w-6 h-6 text-[#2496ED]" />;
    if (n.includes('github actions')) return <SiGithubactions className="w-6 h-6 text-[#2088FF]" />;
    if (n.includes('github'))     return <SiGithub className="w-6 h-6 text-white" />;
    if (n.includes('git'))        return <SiGit className="w-6 h-6 text-[#F05032]" />;
    if (n.includes('postman'))    return <SiPostman className="w-6 h-6 text-[#FF6C37]" />;
    if (n.includes('swagger'))    return <SiSwagger className="w-6 h-6 text-[#85EA2D]" />;
    if (n.includes('linux'))      return <SiLinux className="w-6 h-6 text-[#FCC624]" />;
    if (n.includes('bash'))       return <SiGnubash className="w-6 h-6 text-[#4EAA25]" />;
    if (n.includes('vs code') || n.includes('vscode')) return <VscVscode className="w-6 h-6 text-[#007ACC]" />;
    if (n.includes('figma'))      return <SiFigma className="w-6 h-6 text-[#F24E1E]" />;
    if (n.includes('webpack'))    return <SiWebpack className="w-6 h-6 text-[#8DD6F9]" />;

    // ─── AI & ML ─────────────────────────────────────────────────────────────
    if (n.includes('langchain'))  return <SiLangchain className="w-6 h-6 text-[#1C3C3C]" style={{ filter: 'invert(1) brightness(2)' }} />;
    if (n.includes('openai'))     return <Brain className="w-6 h-6 text-white" />;
    if (n.includes('hugging') || n.includes('huggingface')) return <SiHuggingface className="w-6 h-6 text-[#FFD21E]" />;
    if (n.includes('numpy'))      return <SiNumpy className="w-6 h-6 text-[#4DABCF]" />;
    if (n.includes('pandas'))     return <SiPandas className="w-6 h-6 text-[#E70488]" />;
    if (n.includes('faiss') || n.includes('chroma') || n.includes('chromadb')) return <Brain className="w-6 h-6 text-[#15D8B3]" />;
    if (n.includes('tensorflow') || n.includes('pytorch')) return <Brain className="w-6 h-6 text-[#FF6F00]" />;

    // ─── Coursework (generic academic topics) ────────────────────────────────
    if (n.includes('leetcode'))   return <SiLeetcode className="w-6 h-6 text-[#FFA116]" />;
    if (n.includes('data structures') || n.includes('dsa') || n.includes('algorithms')) return <SiLeetcode className="w-6 h-6 text-[#FFA116]" />;
    if (n.includes('machine learning') || n.includes('ml')) return <Brain className="w-6 h-6 text-[#FF6F00]" />;
    if (n.includes('dbms') || n.includes('database management')) return <SiPostgresql className="w-6 h-6 text-[#336791]" />;
    if (n.includes('operating system') || n.includes('os')) return <SiLinux className="w-6 h-6 text-[#FCC624]" />;
    if (n.includes('network'))    return <Globe className="w-6 h-6 text-[#15D8B3]" />;
    if (n.includes('oop') || n.includes('object oriented')) return <Code2 className="w-6 h-6 text-[#15D8B3]" />;
    if (n.includes('compiler') || n.includes('theory of computation') || n.includes('toc')) return <Code2 className="w-6 h-6 text-[#A855F7]" />;
    if (n.includes('software engineering')) return <Code2 className="w-6 h-6 text-[#15D8B3]" />;
    if (n.includes('discrete')) return <BookOpen className="w-6 h-6 text-[#15D8B3]" />;

    // ─── Default Fallback ────────────────────────────────────────────────────
    return <Cpu className="w-6 h-6 text-[#15D8B3]" />;
  };

  return (
    <section id="skills" className="pt-4 sm:pt-6 pb-16 sm:pb-20 relative bg-[#050508] text-[#F8FAFC]">
      <div className="container-fluid">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-[#49A4BB]/20 pb-8">
          <div className="space-y-2 shrink-0">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#15D8B3]">
              <Cpu className="w-3.5 h-3.5 text-[#15D8B3]" />
              <span>Technical Skills</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
              Skills & Expertise
            </h2>
          </div>

          {/* Desktop Category Filter Tabs */}
          <div className="hidden sm:flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 min-w-0 max-w-full justify-start md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 ${activeTab === cat
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
