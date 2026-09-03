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
  CheckCircle2 
} from 'lucide-react';

const PROGRESSION_STEPS = [
  {
    _id: 'prog-1',
    category: 'Learning',
    role: 'Learning & CS Foundations',
    company: 'Darshan University & Self-Taught',
    period: '2022 — 2023',
    location: 'Rajkot, India',
    type: 'Learning',
    badge: 'Phase 1: Foundations',
    icon: BookOpen,
    description: "Built strong core computer science foundations in C, C++, Data Structures, Object-Oriented Programming, and Web Fundamentals. Maintained top academic performance with a 9.24 CGPA.",
    highlights: [
      "Mastered C, C++, and core Data Structures & Algorithms concepts",
      "Built clean HTML5, CSS3, and JavaScript web interfaces from scratch",
      "Achieved 9.24 CGPA in B.Tech Computer Science at Darshan University"
    ],
    skills: ['C/C++', 'OOP', 'Data Structures', 'HTML/CSS/JS', '9.24 CGPA']
  },
  {
    _id: 'prog-2',
    category: 'Projects',
    role: 'Full-Stack Engineering & Production Systems',
    company: 'Independent & Academic Projects',
    period: '2023 — 2024',
    location: 'Gujarat, India',
    type: 'Projects',
    badge: 'Phase 2: Full-Stack',
    icon: Layers,
    description: "Transitioned from fundamentals to building real-world full-stack web applications and REST APIs. Architected 20+ production-grade applications including AgroSmart, MOMS, and Weather Notify AI.",
    highlights: [
      "Engineered 20+ full-stack web applications with React, Node.js, Express & MongoDB",
      "Architected REST APIs, JWT authentication, and Vercel Blob CDN asset storage",
      "Built AgroSmart, MOMS, and Weather Notify AI with modern UI/UX"
    ],
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'ASP.NET Core', 'Python']
  },
  {
    _id: 'prog-3',
    category: 'Open Source',
    role: 'Open Source Contributor',
    company: 'Webpack & Developer Ecosystem',
    period: '2024 — 2025',
    location: 'Global Open Source',
    type: 'Open Source',
    badge: 'Phase 3: Open Source',
    icon: GitMerge,
    description: "Stepped into international open-source development by contributing code and fixes to the Webpack core ecosystem. Published npm utility packages and collaborated with global maintainers.",
    highlights: [
      "Merged official Pull Requests in the Webpack CLI repository",
      "Published npm utility libraries for full-stack developers",
      "Engaged in open-source code reviews and modular architecture design"
    ],
    skills: ['Webpack', 'JavaScript', 'NPM Package', 'Git', 'Open Source']
  },
  {
    _id: 'prog-4',
    category: 'DSA',
    role: 'DSA & GATE 2026 CS Ranker',
    company: 'LeetCode & GATE CS',
    period: '2025 — 2026',
    location: 'India',
    type: 'DSA',
    badge: 'Phase 4: Algorithmic Mastery',
    icon: Award,
    description: "Focused on deep algorithmic mastery, data structure optimization, and competitive programming. Qualified GATE 2026 Computer Science with All India Rank 4226 and solved 500+ LeetCode problems.",
    highlights: [
      "Qualified GATE 2026 CS with All India Rank 4226",
      "Solved 500+ LeetCode algorithm problems across Dynamic Programming, Graphs & Trees",
      "Cleared TCS CodeVita Season 12 Competitive Programming Round"
    ],
    skills: ['GATE 2026 AIR 4226', '500+ LeetCode', 'Algorithms', 'TCS CodeVita']
  },
  {
    _id: 'prog-5',
    category: 'Current',
    role: 'Full-Stack Software Engineer',
    company: 'Seeking Full-Time Roles',
    period: '2026 — Present',
    location: 'Open to Remote / On-Site',
    type: 'Current',
    badge: 'Phase 5: Current & Beyond',
    icon: Rocket,
    description: "Actively building high-scale full-stack web applications, CDN asset pipelines, and interactive 3D WebGL experiences. Ready to contribute to engineering teams as a Full-Stack / Software Engineer.",
    highlights: [
      "Building high-performance MERN & ASP.NET web applications",
      "Integrated Vercel Blob CDN & PyMuPDF automatic PDF cover screenshot pipeline",
      "Actively interviewing and open for Software Engineering & Full-Stack roles"
    ],
    skills: ['Software Engineer', 'Full-Stack', 'REST APIs', 'Cloud CDN', 'System Design']
  }
];

