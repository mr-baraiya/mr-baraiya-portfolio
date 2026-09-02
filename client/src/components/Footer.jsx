import React from 'react';
import { Link } from 'react-router-dom';
import {
  Github,
  Linkedin,
  Code,
  Trophy,
  Award,
  Globe,
  MessageCircle,
  Instagram,
  Twitter,
  Youtube,
  ShieldCheck,
  Mail,
  ArrowRight,
  ArrowUp
} from 'lucide-react';

export const Footer = ({ profileData = {} }) => {
  const {
    name = 'Vishal Baraiya',
    role = 'B.Tech CSE Student & Full-Stack Developer',
    statusBadge = 'Open to Internship & Full-Time Roles',
    github = profileData?.githubUrl || profileData?.github || 'https://github.com/mr-baraiya',
    linkedin = profileData?.linkedinUrl || profileData?.linkedin || 'https://www.linkedin.com/in/baraiya-vishalbhai/',
    leetcode = 'https://leetcode.com/u/mr-baraiya/',
    codechef = 'https://www.codechef.com/users/baraiyavishal',
    hackerrank = 'https://www.hackerrank.com/profile/vvbaraiya32',
    kaggle = 'https://www.kaggle.com/mrbaraiya',
    huggingface = 'https://huggingface.co/mr-baraiya',
    twitter = 'https://x.com/mr_baraiya_32',
    youtube = 'https://www.youtube.com/@Vi.685_junior',
    instagram = 'https://www.instagram.com/mr_baraiya_32/',
    whatsapp = 'https://wa.me/917383359679',
    email = 'baraiyavishalbhai32@gmail.com'
  } = profileData;

  const socialLinks = [
    { name: 'GitHub', url: github, icon: Github },
    { name: 'LinkedIn', url: linkedin, icon: Linkedin },
    { name: 'LeetCode', url: leetcode, icon: Code },
    { name: 'CodeChef', url: codechef, icon: Trophy },
    { name: 'Kaggle', url: kaggle, icon: Globe },
    { name: 'HackerRank', url: hackerrank, icon: Award },
    { name: 'HuggingFace', url: huggingface, icon: Globe },
    { name: 'Twitter', url: twitter, icon: Twitter },
    { name: 'YouTube', url: youtube, icon: Youtube },
    { name: 'WhatsApp', url: whatsapp, icon: MessageCircle },
    { name: 'Instagram', url: instagram, icon: Instagram },
  ];

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Skills', path: '/skills' },
    { label: 'Projects', path: '/projects' },
    { label: 'Journey', path: '/journey' },
    { label: 'Achievements', path: '/achievements' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#49A4BB]/20 bg-[#050508] text-[#F8FAFC] pt-16 pb-10 relative z-10 font-sans">
      <div className="container-fluid space-y-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Col 1: Developer Info & Personal Bio Tagline (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-[#F8FAFC] no-underline group">
              <img src="/logo.svg" alt="Mr. Baraiya Logo" className="w-8 h-8 object-contain transition-transform group-hover:scale-110" />
              <span>{name}</span>
            </Link>
            
            <p className="text-xs text-[#F8FAFC]/80 max-w-md font-medium leading-relaxed">
              {role}
            </p>

            <div className="text-xs font-mono font-semibold text-[#15D8B3] flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-[#15D8B3] shrink-0" />
              <span>{statusBadge}</span>
            </div>
          </div>

          {/* Col 2: Quick Links Navigation (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#15D8B3] uppercase">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#F8FAFC]/75 hover:text-[#15D8B3] transition-colors no-underline block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Developer Profiles & Single-Line Contact Bar (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#15D8B3] uppercase">
                PROFILES & CONTACT
              </h4>
              
              <button
                onClick={scrollToTop}
                className="p-2 rounded-lg bg-[#15D8B3] text-[#050508] hover:bg-[#15D8B3]/90 font-bold transition-all cursor-pointer shadow-md"
                title="Back to Top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

            {/* Grid of Social Profile Links with Admin Panel below YouTube */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4">
              {socialLinks.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#F8FAFC]/80 hover:text-[#15D8B3] transition-colors no-underline group"
                    title={item.name}
                  >
                    <IconComponent className="w-4 h-4 text-[#15D8B3] group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </a>
                );
              })}

              {/* Admin Panel Link placed right below YouTube in Column 3 */}
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-2 text-xs font-mono text-[#F8FAFC]/80 hover:text-[#15D8B3] transition-colors no-underline group"
                title="Admin Panel Login"
              >
                <ShieldCheck className="w-4 h-4 text-[#15D8B3] group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="truncate">Admin Panel</span>
              </Link>
            </div>

            {/* Contact Email Bar */}
            <div className="pt-3 border-t border-[#49A4BB]/10 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar whitespace-nowrap text-xs font-mono text-[#F8FAFC]/80">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-1.5 text-[#F8FAFC]/90 hover:text-[#15D8B3] transition-colors no-underline shrink-0"
              >
                <Mail className="w-3.5 h-3.5 text-[#15D8B3] shrink-0" />
                <span>{email}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar - Clean Copyright Only */}
        <div className="pt-4 flex items-center justify-between text-[11px] font-mono text-[#F8FAFC]/60">
          <span>
            © {new Date().getFullYear()} Vishal Baraiya. Designed & engineered with modern technologies.
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
