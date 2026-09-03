import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  Layers, 
  GitMerge, 
  Award, 
  Rocket, 
  CheckCircle2, 
  ChevronRight,
  Code2
} from 'lucide-react';
import { SkeletonGrid, SkeletonTimelineItem } from './SkeletonLoader';

// Standard 5-Phase Progression Timeline
const DEFAULT_PROGRESSION = [
  {
    _id: 'prog-1',
    phase: 1,
    category: 'Learning',
    role: 'Learning & CS Foundations',
    company: 'Darshan University & Self-Taught',
    period: '2022 — 2023',
    location: 'Rajkot, India',
    type: 'Learning',
    icon: BookOpen,
    description: "Built strong core computer science foundations in C, C++, Data Structures, Object-Oriented Programming, and Web Fundamentals. Maintained top academic performance with a 9.24 CGPA.",
    highlights: [
      "Mastered C, C++, and core Data Structures & Algorithms concepts",
      "Built clean HTML5, CSS3, and JavaScript web interfaces from scratch",
      "Achieved 9.24 CGPA in B.Tech Computer Science at Darshan University"
    ],
    tags: ['C/C++', 'OOP', 'Data Structures', 'HTML/CSS/JS', '9.24 CGPA']
  },
  {
    _id: 'prog-2',
    phase: 2,
    category: 'Projects',
    role: 'Full-Stack Engineering & Production Systems',
    company: 'Independent & Academic Projects',
    period: '2023 — 2024',
    location: 'Gujarat, India',
    type: 'Projects',
    icon: Layers,
    description: "Transitioned from fundamentals to building real-world full-stack web applications and REST APIs. Architected 20+ production-grade applications including AgroSmart, MOMS, and Weather Notify AI.",
    highlights: [
      "Engineered 20+ full-stack web applications with React, Node.js, Express & MongoDB",
      "Architected REST APIs, JWT authentication, and Vercel Blob CDN asset storage",
      "Built AgroSmart, MOMS, and Weather Notify AI with modern UI/UX"
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'ASP.NET Core', 'Python']
  },
  {
    _id: 'prog-3',
    phase: 3,
    category: 'Open Source',
    role: 'Open Source Contributor',
    company: 'Webpack & Developer Ecosystem',
    period: '2024 — 2025',
    location: 'Global Open Source',
    type: 'Open Source',
    icon: GitMerge,
    description: "Stepped into international open-source development by contributing code and fixes to the Webpack core ecosystem. Published npm utility packages and collaborated with global maintainers.",
    highlights: [
      "Merged official Pull Requests in the Webpack CLI repository",
      "Published npm utility libraries for full-stack developers",
      "Engaged in open-source code reviews and modular architecture design"
    ],
    tags: ['Webpack', 'JavaScript', 'NPM Package', 'Git', 'Open Source']
  },
  {
    _id: 'prog-4',
    phase: 4,
    category: 'DSA',
    role: 'DSA & GATE 2026 CS Ranker',
    company: 'LeetCode & GATE CS',
    period: '2025 — 2026',
    location: 'India',
    type: 'DSA',
    icon: Award,
    description: "Focused on deep algorithmic mastery, data structure optimization, and competitive programming. Qualified GATE 2026 Computer Science with All India Rank 4226 and solved 500+ LeetCode problems.",
    highlights: [
      "Qualified GATE 2026 CS with All India Rank 4226",
      "Solved 500+ LeetCode algorithm problems across Dynamic Programming, Graphs & Trees",
      "Cleared TCS CodeVita Season 12 Competitive Programming Round"
    ],
    tags: ['GATE 2026 AIR 4226', '500+ LeetCode', 'Algorithms', 'TCS CodeVita']
  },
  {
    _id: 'prog-5',
    phase: 5,
    category: 'Current',
    role: 'Full-Stack Software Engineer',
    company: 'Seeking Full-Time Roles',
    period: '2026 — Present',
    location: 'Open to Remote / On-Site',
    type: 'Current',
    icon: Rocket,
    description: "Actively building high-scale full-stack web applications, CDN asset pipelines, and interactive 3D WebGL experiences. Ready to contribute to engineering teams as a Full-Stack / Software Engineer.",
    highlights: [
      "Building high-performance MERN & ASP.NET web applications",
      "Integrated Vercel Blob CDN & PyMuPDF automatic PDF cover screenshot pipeline",
      "Actively interviewing and open for Software Engineering & Full-Stack roles"
    ],
    tags: ['Software Engineer', 'Full-Stack', 'REST APIs', 'Cloud CDN', 'System Design']
  }
];

