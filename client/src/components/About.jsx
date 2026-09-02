import React from 'react';
import { User, Award, GraduationCap, Code2, Cpu, CheckCircle2, BookOpen, GitPullRequest, Terminal } from 'lucide-react';

export const About = ({ profile }) => {
  const achievements = [
    {
      icon: Award,
      badge: 'Competitive Exam',
      title: 'GATE 2026 CS Qualified',
      description: 'Secured All India Rank AIR 4226 (GATE Score: 48.34 / 100) in Computer Science & Information Technology.'
    },
    {
      icon: GraduationCap,
      badge: 'Academic Distinction',
      title: 'Darshan University (CGPA 9.24/10)',
      description: 'B.Tech CSE student (2023 – 2027) with top academic ranking. JEE Main 94.5 PR and 85% Class 10.'
    },
    {
      icon: Code2,
      badge: 'Hackathons & Contests',
      title: 'Code 2 Trade Hackathon Runner-up',
      description: 'Led team to 2nd place building algorithmic trading platforms. Offline finalist at Odoo Hackathon 2025.'
    },
    {
      icon: Terminal,
      badge: 'Problem Solving & Coding',
      title: '500+ LeetCode Solved & CodeVita',
      description: 'Solved 500+ DSA problems on LeetCode. Qualified Round 1 of TCS CodeVita global competitive contest.'
    },
    {
      icon: BookOpen,
      badge: 'Academic Leadership',
      title: 'Teaching Assistant (CSE)',
      description: 'Conducted lab sessions in C, Python, Digital Logic & Logic Development for junior CSE students.'
    },
    {
      icon: GitPullRequest,
      badge: 'Open Source',
      title: 'Webpack & WoCS Contributor',
      description: 'Project Admin at Winter of Code Social (WoCS), Hacktoberfest 2025 contributor, and Webpack open source commits.'
    }
  ];

  const certifications = [
    { name: 'Business Intelligence & Analytics', org: 'NPTEL Elite Certification', score: '76% Score' },
    { name: 'Introduction to Machine Learning', org: 'NPTEL Certification', score: '64% Score' },
    { name: 'Blockchain and its Applications', org: 'NPTEL Certification', score: '66% Score' },
  ];

  return (
    <section id="about" className="pt-20 pb-20 relative bg-[#050508] text-[#F8FAFC]">
      <div className="container-fluid space-y-16">
        
        {/* Section Header */}
        <div className="space-y-3 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c0d12] border border-[#15D8B3]/30 text-xs font-mono text-[#15D8B3]">
            <User className="w-3.5 h-3.5" />
            <span>Detailed Background & Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
            Engineering Background & Resume Achievements
          </h2>
          <p className="text-sm sm:text-base text-[#F8FAFC]/75 max-w-2xl font-light">
            Combining rigorous computer science foundations, competitive exam qualifications, real-world full-stack & AI projects, and hands-on teaching experience.
          </p>
        </div>

        {/* Detailed Resume Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-[#0c0d14] border border-white/10 rounded-xl p-6 hover:border-[#15D8B3]/50 transition-all duration-300 shadow-xl space-y-4 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[#15D8B3]/10 border border-[#15D8B3]/30 flex items-center justify-center text-[#15D8B3] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#15D8B3]">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#15D8B3] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#F8FAFC]/80 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* NPTEL Certifications & Impact Metrics Bar */}
        <div className="bg-[#0c0d14] border border-white/10 rounded-2xl p-8 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#15D8B3]" />
            <span>NPTEL Elite Certifications & Production Impact</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#050508] border border-white/10 space-y-1">
                <div className="text-sm font-bold text-white">{cert.name}</div>
                <div className="text-xs text-[#F8FAFC]/70 font-mono">{cert.org}</div>
                <div className="text-xs font-mono font-bold text-[#15D8B3]">{cert.score}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
