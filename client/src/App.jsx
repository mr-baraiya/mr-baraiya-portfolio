import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import JourneyPage from './pages/JourneyPage';
import AchievementsPage from './pages/AchievementsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import OpenSourcePRsPage from './pages/OpenSourcePRsPage';
import ApiDocsPage from './pages/ApiDocsPage';

import AdminLogin from './pages/AdminLogin';
import AdminForgotPassword from './pages/AdminForgotPassword';
import AdminResetPassword from './pages/AdminResetPassword';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

import {
  fetchProfile,
  fetchGallery,
  fetchProjects,
  fetchSkills,
  fetchExperience,
  fetchServerStatus
} from './api/apiService';

import {
  getCached,
  setCached,
  invalidateAllCache,
  CACHE_KEYS,
} from './api/cacheService';

import { useLocation } from 'react-router-dom';
import { FullScreenLoader } from './components/SkeletonLoader';

// Scroll to top helper component on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

// ─── Slim top loading bar shown during background refresh ────────────────────
const LoadingBar = ({ visible }) => (
  <div
    className="fixed top-0 left-0 right-0 z-[9999] h-[2px] overflow-hidden transition-opacity duration-300"
    style={{ opacity: visible ? 1 : 0, pointerEvents: 'none' }}
  >
    <div
      className="h-full bg-[#15D8B3] origin-left"
      style={{
        animation: visible ? 'loadbar 2s ease-in-out infinite' : 'none',
      }}
    />
    <style>{`
      @keyframes loadbar {
        0%   { transform: scaleX(0); transform-origin: left; }
        50%  { transform: scaleX(0.7); transform-origin: left; }
        100% { transform: scaleX(1); transform-origin: left; opacity: 0; }
      }
    `}</style>
  </div>
);

export function App() {
  const [profile, setProfile]         = useState(() => getCached(CACHE_KEYS.PROFILE)     || {});
  const [galleryItems, setGalleryItems] = useState(() => getCached(CACHE_KEYS.GALLERY)   || []);
  const [projects, setProjects]         = useState(() => getCached(CACHE_KEYS.PROJECTS)  || []);
  const [skills, setSkills]             = useState(() => getCached(CACHE_KEYS.SKILLS)    || []);
  const [experiences, setExperiences]   = useState(() => getCached(CACHE_KEYS.EXPERIENCE)|| []);
  const [dbStatus, setDbStatus]         = useState({ isConnected: false });

  // `bootstrapping` — true only on the very first load when there is NO cache at all
  const hasAnyCache =
    getCached(CACHE_KEYS.PROFILE) !== null ||
    getCached(CACHE_KEYS.PROJECTS) !== null;
  const [bootstrapping, setBootstrapping] = useState(!hasAnyCache);

  // `refreshing` — true during background API re-fetch (shows the slim LoadingBar)
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Fetch fresh data from the API.
   * @param {boolean} silent - If true, only shows LoadingBar (not full-screen loader)
   */
  const loadData = useCallback(async (silent = false) => {
    if (!silent) setBootstrapping(true);
    setRefreshing(true);

    try {
      const [profData, galData, projData, skillData, expData, statusData] = await Promise.all([
        fetchProfile(),
        fetchGallery(),
        fetchProjects(),
        fetchSkills(),
        fetchExperience(),
        fetchServerStatus(),
      ]);

      const profile_    = profData   || {};
      const gallery_    = galData    || [];
      const projects_   = projData   || [];
      const skills_     = skillData  || [];
      const experience_ = expData    || [];

      setProfile(profile_);
      setGalleryItems(gallery_);
      setProjects(projects_);
      setSkills(skills_);
      setExperiences(experience_);
      setDbStatus(statusData?.database || { isConnected: false });

      // Persist fresh data to cache (5-minute TTL)
      setCached(CACHE_KEYS.PROFILE,    profile_);
      setCached(CACHE_KEYS.GALLERY,    gallery_);
      setCached(CACHE_KEYS.PROJECTS,   projects_);
      setCached(CACHE_KEYS.SKILLS,     skills_);
      setCached(CACHE_KEYS.EXPERIENCE, experience_);
    } catch (err) {
      console.error('[App] Error loading portfolio data:', err);
    } finally {
      setBootstrapping(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    // If we have cache, load silently in background; otherwise show full-screen loader
    const hasCachedData = getCached(CACHE_KEYS.PROFILE) !== null;
    loadData(!hasCachedData === false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Expose cache invalidation so admin mutations can force a refresh
  const refreshData = useCallback(() => {
    invalidateAllCache();
    loadData(false);
  }, [loadData]);

  if (bootstrapping) {
    return <FullScreenLoader />;
  }

  return (
    <Router>
      <ScrollToTop />
      <LoadingBar visible={refreshing} />
      <div className="min-h-screen bg-[#050508] text-[#F8FAFC] flex flex-col font-sans">
        <Routes>
          {/* Public Pages with Shared Navbar and Footer */}
          <Route
            path="/*"
            element={
              <>
                <Navbar dbStatus={dbStatus} />
                <main className="flex-grow">
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Home
                          profile={profile}
                          projects={projects}
                          skills={skills}
                          experiences={experiences}
                        />
                      }
                    />
                    <Route path="/about" element={<AboutPage profile={profile} />} />
                    <Route path="/skills" element={<SkillsPage skills={skills} />} />
                    <Route path="/projects" element={<ProjectsPage projects={projects} />} />
                    <Route path="/journey" element={<JourneyPage experiences={experiences} />} />
                    <Route path="/experience" element={<JourneyPage experiences={experiences} />} />
                    <Route path="/achievements" element={<AchievementsPage galleryItems={galleryItems} />} />
                    <Route path="/gallery" element={<GalleryPage galleryItems={galleryItems} />} />
                    <Route path="/open-source" element={<OpenSourcePRsPage />} />
                    <Route path="/pull-requests" element={<OpenSourcePRsPage />} />
                    <Route path="/api-docs" element={<ApiDocsPage />} />
                    <Route path="/api-info" element={<ApiDocsPage />} />
                    <Route
                      path="/contact"
                      element={<ContactPage profile={profile} loadData={refreshData} />}
                    />
                  </Routes>
                </main>
                <Footer profile={profile} dbStatus={dbStatus} />
              </>
            }
          />

          {/* Admin Auth Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
          <Route path="/admin/reset-password" element={<AdminResetPassword />} />

          {/* Protected Admin Dashboard Route */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard refreshData={refreshData} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
