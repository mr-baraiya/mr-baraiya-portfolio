import React, { useState } from 'react';
import { Award, GraduationCap, Trophy, FileText, Sparkles, BookOpen, ShieldCheck, X } from 'lucide-react';

export const AchievementsPage = () => {
  const [activeCertificateModal, setActiveCertificateModal] = useState(null);

  // Key Resume Credentials
  const topCredentials = [
    {
      icon: Award,
      badge: 'National Competitive Exam',
      title: 'GATE 2026 CS Qualified',
      subtitle: 'All India Rank: AIR 4226 | GATE Score: 48.34 / 100',
      description: 'Qualified Graduate Aptitude Test in Engineering (GATE 2026) in Computer Science & Information Technology.'
    },
    {
      icon: GraduationCap,
      badge: 'Academic Distinction',
      title: 'Darshan University (CGPA 9.24 / 10)',
      subtitle: 'B.Tech CSE (2023 – 2027) | JEE Main 94.5 PR',
      description: 'Maintained top academic performance across 6 consecutive semesters. 85% in GSEB Class 10.'
    },
    {
      icon: Trophy,
      badge: 'Hackathon Achievement',
      title: 'Code 2 Trade Hackathon Runner-up',
      subtitle: 'Team Leader & Algorithmic Trading Architect',
      description: 'Led team to 2nd position building algorithmic trading platforms. Advanced to offline finalist round of Odoo Hackathon 2025 in Gandhinagar.'
    },
    {
      icon: ShieldCheck,
      badge: 'Competitive Coding',
      title: '500+ LeetCode Solved & TCS CodeVita',
      subtitle: 'TCS CodeVita Season 13 Round 1 Qualified',
      description: 'Solved 500+ Data Structures & Algorithms problems on LeetCode with top speed & accuracy.'
    }
  ];

  // Verified NPTEL Certifications
  const nptelCertifications = [
    {
      title: 'Business Intelligence & Analytics',
      issuer: 'NPTEL — IIT Kharagpur',
      score: '76% Score (Elite)',
      pdfUrl: '/pdf/nptel_business_intelligence.pdf',
      imgUrl: '/img/nptel_business_intelligence.png'
    },
    {
      title: 'Introduction to Machine Learning',
      issuer: 'NPTEL — IIT Madras',
      score: '64% Score',
      pdfUrl: '/pdf/nptel_machine_learning.pdf',
      imgUrl: '/img/nptel_machine_learning.png'
    },
    {
      title: 'Blockchain and its Applications',
      issuer: 'NPTEL — IIT Kharagpur',
      score: '66% Score',
      pdfUrl: '/pdf/nptel_blockchain_applications.pdf',
      imgUrl: '/img/nptel_blockchain_applications.png'
    }
  ];

  // Verified Certificates & Hackathon Credentials Gallery
  const certificateGallery = [
    {
      title: 'TCS CodeVita Season 13 Qualification',
      issuer: 'Tata Consultancy Services (TCS)',
      category: 'Global Contest',
      imgUrl: '/img/tcs_codevita_season13.png',
      pdfUrl: '/pdf/tcs_codevita_season13.pdf'
    },
    {
      title: 'Odoo Hackathon 2025 Offline Finalist',
      issuer: 'Odoo India — Gandhinagar',
      category: 'Hackathon Finalist',
      imgUrl: '/img/odoo_hackathon_2026.jpg'
    },
    {
      title: 'Winter of Code Social (WoCS) Project Admin',
      issuer: 'Winter of Code Social Open Source',
      category: 'Open Source Leadership',
      imgUrl: '/img/wocs_2025_admin.png'
    },
    {
      title: 'Edunet Foundation AI/Cloud Internship',
      issuer: 'Edunet Foundation & IBM SkillBuild',
      category: 'Internship Certificate',
      imgUrl: '/img/edunet_internship_completion.png',
      pdfUrl: '/pdf/edunet_internship_completion.pdf'
    },
    {
      title: 'ISRO Bharatiya Antariksh Hackathon 2026',
      issuer: 'Indian Space Research Organisation (ISRO)',
      category: 'National Hackathon',
      imgUrl: '/img/isro_bharatiya_hackathon_2026.png',
      pdfUrl: '/pdf/isro_bharatiya_hackathon_2026.pdf'
    },
    {
      title: 'Nexothon 2025 Hackathon',
      issuer: 'Tech Fest 2025',
      category: 'Hackathon Certificate',
      imgUrl: '/img/nexothon_2025.png',
      pdfUrl: '/pdf/nexothon_2025.pdf'
    }
  ];

  return (
    <div className="pt-28 pb-24 bg-[#050508] text-[#F8FAFC] min-h-screen">
      <div className="container-fluid space-y-12">
        
        {/* Section Header Matching All Other Pages */}
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#15D8B3]">Honors & Certifications</span>
          <h1 className="text-3xl font-extrabold text-[#F8FAFC]">Engineering Achievements</h1>
          <p className="text-xs sm:text-sm text-[#F8FAFC]/75 font-light max-w-xl">
            Verified competitive exam ranks, hackathon runner-up awards, NPTEL elite certifications, open-source leadership, and academic honors.
          </p>
        </div>

        {/* Top Key Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topCredentials.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="glass-card p-6 md:p-8 bg-[#0c0d14] border-white/10 space-y-4 hover:border-[#15D8B3]/50 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#15D8B3]/10 border border-[#15D8B3]/30 flex items-center justify-center text-[#15D8B3] group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#15D8B3]">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#15D8B3] transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-[#15D8B3] font-semibold">
                    {item.subtitle}
                  </div>
                </div>

                <p className="text-xs text-[#F8FAFC]/80 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* NPTEL Elite Certifications Banner */}
        <div className="glass-card p-6 sm:p-8 bg-[#0c0d14] border-white/10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#15D8B3]/10 border border-[#15D8B3]/30 flex items-center justify-center text-[#15D8B3]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">NPTEL Elite Certifications</h2>
              <p className="text-xs text-[#F8FAFC]/70 font-mono">IIT Kharagpur & IIT Madras Certified</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nptelCertifications.map((cert, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[#050508] border border-white/10 space-y-3 hover:border-[#15D8B3]/40 transition-all">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">{cert.title}</h4>
                  <div className="text-xs text-[#F8FAFC]/70 font-mono">{cert.issuer}</div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-xs font-mono font-bold text-[#15D8B3]">{cert.score}</span>
                  {cert.pdfUrl && (
                    <a href={cert.pdfUrl} target="_blank" rel="noreferrer" className="text-xs font-mono text-[#F8FAFC]/80 hover:text-[#15D8B3] no-underline">
                      <span>View PDF</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Certificate Gallery Grid */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#15D8B3]">Verified Proof Gallery</span>
            <h2 className="text-2xl font-bold text-[#F8FAFC]">Certificates & Award Proofs</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificateGallery.map((cert, idx) => (
              <div 
                key={idx}
                className="glass-card overflow-hidden bg-[#0c0d14] border-white/10 flex flex-col justify-between group hover:border-[#15D8B3]/50 transition-all cursor-pointer"
                onClick={() => setActiveCertificateModal(cert)}
              >
                <div>
                  <div className="h-48 overflow-hidden bg-[#050508] relative flex items-center justify-center p-2 border-b border-white/10">
                    <img 
                      src={cert.imgUrl} 
                      alt={cert.title}
                      onError={(e) => { e.target.onerror = null; e.target.src = '/img/wocs_2025_admin.png'; }}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#050508]/90 text-[10px] font-mono text-[#15D8B3] border border-[#15D8B3]/30 font-semibold backdrop-blur-md">
                      {cert.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-[#15D8B3] transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    <div className="text-xs text-[#F8FAFC]/70 font-mono">
                      {cert.issuer}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-white/10 flex items-center justify-between mt-auto">
                  <span className="text-xs font-mono font-bold text-[#15D8B3] group-hover:underline">
                    Preview Certificate
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Certificate Lightbox Modal */}
      {activeCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0c0d14] border border-[#15D8B3]/40 rounded-2xl max-w-3xl w-full p-6 space-y-6 relative overflow-hidden shadow-2xl">
            <button 
              onClick={() => setActiveCertificateModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#050508] border border-white/10 text-[#F8FAFC] hover:text-[#15D8B3]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pr-10">
              <span className="px-3 py-0.5 rounded-full bg-[#15D8B3]/10 text-xs font-mono text-[#15D8B3] border border-[#15D8B3]/30">
                {activeCertificateModal.category}
              </span>
              <h3 className="text-2xl font-bold text-white pt-2">{activeCertificateModal.title}</h3>
              <p className="text-xs font-mono text-[#F8FAFC]/70">{activeCertificateModal.issuer}</p>
            </div>

            <div className="h-80 sm:h-96 rounded-xl bg-[#050508] border border-white/10 overflow-hidden flex items-center justify-center p-3">
              <img 
                src={activeCertificateModal.imgUrl} 
                alt={activeCertificateModal.title} 
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex items-center justify-end gap-4 pt-2">
              {activeCertificateModal.pdfUrl && (
                <a 
                  href={activeCertificateModal.pdfUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="px-5 py-2.5 rounded-lg bg-[#15D8B3] text-[#050508] font-bold text-xs flex items-center gap-2 no-underline"
                >
                  <FileText className="w-4 h-4" />
                  <span>Open Official PDF Document</span>
                </a>
              )}
              <button 
                onClick={() => setActiveCertificateModal(null)}
                className="px-5 py-2.5 rounded-lg bg-[#050508] text-[#F8FAFC] border border-white/15 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AchievementsPage;
