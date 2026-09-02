import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github, Database, Code, Cpu, Server, BookOpen, Layers, CheckCircle2, GraduationCap, Trophy, GitPullRequest, MapPin, Calendar, Terminal } from 'lucide-react';
import Hero from '../components/Hero';
import OpenSourceContributions from '../components/OpenSourceContributions';
import GitHubActivity from '../components/GitHubActivity';
import LeetCodeStats from '../components/LeetCodeStats';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';

export const Home = ({ profile, projects, skills, experiences }) => {

  // 4 Featured Main Projects from MongoDB Database with Exact Verified Live URLs and New Cover Images
  const featuredProjectsDetail = [
    {
      _id: 'agrosmart-1',
      title: 'AgroSmart – Smart Agriculture Management System',
      category: 'Full-Stack Production App',
      image: '/images/projects/agrosmart.png',
      tech: ['React.js', 'ASP.NET Core 8', 'SQL Server', 'n8n', 'OpenWeatherMap', 'Azure', 'SmarterASP.NET'],
      highlights: [
        'Built full-stack agriculture platform for farm, field & crop management with real-time weather & sensor monitoring.',
        'Developed ASP.NET Core REST APIs with Entity Framework, JWT authentication & role-based access control (Admin/User).',
        'Integrated n8n automated email security alerts and AGMARKNET market price intelligence.',
        'Deployed across Azure, Render & SmarterASP.NET. Achieved 26K+ monthly pageviews with 2K+ active users.'
      ],
      liveUrl: 'https://ecoagrosmart.netlify.app/',
      githubUrl: 'https://github.com/mr-baraiya/AgroSmart'
    },
    {
      _id: 'moms-2',
      title: 'MOMS – Minutes of Meeting Management System',
      category: 'Enterprise Web Platform',
      image: '/images/projects/moms.png',
      tech: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Jitsi Meet', 'Vercel'],
      highlights: [
        'Built enterprise meeting management platform supporting scheduling, attendance tracking & automated PDF report generation.',
        'Implemented JWT role-based access control (Admin, Convener, Staff) with Prisma ORM data modeling.',
        'Integrated Jitsi Meet for real-time video conferencing inside virtual meeting rooms.'
      ],
      liveUrl: 'https://moms-minutes-of-meeting-system.vercel.app/',
      githubUrl: 'https://github.com/mr-baraiya/MOMS-Minutes-_of_Meeting_System'
    },
    {
      _id: 'weather-3',
      title: 'Weather Notify & PDF AI MCQ Generator',
      category: 'AI/ML & Weather Intelligence',
      image: '/images/projects/weather.png',
      tech: ['FastAPI', 'Python', 'Groq Llama 3.3 70B', 'RAG Pipeline', 'OpenWeatherMap', 'Vercel'],
      highlights: [
        'Built automated real-time weather alert notification app and AI-powered question generator from PDF documents.',
        'Implemented RAG (Retrieval-Augmented Generation) pipeline with vector embeddings to eliminate AI hallucinations.',
        'Integrated OpenWeatherMap API & email automation for instant severe weather alerts.'
      ],
      liveUrl: 'https://weather-notify-tau.vercel.app/',
      githubUrl: 'https://github.com/mr-baraiya/weather-notify'
    },
    {
      _id: 'impactmeter-4',
      title: 'ImpactMeter – Algorithmic Performance & Trading Analytics',
      category: 'Hackathon Runner-Up Project',
      image: '/images/projects/impactmeter.png',
      tech: ['React.js', 'Node.js', 'Express', 'Chart.js', 'Tailwind CSS', 'GitHub Pages'],
      highlights: [
        'Built algorithmic trading analytics platform during Code 2 Trade Hackathon 2025 (Secured Runner-Up position).',
        'Features real-time price charts, portfolio impact metering, trade execution tracking & performance metrics.'
      ],
      liveUrl: 'https://mr-baraiya.github.io/ImpactMeter/',
      githubUrl: 'https://github.com/mr-baraiya/ImpactMeter'
    }
  ];

  // Core Technical Stack Categories
  const coreTechCategories = [
    {
      icon: Layers,
      category: 'PERN & Modern Full-Stack',
      tags: ['PostgreSQL', 'Express.js', 'React 19', 'Node.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      description: 'Building responsive full-stack applications, SPA & SSR web apps, and scalable RESTful API services.'
    },
    {
      icon: Database,
      category: 'Databases (SQL & NoSQL)',
      tags: ['PostgreSQL', 'Microsoft SQL Server', 'MongoDB', 'Supabase', 'Firebase'],
      description: 'Relational database schema design, Prisma ORM, Entity Framework Core, indexing, and NoSQL document stores.'
    },
    {
      icon: Code,
      category: '.NET Core & Enterprise C#',
      tags: ['ASP.NET Core 8', 'C#', 'Entity Framework Core', 'REST Web APIs', 'Blazor'],
      description: 'Developing secure REST APIs, role-based JWT authentication, EF Core migrations, and backend microservices.'
    },
    {
      icon: Cpu,
      category: 'AI / ML & LLM Engineering',
      tags: ['RAG Pipelines', 'FastAPI', 'Python', 'Groq Llama 3.3', 'Vector Search', 'n8n Automation'],
      description: 'Architecting AI-powered document processing systems, vector embeddings, prompt engineering, and LLM APIs.'
    },
    {
      icon: Server,
      category: 'DevOps & Cloud Infrastructure',
      tags: ['Docker', 'Git / GitHub', 'GitHub Actions', 'Vercel', 'Render', 'Azure'],
      description: 'Containerized deployments, automated CI/CD pipelines, CDN edge delivery, and cloud hosting workflows.'
    },
    {
      icon: BookOpen,
      category: 'Teaching & Technical Mentorship',
      tags: ['CSE Teaching Assistant', 'C Programming', 'Python', 'Digital Logic', 'DSA Mentorship'],
      description: 'Conducted university lab sessions, assisted 100+ students in debugging & logic development, and 500+ LeetCode DSA solves.'
    }
  ];

  // High-Impact Work Experience & Roles Timeline Data
  const experienceTimeline = [
    {
      icon: GraduationCap,
      role: 'Teaching Assistant — Computer Science & Engineering',
      company: 'Darshan University',
      location: 'Rajkot, Gujarat',
      period: 'Dec 2025 – Apr 2026',
      badge: 'Academic Leadership',
      bullets: [
        'Conducted lab sessions for junior B.Tech CSE students in C Programming, Python, Digital Logic, and Logic Development.',
        'Assisted 100+ students in understanding core programming concepts, debugging complex code, and completing lab assignments.'
      ],
      skills: ['C Programming', 'Python', 'Digital Logic', 'Logic Development', 'Student Mentorship']
    },
    {
      icon: Trophy,
      role: 'Team Leader — Code 2 Trade Hackathon 2025',
      company: 'Darshan University & Odoo Hackathon 2025 Finalist',
      location: 'Rajkot & Gandhinagar',
      period: '2025',
      badge: 'Hackathon Runner-Up',
      bullets: [
        'Led development team in building an algorithmic trading solution and coordinating overall architecture and implementation tasks.',
        'Secured Runner-Up position at Code 2 Trade Hackathon 2025 and advanced to offline finalist round of Odoo Hackathon 2025 in Gandhinagar.'
      ],
      skills: ['Algorithmic Trading', 'React.js', 'Node.js', 'System Architecture', 'Team Leadership']
    },
    {
      icon: GitPullRequest,
      role: 'Project Admin & Open Source Contributor',
      company: 'Winter of Code Social (WoCS) & Webpack',
      location: 'Open Source Community',
      period: '2025',
      badge: 'Open Source Community',
      bullets: [
        'Served as Project Admin for Winter of Code Social (WoCS), reviewing pull requests, managing repository issues, and mentoring student contributors.',
        'Contributed to Webpack open source ecosystem and successfully completed Hacktoberfest 2025 challenge.'
      ],
      skills: ['JavaScript', 'Webpack', 'Open Source', 'Git / GitHub', 'Code Reviews']
    }
  ];

  return (
    <div className="bg-[#050508] text-[#F8FAFC]">
      {/* Hero Section */}
      <Hero profile={profile} />

      {/* Featured Projects Preview - Detailed Showcase */}
      <section id="projects" className="py-20 bg-[#050508]">
        <div className="container-fluid space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-[#15D8B3]">Featured Works</span>
              <h2 className="text-3xl font-extrabold text-[#F8FAFC]">Key Projects & Architectures</h2>
            </div>
            <Link to="/projects" className="px-5 py-2.5 rounded-lg bg-[#15D8B3] text-[#050508] font-bold text-xs no-underline flex items-center gap-2">
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {featuredProjectsDetail.map((p) => (
              <div key={p._id} className="py-3 sm:p-5 sm:rounded-2xl bg-transparent sm:bg-[#0c0d14] border-0 border-b border-white/10 sm:border sm:border-white/10 flex flex-col justify-between group sm:hover:border-[#15D8B3]/50 transition-all shadow-none sm:shadow-xl">
                <div className="space-y-3">
                  <div className="h-44 sm:h-48 overflow-hidden bg-[#08090e] relative flex items-center justify-center p-2 rounded-xl border border-white/10">
                    <img
                      src={p.image || FALLBACK_IMAGE}
                      alt={p.title}
                      onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#050508]/90 text-[10px] font-mono text-[#15D8B3] border border-[#15D8B3]/30 font-semibold backdrop-blur-md z-10">
                      {p.category}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#15D8B3] transition-colors leading-snug line-clamp-2">
                      {p.title}
                    </h3>

                    {/* Bullet Points - Short Form */}
                    <ul className="space-y-1 text-xs text-[#F8FAFC]/80 font-light leading-relaxed">
                      {p.highlights.slice(0, 2).map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#15D8B3] shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {p.tech.slice(0, 4).map((t, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded bg-[#050508] border border-white/10 text-[10px] font-mono font-medium text-[#15D8B3]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 sm:pt-4 border-t border-white/5 mt-2 text-xs font-mono">
                  {p.liveUrl ? (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="font-bold text-[#15D8B3] hover:underline flex items-center gap-1 no-underline">
                      <span>Live App</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <div className="text-[#15D8B3] flex items-center gap-1">
                      <Terminal className="w-3 h-3" />
                      <span>Backend REST</span>
                    </div>
                  )}
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-[#F8FAFC]/80 hover:text-[#15D8B3] flex items-center gap-1 no-underline">
                      <Github className="w-3.5 h-3.5 text-[#15D8B3]" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Webpack Open-Source Merged Pull Requests Showcase */}
      <OpenSourceContributions />

      {/* Dynamic Open-Source GitHub Activity Showcase */}
      <GitHubActivity />

      {/* Core Skills Section */}
      <section id="skills" className="py-14 sm:py-20 bg-[#050508]">
        <div className="container-fluid space-y-8 sm:space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-6 sm:pb-8 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-[#15D8B3] uppercase">Engineering Domains</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">Core Skills & Technology Stack</h2>
            </div>
            <Link to="/skills" className="text-xs font-mono font-bold text-[#15D8B3] hover:underline flex items-center gap-1.5 no-underline">
              <span>Explore Detailed Skills</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreTechCategories.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="py-3 sm:p-6 sm:rounded-2xl bg-transparent sm:bg-[#0c0d14] border-0 border-b border-white/10 sm:border sm:border-white/10 space-y-3 flex flex-col justify-between group sm:hover:border-[#15D8B3]/50 transition-all">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#15D8B3]/10 border border-[#15D8B3]/30 flex items-center justify-center text-[#15D8B3] shrink-0">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <h3 className="font-bold text-[#F8FAFC] text-base group-hover:text-[#15D8B3] transition-colors">{item.category}</h3>
                    </div>
                    <p className="text-xs text-[#F8FAFC]/75 leading-relaxed font-light">{item.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded bg-[#050508] border border-white/10 text-[10px] sm:text-[11px] font-mono font-medium text-[#15D8B3]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LeetCode Competitive Problem Solving Showcase */}
      <LeetCodeStats />

      {/* Experience & Leadership Interactive Timeline Section */}
      <section id="experience" className="py-14 sm:py-20 bg-[#050508]">
        <div className="container-fluid space-y-8 sm:space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-6 sm:pb-8 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-[#15D8B3] uppercase">Career & Academic History</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">Work Experience & Journey</h2>
            </div>
            <Link to="/journey" className="text-xs font-mono font-bold text-[#15D8B3] hover:underline flex items-center gap-1.5 no-underline">
              <span>View Full Journey</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {experienceTimeline.map((item, idx) => {
              return (
                <div key={idx} className="py-4 sm:p-6 sm:rounded-2xl bg-transparent sm:bg-[#0c0d14] border-0 border-b border-white/10 sm:border sm:border-white/10 space-y-2 group sm:hover:border-[#15D8B3]/40 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#15D8B3] uppercase">
                        {item.badge}
                      </span>
                      <span className="text-xs font-mono text-[#F8FAFC]/60">
                        • {item.period}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC] group-hover:text-[#15D8B3] transition-colors">
                    {item.role} <span className="text-[#15D8B3] font-normal text-xs sm:text-sm">— {item.company}</span>
                  </h3>

                  <p className="text-xs text-[#F8FAFC]/80 font-light leading-relaxed">
                    {item.bullets[0]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-[#050508] text-center">
        <div className="container max-w-3xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">Have a Project or Opportunity in Mind?</h2>
          <p className="text-[#F8FAFC]/80 font-light max-w-xl mx-auto">
            Feel free to get in touch for full-stack engineering, AI/ML integrations, DevOps workflows, or technical collaborations.
          </p>
          <div>
            <Link to="/contact" className="px-8 py-3.5 rounded-lg bg-[#15D8B3] text-[#050508] font-bold text-sm shadow-lg shadow-[#15D8B3]/25 no-underline inline-flex items-center gap-2">
              <span>Send Message</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
