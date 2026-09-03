import React from 'react';
import { Link } from 'react-router-dom';
import { GitPullRequest, CheckCircle2, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';

export const OpenSourceContributions = () => {
  const webpackPRs = [
    {
      id: 8136,
      title: 'docs: clarify webpack loader execution order (right-to-left)',
      repo: 'webpack/webpack.js.org',
      type: 'Documentation',
      status: 'Merged',
      date: 'Apr 17',
      link: 'https://github.com/webpack/webpack.js.org/pull/8136',
    },
    {
      id: 8098,
      title: 'refactor(Container): migrate from SCSS to Tailwind CSS',
      repo: 'webpack/webpack.js.org',
      type: 'Refactor',
      status: 'Merged',
      date: 'Mar 23',
      link: 'https://github.com/webpack/webpack.js.org/pull/8098',
    },
    {
      id: 8096,
      title: 'refactor(Sponsors): migrate from SCSS to Tailwind CSS',
      repo: 'webpack/webpack.js.org',
      type: 'Refactor',
      status: 'Merged',
      date: 'Mar 26',
      link: 'https://github.com/webpack/webpack.js.org/pull/8096',
    },
    {
      id: 8062,
      title: 'chore(Logo): remove unused Logo.scss file',
      repo: 'webpack/webpack.js.org',
      type: 'Chore',
      status: 'Merged',
      date: 'Mar 19',
      link: 'https://github.com/webpack/webpack.js.org/pull/8062',
    },
    {
      id: 8007,
      title: 'fix(Page): disconnect MutationObserver after hash target is found',
      repo: 'webpack/webpack.js.org',
      type: 'Bug Fix',
      status: 'Merged',
      date: 'Mar 14',
      link: 'https://github.com/webpack/webpack.js.org/pull/8007',
    },
    {
      id: 8006,
      title: 'fix(Page): handle failed dynamic content loading safely',
      repo: 'webpack/webpack.js.org',
      type: 'Bug Fix',
      status: 'Merged',
      date: 'Mar 18',
      link: 'https://github.com/webpack/webpack.js.org/pull/8006',
    }
  ];

  return (
    <section className="py-12 relative bg-[#050508] text-[#F8FAFC]">
      <div className="container-fluid space-y-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c0d14] border border-[#15D8B3]/30 text-xs font-mono text-[#15D8B3]">
              <GitPullRequest className="w-3.5 h-3.5 text-[#15D8B3]" />
              <span>Open Source Contributions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
              Webpack Open Source Pull Requests
            </h2>
            <p className="text-xs sm:text-sm text-[#F8FAFC]/75 font-light max-w-xl">
              18+ approved and merged Pull Requests into Webpack's official documentation and web architecture repositories.
            </p>
          </div>

          <Link
            to="/open-source"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#15D8B3] text-[#050508] text-xs font-mono font-bold hover:bg-[#12be9d] transition-all no-underline shadow-md shadow-[#15D8B3]/20"
          >
            <span>View All Merged PRs (18+)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Highlight Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0d14] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#15D8B3]/10 text-[#15D8B3] text-xs font-mono font-semibold border border-[#15D8B3]/30">
                webpack/webpack.js.org
              </span>
              <span className="text-xs font-mono text-[#F8FAFC]/60">Official Repository</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Contributor to Official Webpack Documentation &amp; Web Platform
            </h3>
            <p className="text-xs sm:text-sm text-[#F8FAFC]/80 font-light leading-relaxed">
              Migrated component styling from SCSS to Tailwind CSS, implemented accessibility improvements, optimized DOM MutationObserver performance, and clarified loader execution order docs.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 w-full md:w-auto">
            <div className="p-4 rounded-xl bg-[#050508] border border-white/10 text-center flex-1 md:flex-none">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#15D8B3]">18+</span>
              <span className="block text-[10px] font-mono text-[#F8FAFC]/60 uppercase tracking-wider mt-0.5">Merged PRs</span>
            </div>
            <div className="p-4 rounded-xl bg-[#050508] border border-white/10 text-center flex-1 md:flex-none">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">100%</span>
              <span className="block text-[10px] font-mono text-[#F8FAFC]/60 uppercase tracking-wider mt-0.5">Approval Rate</span>
            </div>
          </div>
        </div>

        {/* Featured PR Cards */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#15D8B3]" />
              <span>Featured Webpack Merged Pull Requests</span>
            </h4>
            <Link
              to="/open-source"
              className="text-xs font-mono font-semibold text-[#15D8B3] hover:underline flex items-center gap-1 no-underline"
            >
              <span>See All (18+)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {webpackPRs.map((pr) => (
              <div
                key={pr.id}
                className="bg-[#0c0d14] border border-white/10 rounded-2xl p-5 hover:border-[#15D8B3]/50 transition-all duration-300 space-y-4 flex flex-col justify-between group shadow-xl"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-[#15D8B3]">
                      #{pr.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#15D8B3]/10 text-[#15D8B3] text-[10px] font-mono font-semibold border border-[#15D8B3]/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#15D8B3]" />
                      Merged
                    </span>
                  </div>

                  <h5 className="font-bold text-sm text-white group-hover:text-[#15D8B3] transition-colors leading-snug line-clamp-2">
                    {pr.title}
                  </h5>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-lg bg-white/5 text-[#F8FAFC]/70 border border-white/10 text-[10px]">
                    {pr.type}
                  </span>

                  <a
                    href={pr.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono font-semibold text-[#15D8B3] hover:underline flex items-center gap-1 no-underline"
                  >
                    <span>View PR</span>
                    <ExternalLink className="w-3 h-3 text-[#15D8B3]" />
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

export default OpenSourceContributions;
