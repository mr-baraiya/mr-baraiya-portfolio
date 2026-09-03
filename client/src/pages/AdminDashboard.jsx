import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  fetchProfile, updateProfileApi,
  fetchGallery, addGalleryApi, updateGalleryApi, deleteGalleryApi,
  fetchProjects, addProjectApi, updateProjectApi, deleteProjectApi,
  fetchSkills, addSkillApi, updateSkillApi, deleteSkillApi,
  fetchExperience, addExperienceApi, updateExperienceApi, deleteExperienceApi,
  fetchContactMessages, deleteContactMessage, fetchServerStatus, logoutAdmin,
  uploadFileApi, changePasswordApi
} from '../api/apiService';
import { Lock, Key, Eye, EyeOff, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dbStatus, setDbStatus] = useState(null);
  const [notification, setNotification] = useState('');

  // Data States
  const [profile, setProfile] = useState({});
  const [gallery, setGallery] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [messages, setMessages] = useState([]);

  // Change Password Form State & Validation
  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordStatus, setPasswordStatus] = useState({ type: '', msg: '' });
  const [passwordErrors, setPasswordErrors] = useState({});

  const validatePasswordForm = () => {
    const errors = {};
    const { currentPassword, newPassword, confirmPassword } = changePasswordForm;

    if (!currentPassword || !currentPassword.trim()) {
      errors.currentPassword = 'Current password is required.';
    }
    if (!newPassword) {
      errors.newPassword = 'New password is required.';
    } else if (newPassword.length < 6) {
      errors.newPassword = 'New password must be at least 6 characters long.';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password.';
    } else if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      errors.confirmPassword = 'New password and confirm password do not match.';
    }
    if (currentPassword && newPassword && currentPassword === newPassword) {
      errors.newPassword = 'New password must be different from your current password.';
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordInputChange = (field, value) => {
    const updatedForm = { ...changePasswordForm, [field]: value };
    setChangePasswordForm(updatedForm);
    
    // Clear inline error for field as user types
    if (passwordErrors[field]) {
      setPasswordErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordStatus({ type: '', msg: '' });

    if (!validatePasswordForm()) {
      setPasswordStatus({ type: 'error', msg: 'Please correct the highlighted validation errors.' });
      return;
    }

    try {
      setLoading(true);
      const res = await changePasswordApi(changePasswordForm);
      setPasswordStatus({ type: 'success', msg: res.message || 'Admin password updated successfully!' });
      setChangePasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordErrors({});
      notify('Admin password updated successfully in MongoDB database!');
    } catch (err) {
      setPasswordStatus({ type: 'error', msg: err.error || err.message || 'Failed to update password.' });
    } finally {
      setLoading(false);
    }
  };

  // List Filter States
  const [galleryFilter, setGalleryFilter] = useState('ALL');
  const [projectFilter, setProjectFilter] = useState('ALL');
  const [skillFilter, setSkillFilter] = useState('ALL');
  const [experienceFilter, setExperienceFilter] = useState('ALL');

  const filteredGallery = galleryFilter === 'ALL'
    ? gallery
    : gallery.filter(g => (g.category || '').toUpperCase() === galleryFilter.toUpperCase());

  const filteredProjects = projectFilter === 'ALL'
    ? projects
    : projects.filter(p => (p.category || '').toUpperCase() === projectFilter.toUpperCase());

  const filteredSkills = skillFilter === 'ALL'
    ? skills
    : skills.filter(s => (s.category || '').toUpperCase() === skillFilter.toUpperCase());

  const filteredExperiences = experienceFilter === 'ALL'
    ? experiences
    : experiences.filter(e => (e.type || '').toUpperCase() === experienceFilter.toUpperCase());

  // Editing States
  const [editingGallery, setEditingGallery] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null);

  // Form States
  const [galleryForm, setGalleryForm] = useState({
    title: '', category: 'Certificates', issuer: '', date: '2026',
    image: '', pdfUrl: '', description: '', credentialUrl: '', featured: false
  });

  const [projectForm, setProjectForm] = useState({
    title: '', description: '', longDescription: '', category: 'Full-Stack',
    image: '', techStack: 'React, Node.js, MongoDB', githubUrl: '', liveUrl: '', featured: false
  });

  const [skillForm, setSkillForm] = useState({
    name: '', category: 'Frontend', proficiency: 90, color: '#15D8B3', icon: 'Code'
  });

  const [experienceForm, setExperienceForm] = useState({
    role: '', company: '', location: 'Remote', period: '2024 - Present',
    type: 'Work', description: '', highlights: ''
  });

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [profData, galData, projData, skillData, expData, msgData, statusData] = await Promise.all([
        fetchProfile(),
        fetchGallery(),
        fetchProjects(),
        fetchSkills(),
        fetchExperience(),
        fetchContactMessages(),
        fetchServerStatus()
      ]);

      if (profData) setProfile(profData);
      setGallery(galData || []);
      setProjects(projData || []);
      setSkills(skillData || []);
      setExperiences(expData || []);
      setMessages(msgData || []);
      setDbStatus(statusData.database);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  // --- Direct File Upload Handler (PDF or Image) ---
  const handleFileUpload = async (e, targetFormType, uploadType = 'auto') => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadFileApi(file);
      if (res.success) {
        notify(res.message || 'File uploaded to Vercel Blob CDN successfully!');
        
        if (targetFormType === 'gallery') {
          if (file.type === 'application/pdf' || uploadType === 'pdf') {
            setGalleryForm(prev => ({
              ...prev,
              pdfUrl: res.pdfUrl,
              credentialUrl: res.pdfUrl,
              image: prev.image ? prev.image : (res.imageUrl || res.pdfUrl)
            }));
          } else {
            setGalleryForm(prev => ({
              ...prev,
              image: res.imageUrl || res.pdfUrl
            }));
          }
        } else if (targetFormType === 'project') {
          setProjectForm(prev => ({
            ...prev,
            image: res.imageUrl || res.pdfUrl
          }));
        }
      }
    } catch (err) {
      alert(err.error || err.message || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  // --- Profile Settings Handler & Validation ---
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!profile.name || profile.name.trim() === '') {
      alert('Validation Error: Developer Name is required.');
      return;
    }
    if (!profile.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim())) {
      alert('Validation Error: A valid email address is required.');
      return;
    }
    if (!profile.bio || profile.bio.trim() === '') {
      alert('Validation Error: Bio text is required.');
      return;
    }

    try {
      await updateProfileApi(profile);
      notify('Site profile & 10 social URLs updated in MongoDB database!');
      loadAllData();
    } catch (err) {
      alert(err.error || 'Failed to update profile settings');
    }
  };

  // --- Gallery Handlers & Validation ---
  const handleSaveGallery = async (e) => {
    e.preventDefault();
    if (!galleryForm.title || galleryForm.title.trim() === '') {
      alert('Validation Error: Certificate / Gallery Title is required.');
      return;
    }
    if (!galleryForm.issuer || galleryForm.issuer.trim() === '') {
      alert('Validation Error: Event / Issuer Name is required.');
      return;
    }
    if (!galleryForm.image && !galleryForm.pdfUrl) {
      alert('Validation Error: Please upload a file or specify an Image URL or PDF Document URL.');
      return;
    }

    try {
      const payload = {
        ...galleryForm,
        credentialUrl: galleryForm.pdfUrl || galleryForm.credentialUrl || galleryForm.image
      };

      if (editingGallery) {
        await updateGalleryApi(editingGallery._id, payload);
        notify('Gallery item updated in MongoDB!');
      } else {
        await addGalleryApi(payload);
        notify('New certificate/achievement added to MongoDB database!');
      }

      setEditingGallery(null);
      setGalleryForm({
        title: '', category: 'Certificates', issuer: '', date: '2026',
        image: '', pdfUrl: '', description: '', credentialUrl: '', featured: false
      });
      loadAllData();
    } catch (err) {
      alert(err.error || 'Failed to save gallery item');
    }
  };

  const handleEditGalleryClick = (g) => {
    setEditingGallery(g);
    setGalleryForm({
      title: g.title,
      category: g.category,
      issuer: g.issuer,
      date: g.date || '2026',
      image: g.image,
      pdfUrl: g.pdfUrl || g.credentialUrl || '',
      description: g.description || '',
      credentialUrl: g.credentialUrl || g.pdfUrl || '',
      featured: g.featured || false
    });
  };

  const handleDeleteGallery = async (id) => {
    if (confirm('Delete this gallery item?')) {
      await deleteGalleryApi(id);
      notify('Gallery item deleted!');
      loadAllData();
    }
  };

  // --- Project Handlers & Validation ---
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title || projectForm.title.trim() === '') {
      alert('Validation Error: Project Title is required.');
      return;
    }
    if (!projectForm.description || projectForm.description.trim() === '') {
      alert('Validation Error: Short Project Description is required.');
      return;
    }

    try {
      const payload = {
        ...projectForm,
        techStack: typeof projectForm.techStack === 'string' 
          ? projectForm.techStack.split(',').map(s => s.trim()) 
          : projectForm.techStack
      };

      if (editingProject) {
        await updateProjectApi(editingProject._id, payload);
        notify('Project updated successfully!');
      } else {
        await addProjectApi(payload);
        notify('New project added to database!');
      }

      setEditingProject(null);
      setProjectForm({
        title: '', description: '', longDescription: '', category: 'Full-Stack',
        image: '', techStack: 'React, Node.js, MongoDB', githubUrl: '', liveUrl: '', featured: false
      });
      loadAllData();
    } catch (err) {
      alert(err.error || 'Failed to save project');
    }
  };

  const handleEditProjectClick = (p) => {
    setEditingProject(p);
    setProjectForm({
      title: p.title,
      description: p.description,
      longDescription: p.longDescription || p.description,
      category: p.category,
      image: p.image,
      techStack: Array.isArray(p.techStack) ? p.techStack.join(', ') : p.techStack,
      githubUrl: p.githubUrl || '',
      liveUrl: p.liveUrl || '',
      featured: p.featured || false
    });
  };

  const handleDeleteProject = async (id) => {
    if (confirm('Delete this project from database?')) {
      await deleteProjectApi(id);
      notify('Project deleted!');
      loadAllData();
    }
  };

  // --- Skill Handlers & Validation ---
  const handleSaveSkill = async (e) => {
    e.preventDefault();
    if (!skillForm.name || skillForm.name.trim() === '') {
      alert('Validation Error: Skill Name is required.');
      return;
    }

    try {
      const payload = {
        name: skillForm.name,
        category: skillForm.category || 'Frontend',
        proficiency: 90,
        color: '#15D8B3',
        icon: 'Code'
      };
      if (editingSkill) {
        await updateSkillApi(editingSkill._id, payload);
        notify('Skill updated!');
      } else {
        await addSkillApi(payload);
        notify('New skill added!');
      }
      setEditingSkill(null);
      setSkillForm({ name: '', category: 'Frontend' });
      loadAllData();
    } catch (err) {
      alert(err.error || 'Failed to save skill');
    }
  };

  const handleEditSkillClick = (s) => {
    setEditingSkill(s);
    setSkillForm({
      name: s.name,
      category: s.category
    });
  };

  const handleDeleteSkill = async (id) => {
    if (confirm('Delete this skill?')) {
      await deleteSkillApi(id);
      notify('Skill deleted!');
      loadAllData();
    }
  };

  // --- Experience Handlers & Validation ---
  const handleSaveExperience = async (e) => {
    e.preventDefault();
    if (!experienceForm.role || experienceForm.role.trim() === '') {
      alert('Validation Error: Role / Title is required.');
      return;
    }
    if (!experienceForm.company || experienceForm.company.trim() === '') {
      alert('Validation Error: Company / Organization is required.');
      return;
    }

    try {
      const payload = {
        ...experienceForm,
        highlights: typeof experienceForm.highlights === 'string'
          ? experienceForm.highlights.split(',').map(h => h.trim())
          : experienceForm.highlights
      };
      if (editingExperience) {
        await updateExperienceApi(editingExperience._id, payload);
        notify('Experience updated!');
      } else {
        await addExperienceApi(payload);
        notify('New experience added!');
      }
      setEditingExperience(null);
      setExperienceForm({
        role: '', company: '', location: 'Remote', period: '2024 - Present',
        type: 'Work', description: '', highlights: ''
      });
      loadAllData();
    } catch (err) {
      alert(err.error || 'Failed to save experience');
    }
  };

  const handleEditExperienceClick = (exp) => {
    setEditingExperience(exp);
    setExperienceForm({
      role: exp.role,
      company: exp.company,
      location: exp.location || 'Remote',
      period: exp.period,
      type: exp.type || 'Work',
      description: exp.description,
      highlights: Array.isArray(exp.highlights) ? exp.highlights.join(', ') : exp.highlights
    });
  };

  const handleDeleteExperience = async (id) => {
    if (confirm('Delete this experience entry?')) {
      await deleteExperienceApi(id);
      notify('Experience entry deleted!');
      loadAllData();
    }
  };

  // --- Message Handler ---
  const handleDeleteMessage = async (id) => {
    if (confirm('Delete message from database?')) {
      await deleteContactMessage(id);
      notify('Message deleted!');
      loadAllData();
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 glass-card border-[#49A4BB]/30 bg-[#050508]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link to="/" className="px-3.5 py-2 rounded-lg bg-[#0c0d14] border border-[#49A4BB]/30 text-xs font-mono text-[#F8FAFC]/80 hover:text-[#15D8B3] no-underline shrink-0">
              ← Back to Portfolio
            </Link>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-white">Full Portfolio Admin Panel</h1>
                <span className="px-2 py-0.5 rounded bg-[#15D8B3]/10 text-[#15D8B3] text-[10px] font-mono border border-[#15D8B3]/30 font-bold">
                  AUTHENTICATED
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-mono text-[#F8FAFC]/70">Manage Profile, Certificates, Projects, Skills & Messages</p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#49A4BB]/20">
            <button
              onClick={loadAllData}
              className="px-3.5 py-2 rounded-lg bg-[#0c0d14] border border-[#49A4BB]/30 text-xs font-mono text-[#F8FAFC]/80 hover:text-[#15D8B3] cursor-pointer flex-1 sm:flex-none text-center"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400 hover:bg-red-500/20 cursor-pointer flex-1 sm:flex-none text-center"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Global Notification Banner */}
        {notification && (
          <div className="p-3.5 rounded-xl bg-[#15D8B3]/10 border border-[#15D8B3]/40 text-[#15D8B3] text-xs font-bold font-mono">
            <span>{notification}</span>
          </div>
        )}

        {/* Mobile Select Dropdown Navigation */}
        <div className="block sm:hidden w-full">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#0c0d14] text-[#15D8B3] border border-[#15D8B3]/50 text-xs font-mono font-bold outline-none cursor-pointer"
          >
            <option value="profile" className="bg-[#050508] text-[#F8FAFC]">Profile & 10 Social URLs</option>
            <option value="gallery" className="bg-[#050508] text-[#F8FAFC]">Certificates & Gallery ({gallery.length})</option>
            <option value="projects" className="bg-[#050508] text-[#F8FAFC]">Projects ({projects.length})</option>
            <option value="skills" className="bg-[#050508] text-[#F8FAFC]">Skills ({skills.length})</option>
            <option value="experience" className="bg-[#050508] text-[#F8FAFC]">Journey ({experiences.length})</option>
            <option value="messages" className="bg-[#050508] text-[#F8FAFC]">Messages ({messages.length})</option>
          </select>
        </div>

        {/* Desktop Navigation Tabs */}
        <div className="hidden sm:flex border-b border-[#49A4BB]/20 gap-2 overflow-x-auto no-scrollbar flex-nowrap pb-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 md:px-5 text-xs md:text-sm font-mono font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-[#15D8B3] text-[#15D8B3]'
                : 'border-transparent text-[#F8FAFC]/70 hover:text-white'
            }`}
          >
            Profile & 10 Social URLs
          </button>
          <button
            onClick={() => { setActiveTab('gallery'); setEditingGallery(null); }}
            className={`py-3 px-4 md:px-5 text-xs md:text-sm font-mono font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'gallery'
                ? 'border-[#15D8B3] text-[#15D8B3]'
                : 'border-transparent text-[#F8FAFC]/70 hover:text-white'
            }`}
          >
            Certificates & Gallery ({gallery.length})
          </button>
          <button
            onClick={() => { setActiveTab('projects'); setEditingProject(null); }}
            className={`py-3 px-4 md:px-5 text-xs md:text-sm font-mono font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-[#15D8B3] text-[#15D8B3]'
                : 'border-transparent text-[#F8FAFC]/70 hover:text-white'
            }`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => { setActiveTab('skills'); setEditingSkill(null); }}
            className={`py-3 px-4 md:px-5 text-xs md:text-sm font-mono font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'skills'
                ? 'border-[#15D8B3] text-[#15D8B3]'
                : 'border-transparent text-[#F8FAFC]/70 hover:text-white'
            }`}
          >
            Skills ({skills.length})
          </button>
          <button
            onClick={() => { setActiveTab('experience'); setEditingExperience(null); }}
            className={`py-3 px-4 md:px-5 text-xs md:text-sm font-mono font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'experience'
                ? 'border-[#15D8B3] text-[#15D8B3]'
                : 'border-transparent text-[#F8FAFC]/70 hover:text-white'
            }`}
          >
            Journey ({experiences.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-3 px-4 md:px-5 text-xs md:text-sm font-mono font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'messages'
                ? 'border-[#15D8B3] text-[#15D8B3]'
                : 'border-transparent text-[#F8FAFC]/70 hover:text-white'
            }`}
          >
            Messages ({messages.length})
          </button>
          <button
            onClick={() => { setActiveTab('security'); setPasswordStatus({ type: '', msg: '' }); setPasswordErrors({}); }}
            className={`py-3 px-4 md:px-5 text-xs md:text-sm font-mono font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-[#15D8B3] text-[#15D8B3]'
                : 'border-transparent text-[#F8FAFC]/70 hover:text-white'
            }`}
          >
            <span>Security & Password</span>
          </button>
        </div>

        {/* --- TAB 0: PROFILE & 10 SOCIAL URLs SETTINGS --- */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="glass-card p-8 border-[#49A4BB]/30 space-y-6 max-w-5xl mx-auto bg-[#050508]">
            <div className="flex items-center justify-between border-b border-[#49A4BB]/20 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Dynamic Site Profile & 10 Social URLs</h2>
                <p className="text-xs font-mono text-[#F8FAFC]/70">Changes saved here automatically update across all website sections & footer</p>
              </div>
              <button type="submit" className="px-6 py-3 rounded-lg bg-[#15D8B3] text-[#050508] font-bold text-xs hover:bg-[#12be9d] transition-all cursor-pointer border-none shadow-md shadow-[#15D8B3]/20">
                Save Profile Settings to MongoDB
              </button>
            </div>

            {/* General Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Developer Name *</label>
                <input
                  type="text" required
                  value={profile.name || ''}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="input-field"
                  placeholder="Mr. Baraiya"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Role / Headline *</label>
                <input
                  type="text" required
                  value={profile.role || ''}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  className="input-field"
                  placeholder="Full-Stack Developer & Software Architect"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Status Badge Text</label>
                <input
                  type="text"
                  value={profile.statusBadge || ''}
                  onChange={(e) => setProfile({ ...profile, statusBadge: e.target.value })}
                  className="input-field"
                  placeholder="Available for Full-Stack Opportunities"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Contact Email *</label>
                <input
                  type="email" required
                  value={profile.email || ''}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="input-field"
                  placeholder="mr.baraiya.dev@gmail.com"
                />
              </div>
            </div>

            {/* 10 Social & Developer Profile URLs */}
            <div className="pt-4 border-t border-[#49A4BB]/20 space-y-4">
              <h3 className="text-sm font-mono font-bold text-[#15D8B3] uppercase tracking-wider">
                10 Editable Social & Developer Profile URLs
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">1. GitHub Profile URL *</label>
                  <input
                    type="url" required
                    value={profile.githubUrl || ''}
                    onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                    className="input-field"
                    placeholder="https://github.com/mr-baraiya"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">2. LinkedIn Profile URL *</label>
                  <input
                    type="url" required
                    value={profile.linkedinUrl || ''}
                    onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                    className="input-field"
                    placeholder="https://www.linkedin.com/in/baraiya-vishalbhai/"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">3. LeetCode Profile URL</label>
                  <input
                    type="url"
                    value={profile.leetcodeUrl || ''}
                    onChange={(e) => setProfile({ ...profile, leetcodeUrl: e.target.value })}
                    className="input-field"
                    placeholder="https://leetcode.com/u/mr_baraiya/"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">4. CodeChef Profile URL</label>
                  <input
                    type="url"
                    value={profile.codechefUrl || ''}
                    onChange={(e) => setProfile({ ...profile, codechefUrl: e.target.value })}
                    className="input-field"
                    placeholder="https://www.codechef.com/users/baraiyavishal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">5. Kaggle Profile URL</label>
                  <input
                    type="url"
                    value={profile.kaggleUrl || ''}
                    onChange={(e) => setProfile({ ...profile, kaggleUrl: e.target.value })}
                    className="input-field"
                    placeholder="https://www.kaggle.com/mrbaraiya"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">6. HackerRank Profile URL</label>
                  <input
                    type="url"
                    value={profile.hackerrankUrl || ''}
                    onChange={(e) => setProfile({ ...profile, hackerrankUrl: e.target.value })}
                    className="input-field"
                    placeholder="https://www.hackerrank.com/profile/h23010101014"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">7. HuggingFace Profile URL</label>
                  <input
                    type="url"
                    value={profile.huggingfaceUrl || ''}
                    onChange={(e) => setProfile({ ...profile, huggingfaceUrl: e.target.value })}
                    className="input-field"
                    placeholder="https://huggingface.co/mr-baraiya"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">8. Twitter / X Profile URL</label>
                  <input
                    type="url"
                    value={profile.twitterUrl || ''}
                    onChange={(e) => setProfile({ ...profile, twitterUrl: e.target.value })}
                    className="input-field"
                    placeholder="https://x.com/baraiya1014"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">9. YouTube Channel URL</label>
                  <input
                    type="url"
                    value={profile.youtubeUrl || ''}
                    onChange={(e) => setProfile({ ...profile, youtubeUrl: e.target.value })}
                    className="input-field"
                    placeholder="https://www.youtube.com/@Vi.685_junior"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">10. Instagram Profile URL</label>
                  <input
                    type="url"
                    value={profile.instagramUrl || ''}
                    onChange={(e) => setProfile({ ...profile, instagramUrl: e.target.value })}
                    className="input-field"
                    placeholder="https://www.instagram.com/vishalbaraiya_1014/"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#49A4BB]/20">
              <div>
                <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Location</label>
                <input
                  type="text"
                  value={profile.location || ''}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="input-field"
                  placeholder="Gujarat, India (Open to Remote)"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Resume / CV URL</label>
                <input
                  type="text"
                  value={profile.resumeUrl || ''}
                  onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                  className="input-field"
                  placeholder="/pdf/Vishal_Baraiya_Resume.pdf"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Projects Count Badge</label>
                <input
                  type="text"
                  value={profile.projectsCompleted || ''}
                  onChange={(e) => setProfile({ ...profile, projectsCompleted: e.target.value })}
                  className="input-field"
                  placeholder="21+"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Hero Subtitle Bio *</label>
              <textarea
                required rows={3}
                value={profile.bio || ''}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="input-field resize-none text-xs"
              ></textarea>
            </div>

            {/* 4 Featured Projects Selector Dropdowns */}
            <div className="pt-4 border-t border-[#49A4BB]/20 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-sm font-mono font-bold text-[#15D8B3] uppercase tracking-wider">
                  Select 4 Featured Projects for Landing Page
                </h3>
                <span className="text-[10px] font-mono text-[#F8FAFC]/60">
                  Controls the 4 cards shown in "Featured Work" section
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((slotIndex) => {
                  const currentArr = Array.isArray(profile.featuredProjectIds) 
                    ? profile.featuredProjectIds 
                    : ['proj-13', 'proj-12', 'proj-19', 'proj-16'];
                  const selectedVal = currentArr[slotIndex] || '';

                  return (
                    <div key={slotIndex} className="space-y-1">
                      <label className="text-xs font-mono text-[#15D8B3] font-bold block">
                        Featured Project #{slotIndex + 1}
                      </label>
                      <select
                        value={selectedVal}
                        onChange={(e) => {
                          const updated = [...currentArr];
                          updated[slotIndex] = e.target.value;
                          setProfile({ ...profile, featuredProjectIds: updated });
                        }}
                        className="input-field bg-[#050508] text-xs font-sans"
                      >
                        <option value="">Select Project #{slotIndex + 1}</option>
                        {projects.map((p) => (
                          <option key={p._id} value={p._id}>
                            {p.title} ({p.category})
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>

            <button type="submit" className="w-full py-3.5 rounded-lg bg-[#15D8B3] text-[#050508] font-bold text-sm hover:bg-[#12be9d] transition-all cursor-pointer border-none shadow-md shadow-[#15D8B3]/20">
              Save All Profile Settings & 10 Social URLs to MongoDB
            </button>
          </form>
        )}

        {/* --- TAB 1: GALLERY & CERTIFICATES MANAGEMENT --- */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <form onSubmit={handleSaveGallery} className="glass-card p-6 border-[#49A4BB]/30 space-y-4 sticky top-8 bg-[#050508]">
                <div className="flex items-center justify-between border-b border-[#49A4BB]/20 pb-3">
                  <h3 className="text-base font-bold text-white">
                    {editingGallery ? 'Edit Certificate / Achievement' : 'Add Certificate / Hackathon Result'}
                  </h3>
                  {editingGallery && (
                    <button
                      type="button"
                      onClick={() => setEditingGallery(null)}
                      className="px-3 py-1 rounded bg-[#0c0d14] border border-white/20 text-[#F8FAFC]/80 hover:border-white text-xs font-mono cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Title *</label>
                  <input
                    type="text" required
                    value={galleryForm.title || ''}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    className="input-field"
                    placeholder="e.g. TCS CodeVita Season 13 / Odoo Hackathon"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Category</label>
                    <select
                      value={galleryForm.category || 'Certificates'}
                      onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                      className="input-field bg-[#050508]"
                    >
                      <option value="Certificates">Certificates</option>
                      <option value="Hackathons">Hackathons</option>
                      <option value="Awards">Awards</option>
                      <option value="Achievements">Achievements</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Date / Year</label>
                    <input
                      type="text"
                      value={galleryForm.date || ''}
                      onChange={(e) => setGalleryForm({ ...galleryForm, date: e.target.value })}
                      className="input-field"
                      placeholder="2026"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Issuer / Event Name *</label>
                  <input
                    type="text" required
                    value={galleryForm.issuer || ''}
                    onChange={(e) => setGalleryForm({ ...galleryForm, issuer: e.target.value })}
                    className="input-field"
                    placeholder="e.g. Tata Consultancy Services (TCS)"
                  />
                </div>

                {/* Separate Input Field 1: Cover Image + Upload Button + Eye Preview */}
                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">
                    Image Cover Path / CDN URL *
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text" required
                      value={galleryForm.image || ''}
                      onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                      className="input-field flex-1"
                      placeholder="/img/tcs_codevita_season13.png or Vercel Blob URL..."
                    />
                    <label className="px-3.5 py-2.5 rounded-lg bg-[#0c0d14] border border-[#15D8B3]/50 text-[#15D8B3] text-xs font-mono font-bold hover:bg-[#15D8B3] hover:text-[#050508] transition-all cursor-pointer shrink-0 whitespace-nowrap">
                      {uploading ? 'Uploading...' : 'Upload Image'}
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg,.webp"
                        disabled={uploading}
                        onChange={(e) => handleFileUpload(e, 'gallery', 'image')}
                        className="hidden"
                      />
                    </label>
                    {galleryForm.image && (
                      <a
                        href={galleryForm.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Preview Cover Image"
                        className="p-2.5 rounded-lg bg-[#0c0d14] border border-[#15D8B3]/50 text-[#15D8B3] hover:bg-[#15D8B3] hover:text-[#050508] transition-all shrink-0 flex items-center justify-center cursor-pointer"
                      >
                        <Eye size={16} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Separate Input Field 2: PDF Document + Upload Button + Eye Preview */}
                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">
                    PDF Document Path / CDN URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={galleryForm.pdfUrl || ''}
                      onChange={(e) => setGalleryForm({ ...galleryForm, pdfUrl: e.target.value, credentialUrl: e.target.value })}
                      className="input-field flex-1"
                      placeholder="/pdf/tcs_codevita_season13.pdf or Vercel Blob URL..."
                    />
                    <label className="px-3.5 py-2.5 rounded-lg bg-[#0c0d14] border border-[#15D8B3]/50 text-[#15D8B3] text-xs font-mono font-bold hover:bg-[#15D8B3] hover:text-[#050508] transition-all cursor-pointer shrink-0 whitespace-nowrap">
                      {uploading ? 'Uploading...' : 'Upload PDF'}
                      <input
                        type="file"
                        accept=".pdf"
                        disabled={uploading}
                        onChange={(e) => handleFileUpload(e, 'gallery', 'pdf')}
                        className="hidden"
                      />
                    </label>
                    {galleryForm.pdfUrl && (
                      <a
                        href={galleryForm.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Preview PDF Document"
                        className="p-2.5 rounded-lg bg-[#0c0d14] border border-[#15D8B3]/50 text-[#15D8B3] hover:bg-[#15D8B3] hover:text-[#050508] transition-all shrink-0 flex items-center justify-center cursor-pointer"
                      >
                        <Eye size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={galleryForm.featured || false}
                    onChange={(e) => setGalleryForm({ ...galleryForm, featured: e.target.checked })}
                    className="w-4 h-4 accent-[#15D8B3]"
                  />
                  <label htmlFor="featured" className="text-xs font-mono text-[#15D8B3] font-bold cursor-pointer">
                    Set as Main Featured Highlight
                  </label>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Description *</label>
                  <textarea
                    required rows={3}
                    value={galleryForm.description || ''}
                    onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                    className="input-field resize-none text-xs"
                  ></textarea>
                </div>

                <button type="submit" className="w-full py-3 rounded-lg bg-[#15D8B3] text-[#050508] font-bold text-xs hover:bg-[#12be9d] transition-all cursor-pointer border-none shadow-md shadow-[#15D8B3]/20">
                  {editingGallery ? 'Update Gallery Item' : 'Save to Gallery Database'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#49A4BB]/20 pb-3">
                <h3 className="text-base font-bold text-white">Database Gallery Showcase ({filteredGallery.length})</h3>
                <div className="flex flex-wrap items-center gap-1.5">
                  {['ALL', 'Certificates', 'Hackathons', 'Awards', 'Achievements'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setGalleryFilter(cat)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        galleryFilter === cat
                          ? 'bg-[#15D8B3] text-[#050508]'
                          : 'bg-[#0c0d14] text-[#F8FAFC]/70 border border-[#49A4BB]/20 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 max-h-[750px] overflow-y-auto pr-2">
                {filteredGallery.map((g) => (
                  <div key={g._id} className="p-4 rounded-xl bg-[#050508] border border-[#49A4BB]/30 flex items-center justify-between gap-4 hover:border-[#15D8B3]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#15D8B3]/10 text-[#15D8B3] border border-[#15D8B3]/30">
                          {g.category}
                        </span>
                        {g.featured && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#15D8B3]/20 text-[#15D8B3] border border-[#15D8B3]/40">
                            FEATURED
                          </span>
                        )}
                        <h4 className="font-bold text-white text-sm">{g.title}</h4>
                      </div>
                      <p className="text-xs text-[#F8FAFC]/70 line-clamp-1">{g.issuer} — {g.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditGalleryClick(g)}
                        className="px-3 py-1.5 rounded-lg bg-[#15D8B3]/10 border border-[#15D8B3]/40 text-[#15D8B3] text-xs font-mono font-bold hover:bg-[#15D8B3] hover:text-[#050508] transition-all cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteGallery(g._id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold hover:bg-red-500/20 transition-all cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: PROJECTS MANAGEMENT --- */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <form onSubmit={handleSaveProject} className="glass-card p-6 border-[#49A4BB]/30 space-y-4 sticky top-8 bg-[#050508]">
                <div className="flex items-center justify-between border-b border-[#49A4BB]/20 pb-3">
                  <h3 className="text-base font-bold text-white">
                    {editingProject ? 'Edit Project' : 'Add New Project'}
                  </h3>
                  {editingProject && (
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="px-3 py-1 rounded bg-[#0c0d14] border border-white/20 text-[#F8FAFC]/80 hover:border-white text-xs font-mono cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Project Title *</label>
                  <input
                    type="text" required
                    value={projectForm.title || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="input-field"
                    placeholder="e.g. AgroSmart Platform"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Category</label>
                    <select
                      value={projectForm.category || 'Full-Stack'}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="input-field bg-[#050508]"
                    >
                      <option value="Full-Stack">Full-Stack</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="AI & ML">AI & ML</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={projectForm.techStack || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                      className="input-field"
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">
                    Cover Image Path / CDN URL *
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text" required
                      value={projectForm.image || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      className="input-field flex-1"
                      placeholder="/images/projects/agrosmart.png or Vercel Blob URL..."
                    />
                    <label className="px-3.5 py-2.5 rounded-lg bg-[#0c0d14] border border-[#15D8B3]/50 text-[#15D8B3] text-xs font-mono font-bold hover:bg-[#15D8B3] hover:text-[#050508] transition-all cursor-pointer shrink-0 whitespace-nowrap">
                      {uploading ? 'Uploading...' : 'Upload Image'}
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg,.webp"
                        disabled={uploading}
                        onChange={(e) => handleFileUpload(e, 'project', 'image')}
                        className="hidden"
                      />
                    </label>
                    {projectForm.image && (
                      <a
                        href={projectForm.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Preview Project Image"
                        className="p-2.5 rounded-lg bg-[#0c0d14] border border-[#15D8B3]/50 text-[#15D8B3] hover:bg-[#15D8B3] hover:text-[#050508] transition-all shrink-0 flex items-center justify-center cursor-pointer"
                      >
                        <Eye size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Live App URL</label>
                    <input
                      type="url"
                      value={projectForm.liveUrl || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                      className="input-field"
                      placeholder="https://ecoagrosmart.netlify.app/"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">GitHub Repo URL</label>
                    <input
                      type="url"
                      value={projectForm.githubUrl || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                      className="input-field"
                      placeholder="https://github.com/mr-baraiya/AgroSmart"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Short Description *</label>
                  <textarea
                    required rows={3}
                    value={projectForm.description || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="input-field resize-none text-xs"
                  ></textarea>
                </div>

                <button type="submit" className="w-full py-3 rounded-lg bg-[#15D8B3] text-[#050508] font-bold text-xs hover:bg-[#12be9d] transition-all cursor-pointer border-none shadow-md shadow-[#15D8B3]/20">
                  {editingProject ? 'Update Project' : 'Save Project to Database'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#49A4BB]/20 pb-3">
                <h3 className="text-base font-bold text-white">Database Projects ({filteredProjects.length})</h3>
                <div className="flex flex-wrap items-center gap-1.5">
                  {['ALL', 'Full-Stack', 'Frontend', 'Backend', 'AI & ML'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setProjectFilter(cat)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        projectFilter === cat
                          ? 'bg-[#15D8B3] text-[#050508]'
                          : 'bg-[#0c0d14] text-[#F8FAFC]/70 border border-[#49A4BB]/20 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 max-h-[750px] overflow-y-auto pr-2">
                {filteredProjects.map((p) => (
                  <div key={p._id} className="p-4 rounded-xl bg-[#050508] border border-[#49A4BB]/30 flex items-center justify-between gap-4 hover:border-[#15D8B3]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#15D8B3]/10 text-[#15D8B3] border border-[#15D8B3]/30">
                          {p.category}
                        </span>
                        {p.featured && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#15D8B3] text-[#050508]">
                            FEATURED ON LANDING PAGE
                          </span>
                        )}
                        <h4 className="font-bold text-white text-sm">{p.title}</h4>
                      </div>
                      <p className="text-xs text-[#F8FAFC]/70 line-clamp-1">{p.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditProjectClick(p)}
                        className="px-3 py-1.5 rounded-lg bg-[#15D8B3]/10 border border-[#15D8B3]/40 text-[#15D8B3] text-xs font-mono font-bold hover:bg-[#15D8B3] hover:text-[#050508] transition-all cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(p._id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold hover:bg-red-500/20 transition-all cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 3: SKILLS MANAGEMENT --- */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <form onSubmit={handleSaveSkill} className="glass-card p-6 border-[#49A4BB]/30 space-y-4 sticky top-8 bg-[#050508]">
                <div className="flex items-center justify-between border-b border-[#49A4BB]/20 pb-3">
                  <h3 className="text-base font-bold text-white">
                    {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                  </h3>
                  {editingSkill && (
                    <button
                      type="button"
                      onClick={() => setEditingSkill(null)}
                      className="px-3 py-1 rounded bg-[#0c0d14] border border-white/20 text-[#F8FAFC]/80 hover:border-white text-xs font-mono cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Skill Name *</label>
                  <input
                    type="text" required
                    value={skillForm.name || ''}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    className="input-field"
                    placeholder="e.g. React.js / ASP.NET Core"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Skill Category</label>
                  <select
                    value={skillForm.category || 'Frontend'}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="input-field bg-[#050508]"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="DevOps & Tools">DevOps & Tools</option>
                    <option value="Languages">Languages</option>
                  </select>
                </div>

                <button type="submit" className="w-full py-3 rounded-lg bg-[#15D8B3] text-[#050508] font-bold text-xs hover:bg-[#12be9d] transition-all cursor-pointer border-none shadow-md shadow-[#15D8B3]/20">
                  {editingSkill ? 'Update Skill' : 'Save Skill to Database'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#49A4BB]/20 pb-3">
                <h3 className="text-base font-bold text-white">Database Skills ({filteredSkills.length})</h3>
                <div className="flex flex-wrap items-center gap-1.5">
                  {['ALL', 'Frontend', 'Backend', 'Database', 'DevOps & Tools', 'Languages'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSkillFilter(cat)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        skillFilter === cat
                          ? 'bg-[#15D8B3] text-[#050508]'
                          : 'bg-[#0c0d14] text-[#F8FAFC]/70 border border-[#49A4BB]/20 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 max-h-[750px] overflow-y-auto pr-2">
                {filteredSkills.map((s) => (
                  <div key={s._id} className="p-4 rounded-xl bg-[#050508] border border-[#49A4BB]/30 flex items-center justify-between gap-4 hover:border-[#15D8B3]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#15D8B3]/10 text-[#15D8B3] border border-[#15D8B3]/30">
                          {s.category}
                        </span>
                        <h4 className="font-bold text-white text-sm">{s.name}</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditSkillClick(s)}
                        className="px-3 py-1.5 rounded-lg bg-[#15D8B3]/10 border border-[#15D8B3]/40 text-[#15D8B3] text-xs font-mono font-bold hover:bg-[#15D8B3] hover:text-[#050508] transition-all cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(s._id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold hover:bg-red-500/20 transition-all cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 4: EXPERIENCE MANAGEMENT --- */}
        {activeTab === 'experience' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <form onSubmit={handleSaveExperience} className="glass-card p-6 border-[#49A4BB]/30 space-y-4 sticky top-8 bg-[#050508]">
                <div className="flex items-center justify-between border-b border-[#49A4BB]/20 pb-3">
                  <h3 className="text-base font-bold text-white">
                    {editingExperience ? 'Edit Experience' : 'Add Experience Entry'}
                  </h3>
                  {editingExperience && (
                    <button
                      type="button"
                      onClick={() => setEditingExperience(null)}
                      className="px-3 py-1 rounded bg-[#0c0d14] border border-white/20 text-[#F8FAFC]/80 hover:border-white text-xs font-mono cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Role Title *</label>
                  <input
                    type="text" required
                    value={experienceForm.role || ''}
                    onChange={(e) => setExperienceForm({ ...experienceForm, role: e.target.value })}
                    className="input-field"
                    placeholder="e.g. Teaching Assistant — Computer Science"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Company / Institution *</label>
                  <input
                    type="text" required
                    value={experienceForm.company || ''}
                    onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                    className="input-field"
                    placeholder="e.g. Darshan University"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Period</label>
                    <input
                      type="text"
                      value={experienceForm.period || ''}
                      onChange={(e) => setExperienceForm({ ...experienceForm, period: e.target.value })}
                      className="input-field"
                      placeholder="Dec 2025 - Apr 2026"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Type</label>
                    <select
                      value={experienceForm.type || 'Work'}
                      onChange={(e) => setExperienceForm({ ...experienceForm, type: e.target.value })}
                      className="input-field bg-[#050508]"
                    >
                      <option value="Work">Work Experience</option>
                      <option value="Education">Education</option>
                      <option value="Learning">Learning & Foundations</option>
                      <option value="Projects">Full-Stack Projects</option>
                      <option value="Open Source">Open Source</option>
                      <option value="DSA">DSA & Competitive Programming</option>
                      <option value="Current">Current Focus</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#F8FAFC]/80 block mb-1">Description *</label>
                  <textarea
                    required rows={3}
                    value={experienceForm.description || ''}
                    onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                    className="input-field resize-none text-xs"
                  ></textarea>
                </div>

                <button type="submit" className="w-full py-3 rounded-lg bg-[#15D8B3] text-[#050508] font-bold text-xs hover:bg-[#12be9d] transition-all cursor-pointer border-none shadow-md shadow-[#15D8B3]/20">
                  {editingExperience ? 'Update Experience' : 'Save Experience Entry'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#49A4BB]/20 pb-3">
                <h3 className="text-base font-bold text-white">Database Journey Entries ({filteredExperiences.length})</h3>
                <div className="flex flex-wrap items-center gap-1.5">
                  {['ALL', 'Work', 'Education'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setExperienceFilter(type)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        experienceFilter === type
                          ? 'bg-[#15D8B3] text-[#050508]'
                          : 'bg-[#0c0d14] text-[#F8FAFC]/70 border border-[#49A4BB]/20 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 max-h-[750px] overflow-y-auto pr-2">
                {filteredExperiences.map((exp) => (
                  <div key={exp._id} className="p-4 rounded-xl bg-[#050508] border border-[#49A4BB]/30 flex items-center justify-between gap-4 hover:border-[#15D8B3]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#15D8B3]/10 text-[#15D8B3] border border-[#15D8B3]/30">
                          {exp.type}
                        </span>
                        <h4 className="font-bold text-white text-sm">{exp.role}</h4>
                      </div>
                      <p className="text-xs text-[#F8FAFC]/70 line-clamp-1">{exp.company} — {exp.period}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditExperienceClick(exp)}
                        className="px-3 py-1.5 rounded-lg bg-[#15D8B3]/10 border border-[#15D8B3]/40 text-[#15D8B3] text-xs font-mono font-bold hover:bg-[#15D8B3] hover:text-[#050508] transition-all cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(exp._id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold hover:bg-red-500/20 transition-all cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 5: CONTACT MESSAGES --- */}
        {activeTab === 'messages' && (
          <div className="space-y-4 max-w-5xl mx-auto">
            <h3 className="text-lg font-bold text-white">Received Messages ({messages.length})</h3>
            {messages.length === 0 ? (
              <div className="glass-card p-12 text-center text-[#F8FAFC]/60 font-mono text-sm">
                No contact form submissions recorded in database yet.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((m) => (
                  <div key={m._id} className="glass-card p-6 border-[#49A4BB]/30 space-y-3 bg-[#050508]">
                    <div className="flex items-center justify-between border-b border-[#49A4BB]/20 pb-3">
                      <div>
                        <h4 className="font-bold text-white text-base">{m.name}</h4>
                        <a href={`mailto:${m.email}`} className="text-xs font-mono text-[#15D8B3] hover:underline">
                          {m.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono text-[#F8FAFC]/50">
                          {new Date(m.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => handleDeleteMessage(m._id)}
                          className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold hover:bg-red-500/20 transition-all cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {m.subject && (
                      <div className="text-xs font-mono text-[#15D8B3]">Subject: {m.subject}</div>
                    )}
                    <p className="text-xs text-[#F8FAFC]/80 leading-relaxed font-light whitespace-pre-wrap">
                      {m.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* --- TAB 6: SECURITY & CHANGE ADMIN PASSWORD --- */}
        {activeTab === 'security' && (
          <div className="glass-card p-6 sm:p-8 border-[#49A4BB]/30 space-y-6 max-w-2xl mx-auto bg-[#050508] rounded-2xl shadow-2xl">
            <div className="border-b border-[#49A4BB]/20 pb-4">
              <h2 className="text-xl font-bold text-white">
                Change Admin Password
              </h2>
              <p className="text-xs font-mono text-[#F8FAFC]/70 mt-1">
                Update your admin account authentication password in MongoDB with old password validation
              </p>
            </div>

            {/* Notification alert banners */}
            {passwordStatus.msg && (
              <div className={`p-4 rounded-xl border text-xs font-mono font-semibold animate-fadeIn ${
                passwordStatus.type === 'error'
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              }`}>
                <span>{passwordStatus.msg}</span>
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-5">
              
              {/* 1. Current Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#F8FAFC]/80 block font-bold">
                  Current Password <span className="text-rose-400">*</span>
                </label>
                <input
                  type="password"
                  value={changePasswordForm.currentPassword}
                  onChange={(e) => handlePasswordInputChange('currentPassword', e.target.value)}
                  className={`input-field ${passwordErrors.currentPassword ? 'border-rose-500 focus:border-rose-500' : ''}`}
                  placeholder="Enter your current admin password"
                />
                {passwordErrors.currentPassword && (
                  <p className="text-xs font-mono text-rose-400 mt-1">{passwordErrors.currentPassword}</p>
                )}
              </div>

              {/* 2. New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#F8FAFC]/80 block font-bold">
                  New Password <span className="text-rose-400">*</span>
                </label>
                <input
                  type="password"
                  value={changePasswordForm.newPassword}
                  onChange={(e) => handlePasswordInputChange('newPassword', e.target.value)}
                  className={`input-field ${passwordErrors.newPassword ? 'border-rose-500 focus:border-rose-500' : ''}`}
                  placeholder="Minimum 6 characters"
                />
                {passwordErrors.newPassword && (
                  <p className="text-xs font-mono text-rose-400 mt-1">{passwordErrors.newPassword}</p>
                )}
              </div>

              {/* 3. Confirm New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#F8FAFC]/80 block font-bold">
                  Confirm New Password <span className="text-rose-400">*</span>
                </label>
                <input
                  type="password"
                  value={changePasswordForm.confirmPassword}
                  onChange={(e) => handlePasswordInputChange('confirmPassword', e.target.value)}
                  className={`input-field ${passwordErrors.confirmPassword ? 'border-rose-500 focus:border-rose-500' : ''}`}
                  placeholder="Re-enter your new password"
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-xs font-mono text-rose-400 mt-1">{passwordErrors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-[#49A4BB]/20 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-lg bg-[#15D8B3] text-[#050508] font-bold text-xs hover:bg-[#12be9d] transition-all cursor-pointer border-none shadow-md shadow-[#15D8B3]/20"
                >
                  <span>{loading ? 'Updating Password...' : 'Update Admin Password'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
