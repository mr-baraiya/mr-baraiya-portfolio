import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  // Navigation Links Ordered Exactly:
  // Home -> About -> Skills -> Projects -> Journey -> Achievements -> Gallery -> Contact
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Skills', path: '/skills' },
    { label: 'Projects', path: '/projects' },
    { label: 'Journey', path: '/journey' },
    { label: 'Achievements', path: '/achievements' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050508]/95 backdrop-blur-md border-b border-[#49A4BB]/20 py-4">
      <div className="container-fluid flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#F8FAFC] no-underline group">
          <img
            src="https://catgbuvicqq4rhla.public.blob.vercel-storage.com/logo.svg"
            alt="Mr. Baraiya Logo"
            onError={(e) => { e.target.onerror = null; e.target.src = '/logo.svg'; }}
            className="w-8 h-8 object-contain transition-transform group-hover:scale-110"
          />
          <span>Mr. Baraiya</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-[#15D8B3] no-underline whitespace-nowrap ${
                isActive(link.path) ? 'text-[#15D8B3] font-bold' : 'text-[#F8FAFC]/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden p-2 text-[#F8FAFC] bg-[#050508] rounded-lg border border-[#49A4BB]/30"
        >
          {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenu && (
        <div className="md:hidden bg-[#050508] border-b border-[#49A4BB]/30 px-6 py-6 transition-all">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenu(false)}
                className={`text-base font-medium transition-colors hover:text-[#15D8B3] no-underline ${
                  isActive(link.path) ? 'text-[#15D8B3] font-bold' : 'text-[#F8FAFC]/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
