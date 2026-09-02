import React, { useState } from 'react';
import { Calendar, MapPin, Briefcase, GraduationCap, Award, CheckCircle2 } from 'lucide-react';

export const JourneyPage = ({ experiences = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'WORK', 'EDUCATION'];

  // Full Rich Journey Entries (Combining DB experience data + explicit Academic Education & Competitive Honors)
  const fullJourneyEntries = [
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
      _id: 'work_wocs',
      type: 'Work',
      role: 'Project Admin & Open Source Contributor',
      company: 'Winter of Code Social (WoCS) & Webpack',
      location: 'Open Source Community',
      period: '2025',
      badge: 'Open Source Leadership',
      description: 'Managed open-source software repositories, reviewed pull requests, and contributed code to Webpack ecosystem.',
      highlights: [
        'Served as Project Admin for WoCS 2025, guiding student contributors through Git workflows and code reviews.',
        'Contributed bug fixes to Webpack core ecosystem and completed Hacktoberfest 2025 challenge.'
      ],
      skills: ['JavaScript', 'Webpack', 'Git / GitHub', 'Code Reviews', 'Open Source']
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
    },
    {
      _id: 'edu_gate',
      type: 'Education',
      role: 'GATE 2026 CS Qualified (AIR 4226)',
      company: 'IIT Roorkee / GATE 2026 Organising Institute',
      location: 'National Competitive Exam',
      period: 'Feb 2026',
      badge: 'Competitive Exam Rank',
      description: 'Qualified Graduate Aptitude Test in Engineering (GATE 2026) in Computer Science & Information Technology on 1st attempt.',
      highlights: [
        'Secured All India Rank AIR 4226 with GATE Score of 48.34 / 100.',
        'Demonstrated mastery in Computer Architecture, Theory of Computation, Algorithms, Compiler Design, and Operating Systems.'
      ],
      skills: ['AIR 4226', 'GATE Score: 48.34', 'Algorithms', 'Computer Science Theory']
    },
    {
      _id: 'edu_hsc',
      type: 'Education',
      role: 'Higher Secondary Certificate (HSC - Class 12)',
      company: 'Gujarat Secondary and Higher Secondary Education Board (GSEB)',
      location: 'Gujarat, India',
      period: '2021 – 2023',
      badge: 'Science Stream',
      description: 'Completed Higher Secondary Education focusing on Mathematics, Physics, and Chemistry (PCM).',
      highlights: [
        'Achieved 94.5 Percentile Rank (PR) in JEE Main competitive entrance exam.',
        'Built strong logical and mathematical problem-solving foundation.'
      ],
      skills: ['PCM Science', 'JEE Main 94.5 PR', 'Mathematics']
    },
    {
      _id: 'edu_ssc',
      type: 'Education',
      role: 'Secondary School Certificate (SSC - Class 10)',
      company: 'Gujarat Secondary and Higher Secondary Education Board (GSEB)',
      location: 'Gujarat, India',
      period: '2020 – 2021',
      badge: 'Academic Distinction',
      description: 'Completed Secondary School Education with top academic distinction.',
      highlights: [
        'Secured 85.00% overall score in GSEB Board Examinations.'
      ],
      skills: ['85.00% Score', 'Academic Merit']
    }
  ];

  // Filter logic
  const filteredEntries = selectedCategory === 'ALL'
    ? fullJourneyEntries
    : fullJourneyEntries.filter(entry => entry.type.toUpperCase() === selectedCategory);

  return (
    <div className="pt-28 pb-24 bg-[#050508] text-[#F8FAFC] min-h-screen">
      <div className="container-fluid space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#15D8B3]">Career & Education History</span>
            <h1 className="text-3xl font-extrabold text-[#F8FAFC]">My Professional & Academic Journey</h1>
            <p className="text-xs sm:text-sm text-[#F8FAFC]/75 font-light max-w-2xl">
              A comprehensive chronological timeline merging software engineering work experience, teaching assistant leadership, hackathon runner-up awards, academic degrees, and competitive ranks.
            </p>
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
                    : 'bg-[#0c0d14] text-[#F8FAFC]/75 border border-[#49A4BB]/20 hover:border-[#15D8B3] hover:text-[#15D8B3]'
                }`}
              >
                {cat === 'ALL' ? 'All Journey Entries' : cat === 'WORK' ? 'Work Experience' : 'Education & Ranks'}
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
                <option key={cat} value={cat} className="bg-[#050508] text-[#F8FAFC]">
                  {cat === 'ALL' ? 'All Journey Entries' : cat === 'WORK' ? 'Work Experience' : 'Education & Ranks'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative pl-6 md:pl-8 space-y-10 before:absolute before:left-2 md:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#15D8B3]">
          {filteredEntries.map((item, index) => {
            const isEducation = item.type.toLowerCase() === 'education';

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
                          {item.badge}
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
                      <span className="flex items-center gap-1.5 text-[#F8FAFC]/60">
                        <MapPin className="w-3.5 h-3.5 text-[#49A4BB]" />
                        {item.location}
                      </span>
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
                          {s}
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
