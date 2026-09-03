import React, { useState, useEffect } from 'react';
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

export function App() {
  const [profile, setProfile] = useState({});
  const [galleryItems, setGalleryItems] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [dbStatus, setDbStatus] = useState({ isConnected: false });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [profData, galData, projData, skillData, expData, statusData] = await Promise.all([
        fetchProfile(),
        fetchGallery(),
        fetchProjects(),
        fetchSkills(),
        fetchExperience(),
        fetchServerStatus()
      ]);

      setProfile(profData || {});
      setGalleryItems(galData || []);
      setProjects(projData || []);
      setSkills(skillData || []);
      setExperiences(expData || []);
      setDbStatus(statusData.database || { isConnected: false });
    } catch (err) {
      console.error('Error loading portfolio data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <Router>
      <ScrollToTop />
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
                      element={<ContactPage profile={profile} loadData={loadData} />}
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
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
