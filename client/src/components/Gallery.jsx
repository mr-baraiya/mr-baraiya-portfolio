import React, { useState, useEffect } from 'react';
import { ExternalLink, X, ArrowUpRight, FileText, Award, Play, Video } from 'lucide-react';
import { SkeletonGrid, SkeletonGalleryCard } from './SkeletonLoader';

const FALLBACK_GALLERY_IMAGE = 'https://catgbuvicqq4rhla.public.blob.vercel-storage.com/img_wocs_2025_admin.png';

export const Gallery = ({ items = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);

  const certCategories = ['ALL', 'CERTIFICATES', 'HACKATHONS', 'AWARDS', 'ACHIEVEMENTS'];

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModalItem(null);
    };
    if (activeModalItem) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalItem]);

  // Separate Videos from Certificates/Awards
  const videoItems = items.filter(item => item.category?.toUpperCase() === 'VIDEOS' || item.embedUrl);
  const nonVideoItems = items.filter(item => item.category?.toUpperCase() !== 'VIDEOS' && !item.embedUrl);

  // Filter certificate items by category
  const filteredCertItems = selectedCategory === 'ALL'
    ? nonVideoItems
    : nonVideoItems.filter(item => item.category?.toUpperCase() === selectedCategory);

  // Identify featured certificate
  const featuredItem = filteredCertItems.find(item => item.featured) || filteredCertItems[0];

  // Grid items excluding featured item
  const certGridItems = filteredCertItems.filter(item => item._id !== featuredItem?._id);

  // Limit initially visible items (Multiple of 4 for clean 4-column desktop rows)
  const INITIAL_GRID_COUNT = 8;
  const visibleCertGridItems = showAllCertificates ? certGridItems : certGridItems.slice(0, INITIAL_GRID_COUNT);
  const visibleVideoItems = showAllVideos ? videoItems : videoItems.slice(0, 8);

  return (
    <section id="gallery" className="pt-8 pb-20 relative bg-[#050508] text-[#F8FAFC] space-y-16">
      <div className="container-fluid space-y-20">
        
        {/* ================= SECTION 1: CERTIFICATES & ACHIEVEMENTS GALLERY ================= */}
        <div className="space-y-10">
          {/* Certificate Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c0d14] border border-[#15D8B3]/30 text-xs font-mono text-[#15D8B3]">
                <Award className="w-3.5 h-3.5" />
                <span>Verified Credentials</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
                Certificates &amp; Achievements
              </h2>
              <p className="text-xs sm:text-sm text-[#F8FAFC]/75 font-light max-w-xl">
                Official certificates, hackathon honors, and technical credentials.
              </p>
            </div>

            {/* Desktop Category Filter Tabs */}
            <div className="hidden sm:flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {certCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#15D8B3] text-[#050508] font-bold shadow-md shadow-[#15D8B3]/20'
                      : 'bg-[#0c0d14] text-[#F8FAFC]/75 border border-white/10 hover:border-[#15D8B3]/50 hover:text-[#15D8B3]'
                  }`}
                >
                  {cat.charAt(0) + cat.slice(1).toLowerCase()}
                </button>
              ))}
            </div>

            {/* Mobile Filter Dropdown */}
            <div className="block sm:hidden w-full">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d14] text-[#15D8B3] border border-[#15D8B3]/40 text-xs font-mono font-bold outline-none cursor-pointer"
              >
                {certCategories.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#050508] text-[#F8FAFC]">
                    {cat.charAt(0) + cat.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Featured Certificate Showcase */}
          {featuredItem && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#15D8B3]"></span>
                <span className="text-xs font-mono font-semibold text-[#15D8B3] uppercase tracking-wider">
                  Featured Highlight
                </span>
              </div>

              <div className="group relative bg-[#0c0d14] border border-white/10 rounded-2xl overflow-hidden hover:border-[#15D8B3]/50 transition-all duration-300 shadow-2xl grid grid-cols-1 lg:grid-cols-12">
                
                {/* Image Container */}
                <div 
                  onClick={() => setActiveModalItem(featuredItem)}
                  className="lg:col-span-7 bg-[#050508] p-6 sm:p-8 flex items-center justify-center relative min-h-[280px] sm:min-h-[360px] cursor-pointer overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10"
                >
                  <img
                    src={featuredItem.image || FALLBACK_GALLERY_IMAGE}
                    alt={featuredItem.title}
                    loading="lazy"
                    onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_GALLERY_IMAGE; }}
                    className="max-h-[320px] max-w-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#050508]/90 text-[10px] font-mono font-bold text-[#15D8B3] border border-[#15D8B3]/40 backdrop-blur-md">
                      {featuredItem.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="text-xs font-mono font-semibold text-[#15D8B3]">
                      {featuredItem.issuer} · {featuredItem.date}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] group-hover:text-[#15D8B3] transition-colors leading-tight">
                      {featuredItem.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#F8FAFC]/75 leading-relaxed font-light">
                      {featuredItem.description || "Verified certification demonstrating technical knowledge and specialized software engineering capabilities."}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setActiveModalItem(featuredItem)}
                      className="px-5 py-3 rounded-xl bg-[#15D8B3] text-[#050508] text-xs font-bold font-mono hover:bg-[#12be9d] transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-[#15D8B3]/20"
                    >
                      <span>View Certificate</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    {(featuredItem.pdfUrl || featuredItem.credentialUrl) && (
                      <a
                        href={featuredItem.pdfUrl || featuredItem.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-3 rounded-xl bg-[#050508] border border-white/10 text-[#F8FAFC]/80 hover:text-[#15D8B3] hover:border-[#15D8B3] text-xs font-mono font-semibold transition-all flex items-center gap-2 no-underline"
                      >
                        <FileText className="w-4 h-4 text-[#15D8B3]" />
                        <span>PDF Document</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Certificate Image Grid — 4 Columns per Row on Desktop */}
          {items.length === 0 ? (
            <SkeletonGrid count={8} Component={SkeletonGalleryCard} gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" />
          ) : (
            certGridItems.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {visibleCertGridItems.map((item) => {
                  const documentUrl = item.pdfUrl || item.credentialUrl;

                  return (
                    <div
                      key={item._id}
                      className="group bg-[#0c0d14] border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-[#15D8B3]/50 hover:-translate-y-1.5 transition-all duration-300 shadow-xl justify-between"
                    >
                      {/* Image Container */}
                      <div
                        onClick={() => setActiveModalItem(item)}
                        className="relative aspect-[16/10] bg-[#050508] overflow-hidden border-b border-white/10 flex items-center justify-center p-2 cursor-pointer"
                      >
                        <img
                          src={item.image || FALLBACK_GALLERY_IMAGE}
                          alt={item.title}
                          loading="lazy"
                          onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_GALLERY_IMAGE; }}
                          className="max-h-full max-w-full object-contain p-1 transition-transform duration-500 group-hover:scale-[1.03]"
                        />

                        <div className="absolute top-2.5 left-2.5">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#050508]/90 text-[10px] font-mono font-semibold text-[#15D8B3] border border-[#15D8B3]/30 backdrop-blur-md">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
                        <div className="space-y-1.5">
                          <div className="text-[11px] font-mono text-[#15D8B3]">
                            {item.issuer} {item.date && `· ${item.date}`}
                          </div>

                          <h3
                            onClick={() => setActiveModalItem(item)}
                            className="text-sm font-bold text-[#F8FAFC] group-hover:text-[#15D8B3] transition-colors leading-snug line-clamp-2 cursor-pointer"
                          >
                            {item.title}
                          </h3>
                        </div>

                        {/* Actions */}
                        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                          <button
                            onClick={() => setActiveModalItem(item)}
                            className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#15D8B3] hover:underline cursor-pointer bg-transparent border-0 p-0"
                          >
                            <span>Inspect</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>

                          {documentUrl && (
                            <a
                              href={documentUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#15D8B3] hover:text-white transition-colors cursor-pointer no-underline"
                              title="View Document"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )
          )}

          {/* Load More Certificates Button */}
          {certGridItems.length > INITIAL_GRID_COUNT && (
            <div className="text-center pt-4">
              <button
                onClick={() => setShowAllCertificates(!showAllCertificates)}
                className="px-6 py-3 rounded-xl bg-[#0c0d14] border border-white/10 text-[#15D8B3] hover:border-[#15D8B3] text-xs font-mono font-bold transition-all cursor-pointer shadow-lg"
              >
                {showAllCertificates ? 'Show Fewer Certificates' : `View All Certificates (${certGridItems.length})`}
              </button>
            </div>
          )}
        </div>

        {/* ================= SECTION 2: YOUTUBE VIDEO DEMONSTRATIONS (4 Columns per Row on Desktop) ================= */}
        {videoItems.length > 0 && (
          <div className="space-y-10 pt-10 border-t border-white/10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c0d14] border border-[#15D8B3]/30 text-xs font-mono text-[#15D8B3]">
                  <Video className="w-3.5 h-3.5" />
                  <span>Video Showcase</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
                  YouTube Video Demonstrations
                </h2>
              </div>
              <a
                href="https://www.youtube.com/@Vi.685_junior"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0c0d14] border border-white/10 text-xs font-mono font-bold text-[#15D8B3] hover:border-[#15D8B3] transition-all no-underline shrink-0"
              >
                <span>Visit YouTube Channel ↗</span>
              </a>
            </div>

            {/* 4-Column Video Grid on Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {visibleVideoItems.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setActiveModalItem(item)}
                  className="group bg-[#0c0d14] border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-[#15D8B3]/50 hover:-translate-y-1.5 transition-all duration-300 shadow-xl cursor-pointer justify-between"
                >
                  <div className="relative aspect-[16/10] bg-[#050508] overflow-hidden border-b border-white/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    
                    <div className="absolute inset-0 bg-[#050508]/40 flex items-center justify-center group-hover:bg-[#050508]/20 transition-colors">
                      <div className="w-11 h-11 rounded-full bg-[#15D8B3] text-[#050508] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#15D8B3] font-semibold">
                        YouTube Demo
                      </span>
                      <h3 className="text-xs font-bold text-[#F8FAFC] group-hover:text-[#15D8B3] transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#15D8B3]">
                        <span>Watch Video</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {videoItems.length > 8 && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setShowAllVideos(!showAllVideos)}
                  className="px-6 py-3 rounded-xl bg-[#0c0d14] border border-white/10 text-[#15D8B3] hover:border-[#15D8B3] text-xs font-mono font-bold transition-all cursor-pointer shadow-lg"
                >
                  {showAllVideos ? 'Show Fewer Videos' : `View All Videos (${videoItems.length})`}
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Item Modal Preview */}
      {activeModalItem && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setActiveModalItem(null); }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050508]/90 backdrop-blur-md animate-fadeIn"
        >
          <div className="relative bg-[#0c0d14] border border-[#15D8B3]/50 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto no-scrollbar p-6 sm:p-8 shadow-2xl space-y-6">
            
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-[#F8FAFC]/70 hover:text-white hover:bg-white/10 transition-colors border border-white/10 cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Video or Image Preview */}
            {activeModalItem.embedUrl ? (
              <div className="relative aspect-video bg-[#050508] rounded-xl overflow-hidden border border-white/10 shadow-inner">
                <iframe
                  src={activeModalItem.embedUrl}
                  title={activeModalItem.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                ></iframe>
              </div>
            ) : (
              <div className="relative bg-[#050508] rounded-xl overflow-hidden border border-white/10 p-4 flex items-center justify-center min-h-[300px]">
                <img
                  src={activeModalItem.image || FALLBACK_GALLERY_IMAGE}
                  alt={activeModalItem.title}
                  className="max-h-[60vh] max-w-full object-contain"
                />
              </div>
            )}

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#15D8B3]/10 text-[#15D8B3] text-xs font-mono font-semibold border border-[#15D8B3]/30">
                  {activeModalProject?.category || activeModalItem.category}
                </span>
                {activeModalItem.issuer && (
                  <span className="text-xs font-mono text-[#F8FAFC]/60">
                    {activeModalItem.issuer} {activeModalItem.date && `· ${activeModalItem.date}`}
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-white">
                {activeModalItem.title}
              </h3>

              {activeModalItem.description && (
                <p className="text-sm text-[#F8FAFC]/80 font-light leading-relaxed">
                  {activeModalItem.description}
                </p>
              )}

              {/* Document/Credential Action Buttons */}
              {(activeModalItem.pdfUrl || activeModalItem.credentialUrl) && (
                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                  {activeModalItem.pdfUrl && (
                    <a
                      href={activeModalItem.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-[#15D8B3] text-[#050508] font-bold text-xs hover:bg-[#12be9d] transition-all flex items-center gap-2 no-underline shadow-md shadow-[#15D8B3]/20"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View PDF Certificate</span>
                    </a>
                  )}
                  {activeModalItem.credentialUrl && (
                    <a
                      href={activeModalItem.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-white/5 text-[#F8FAFC] font-semibold text-xs border border-white/10 hover:border-white transition-all flex items-center gap-2 no-underline"
                    >
                      <ExternalLink className="w-4 h-4 text-[#15D8B3]" />
                      <span>Verify Credential ↗</span>
                    </a>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
