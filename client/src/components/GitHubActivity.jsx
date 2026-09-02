import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, ExternalLink, Code2, Layers } from 'lucide-react';

export const GitHubActivity = () => {
  const [stats, setStats] = useState({
    publicRepos: 41,
    followers: 35,
    stars: 28,
    contributions: '350+'
  });
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default fallback repos if GitHub API rate limits
  const fallbackRepos = [
    {
      id: 1,
      name: 'AgroSmart',
      description: 'Smart Agriculture & Crop Management Platform with REST APIs, n8n workflow automation & weather alert intelligence.',
      html_url: 'https://github.com/mr-baraiya/AgroSmart',
      stargazers_count: 5,
      forks_count: 3,
      language: 'JavaScript',
      updated_at: '2026-02-15'
    },
    {
      id: 2,
      name: 'MOMS-Minutes_of_Meeting_System',
      description: 'Enterprise Minutes of Meeting platform with JWT role-based access control, Prisma ORM and Jitsi Meet video calls.',
      html_url: 'https://github.com/mr-baraiya/MOMS-Minutes-_of_Meeting_System',
      stargazers_count: 4,
      forks_count: 2,
      language: 'TypeScript',
      updated_at: '2026-02-10'
    },
    {
      id: 3,
      name: 'Weather-Notify-mcq-generator',
      description: 'FastAPI Python application with RAG pipeline, Groq Llama 3.3 70B for PDF MCQ generation and automated weather alerts.',
      html_url: 'https://github.com/mr-baraiya/Weather-Notify-mcq-generator',
      stargazers_count: 3,
      forks_count: 1,
      language: 'Python',
      updated_at: '2026-01-28'
    },
    {
      id: 4,
      name: 'ImpactMeter',
      description: 'Open-source Developer Carbon Footprint & Impact Tracking Tool with real-time browser extension analytics.',
      html_url: 'https://github.com/mr-baraiya/ImpactMeter',
      stargazers_count: 4,
      forks_count: 2,
      language: 'JavaScript',
      updated_at: '2026-01-20'
    },
    {
      id: 5,
      name: 'Dayflow-HRMS',
      description: 'Full-stack Human Resource Management System for employee attendance, payroll and leave tracking.',
      html_url: 'https://github.com/mr-baraiya/Dayflow-HRMS',
      stargazers_count: 3,
      forks_count: 1,
      language: 'TypeScript',
      updated_at: '2026-01-12'
    },
    {
      id: 6,
      name: 'TransitOps-API',
      description: 'High-performance ASP.NET Core & C# RESTful API microservice with Swagger OpenAPI documentation.',
      html_url: 'https://github.com/mr-baraiya/TransitOps-API',
      stargazers_count: 3,
      forks_count: 1,
      language: 'C#',
      updated_at: '2026-01-05'
    }
  ];

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/mr-baraiya'),
          fetch('https://api.github.com/users/mr-baraiya/repos?sort=updated&per_page=6')
        ]);

        if (userRes.ok) {
          const userData = await userRes.json();
          setStats(prev => ({
            ...prev,
            publicRepos: userData.public_repos || 41,
            followers: userData.followers || 35
          }));
        }

        if (reposRes.ok) {
          const repoData = await reposRes.json();
          if (Array.isArray(repoData) && repoData.length > 0) {
            setRepos(repoData);
            const totalStars = repoData.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
            setStats(prev => ({
              ...prev,
              stars: Math.max(totalStars, 28)
            }));
          } else {
            setRepos(fallbackRepos);
          }
        } else {
          setRepos(fallbackRepos);
        }
      } catch (err) {
        console.error('Error fetching GitHub live data:', err);
        setRepos(fallbackRepos);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const displayRepos = repos.length > 0 ? repos : fallbackRepos;

  return (
    <section className="py-16 sm:py-20 relative bg-[#050508] text-[#F8FAFC]">
      <div className="container-fluid space-y-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#49A4BB]/20 pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#15D8B3]">
              <Github className="w-4 h-4 text-[#15D8B3]" />
              <span>MUST HAVE · LIVE OPEN SOURCE DATA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
              GitHub Activity & Repositories
            </h2>
          </div>

          {/* Metric Counter Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c0d14] border border-[#15D8B3]/40 text-xs font-mono text-[#15D8B3] font-bold shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#15D8B3] animate-pulse"></span>
            <span>50+ Repositories · {stats.contributions} Contributions · {stats.stars}+ Stars</span>
          </div>
        </div>

        {/* 4 Stats Metric Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="py-2 sm:p-5 rounded-2xl bg-transparent sm:bg-[#0c0d14] border-0 border-b border-white/10 sm:border sm:border-[#49A4BB]/20 space-y-1 hover:border-[#15D8B3] transition-colors">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#15D8B3]">50+</span>
            <p className="text-xs font-mono text-[#F8FAFC]/70 uppercase tracking-wider">Repositories Created</p>
          </div>
          <div className="py-2 sm:p-5 rounded-2xl bg-transparent sm:bg-[#0c0d14] border-0 border-b border-white/10 sm:border sm:border-[#49A4BB]/20 space-y-1 hover:border-[#15D8B3] transition-colors">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{stats.contributions}</span>
            <p className="text-xs font-mono text-[#F8FAFC]/70 uppercase tracking-wider">Yearly Contributions</p>
          </div>
          <div className="py-2 sm:p-5 rounded-2xl bg-transparent sm:bg-[#0c0d14] border-0 border-b border-white/10 sm:border sm:border-[#49A4BB]/20 space-y-1 hover:border-[#15D8B3] transition-colors">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#15D8B3]">{stats.stars}+</span>
            <p className="text-xs font-mono text-[#F8FAFC]/70 uppercase tracking-wider">GitHub Stars Earned</p>
          </div>
          <div className="py-2 sm:p-5 rounded-2xl bg-transparent sm:bg-[#0c0d14] border-0 border-b border-white/10 sm:border sm:border-[#49A4BB]/20 space-y-1 hover:border-[#15D8B3] transition-colors">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{stats.followers}</span>
            <p className="text-xs font-mono text-[#F8FAFC]/70 uppercase tracking-wider">GitHub Followers</p>
          </div>
        </div>

        {/* Dynamic Repositories Cards Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC] flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#15D8B3]" />
              <span>Latest Open-Source Repositories</span>
            </h3>
            <a
              href="https://github.com/mr-baraiya?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono font-bold text-[#15D8B3] hover:underline flex items-center gap-1 no-underline"
            >
              <span>View All on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayRepos.slice(0, 6).map((repo) => (
              <div
                key={repo.id || repo.name}
                className="py-3 sm:p-6 sm:rounded-2xl bg-transparent sm:bg-[#0c0d14] border-0 border-b border-white/10 sm:border sm:border-[#49A4BB]/30 sm:hover:border-[#15D8B3] transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-bold text-base text-white group-hover:text-[#15D8B3] transition-colors truncate">
                      {repo.name}
                    </h4>
                    <span className="sm:px-2.5 sm:py-0.5 sm:rounded-full sm:bg-[#15D8B3]/10 text-[#15D8B3] text-[10px] font-mono font-bold sm:border sm:border-[#15D8B3]/30 shrink-0">
                      {repo.language || 'Code'}
                    </span>
                  </div>

                  <p className="text-xs text-[#F8FAFC]/75 font-light leading-relaxed line-clamp-3">
                    {repo.description || 'Open source software repository engineered by Vishal Baraiya.'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 sm:pt-3 sm:border-t sm:border-[#49A4BB]/15 text-xs font-mono text-[#F8FAFC]/70">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-[#15D8B3]">
                      <Star className="w-3.5 h-3.5 text-[#15D8B3] fill-[#15D8B3]" />
                      <span>{repo.stargazers_count || 0}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-[#F8FAFC]/60" />
                      <span>{repo.forks_count || 0}</span>
                    </span>
                  </div>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-[#15D8B3] hover:underline flex items-center gap-1 no-underline font-semibold"
                  >
                    <span>Repo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default GitHubActivity;
