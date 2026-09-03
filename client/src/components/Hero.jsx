import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';
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
    : 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/Vishal_Baraiya_Resume.pdf';

  const email = profile?.email || 'baraiyavishalbhai32@gmail.com';
  const location = profile?.location || 'Gujarat, India';

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#050508] text-[#F8FAFC]">
      <div className="container-fluid relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column - Natural Developer Story */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Status Line */}
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#F8FAFC]/70">
              <span className="w-2 h-2 rounded-full bg-[#15D8B3]"></span>
              <span>Available for Software Engineering Roles &amp; Projects</span>
            </div>

            {/* Clean, Human-Scale Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#F8FAFC] leading-snug">
              Hi, I'm <span className="text-white font-bold">{name}</span> — Software Engineer building web applications, REST APIs, and developer tools.
            </h1>

            {/* Natural Introduction Paragraph */}
            <p className="text-sm text-[#F8FAFC]/75 max-w-xl font-normal leading-relaxed mx-auto lg:mx-0">
              Computer Science student at Darshan University (CGPA 9.24/10). Qualified GATE 2026 in CS (AIR 4226). I build web software using React, Next.js &amp; ASP.NET Core, develop AI RAG workflows, and contribute to open source projects.
            </p>

            {/* Tasteful Inline Credentials Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1.5 text-xs font-mono text-[#F8FAFC]/70 pt-1 pb-1">
              <span className="text-[#15D8B3] font-medium">GATE 2026 CS (AIR 4226)</span>
              <span className="text-white/20">•</span>
              <span>9.24 CGPA</span>
              <span className="text-white/20">•</span>
              <span>500+ LeetCode Solved</span>
              <span className="text-white/20">•</span>
              <span>Webpack Contributor</span>
            </div>

            {/* Refined Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link 
                to="/projects" 
                className="px-5 py-2.5 rounded-lg bg-[#0c0d14] border border-[#15D8B3]/60 text-white font-medium text-xs sm:text-sm hover:bg-[#15D8B3] hover:text-[#050508] transition-all flex items-center gap-2 no-underline cursor-pointer group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link 
                to="/contact" 
                className="px-5 py-2.5 rounded-lg bg-[#0c0d14] border border-white/10 text-[#F8FAFC]/80 font-medium text-xs sm:text-sm hover:border-white/30 hover:text-white transition-all flex items-center gap-2 no-underline cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#15D8B3]" />
                <span>Contact Me</span>
              </Link>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-[#0c0d14] border border-white/10 text-[#F8FAFC]/70 font-medium text-xs sm:text-sm hover:border-white/30 hover:text-white transition-all flex items-center gap-2 no-underline cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#15D8B3]" />
                <span>Resume PDF</span>
              </a>
            </div>

            {/* Minimal Social Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-3 text-xs font-mono text-[#F8FAFC]/65">
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[#15D8B3] transition-colors flex items-center gap-1.5 no-underline"
              >
                <Github className="w-3.5 h-3.5 text-[#15D8B3]" />
                <span>GitHub</span>
              </a>

              <a 
                href={linkedinUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[#15D8B3] transition-colors flex items-center gap-1.5 no-underline"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#15D8B3]" />
                <span>LinkedIn</span>
              </a>

              <a 
                href={`mailto:${email}`} 
                className="hover:text-[#15D8B3] transition-colors flex items-center gap-1.5 no-underline"
              >
                <Mail className="w-3.5 h-3.5 text-[#15D8B3]" />
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
