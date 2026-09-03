import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github, Database, Code, Cpu, Server, BookOpen, Layers, CheckCircle2, GraduationCap, Trophy, GitPullRequest, MapPin, Calendar, Terminal } from 'lucide-react';
import Hero from '../components/Hero';
import OpenSourceContributions from '../components/OpenSourceContributions';
import GitHubActivity from '../components/GitHubActivity';
import LeetCodeStats from '../components/LeetCodeStats';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';

export const Home = ({ profile, projects, skills, experiences }) => {

  const featuredProjectsDetail = [
    {
      _id: 'agrosmart-1',
      title: 'AgroSmart – Smart Agriculture Management System',
      category: 'Full-Stack App',
      image: '/images/projects/agrosmart.png',
      tech: ['React.js', 'ASP.NET Core 8', 'SQL Server', 'n8n', 'Azure'],
      highlights: [
        'Built full-stack agriculture platform for farm & crop management with sensor monitoring.',
        'Developed ASP.NET Core REST APIs with Entity Framework, JWT auth & role-based access control.'
      ],
      liveUrl: 'https://ecoagrosmart.netlify.app/',
      githubUrl: 'https://github.com/mr-baraiya/AgroSmart'
    },
    {
      _id: 'moms-2',
      title: 'MOMS – Minutes of Meeting Management System',
      category: 'Web Platform',
      image: '/images/projects/moms.png',
      tech: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Jitsi Meet'],
      highlights: [
        'Built enterprise meeting management platform supporting scheduling & PDF report generation.',
        'Implemented JWT role-based access control with Prisma ORM data modeling.'
      ],
      liveUrl: 'https://moms-minutes-of-meeting-system.vercel.app/',
      githubUrl: 'https://github.com/mr-baraiya/MOMS-Minutes-_of_Meeting_System'
    },
    {
      _id: 'weather-3',
      title: 'Weather Notify & PDF AI MCQ Generator',
      category: 'AI & Weather API',
      image: '/images/projects/weather.png',
      tech: ['FastAPI', 'Python', 'Groq Llama 3.3 70B', 'RAG Pipeline', 'OpenWeatherMap'],
      highlights: [
        'Built real-time weather alert notification app and AI-powered question generator from PDF documents.',
        'Implemented RAG (Retrieval-Augmented Generation) pipeline with vector embeddings.'
      ],
      liveUrl: 'https://weather-notify-tau.vercel.app/',
      githubUrl: 'https://github.com/mr-baraiya/weather-notify'
    },
    {
      _id: 'impactmeter-4',
      title: 'ImpactMeter – Algorithmic Performance & Trading Analytics',
      category: 'Hackathon Runner-Up',
      image: '/images/projects/impactmeter.png',
      tech: ['React.js', 'Node.js', 'Express', 'Chart.js', 'Tailwind CSS'],
      highlights: [
        'Built algorithmic trading analytics platform during Code 2 Trade Hackathon 2025 (Runner-Up position).',
        'Features real-time price charts, portfolio impact metering & performance metrics.'
      ],
      liveUrl: 'https://mr-baraiya.github.io/ImpactMeter/',
      githubUrl: 'https://github.com/mr-baraiya/ImpactMeter'
    }
  ];

  const coreTechCategories = [
    {
      icon: Layers,
      category: 'Modern Web Stack',
      tags: ['PostgreSQL', 'Express.js', 'React 19', 'Node.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      description: 'Building responsive full-stack applications, SPA & SSR web apps, and clean RESTful API services.'
    },
    {
      icon: Database,
      category: 'Databases & Storage',
      tags: ['PostgreSQL', 'Microsoft SQL Server', 'MongoDB', 'Supabase', 'Firebase'],
      description: 'Relational database schema design, Prisma ORM, Entity Framework Core, indexing, and NoSQL document stores.'
    },
    {
      icon: Code,
      category: '.NET Core & C#',
      tags: ['ASP.NET Core 8', 'C#', 'Entity Framework Core', 'REST Web APIs', 'Blazor'],
      description: 'Developing REST APIs, role-based JWT authentication, EF Core migrations, and backend services.'
    },
    {
      icon: Cpu,
      category: 'AI / ML & LLM Workflows',
      tags: ['RAG Pipelines', 'FastAPI', 'Python', 'Groq Llama 3.3', 'Vector Search', 'n8n Automation'],
      description: 'Document processing systems, vector embeddings, prompt engineering, and LLM API integrations.'
    },
    {
      icon: Server,
      category: 'DevOps & Deployment',
      tags: ['Docker', 'Git / GitHub', 'GitHub Actions', 'Vercel', 'Render', 'Azure'],
      description: 'Containerized deployments, automated CI/CD workflows, CDN edge delivery, and cloud hosting.'
    },
    {
      icon: BookOpen,
      category: 'Academic & Mentorship',
      tags: ['CSE Teaching Assistant', 'C Programming', 'Python', 'Digital Logic', 'DSA Mentorship'],
      description: 'Conducted university lab sessions, assisted 100+ students in debugging, and 500+ LeetCode DSA solves.'
    }
  ];

  const experienceTimeline = [
    {
      icon: GraduationCap,
      role: 'Teaching Assistant — Computer Science & Engineering',
      company: 'Darshan University',
      location: 'Rajkot, Gujarat',
      period: 'Dec 2025 – Apr 2026',
      badge: 'Academic Leadership',
      bullets: [
        'Conducted lab sessions for B.Tech CSE students in C Programming, Python, Digital Logic, and Logic Development.',
        'Assisted 100+ students in understanding core programming concepts, debugging code, and lab assignments.'
      ]
    },
    {
      icon: Trophy,
      role: 'Team Leader — Code 2 Trade Hackathon 2025',
      company: 'Darshan University & Odoo Hackathon 2025 Finalist',
      location: 'Rajkot & Gandhinagar',
      period: '2025',
      badge: 'Hackathon Runner-Up',
      bullets: [
        'Led development team in building an algorithmic trading solution and coordinating overall architecture.',
        'Secured Runner-Up position at Code 2 Trade Hackathon 2025 and advanced to offline finalist round of Odoo Hackathon 2025.'
      ]
    },
    {
      icon: GitPullRequest,
      role: 'Project Admin & Open Source Contributor',
      company: 'Winter of Code Social (WoCS) & Webpack',
      location: 'Open Source Community',
      period: '2025',
      badge: 'Open Source Community',
      bullets: [
        'Project Admin for Winter of Code Social (WoCS), reviewing pull requests, managing repository issues, and mentoring contributors.',
        'Contributed to Webpack open source ecosystem with 18+ merged pull requests.'
      ]
    }
  ];

  return (
    <div className="bg-[#050508] text-[#F8FAFC]">
      {/* 1. Hero Section */}
      <Hero profile={profile} />

      {/* 2. Featured Projects Preview */}
      <section id="projects" className="py-16 bg-[#050508]">
        <div className="container-fluid space-y-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-6 gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-[#15D8B3]">Selected Work</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">Featured Projects</h2>
            </div>
            <Link to="/projects" className="px-5 py-2.5 rounded-xl bg-[#15D8B3] text-[#050508] font-bold text-xs no-underline flex items-center gap-2 shadow-md shadow-[#15D8B3]/20">
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjectsDetail.map((p) => (
              <div key={p._id} className="p-5 rounded-2xl bg-[#0c0d14] border border-white/10 flex flex-col justify-between group hover:border-[#15D8B3]/50 transition-all shadow-xl">
                <div className="space-y-3">
                  <div className="h-44 overflow-hidden bg-[#050508] relative flex items-center justify-center p-2 rounded-xl border border-white/10">
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

                    <ul className="space-y-1 text-xs text-[#F8FAFC]/75 font-light leading-relaxed">
                      {p.highlights.slice(0, 2).map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#15D8B3] shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.tech.slice(0, 4).map((t, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-[#15D8B3]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-3 text-xs font-mono">
                  {p.liveUrl ? (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#15D8B3] hover:underline flex items-center gap-1 no-underline">
                      <span>Live App</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <div className="text-[#15D8B3] flex items-center gap-1">
                      <Terminal className="w-3 h-3" />
                      <span>REST API</span>
                    </div>
                  )}
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-[#F8FAFC]/70 hover:text-[#15D8B3] flex items-center gap-1 no-underline">
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

      {/* 3. Core Tech Stack Section */}
      <section id="skills" className="py-16 bg-[#050508]">
        <div className="container-fluid space-y-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-6 gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-[#15D8B3]">Core Stack</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">Technical Skills &amp; Domains</h2>
            </div>
            <Link to="/skills" className="text-xs font-mono font-bold text-[#15D8B3] hover:underline flex items-center gap-1.5 no-underline">
              <span>View All Skills</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreTechCategories.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-[#0c0d14] border border-white/10 space-y-4 flex flex-col justify-between group hover:border-[#15D8B3]/50 transition-all shadow-xl">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#050508] border border-white/10 flex items-center justify-center text-[#15D8B3] shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-[#F8FAFC] text-base group-hover:text-[#15D8B3] transition-colors">{item.category}</h3>
                    </div>
                    <p className="text-xs text-[#F8FAFC]/75 leading-relaxed font-light">{item.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-[#15D8B3]">
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

      {/* 4. Open Source Contributions */}
      <OpenSourceContributions />

      {/* 5. LeetCode DSA Metrics */}
      <LeetCodeStats />

      {/* 6. GitHub Activity Graph */}
      <GitHubActivity />

      {/* 7. Experience Timeline */}
      <section id="experience" className="py-16 bg-[#050508]">
        <div className="container-fluid space-y-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-6 gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-[#15D8B3]">Career Journey</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">Work Experience &amp; Roles</h2>
            </div>
            <Link to="/journey" className="text-xs font-mono font-bold text-[#15D8B3] hover:underline flex items-center gap-1.5 no-underline">
              <span>View Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {experienceTimeline.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0c0d14] border border-white/10 space-y-2 group hover:border-[#15D8B3]/50 transition-all shadow-xl">
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
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact Banner */}
      <section className="py-20 bg-[#050508] text-center border-t border-white/10">
        <div className="container max-w-3xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">Interested in Collaborating or Hiring?</h2>
          <p className="text-[#F8FAFC]/80 font-light max-w-xl mx-auto text-sm leading-relaxed">
            Feel free to reach out for software engineering roles, full-stack development, AI integrations, or technical projects.
          </p>
          <div>
            <Link to="/contact" className="px-8 py-3.5 rounded-xl bg-[#15D8B3] text-[#050508] font-bold text-sm shadow-lg shadow-[#15D8B3]/25 no-underline inline-flex items-center gap-2 hover:bg-[#12be9d] transition-all">
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
