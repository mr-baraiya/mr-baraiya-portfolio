import React, { useState } from 'react';
import { Calendar, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { SkeletonGrid, SkeletonTimelineItem } from './SkeletonLoader';

export const Experience = ({ experiences = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'WORK', 'EDUCATION'];

  const filteredExperiences = selectedCategory === 'ALL'
    ? experiences
    : experiences.filter(exp => (exp.type || 'Work').toUpperCase() === selectedCategory);

  return (
    <section id="experience" className="pt-4 sm:pt-6 pb-16 sm:pb-20 relative bg-[#050508] text-[#F8FAFC]">
      <div className="container-fluid">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#15D8B3]">
              <Briefcase className="w-3.5 h-3.5 text-[#15D8B3]" />
              <span>Career Journey & Academic Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
              Experience & Education
            </h2>
          </div>

          {/* Desktop Filter Tabs */}
          <div className="hidden sm:flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${selectedCategory === cat
                    ? 'bg-[#15D8B3] text-[#050508] font-bold shadow-md'
                    : 'bg-[#050814] text-[#F8FAFC]/75 border border-[#49A4BB]/20 hover:border-[#15D8B3] hover:text-[#15D8B3]'
                  }`}
              >
                {cat === 'ALL' ? 'All Entries' : cat === 'WORK' ? 'Work Experience' : 'Education'}
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
                  {cat === 'ALL' ? 'All Entries' : cat === 'WORK' ? 'Work Experience' : 'Education'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Timeline Container */}
        {experiences.length === 0 ? (
          <SkeletonGrid count={4} Component={SkeletonTimelineItem} gridClassName="grid grid-cols-1 gap-6 max-w-4xl mx-auto" />
        ) : (
          <div className="max-w-5xl mx-auto relative pl-6 md:pl-8 space-y-10 before:absolute before:left-2 md:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#15D8B3]">
            {filteredExperiences.map((exp, index) => {
              const isEducation = (exp.type || '').toLowerCase() === 'education';

              return (
                <div key={exp._id || index} className="relative group">

                  {/* Timeline Dot Icon */}
                  <div className="absolute -left-[31px] md:-left-[35px] top-2 w-7 h-7 rounded-full bg-[#050508] border-2 border-[#15D8B3] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    {isEducation ? (
                      <GraduationCap className="w-3.5 h-3.5 text-[#15D8B3]" />
                    ) : (
                      <Briefcase className="w-3.5 h-3.5 text-[#15D8B3]" />
                    )}
                  </div>

                  {/* Card Container */}
                  <div className="bg-[#050508] border border-[#49A4BB]/30 rounded-xl p-6 sm:p-8 hover:border-[#15D8B3] transition-all duration-300 shadow-xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${isEducation
                              ? 'bg-[#15D8B3]/10 text-[#15D8B3] border-[#15D8B3]/30'
                              : 'bg-[#15D8B3]/10 text-[#15D8B3] border-[#15D8B3]/30'
                            }`}>
                            {isEducation ? 'Education' : 'Work Experience'}
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
                        <span className="flex items-center gap-1.5 text-[#F8FAFC]/60">
                          <MapPin className="w-3.5 h-3.5 text-[#49A4BB]" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <p className="text-[#F8FAFC]/80 text-xs sm:text-sm leading-relaxed font-light">
                      {exp.description}
                    </p>

                    {exp.highlights && exp.highlights.length > 0 && (
                      <div className="pt-3 border-t border-[#49A4BB]/20 space-y-2">
                        <span className="text-[10px] font-mono font-bold text-[#15D8B3] uppercase tracking-wider block">
                          Key Achievements & Responsibilities
                        </span>
                        <ul className="space-y-1.5 list-disc list-inside text-xs text-[#F8FAFC]/85 font-mono">
                          {exp.highlights.map((h, i) => (
                            <li key={i} className="leading-relaxed">{h}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default Experience;
