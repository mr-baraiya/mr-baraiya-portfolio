import React, { useState, useEffect } from 'react';
import { ExternalLink, X, ArrowUpRight, FileText, Award, Play, Video } from 'lucide-react';

const FALLBACK_GALLERY_IMAGE = '/img/wocs_2025_admin.png';

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

  // Limit initially visible items
  const INITIAL_GRID_COUNT = 10;
  const visibleCertGridItems = showAllCertificates ? certGridItems : certGridItems.slice(0, INITIAL_GRID_COUNT);
  const visibleVideoItems = showAllVideos ? videoItems : videoItems.slice(0, 5);

  return (
    <section id="gallery" className="pt-4 sm:pt-6 pb-16 sm:pb-20 relative bg-[#050508] text-[#F8FAFC] space-y-16">
      <div className="container-fluid space-y-24">
        
        {/* ================= SECTION 1: CERTIFICATES & ACHIEVEMENTS IMAGE GALLERY (FIRST) ================= */}
        <div className="space-y-12">
          {/* Certificate Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#49A4BB]/20 pb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#15D8B3]">
                <Award className="w-3.5 h-3.5 text-[#15D8B3]" />
                <span>Visual Portfolio & Showcase</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
                Visual Gallery & Proofs
              </h2>
            </div>

            {/* Desktop Category Filter Tabs */}
            <div className="hidden sm:flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {certCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowAllCertificates(false);
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#15D8B3] text-[#050508] font-bold shadow-md'
                      : 'bg-[#050814] text-[#F8FAFC]/75 border border-[#49A4BB]/20 hover:border-[#15D8B3] hover:text-[#15D8B3]'
                  }`}
                >
                  {cat.charAt(0) + cat.slice(1).toLowerCase()}
                </button>
              ))}
            </div>

            {/* Mobile Select Dropdown Filter */}
            <div className="block sm:hidden w-full">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setShowAllCertificates(false);
                }}
                className="w-full px-4 py-2.5 rounded-lg bg-[#050814] text-[#15D8B3] border border-[#15D8B3]/50 text-xs font-mono font-bold outline-none cursor-pointer"
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
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#15D8B3]"></span>
                <span className="text-xs font-mono font-semibold text-[#15D8B3] uppercase tracking-wider">
                  Featured Highlight
                </span>
              </div>

              <div className="group relative bg-[#050508] border border-[#49A4BB]/30 rounded-2xl overflow-hidden hover:border-[#15D8B3] transition-all duration-300 shadow-2xl grid grid-cols-1 lg:grid-cols-12">
                
                {/* Large Image Showcase Container */}
                <div 
                  onClick={() => setActiveModalItem(featuredItem)}
                  className="lg:col-span-7 bg-[#050814] p-6 sm:p-8 flex items-center justify-center relative min-h-[300px] sm:min-h-[380px] cursor-pointer overflow-hidden border-b lg:border-b-0 lg:border-r border-[#49A4BB]/30"
                >
                  <img
                    src={featuredItem.image || FALLBACK_GALLERY_IMAGE}
                    alt={featuredItem.title}
                    loading="lazy"
                    onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_GALLERY_IMAGE; }}
                    className="max-h-[340px] max-w-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#050508]/90 text-[10px] font-mono font-bold text-[#15D8B3] border border-[#15D8B3]/50 backdrop-blur-md">
                      {featuredItem.category}
                    </span>
                  </div>
                </div>

                {/* Featured Details */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="text-xs font-mono font-semibold text-[#15D8B3]">
                      {featuredItem.issuer} · {featuredItem.date}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] group-hover:text-[#15D8B3] transition-colors leading-tight">
                      {featuredItem.title}
                    </h3>

                    <p className="text-sm text-[#F8FAFC]/75 leading-relaxed font-light">
                      {featuredItem.description || "Verified certification demonstrating professional technical knowledge and specialized software engineering capabilities."}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#49A4BB]/20 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => setActiveModalItem(featuredItem)}
                      className="px-6 py-3 rounded-lg bg-[#15D8B3] text-[#050508] text-xs font-bold font-mono tracking-wide hover:bg-[#15D8B3]/90 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#15D8B3]/20"
                    >
                      <span>View Certificate</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    {(featuredItem.pdfUrl || featuredItem.credentialUrl) && (
                      <a
                        href={featuredItem.pdfUrl || featuredItem.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-3 rounded-lg bg-[#050508] border border-[#49A4BB]/30 text-[#F8FAFC]/80 hover:text-[#15D8B3] hover:border-[#15D8B3] text-xs font-mono font-semibold transition-all flex items-center gap-2 no-underline"
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

          {/* Certificate Image Grid (5 Cards per Row on Desktop) */}
          {certGridItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
              {visibleCertGridItems.map((item) => {
                const documentUrl = item.pdfUrl || item.credentialUrl;

                return (
                  <div
                    key={item._id}
                    className="group bg-[#050508] border border-[#49A4BB]/30 rounded-xl overflow-hidden flex flex-col hover:border-[#15D8B3] hover:-translate-y-1 transition-all duration-300 shadow-xl justify-between"
                  >
                    {/* Image Container */}
                    <div
                      onClick={() => setActiveModalItem(item)}
                      className="relative aspect-[16/10] bg-[#050814] p-4 flex items-center justify-center border-b border-[#49A4BB]/20 cursor-pointer overflow-hidden"
                    >
                      <img
                        src={item.image || FALLBACK_GALLERY_IMAGE}
                        alt={item.title}
                        loading="lazy"
                        onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_GALLERY_IMAGE; }}
                        className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#050508]/90 text-[10px] font-mono font-semibold text-[#15D8B3] border border-[#15D8B3]/40 backdrop-blur-md">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                      <div className="space-y-1">
                        <div className="text-[11px] font-mono font-semibold text-[#15D8B3]">
                          {item.issuer} · {item.date}
                        </div>

                        <h4 className="text-xs font-bold text-[#F8FAFC] group-hover:text-[#15D8B3] transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </h4>
                      </div>

                      {/* Action Link */}
                      <div className="pt-2 border-t border-[#49A4BB]/20 flex items-center justify-between">
                        <button
                          onClick={() => setActiveModalItem(item)}
                          className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#F8FAFC] hover:text-[#15D8B3] transition-colors cursor-pointer"
                        >
                          <span>View Certificate</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#15D8B3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>

                        {documentUrl && documentUrl !== '#' && (
                          <a
                            href={documentUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 rounded bg-[#050508] border border-[#49A4BB]/30 text-[#F8FAFC]/70 hover:text-[#15D8B3] hover:border-[#15D8B3] transition-colors"
                            title="Open Document"
                          >
                            <ExternalLink className="w-3 h-3 text-[#15D8B3]" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {certGridItems.length > INITIAL_GRID_COUNT && (
            <div className="text-center">
              <button
                onClick={() => setShowAllCertificates(!showAllCertificates)}
                className="px-8 py-3 rounded-lg bg-[#050814] border border-[#49A4BB]/30 hover:border-[#15D8B3] text-xs font-mono font-bold text-[#F8FAFC] hover:text-[#15D8B3] transition-all duration-300 cursor-pointer tracking-wider shadow-lg"
              >
                {showAllCertificates ? 'Show Less Certificates' : `View All Certificates (${certGridItems.length + 1})`}
              </button>
            </div>
          )}
        </div>


        {/* ================= SECTION 2: YOUTUBE VIDEO SHOWCASE (THEN VIDEO) ================= */}
        {videoItems.length > 0 && (
          <div className="space-y-8">
            {/* Video Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#49A4BB]/20 pb-8">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#15D8B3]">
                  <Video className="w-3.5 h-3.5 text-[#15D8B3]" />
                  <span>Video Demos & Channel Showcase</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
                  YouTube Video Demonstrations
                </h2>
              </div>
              <a
                href="https://www.youtube.com/@Vi.685_junior"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#050814] border border-[#49A4BB]/30 text-xs font-mono font-bold text-[#15D8B3] hover:border-[#15D8B3] transition-all no-underline shrink-0"
              >
                <span>Visit YouTube Channel ↗</span>
              </a>
            </div>

            {/* 5-Card per Row Responsive Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
              {visibleVideoItems.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setActiveModalItem(item)}
                  className="group bg-[#050508] border border-[#49A4BB]/30 rounded-xl overflow-hidden flex flex-col hover:border-[#15D8B3] hover:-translate-y-1 transition-all duration-300 shadow-xl cursor-pointer justify-between"
                >
                  {/* Fixed Aspect Thumbnail with Play Button Overlay */}
                  <div className="relative aspect-[16/10] bg-[#050814] overflow-hidden border-b border-[#49A4BB]/20">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 bg-[#050508]/40 flex items-center justify-center group-hover:bg-[#050508]/20 transition-colors">
                      <div className="w-11 h-11 rounded-full bg-[#15D8B3] text-[#050508] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Video Metadata */}
                  <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#15D8B3] font-semibold">
                        YouTube Demo
                      </span>
                      <h3 className="text-xs font-bold text-[#F8FAFC] group-hover:text-[#15D8B3] transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                    </div>

                    <div className="pt-2 border-t border-[#49A4BB]/20 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#15D8B3]">
                        <span>Watch Video</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {videoItems.length > 5 && (
              <div className="text-center pt-2">
                <button
                  onClick={() => setShowAllVideos(!showAllVideos)}
                  className="px-6 py-2.5 rounded-lg bg-[#050814] border border-[#49A4BB]/30 text-xs font-mono font-bold text-[#F8FAFC] hover:text-[#15D8B3] hover:border-[#15D8B3] transition-all cursor-pointer"
                >
                  {showAllVideos ? 'Show Less Videos' : `View All YouTube Videos (${videoItems.length})`}
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Detail & Video Modal */}
      {activeModalItem && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModalItem(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050508]/95 backdrop-blur-md animate-fadeIn"
        >
          <div className="relative bg-[#050508] border border-[#15D8B3]/60 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto no-scrollbar p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              aria-label="Close modal"
              className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1 text-[#F8FAFC]/70 hover:text-[#15D8B3] transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5 text-[#15D8B3]" />
            </button>

            {/* Embedded Video Player OR Image Display */}
            {activeModalItem.category?.toUpperCase() === 'VIDEOS' || activeModalItem.embedUrl ? (
              <div className="w-full aspect-video bg-[#050814] rounded-xl overflow-hidden border border-[#49A4BB]/30">
                <iframe
                  src={activeModalItem.embedUrl || (activeModalItem.credentialUrl || '').replace('watch?v=', 'embed/')}
                  title={activeModalItem.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                ></iframe>
              </div>
            ) : (
              <div className="w-full min-h-[260px] max-h-[55vh] flex items-center justify-center bg-[#050814] rounded-xl p-4 border border-[#49A4BB]/30">
                <img
                  src={activeModalItem.image || FALLBACK_GALLERY_IMAGE}
                  alt={activeModalItem.title}
                  onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_GALLERY_IMAGE; }}
                  className="max-h-[50vh] max-w-full w-auto h-auto object-contain rounded shadow-2xl"
                />
              </div>
            )}

            {/* Modal Header Metadata */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#15D8B3]/10 text-[#15D8B3] text-xs font-mono font-bold border border-[#15D8B3]/30">
                  {activeModalItem.category}
                </span>
                <span className="text-xs font-mono text-[#F8FAFC]/70">
                  {activeModalItem.issuer} · {activeModalItem.date}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">
                {activeModalItem.title}
              </h2>

              <p className="text-sm text-[#F8FAFC]/80 leading-relaxed font-light">
                {activeModalItem.description}
              </p>
            </div>

            {/* Modal Action Button */}
            {(activeModalItem.credentialUrl || activeModalItem.pdfUrl) && (
              <div className="pt-4 border-t border-[#49A4BB]/20 flex items-center gap-4">
                <a
                  href={activeModalItem.credentialUrl || activeModalItem.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-lg bg-[#15D8B3] text-[#050508] text-xs font-mono font-bold tracking-wide hover:bg-[#15D8B3]/90 transition-all flex items-center gap-2 no-underline shadow-lg shadow-[#15D8B3]/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{activeModalItem.category?.toUpperCase() === 'VIDEOS' ? 'Watch on YouTube ↗' : 'Open Document ↗'}</span>
                </a>
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
