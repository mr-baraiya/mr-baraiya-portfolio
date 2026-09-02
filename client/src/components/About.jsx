import React from 'react';
import { User, Award, GraduationCap, Code2, Cpu, CheckCircle2, BookOpen, GitPullRequest, Terminal, MessageCircle, Linkedin, Instagram, ExternalLink, Mail, MapPin, Phone, MessageSquare } from 'lucide-react';

export const About = ({ profile = {} }) => {
  const {
    name = 'Vishal Baraiya',
    role = 'Software Engineer & CS Student | Web Development, AI/ML & DevOps',
    bio = 'Computer Science student at Darshan University (9.24 CGPA). I build web applications, explore AI/ML RAG pipelines, and share what I learn through teaching.',
    aboutText1 = "Hi, I'm Vishal Baraiya! I'm a Computer Science student and software developer based in Botad, Gujarat. I love building practical software solutions — from responsive web apps and REST APIs to AI-driven automation workflows.",
    aboutText2 = "Currently pursuing my B.Tech at Darshan University with a 9.24 CGPA, I work with React, Next.js, Node.js, ASP.NET Core, FastAPI, and Python. I've solved 300+ problems on LeetCode, qualified GATE 2026 (AIR 4226), and cleared TCS CodeVita.",
    phone = '+91 7383359679',
    whatsapp = profile?.whatsappUrl || profile?.whatsapp || 'https://wa.me/917383359679',
    linkedin = profile?.linkedinUrl || profile?.linkedin || 'https://www.linkedin.com/in/baraiya-vishalbhai/',
    instagram = profile?.instagramUrl || profile?.instagram || 'https://www.instagram.com/vishalbaraiya_1014/',
    email = profile?.email || 'baraiyavishalbhai32@gmail.com',
    location = profile?.location || 'Botad, Gujarat, India - 364710 (Open to Remote)'
  } = profile;

  const socialConnectButtons = [
    {
      name: 'WhatsApp',
      url: whatsapp,
      handle: phone,
      icon: MessageCircle,
      badge: 'Fast Response'
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
      badge: 'Personal & Tech Updates'
    }
  ];

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
            About {name}
          </h2>
          <p className="text-sm sm:text-base text-[#F8FAFC]/75 max-w-2xl font-light leading-relaxed">
            {bio}
          </p>
        </div>

        {/* Biography Narrative */}
        <div className="bg-transparent sm:bg-[#0c0d14] border-0 sm:border border-white/10 rounded-2xl p-0 sm:p-8 space-y-6">
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#15D8B3]" />
            <span>Engineering Philosophy & Background</span>
          </h3>
          <div className="space-y-4 text-sm text-[#F8FAFC]/80 leading-relaxed font-light">
            <p>{aboutText1}</p>
            <p>{aboutText2}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
            <div>
              <span className="text-[#15D8B3] font-bold block text-base">9.24 / 10</span>
              <span className="text-[#F8FAFC]/60 uppercase">B.Tech CGPA</span>
            </div>
            <div>
              <span className="text-white font-bold block text-base">AIR 4226</span>
              <span className="text-[#F8FAFC]/60 uppercase">GATE 2026 CS</span>
            </div>
            <div>
              <span className="text-[#15D8B3] font-bold block text-base">500+ Solved</span>
              <span className="text-[#F8FAFC]/60 uppercase">LeetCode Problems</span>
            </div>
            <div>
              <span className="text-white font-bold block text-base">18+ PRs</span>
              <span className="text-[#F8FAFC]/60 uppercase">Webpack Merged</span>
            </div>
          </div>
        </div>

        {/* Detailed Resume Achievements Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-[#15D8B3]" />
            <span>Key Accomplishments & Milestones</span>
          </h3>

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

        {/* NPTEL Certifications & Coursework Bar */}
        <div className="bg-[#0c0d14] border border-white/10 rounded-2xl p-8 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#15D8B3]" />
            <span>NPTEL Elite Certifications & Coursework</span>
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

        {/* Quick Social Connect Strip (WhatsApp, LinkedIn, Instagram) - PLACED AT THE BOTTOM */}
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
                  className="bg-[#0c0d14] border border-white/10 hover:border-[#15D8B3]/50 p-5 rounded-2xl transition-all duration-300 group shadow-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#15D8B3]/10 border border-[#15D8B3]/30 flex items-center justify-center text-[#15D8B3] group-hover:scale-110 transition-transform">
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
