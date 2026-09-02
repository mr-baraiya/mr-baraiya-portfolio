import React from 'react';

// Single line pulse bar
export const SkeletonBar = ({ className = 'h-4 w-full' }) => (
  <div className={`bg-white/5 rounded-lg animate-pulse border border-white/5 ${className}`} />
);

// Skeleton for Hero Section
export const SkeletonHero = () => (
  <div className="py-20 space-y-8 animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-white/10" />
      <div className="h-6 w-48 bg-white/10 rounded-lg" />
    </div>
    <div className="space-y-4">
      <div className="h-12 w-3/4 bg-white/10 rounded-2xl" />
      <div className="h-12 w-1/2 bg-white/10 rounded-2xl" />
    </div>
    <div className="h-16 w-full max-w-2xl bg-white/5 rounded-2xl" />
    <div className="flex gap-4 pt-4">
      <div className="h-12 w-36 bg-[#15D8B3]/20 rounded-xl" />
      <div className="h-12 w-36 bg-white/10 rounded-xl" />
      <div className="h-12 w-36 bg-white/10 rounded-xl" />
    </div>
  </div>
);

// Skeleton for Project Cards
export const SkeletonProjectCard = () => (
  <div className="bg-[#0c0d14] border border-white/10 rounded-2xl p-5 space-y-4 animate-pulse shadow-xl">
    {/* Image Placeholder */}
    <div className="h-48 w-full bg-white/5 rounded-xl border border-white/5" />
    {/* Category & Badge */}
    <div className="flex items-center justify-between">
      <div className="h-4 w-24 bg-[#15D8B3]/20 rounded-full" />
      <div className="h-4 w-16 bg-white/10 rounded-full" />
    </div>
    {/* Title */}
    <div className="h-6 w-3/4 bg-white/10 rounded-lg" />
    {/* Description lines */}
    <div className="space-y-2">
      <div className="h-3 w-full bg-white/5 rounded" />
      <div className="h-3 w-5/6 bg-white/5 rounded" />
    </div>
    {/* Tech stack pills */}
    <div className="flex flex-wrap gap-2 pt-2">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-6 w-16 bg-white/5 rounded-lg" />
      ))}
    </div>
    {/* Buttons */}
    <div className="flex items-center justify-between pt-3 border-t border-white/5">
      <div className="h-8 w-24 bg-white/10 rounded-lg" />
      <div className="h-8 w-24 bg-[#15D8B3]/20 rounded-lg" />
    </div>
  </div>
);

// Skeleton for Skill Cards
export const SkeletonSkillCard = () => (
  <div className="bg-[#0c0d14] border border-white/10 rounded-2xl p-6 space-y-4 animate-pulse">
    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
      <div className="w-10 h-10 rounded-xl bg-[#15D8B3]/20" />
      <div className="h-6 w-36 bg-white/10 rounded-lg" />
    </div>
    <div className="space-y-3 pt-2">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="flex items-center justify-between">
          <div className="h-4 w-28 bg-white/10 rounded" />
          <div className="h-4 w-12 bg-[#15D8B3]/20 rounded" />
        </div>
      ))}
    </div>
  </div>
);

// Skeleton for Experience / Journey Timeline Items
export const SkeletonTimelineItem = () => (
  <div className="bg-[#0c0d14] border border-white/10 rounded-2xl p-6 space-y-4 animate-pulse">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
      <div className="space-y-2">
        <div className="h-6 w-48 bg-white/10 rounded-lg" />
        <div className="h-4 w-32 bg-[#15D8B3]/20 rounded" />
      </div>
      <div className="h-6 w-28 bg-white/5 rounded-full" />
    </div>
    <div className="space-y-2">
      <div className="h-3 w-full bg-white/5 rounded" />
      <div className="h-3 w-4/5 bg-white/5 rounded" />
    </div>
  </div>
);

// Skeleton for Gallery / Certificate Cards
export const SkeletonGalleryCard = () => (
  <div className="bg-[#0c0d14] border border-white/10 rounded-2xl p-5 space-y-4 animate-pulse">
    <div className="h-44 w-full bg-white/5 rounded-xl" />
    <div className="flex items-center justify-between">
      <div className="h-4 w-20 bg-[#15D8B3]/20 rounded-full" />
      <div className="h-4 w-16 bg-white/10 rounded-full" />
    </div>
    <div className="h-5 w-4/5 bg-white/10 rounded-lg" />
    <div className="h-3 w-full bg-white/5 rounded" />
  </div>
);

// Skeleton Grid Wrapper Component
export const SkeletonGrid = ({ count = 6, Component = SkeletonProjectCard, gridClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }) => (
  <div className={gridClassName}>
    {Array.from({ length: count }).map((_, idx) => (
      <Component key={idx} />
    ))}
  </div>
);

export default SkeletonGrid;
