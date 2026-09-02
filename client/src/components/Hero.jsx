import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { Gojo3DCanvas } from './Gojo3DCanvas';

export const Hero = ({ profile }) => {
  const name = profile?.name || 'Vishal Baraiya';
  const githubUrl = profile?.githubUrl || 'https://github.com/mr-baraiya';
  const rawLinkedin = (profile?.linkedinUrl || profile?.linkedin || '').trim();
  const linkedinUrl = (rawLinkedin && rawLinkedin !== '#' && rawLinkedin !== 'https://linkedin.com') 
    ? rawLinkedin 
    : 'https://www.linkedin.com/in/baraiya-vishalbhai/';
  
  // Ignore '#' or empty strings stored in DB profile
  const rawResume = profile?.resumeUrl?.trim();
  const resumeUrl = (rawResume && rawResume !== '#' && rawResume !== '') 
    ? rawResume 
    : '/pdf/Vishal_Baraiya_Resume.pdf';

  const email = profile?.email || 'baraiyavishalbhai32@gmail.com';

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#050508] text-[#F8FAFC]">
      {/* Volumetric Cyan Ambient Background Aura Glow */}
      <div className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-[#15D8B3]/15 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#15D8B3]/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container-fluid relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Clean Human Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Minimal Unboxed Credential Line */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-mono text-[#F8FAFC]/80">
              <span className="w-2 h-2 rounded-full bg-[#15D8B3] animate-pulse"></span>
              <span className="text-[#15D8B3] font-semibold">GATE 2026 CS (AIR 4226)</span>
              <span className="text-white/20">•</span>
              <span>9.24 CGPA</span>
              <span className="text-white/20">•</span>
              <span>Full Stack</span>
              <span className="text-white/20">•</span>
              <span>AI/ML</span>
              <span className="text-white/20">•</span>
              <span>DevOps</span>
            </div>

            {/* Main Headline (Decreased Font Size) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8FAFC] leading-tight">
              Software Engineer building{' '}
              <span className="text-[#15D8B3] underline decoration-[#15D8B3]/40 underline-offset-8">
                scalable web applications, AI systems, and cloud-native solutions.
              </span>
            </h1>

            {/* Human Natural Description */}
            <p className="text-sm sm:text-base text-[#F8FAFC]/80 max-w-xl font-normal leading-relaxed mx-auto lg:mx-0">
              Hi, I'm <strong className="text-white font-semibold">{name}</strong>. I design responsive full-stack applications with React, Next.js & ASP.NET Core, engineer AI RAG pipelines with LLMs, and mentor junior developers.
            </p>

            {/* Clean Unboxed Key Metrics */}
            <div className="flex items-center justify-center lg:justify-start gap-8 sm:gap-12 pt-2 pb-1">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#15D8B3]">9.24</div>
                <div className="text-[11px] font-mono text-[#F8FAFC]/60 uppercase tracking-wider">B.Tech CGPA</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#15D8B3]">500+</div>
                <div className="text-[11px] font-mono text-[#F8FAFC]/60 uppercase tracking-wider">LeetCode Solved</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#15D8B3]">26K+</div>
                <div className="text-[11px] font-mono text-[#F8FAFC]/60 uppercase tracking-wider">Monthly Views</div>
              </div>
            </div>

            {/* 3 Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <Link 
                to="/projects" 
                className="px-6 py-3.5 rounded-lg bg-[#15D8B3] text-[#050508] font-bold text-sm hover:bg-[#15D8B3]/90 transition-all shadow-lg shadow-[#15D8B3]/25 flex items-center gap-2 no-underline cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link 
                to="/contact" 
                className="px-6 py-3.5 rounded-lg bg-[#0c0d12] text-[#F8FAFC] font-semibold text-sm border border-white/15 hover:border-[#15D8B3] hover:text-[#15D8B3] transition-all flex items-center gap-2 no-underline cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#15D8B3]" />
                <span>Let's Talk</span>
              </Link>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-lg bg-[#0c0d12] text-[#F8FAFC]/90 font-semibold text-sm border border-white/15 hover:border-white hover:text-white transition-all flex items-center gap-2 no-underline cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#15D8B3]" />
                <span>Resume PDF</span>
              </a>
            </div>

            {/* Minimal Social Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-3 border-t border-white/10 text-xs font-mono text-[#F8FAFC]/70">
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

          {/* Right Column - Transparent 3D Flying Model */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <Gojo3DCanvas />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