export const JourneyPage = ({ experiences = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('PROGRESSION');

  const categories = [
    { key: 'PROGRESSION', label: 'Progression Pipeline' },
    { key: 'ALL', label: 'All Journey Entries' },
    { key: 'WORK', label: 'Work Experience' },
    { key: 'EDUCATION', label: 'Education & Ranks' }
  ];

  const fullJourneyEntries = [
    ...PROGRESSION_STEPS,
    {
      _id: 'work_ta',
      type: 'Work',
      role: 'Teaching Assistant — Computer Science & Engineering',
      company: 'Darshan University',
      location: 'Rajkot, Gujarat',
      period: 'Dec 2025 – Apr 2026',
      badge: 'Academic Leadership',
      description: 'Conducted interactive programming lab sessions, mentored junior B.Tech CSE students, and graded practical code assignments.',
      highlights: [
        'Taught core programming concepts in C Programming, Python, Digital Logic, and Logic Development.',
        'Mentored 100+ students in debugging complex algorithmic code and completing practical laboratory assignments.'
      ],
      skills: ['C Programming', 'Python', 'Digital Logic', 'Logic Development', 'Mentorship']
    },
    {
      _id: 'work_code2trade',
      type: 'Work',
      role: 'Team Leader — Code 2 Trade Hackathon 2025',
      company: 'Darshan University & Odoo Hackathon 2025 Finalist',
      location: 'Rajkot & Gandhinagar',
      period: '2025',
      badge: 'Hackathon Runner-Up',
      description: 'Architected real-time algorithmic trading platform and led full-stack engineering team to 2nd place victory.',
      highlights: [
        'Secured Runner-Up position at Code 2 Trade Hackathon 2025 building real-time market data analysis tools.',
        'Selected as offline finalist for Odoo Hackathon 2025 in Gandhinagar.'
      ],
      skills: ['Algorithmic Trading', 'React.js', 'Node.js', 'System Architecture', 'Team Leadership']
    },
    {
      _id: 'edu_btech',
      type: 'Education',
      role: 'B.Tech in Computer Science & Engineering',
      company: 'Darshan University',
      location: 'Rajkot, Gujarat',
      period: '2023 – 2027',
      badge: 'Academic Distinction',
      description: 'Specializing in Full-Stack Software Engineering, Machine Learning, Data Structures & Algorithms, and Distributed Systems.',
      highlights: [
        'Maintained top academic performance with CGPA 9.24 / 10 across 6 consecutive semesters.',
        'Coursework: Data Structures & Algorithms, Database Systems (SQL/NoSQL), Operating Systems, Web Engineering, ASP.NET Core, Machine Learning.'
      ],
      skills: ['CGPA: 9.24 / 10', 'Data Structures', 'DBMS', 'OS', 'Full-Stack Engineering']
    }
  ];

  const filteredEntries = selectedCategory === 'PROGRESSION'
    ? PROGRESSION_STEPS
    : (selectedCategory === 'ALL' 
        ? fullJourneyEntries 
        : fullJourneyEntries.filter(entry => (entry.type || '').toUpperCase() === selectedCategory));

  return (
    <div className="pt-28 pb-24 bg-[#050508] text-[#F8FAFC] min-h-screen">
      <div className="container-fluid space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#15D8B3]">Developer Progression & Career Timeline</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">My Developer Journey</h1>
            <p className="text-xs sm:text-sm text-[#F8FAFC]/75 font-light max-w-2xl">
              From early programming fundamentals to full-stack production apps, open-source contributions, GATE CS ranking, and software engineering.
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
                    : 'bg-[#0c0d14] text-[#F8FAFC]/75 border border-[#49A4BB]/20 hover:border-[#15D8B3] hover:text-[#15D8B3]'
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
              className="w-full px-4 py-2.5 rounded-lg bg-[#0c0d14] text-[#15D8B3] border border-[#15D8B3]/50 text-xs font-mono font-bold outline-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat.key} value={cat.key} className="bg-[#050508] text-[#F8FAFC]">
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Progression Roadmap Pipeline Banner */}
        <div className="bg-[#0c0d14] border border-[#15D8B3]/30 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold text-[#15D8B3] uppercase tracking-wider flex items-center gap-2">
              <Rocket className="w-4 h-4 text-[#15D8B3]" />
              Progression Milestone Map
            </span>
            <span className="text-xs font-mono text-[#F8FAFC]/50 hidden sm:inline">
              Learning → Projects → Open Source → DSA → Current
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {PROGRESSION_STEPS.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <button
                  key={step._id}
                  onClick={() => setSelectedCategory('PROGRESSION')}
                  className="flex flex-col items-center justify-center p-3 rounded-xl border border-[#49A4BB]/20 bg-[#050508]/60 hover:border-[#15D8B3] transition-all text-center cursor-pointer"
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
        <div className="max-w-4xl mx-auto relative pl-6 md:pl-8 space-y-10 before:absolute before:left-2 md:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#15D8B3]">
          {filteredEntries.map((item, index) => {
            const isEducation = (item.type || '').toLowerCase() === 'education';

            return (
              <div key={item._id || index} className="relative group">
                
                {/* Timeline Dot Icon */}
                <div className="absolute -left-[31px] md:-left-[35px] top-2 w-7 h-7 rounded-full bg-[#050508] border-2 border-[#15D8B3] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  {isEducation ? (
                    <GraduationCap className="w-3.5 h-3.5 text-[#15D8B3]" />
                  ) : (
                    <Briefcase className="w-3.5 h-3.5 text-[#15D8B3]" />
                  )}
                </div>

                {/* Card Container */}
                <div className="glass-card bg-[#0c0d14] border border-white/10 rounded-xl p-6 sm:p-8 hover:border-[#15D8B3]/50 transition-all duration-300 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#15D8B3]/10 text-[#15D8B3] border border-[#15D8B3]/30 uppercase tracking-wider">
                          {item.badge || item.category || item.type}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] group-hover:text-[#15D8B3] transition-colors leading-snug">
                        {item.role}
                      </h3>
                      
                      <h4 className="text-sm font-semibold text-[#15D8B3]">
                        {item.company}
                      </h4>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs font-mono text-[#F8FAFC]/75 shrink-0 space-y-1">
                      <span className="flex items-center gap-1.5 font-bold text-[#15D8B3]">
                        <Calendar className="w-3.5 h-3.5 text-[#15D8B3]" />
                        {item.period}
                      </span>
                      {item.location && (
                        <span className="flex items-center gap-1.5 text-[#F8FAFC]/60">
                          <MapPin className="w-3.5 h-3.5 text-[#49A4BB]" />
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[#F8FAFC]/80 text-xs sm:text-sm leading-relaxed font-light">
                    {item.description}
                  </p>

                  {item.highlights && item.highlights.length > 0 && (
                    <div className="pt-3 border-t border-white/10 space-y-2">
                      <span className="text-[10px] font-mono font-bold text-[#15D8B3] uppercase tracking-wider block">
                        Key Responsibilities & Achievements
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#F8FAFC]/85 font-light">
                        {item.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-[#15D8B3] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech / Competency Skill Tags */}
                  {item.skills && item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                      {item.skills.map((s, sIdx) => (
                        <span key={sIdx} className="px-2.5 py-1 rounded bg-[#050508] border border-white/10 text-[11px] font-mono text-[#15D8B3]">
                          #{s}
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
    </div>
  );
};

export default JourneyPage;
