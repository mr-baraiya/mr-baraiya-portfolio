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

export function App() {
  const [profile, setProfile] = useState({});
  const [galleryItems, setGalleryItems] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [dbStatus, setDbStatus] = useState({ isConnected: false });

  const loadData = async () => {
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
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Router>
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
                    <Route path="/achievements" element={<AchievementsPage />} />
                    <Route path="/gallery" element={<GalleryPage galleryItems={galleryItems} />} />
                    <Route path="/open-source" element={<OpenSourcePRsPage />} />
                    <Route path="/pull-requests" element={<OpenSourcePRsPage />} />
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