export const Experience = ({ experiences = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('PROGRESSION');
  const [activeStep, setActiveStep] = useState(null);

  const categories = [
    { key: 'PROGRESSION', label: 'Progression Pipeline' },
    { key: 'ALL', label: 'All Entries' },
    { key: 'WORK', label: 'Work Experience' },
    { key: 'EDUCATION', label: 'Education' }
  ];

  // Map db experiences or fallback to DEFAULT_PROGRESSION
  const displayItems = selectedCategory === 'PROGRESSION'
    ? DEFAULT_PROGRESSION
    : (experiences.length > 0 ? experiences : DEFAULT_PROGRESSION).filter(exp => {
        if (selectedCategory === 'ALL') return true;
        const type = (exp.type || '').toUpperCase();
        if (selectedCategory === 'WORK') return type === 'WORK';
        if (selectedCategory === 'EDUCATION') return type === 'EDUCATION';
        return true;
      });

  const getItemIcon = (type = '') => {
    const lower = type.toLowerCase();
    if (lower.includes('learn')) return BookOpen;
    if (lower.includes('project')) return Layers;
    if (lower.includes('open')) return GitMerge;
    if (lower.includes('dsa') || lower.includes('gate')) return Award;
    if (lower.includes('current')) return Rocket;
    if (lower.includes('edu')) return GraduationCap;
    return Briefcase;
  };

  return (
    <section id="experience" className="pt-4 sm:pt-6 pb-16 sm:pb-20 relative bg-[#050508] text-[#F8FAFC]">
      <div className="container-fluid">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#15D8B3]">
              <Code2 className="w-3.5 h-3.5 text-[#15D8B3]" />
              <span>Developer Journey & Progression</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
              Progression & Experience
            </h2>
            <p className="text-xs sm:text-sm text-[#F8FAFC]/70 max-w-xl font-normal">
              My engineering journey traced step-by-step: from core CS fundamentals to 20+ full-stack projects, open-source contributions, and GATE 2026 rank.
            </p>
          </div>

          {/* Desktop Filter Tabs */}
          <div className="hidden sm:flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-[#15D8B3] text-[#050508] font-bold shadow-md'
                    : 'bg-[#050814] text-[#F8FAFC]/75 border border-[#49A4BB]/20 hover:border-[#15D8B3] hover:text-[#15D8B3]'
                }`}
              >
                {cat.label}
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
                <option key={cat.key} value={cat.key} className="bg-[#050508] text-[#F8FAFC]">
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 5-Step Horizontal Progression Roadmap Banner */}
        <div className="mb-12 bg-[#050814]/80 border border-[#15D8B3]/30 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold text-[#15D8B3] uppercase tracking-wider flex items-center gap-2">
              <Rocket className="w-4 h-4 text-[#15D8B3]" />
              Engineering Evolution Pipeline
            </span>
            <span className="text-[11px] font-mono text-[#F8FAFC]/50 hidden sm:inline">
              Learning → Projects → Open Source → DSA → Current
            </span>
          </div>

          {/* Roadmap Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {DEFAULT_PROGRESSION.map((step, idx) => {
              const IconComp = step.icon;
              const isActive = activeStep === step._id;

              return (
                <button
                  key={step._id}
                  onClick={() => {
                    setSelectedCategory('PROGRESSION');
                    setActiveStep(isActive ? null : step._id);
                    const el = document.getElementById(step._id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#15D8B3]/20 border-[#15D8B3] text-white shadow-lg scale-105'
                      : 'bg-[#050508]/60 border-[#49A4BB]/20 text-[#F8FAFC]/80 hover:border-[#15D8B3]/60 hover:text-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#15D8B3]/10 border border-[#15D8B3]/40 flex items-center justify-center mb-2">
                    <IconComp className="w-4 h-4 text-[#15D8B3]" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#15D8B3] mb-0.5">
                    Step 0{idx + 1}
                  </span>
                  <span className="text-xs font-bold truncate max-w-full">
                    {step.category}
                  </span>
                  <span className="text-[10px] text-[#F8FAFC]/50 font-mono mt-1">
                    {step.period}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeline Container */}
        <div className="max-w-5xl mx-auto relative pl-6 md:pl-8 space-y-10 before:absolute before:left-2 md:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#15D8B3] before:via-[#15D8B3]/50 before:to-[#49A4BB]/20">
          {displayItems.map((exp, index) => {
            const IconComp = getItemIcon(exp.type || exp.category || '');
            const isHighlighted = activeStep === exp._id;

            return (
              <div 
                key={exp._id || index} 
                id={exp._id}
                className={`relative group transition-all duration-300 ${isHighlighted ? 'scale-[1.02]' : ''}`}
              >

                {/* Timeline Dot Icon */}
                <div className="absolute -left-[31px] md:-left-[35px] top-2 w-7 h-7 rounded-full bg-[#050508] border-2 border-[#15D8B3] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <IconComp className="w-3.5 h-3.5 text-[#15D8B3]" />
                </div>

                {/* Card Container */}
                <div className={`bg-[#050508] border rounded-xl p-6 sm:p-8 hover:border-[#15D8B3] transition-all duration-300 shadow-xl space-y-4 ${
                  isHighlighted ? 'border-[#15D8B3] shadow-[#15D8B3]/10 ring-1 ring-[#15D8B3]' : 'border-[#49A4BB]/30'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {exp.phase && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#15D8B3] text-[#050508]">
                            Phase {exp.phase}
                          </span>
                        )}
                        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border bg-[#15D8B3]/10 text-[#15D8B3] border-[#15D8B3]/30">
                          {exp.type || exp.category || 'Experience'}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] group-hover:text-[#15D8B3] transition-colors leading-snug">
                        {exp.role}
                      </h3>

                      <h4 className="text-sm font-semibold text-[#15D8B3]">
                        {exp.company}
                      </h4>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs font-mono text-[#F8FAFC]/75 shrink-0 space-y-1">
                      <span className="flex items-center gap-1.5 font-bold text-[#15D8B3]">
                        <Calendar className="w-3.5 h-3.5 text-[#15D8B3]" />
                        {exp.period}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1.5 text-[#F8FAFC]/60">
                          <MapPin className="w-3.5 h-3.5 text-[#49A4BB]" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[#F8FAFC]/85 text-xs sm:text-sm leading-relaxed font-normal">
                    {exp.description}
                  </p>

                  {/* Highlights Bullet Points */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="pt-3 border-t border-[#49A4BB]/20 space-y-2">
                      <span className="text-[10px] font-mono font-bold text-[#15D8B3] uppercase tracking-wider block">
                        Key Milestones & Achievements
                      </span>
                      <ul className="space-y-2 text-xs text-[#F8FAFC]/90">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#15D8B3] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Tags */}
                  {exp.tags && exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#050814] text-[#F8FAFC]/70 border border-[#49A4BB]/20">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Experience;
