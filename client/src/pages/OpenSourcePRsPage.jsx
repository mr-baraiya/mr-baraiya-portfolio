import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GitPullRequest, CheckCircle2, ExternalLink, Sparkles, ArrowLeft, Search, Filter, Github } from 'lucide-react';

export const OpenSourcePRsPage = () => {
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const webpackPRs = [
    {
      id: 8136,
      title: 'docs: clarify webpack loader execution order (right-to-left)',
      repo: 'webpack/webpack.js.org',
      type: 'Documentation',
      status: 'Merged',
      date: 'Apr 17',
      link: 'https://github.com/webpack/webpack.js.org/pull/8136',
      upvotes: 14,
      description: 'Clarified loader execution chain (right-to-left / bottom-to-top) evaluation flow in loader concepts documentation.'
    },
    {
      id: 8098,
      title: 'refactor(Container): migrate from SCSS to Tailwind CSS',
      repo: 'webpack/webpack.js.org',
      type: 'Refactor',
      status: 'Merged',
      date: 'Mar 23',
      link: 'https://github.com/webpack/webpack.js.org/pull/8098',
      upvotes: 3,
      description: 'Refactored legacy SCSS styles to utility-first Tailwind CSS classes for Container layout component.'
    },
    {
      id: 8096,
      title: 'refactor(Sponsors): migrate from SCSS to Tailwind CSS',
      repo: 'webpack/webpack.js.org',
      type: 'Refactor',
      status: 'Merged',
      date: 'Mar 26',
      link: 'https://github.com/webpack/webpack.js.org/pull/8096',
      upvotes: 12,
      description: 'Migrated Sponsors section from custom SCSS rules to Tailwind CSS responsive utility classes.'
    },
    {
      id: 8062,
      title: 'chore(Logo): remove unused Logo.scss file',
      repo: 'webpack/webpack.js.org',
      type: 'Chore',
      status: 'Merged',
      date: 'Mar 19',
      link: 'https://github.com/webpack/webpack.js.org/pull/8062',
      upvotes: 5,
      description: 'Cleaned up deprecated Logo.scss stylesheet file following migration to Tailwind CSS.'
    },
    {
      id: 8054,
      title: 'docs(configuration): clarify usage of multiple configurations with examples',
      repo: 'webpack/webpack.js.org',
      type: 'Documentation',
      status: 'Merged',
      date: 'Mar 19',
      link: 'https://github.com/webpack/webpack.js.org/pull/8054',
      upvotes: 3,
      description: 'Added detailed code examples for exporting multiple configuration objects in webpack.config.js.'
    },
    {
      id: 8028,
      title: 'refactor(Navigation): move DocSearch configuration to config file',
      repo: 'webpack/webpack.js.org',
      type: 'Refactor',
      status: 'Merged',
      date: 'Mar 17',
      link: 'https://github.com/webpack/webpack.js.org/pull/8028',
      upvotes: 7,
      description: 'Extracted Algolia DocSearch initialization parameters into centralized site config.'
    },
    {
      id: 8026,
      title: 'fix(Navigation): add missing lang property for English dropdown item',
      repo: 'webpack/webpack.js.org',
      type: 'Bug Fix',
      status: 'Merged',
      date: 'Mar 16',
      link: 'https://github.com/webpack/webpack.js.org/pull/8026',
      upvotes: 1,
      description: 'Fixed missing language attribute on English dropdown menu item for i18n accessibility.'
    },
    {
      id: 8025,
      title: 'improve(Navigation): specify PropTypes shape for links prop',
      repo: 'webpack/webpack.js.org',
      type: 'Refactor',
      status: 'Merged',
      date: 'Mar 16',
      link: 'https://github.com/webpack/webpack.js.org/pull/8025',
      upvotes: 1,
      description: 'Added strict React PropTypes validation shapes for Navigation links prop array.'
    },
    {
      id: 8022,
      title: 'docs(configuration): clarify CLI argument usage and expand control flow examples',
      repo: 'webpack/webpack.js.org',
      type: 'Documentation',
      status: 'Merged',
      date: 'Mar 16',
      link: 'https://github.com/webpack/webpack.js.org/pull/8022',
      upvotes: 1,
      description: 'Expanded Webpack CLI command line flag documentation with conditional environment config examples.'
    },
    {
      id: 8008,
      title: 'chore(Page): update content PropTypes to reflect supported types',
      repo: 'webpack/webpack.js.org',
      type: 'Chore',
      status: 'Merged',
      date: 'Mar 14',
      link: 'https://github.com/webpack/webpack.js.org/pull/8008',
      upvotes: 7,
      description: 'Updated Page component React PropTypes to allow element and node types.'
    },
    {
      id: 8007,
      title: 'fix(Page): disconnect MutationObserver after hash target is found',
      repo: 'webpack/webpack.js.org',
      type: 'Bug Fix',
      status: 'Merged',
      date: 'Mar 14',
      link: 'https://github.com/webpack/webpack.js.org/pull/8007',
      upvotes: 8,
      description: 'Optimized page scrolling performance by disconnecting DOM MutationObserver once hash anchor element is resolved.'
    },
    {
      id: 8006,
      title: 'fix(Page): handle failed dynamic content loading safely',
      repo: 'webpack/webpack.js.org',
      type: 'Bug Fix',
      status: 'Merged',
      date: 'Mar 18',
      link: 'https://github.com/webpack/webpack.js.org/pull/8006',
      upvotes: 17,
      description: 'Added robust try-catch fallback handling for dynamic asynchronous Markdown page fetches.'
    },
    {
      id: 8005,
      title: 'fix: prevent stale timeout in CodeBlockWithCopy',
      repo: 'webpack/webpack.js.org',
      type: 'Bug Fix',
      status: 'Merged',
      date: 'Mar 13',
      link: 'https://github.com/webpack/webpack.js.org/pull/8005',
      upvotes: 1,
      description: 'Cleaned up React setTimeout timers on unmount inside CodeBlock copy-to-clipboard component.'
    },
    {
      id: 7999,
      title: 'fix: replace invalid anchor with button in PageLinks',
      repo: 'webpack/webpack.js.org',
      type: 'Bug Fix',
      status: 'Merged',
      date: 'Mar 12',
      link: 'https://github.com/webpack/webpack.js.org/pull/7999',
      upvotes: 3,
      description: 'Replaced invalid href="#" anchor tags with accessible button elements in PageLinks component.'
    },
    {
      id: 7986,
      title: 'docs: fix typo Chrome Extensions',
      repo: 'webpack/webpack.js.org',
      type: 'Documentation',
      status: 'Merged',
      date: 'Mar 12',
      link: 'https://github.com/webpack/webpack.js.org/pull/7986',
      upvotes: 5,
      description: 'Corrected typo in loader documentation ("Chrome Exentions" → "Chrome Extensions").'
    },
    {
      id: 7972,
      title: 'docs: use HTTPS for StackOverflow webpack tag link',
      repo: 'webpack/webpack.js.org',
      type: 'Documentation',
      status: 'Merged',
      date: 'Mar 12',
      link: 'https://github.com/webpack/webpack.js.org/pull/7972',
      upvotes: 6,
      description: 'Updated insecure HTTP URL to HTTPS for StackOverflow Webpack tag community link.'
    },
    {
      id: 7971,
      title: 'fix(a11y): use distinct alt text for footer license icons',
      repo: 'webpack/webpack.js.org',
      type: 'Accessibility',
      status: 'Merged',
      date: 'Mar 12',
      link: 'https://github.com/webpack/webpack.js.org/pull/7971',
      upvotes: 6,
      description: 'Added descriptive alt attributes to footer CC licensing icons for screen readers.'
    },
    {
      id: 7949,
      title: 'fix(a11y): mark HelloDarkness SVG icons as aria-hidden',
      repo: 'webpack/webpack.js.org',
      type: 'Accessibility',
      status: 'Merged',
      date: 'Mar 10',
      link: 'https://github.com/webpack/webpack.js.org/pull/7949',
      upvotes: 2,
      description: 'Added aria-hidden="true" to decorative dark mode theme SVG icons.'
    }
  ];

  const filteredPRs = webpackPRs.filter(pr => {
    const matchesFilter = filter === 'ALL' || pr.type.toUpperCase() === filter.toUpperCase();
    const matchesSearch = pr.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pr.id.toString().includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#050508] text-[#F8FAFC] pt-28 pb-20 font-sans">
      <div className="container-fluid space-y-10">
        
        {/* Back Link */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0c0d14] border border-[#49A4BB]/30 text-xs font-mono text-[#F8FAFC]/80 hover:text-[#15D8B3] no-underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header Title */}
        <div className="space-y-4 border-b border-[#49A4BB]/20 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15D8B3]/10 text-[#15D8B3] text-xs font-mono font-bold border border-[#15D8B3]/30">
            <GitPullRequest className="w-4 h-4 text-[#15D8B3]" />
            <span>OFFICIAL OPEN SOURCE CONTRIBUTOR</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Merged Open-Source Pull Requests
          </h1>
          <p className="text-sm sm:text-base text-[#F8FAFC]/80 font-light max-w-3xl leading-relaxed">
            Detailed showcase of 18+ Merged Pull Requests authored by Vishal Baraiya on <span className="text-[#15D8B3] font-semibold">webpack/webpack.js.org</span> (Official Webpack Documentation & Core Web Ecosystem).
          </p>

          {/* External Verification Link */}
          <div className="pt-2">
            <a
              href="https://github.com/webpack/webpack.js.org/pulls?q=is%3Apr+is%3Aclosed+author%3Amr-baraiya"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#15D8B3] text-[#050508] text-xs font-mono font-bold hover:bg-[#12be9d] transition-all no-underline shadow-lg shadow-[#15D8B3]/20"
            >
              <Github className="w-4 h-4" />
              <span>Verify All Merged PRs on GitHub Official Query ↗</span>
            </a>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 glass-card p-4 bg-[#0c0d14] border-[#49A4BB]/30">
          
          {/* Search Box */}
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 text-[#F8FAFC]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by PR title or #number..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#050508] text-white text-xs font-mono border border-[#49A4BB]/30 focus:border-[#15D8B3] outline-none"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {['ALL', 'Bug Fix', 'Refactor', 'Documentation', 'Accessibility'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-[#15D8B3] text-[#050508] shadow-md shadow-[#15D8B3]/20'
                    : 'bg-[#050508] text-[#F8FAFC]/70 border border-[#49A4BB]/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PR List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPRs.map((pr) => (
            <div
              key={pr.id}
              className="p-6 rounded-2xl bg-[#0c0d14] border border-[#49A4BB]/30 hover:border-[#15D8B3] transition-all duration-300 flex flex-col justify-between space-y-4 group shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-[#15D8B3]">
                    #{pr.id}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-mono font-semibold border border-purple-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    Merged ({pr.date})
                  </span>
                </div>

                <h3 className="font-bold text-base text-white group-hover:text-[#15D8B3] transition-colors leading-snug">
                  {pr.title}
                </h3>

                <p className="text-xs text-[#F8FAFC]/75 font-light leading-relaxed">
                  {pr.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#49A4BB]/20 text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-[#050508] text-[#15D8B3] border border-[#15D8B3]/30 text-[10px] font-bold">
                  {pr.type}
                </span>

                <a
                  href={pr.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono font-bold text-[#15D8B3] hover:underline flex items-center gap-1.5 no-underline"
                >
                  <span>View PR on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default OpenSourcePRsPage;
