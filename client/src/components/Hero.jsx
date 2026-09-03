import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react';
import { Gojo3DCanvas } from './Gojo3DCanvas';

export const Hero = ({ profile }) => {
  const name = profile?.name || 'Vishal Baraiya';
  const githubUrl = profile?.githubUrl || 'https://github.com/mr-baraiya';
  const rawLinkedin = (profile?.linkedinUrl || profile?.linkedin || '').trim();
  const linkedinUrl = (rawLinkedin && rawLinkedin !== '#' && rawLinkedin !== 'https://linkedin.com') 
    ? rawLinkedin 
    : 'https://www.linkedin.com/in/baraiya-vishalbhai/';
  
  const rawResume = profile?.resumeUrl?.trim();
  const resumeUrl = (rawResume && rawResume !== '#' && rawResume !== '') 
    ? rawResume 
    : '/pdf/Vishal_Baraiya_Resume.pdf';

  const email = profile?.email || 'baraiyavishalbhai32@gmail.com';
  const location = profile?.location || 'Gujarat, India';

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#050508] text-[#F8FAFC]">
      {/* Soft Ambient Background Aura */}
      <div className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-[#15D8B3]/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#15D8B3]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="container-fluid relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Authentic Developer Story */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status & Credential Strip */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0c0d14] border border-white/10 text-xs font-mono text-[#F8FAFC]/80">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15D8B3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15D8B3]"></span>
              </span>
              <span className="text-[#15D8B3] font-semibold">GATE 2026 CS (AIR 4226)</span>
              <span className="text-white/20">•</span>
              <span>B.Tech CSE (CGPA 9.24)</span>
              <span className="text-white/20">•</span>
              <span className="text-[#F8FAFC]/60 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#15D8B3]" />
                {location}
              </span>
            </div>

            {/* Clear, Grounded Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.2]">
              Building reliable web software &amp;{' '}
              <span className="text-[#15D8B3]">
                intelligent developer tools.
              </span>
            </h1>

            {/* Natural Introduction Paragraph */}
            <p className="text-sm sm:text-base text-[#F8FAFC]/80 max-w-xl font-light leading-relaxed mx-auto lg:mx-0">
              Hi, I'm <strong className="text-white font-medium">{name}</strong>. I'm a Computer Science student at Darshan University. I design full-stack web applications with React, Next.js &amp; ASP.NET Core, build AI RAG workflows, and assist junior developers as a Teaching Assistant.
            </p>

            {/* Key Accomplishments Stat Bar */}
            <div className="grid grid-cols-3 gap-6 pt-2 pb-1 border-y border-white/5 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#15D8B3]">9.24</div>
                <div className="text-[11px] font-mono text-[#F8FAFC]/60 uppercase tracking-wider mt-0.5">B.Tech CGPA</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#15D8B3]">500+</div>
                <div className="text-[11px] font-mono text-[#F8FAFC]/60 uppercase tracking-wider mt-0.5">LeetCode Solved</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">18+</div>
                <div className="text-[11px] font-mono text-[#F8FAFC]/60 uppercase tracking-wider mt-0.5">Webpack PRs</div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link 
                to="/projects" 
                className="px-6 py-3.5 rounded-xl bg-[#15D8B3] text-[#050508] font-bold text-sm hover:bg-[#12be9d] transition-all shadow-lg shadow-[#15D8B3]/20 flex items-center gap-2 no-underline cursor-pointer group"
              >
                <span>Explore Featured Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link 
                to="/contact" 
                className="px-6 py-3.5 rounded-xl bg-[#0c0d14] text-[#F8FAFC] font-semibold text-sm border border-white/10 hover:border-[#15D8B3]/60 hover:text-[#15D8B3] transition-all flex items-center gap-2 no-underline cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#15D8B3]" />
                <span>Get In Touch</span>
              </Link>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-[#0c0d14] text-[#F8FAFC]/80 font-semibold text-sm border border-white/10 hover:border-white hover:text-white transition-all flex items-center gap-2 no-underline cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#15D8B3]" />
                <span>Resume PDF</span>
              </a>
            </div>

            {/* Minimal Social Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-3 text-xs font-mono text-[#F8FAFC]/70">
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[#15D8B3] transition-colors flex items-center gap-1.5 no-underline"
              >
                <Github className="w-4 h-4 text-[#15D8B3]" />
                <span>GitHub</span>
              </a>

              <a 
                href={linkedinUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[#15D8B3] transition-colors flex items-center gap-1.5 no-underline"
              >
                <Linkedin className="w-4 h-4 text-[#15D8B3]" />
                <span>LinkedIn</span>
              </a>

              <a 
                href={`mailto:${email}`} 
                className="hover:text-[#15D8B3] transition-colors flex items-center gap-1.5 no-underline"
              >
                <Mail className="w-4 h-4 text-[#15D8B3]" />
                <span>{email}</span>
              </a>
            </div>

          </div>

          {/* Right Column - 3D Interactive Model */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <Gojo3DCanvas />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
