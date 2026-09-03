import React, { useState } from 'react';
import { Code, Trophy, ExternalLink, CheckCircle, Award, Flame } from 'lucide-react';

export const LeetCodeStats = () => {
  const [data] = useState({
    totalSolved: 503,
    easySolved: 210,
    mediumSolved: 245,
    hardSolved: 48,
    rating: 1582,
    ranking: 'Top 15%',
    acceptanceRate: '68.4%'
  });

  return (
    <section className="py-12 relative bg-[#050508] text-[#F8FAFC]">
      <div className="container-fluid space-y-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c0d14] border border-[#15D8B3]/30 text-xs font-mono text-[#15D8B3]">
              <Code className="w-3.5 h-3.5" />
              <span>Competitive Problem Solving</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
              LeetCode DSA Metrics
            </h2>
            <p className="text-xs sm:text-sm text-[#F8FAFC]/75 font-light max-w-xl">
              500+ data structures &amp; algorithms problems solved across arrays, trees, dynamic programming, and graphs.
            </p>
          </div>

          <a
            href="https://leetcode.com/u/mr_baraiya/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0c0d14] border border-white/10 text-xs font-mono font-bold text-[#15D8B3] hover:border-[#15D8B3] transition-all no-underline shadow-lg"
          >
            <Trophy className="w-4 h-4 text-[#15D8B3]" />
            <span>LeetCode Profile ↗</span>
          </a>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

          {/* Big Highlight Card */}
          <div className="lg:col-span-5 p-7 sm:p-8 rounded-2xl bg-[#0c0d14] border border-white/10 space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#15D8B3]/10 blur-3xl rounded-full pointer-events-none" />

            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#15D8B3] tracking-wider uppercase">
                TOTAL PROBLEMS SOLVED
              </span>
              <a
                href="https://leetcode.com/u/mr_baraiya/"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-lg bg-[#15D8B3]/10 text-[#15D8B3] border border-[#15D8B3]/30 text-xs font-mono font-bold hover:bg-[#15D8B3] hover:text-[#050508] transition-all no-underline flex items-center gap-1"
              >
                <span>View</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-1.5">
              <div className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                {data.totalSolved}<span className="text-[#15D8B3]">+</span>
              </div>
              <p className="text-xs font-mono text-[#F8FAFC]/70">
                Data structures &amp; algorithmic problem solutions
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
              <div>
                <span className="text-[#F8FAFC]/60 block text-[10px] uppercase tracking-wider">Contest Rating</span>
                <span className="font-bold text-[#15D8B3] text-base">{data.rating} ({data.ranking})</span>
              </div>
              <div>
                <span className="text-[#F8FAFC]/60 block text-[10px] uppercase tracking-wider">Acceptance Rate</span>
                <span className="font-bold text-white text-base">{data.acceptanceRate}</span>
              </div>
            </div>
          </div>

          {/* Easy, Medium, Hard Breakdown */}
          <div className="lg:col-span-7 space-y-4">

            {/* Easy Progress Card */}
            <div className="p-5 rounded-2xl bg-[#0c0d14] border border-white/10 space-y-2.5 hover:border-[#15D8B3]/50 transition-colors shadow-lg">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-white flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#15D8B3]" />
                  Easy Problems
                </span>
                <span className="text-[#15D8B3]">{data.easySolved} Solved</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#050508] overflow-hidden p-0.5 border border-white/10">
                <div className="h-full bg-[#15D8B3] rounded-full" style={{ width: `${Math.min((data.easySolved / 250) * 100, 100)}%` }} />
              </div>
            </div>

            {/* Medium Progress Card */}
            <div className="p-5 rounded-2xl bg-[#0c0d14] border border-white/10 space-y-2.5 hover:border-[#15D8B3]/50 transition-colors shadow-lg">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#15D8B3]" />
                  Medium Problems
                </span>
                <span className="text-[#15D8B3]">{data.mediumSolved} Solved</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#050508] overflow-hidden p-0.5 border border-white/10">
                <div className="h-full bg-[#15D8B3] rounded-full" style={{ width: `${Math.min((data.mediumSolved / 300) * 100, 100)}%` }} />
              </div>
            </div>

            {/* Hard Progress Card */}
            <div className="p-5 rounded-2xl bg-[#0c0d14] border border-white/10 space-y-2.5 hover:border-[#15D8B3]/50 transition-colors shadow-lg">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#15D8B3]" />
                  Hard Problems
                </span>
                <span className="text-[#15D8B3]">{data.hardSolved} Solved</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#050508] overflow-hidden p-0.5 border border-white/10">
                <div className="h-full bg-[#15D8B3] rounded-full" style={{ width: `${Math.min((data.hardSolved / 70) * 100, 100)}%` }} />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default LeetCodeStats;
