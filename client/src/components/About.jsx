import React from 'react';
import { User, Award, GraduationCap, Code2, Cpu, CheckCircle2, BookOpen, GitPullRequest, Terminal, MessageCircle, Linkedin, Instagram, ExternalLink, Mail, MapPin, Phone, MessageSquare } from 'lucide-react';

export const About = ({ profile = {} }) => {
  const {
    name = 'Vishal Baraiya',
    role = 'Software Engineer & CS Student',
    bio = 'Computer Science student at Darshan University (9.24 CGPA). GATE 2026 CS Qualified (AIR 4226). I build full-stack web applications, work with AI document pipelines, and mentor junior developers.',
    aboutText1 = "Hi, I'm Vishal Baraiya! I'm a Computer Science student and software developer based in Gujarat, India. I enjoy solving practical engineering challenges — from building responsive React/Next.js web apps and ASP.NET Core REST APIs to configuring AI RAG pipelines and automation workflows.",
    aboutText2 = "Currently pursuing my B.Tech at Darshan University with a 9.24 CGPA, I work with JavaScript, TypeScript, C#, Python, React, ASP.NET Core, Node.js, and PostgreSQL/SQL Server. I've solved 500+ algorithm problems on LeetCode, qualified GATE 2026 in Computer Science (AIR 4226), and cleared TCS CodeVita.",
    phone = '+91 7383359679',
    whatsapp = profile?.whatsappUrl || profile?.whatsapp || 'https://wa.me/917383359679',
    linkedin = profile?.linkedinUrl || profile?.linkedin || 'https://www.linkedin.com/in/baraiya-vishalbhai/',
    instagram = profile?.instagramUrl || profile?.instagram || 'https://www.instagram.com/vishalbaraiya_1014/',
    email = profile?.email || 'baraiyavishalbhai32@gmail.com',
    location = profile?.location || 'Botad, Gujarat, India (Open to Remote)'
  } = profile;

  const socialConnectButtons = [
    {
      name: 'WhatsApp',
      url: whatsapp,
      handle: phone,
      icon: MessageCircle,
      badge: 'Fast Reply'
    },
    {
      name: 'LinkedIn',
      url: linkedin,
      handle: 'in/baraiya-vishalbhai',
      icon: Linkedin,
      badge: 'Professional Network'
    },
    {
      name: 'Instagram',
      url: instagram,
      handle: '@vishalbaraiya_1014',
      icon: Instagram,
      badge: 'Personal & Tech'
    }
  ];

  const achievements = [
    {
      icon: Award,
      badge: 'National Exam',
      title: 'GATE 2026 CS Qualified',
      description: 'Secured All India Rank AIR 4226 (Score: 48.34 / 100) in Computer Science & Information Technology.'
    },
    {
      icon: GraduationCap,
      badge: 'Academic Rank',
      title: 'Darshan University (CGPA 9.24 / 10)',
      description: 'B.Tech CSE student (2023 – 2027) with top academic performance. JEE Main 94.5 PR and 85% Class 10.'
    },
    {
      icon: Code2,
      badge: 'Hackathons',
      title: 'Code 2 Trade Hackathon Runner-up',
      description: 'Led team to 2nd place building algorithmic trading platforms. Offline finalist at Odoo Hackathon 2025.'
    },
    {
      icon: Terminal,
      badge: 'Problem Solving',
      title: '500+ LeetCode Solved & CodeVita',
      description: 'Solved 500+ DSA problems on LeetCode. Qualified Round 1 of TCS CodeVita global competitive contest.'
    },
    {
      icon: BookOpen,
      badge: 'Mentorship',
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
    <section id="about" className="pt-8 pb-20 relative bg-[#050508] text-[#F8FAFC]">
      <div className="container-fluid space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2 text-center lg:text-left border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c0d14] border border-[#15D8B3]/30 text-xs font-mono text-[#15D8B3]">
            <User className="w-3.5 h-3.5" />
            <span>Background &amp; Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
            About {name}
          </h2>
          <p className="text-sm text-[#F8FAFC]/75 max-w-2xl font-light leading-relaxed">
            {bio}
          </p>
        </div>

        {/* Biography Narrative */}
        <div className="bg-[#0c0d14] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#15D8B3]" />
            <span>Engineering Approach &amp; Background</span>
          </h3>
          <div className="space-y-4 text-sm text-[#F8FAFC]/80 leading-relaxed font-light">
            <p>{aboutText1}</p>
            <p>{aboutText2}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
            <div>
              <span className="text-[#15D8B3] font-extrabold block text-base">9.24 / 10</span>
              <span className="text-[#F8FAFC]/60 uppercase text-[10px]">B.Tech CGPA</span>
            </div>
            <div>
              <span className="text-white font-extrabold block text-base">AIR 4226</span>
              <span className="text-[#F8FAFC]/60 uppercase text-[10px]">GATE 2026 CS</span>
            </div>
            <div>
              <span className="text-[#15D8B3] font-extrabold block text-base">500+ Solved</span>
              <span className="text-[#F8FAFC]/60 uppercase text-[10px]">LeetCode Problems</span>
            </div>
            <div>
              <span className="text-white font-extrabold block text-base">18+ PRs</span>
              <span className="text-[#F8FAFC]/60 uppercase text-[10px]">Webpack Merged</span>
            </div>
          </div>
        </div>

        {/* Key Accomplishments Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-[#15D8B3]" />
            <span>Key Accomplishments &amp; Milestones</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-[#0c0d14] border border-white/10 rounded-2xl p-6 hover:border-[#15D8B3]/50 transition-all duration-300 shadow-xl space-y-4 group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#050508] border border-white/10 flex items-center justify-center text-[#15D8B3] group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#15D8B3]">
                        {item.badge}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-[#15D8B3] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#F8FAFC]/80 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* NPTEL Certifications & Coursework */}
        <div className="bg-[#0c0d14] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#15D8B3]" />
            <span>NPTEL Elite Certifications &amp; Coursework</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {certifications.map((cert, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#050508] border border-white/10 space-y-1">
                <div className="text-sm font-bold text-white">{cert.name}</div>
                <div className="text-xs text-[#F8FAFC]/70 font-mono">{cert.org}</div>
                <div className="text-xs font-mono font-bold text-[#15D8B3]">{cert.score}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Social Channels Strip */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#15D8B3] uppercase tracking-wider">
            <MessageSquare className="w-4 h-4 text-[#15D8B3]" />
            <span>Direct Social Channels</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {socialConnectButtons.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0c0d14] border border-white/10 hover:border-[#15D8B3]/50 p-5 rounded-2xl transition-all duration-300 group shadow-xl flex items-center justify-between no-underline"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#050508] border border-white/10 flex items-center justify-center text-[#15D8B3] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-[#15D8B3] transition-colors flex items-center gap-1.5">
                        <span>{social.name}</span>
                        <ExternalLink className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                      <div className="text-xs font-mono text-[#F8FAFC]/70 mt-0.5">{social.handle}</div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#15D8B3]">
                    {social.badge}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
