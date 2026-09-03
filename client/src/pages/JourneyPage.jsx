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

export const JourneyPage = ({ experiences = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    { key: 'ALL', label: 'All Journey Entries' },
    { key: 'WORK', label: 'Work Experience' },
    { key: 'EDUCATION', label: 'Education & Ranks' }
  ];

  const dbExperiences = Array.isArray(experiences) ? experiences : [];

  const filteredEntries = selectedCategory === 'ALL'
    ? dbExperiences
    : dbExperiences.filter(entry => (entry.type || '').toUpperCase() === selectedCategory);

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
              Database Journey Timeline
            </span>
            <span className="text-xs font-mono text-[#F8FAFC]/50 hidden sm:inline">
              Work &amp; Academic Milestones
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {dbExperiences.slice(0, 4).map((step, idx) => (
              <div
                key={step._id || idx}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-[#49A4BB]/20 bg-[#050508]/60 text-center"
              >
                <div className="w-8 h-8 rounded-full bg-[#15D8B3]/10 border border-[#15D8B3]/40 flex items-center justify-center mb-2 font-mono font-bold text-xs text-[#15D8B3]">
                  0{idx + 1}
                </div>
                <span className="text-xs font-bold truncate max-w-full text-white">
                  {step.type || 'Milestone'}
                </span>
                <span className="text-[10px] text-[#F8FAFC]/50 font-mono mt-1 truncate max-w-full">
                  {step.period}
                </span>
              </div>
            ))}
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
