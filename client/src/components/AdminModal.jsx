import React, { useState, useEffect } from 'react';
import { X, Shield, Database, Trash2, Mail, Plus, CheckCircle, RefreshCw } from 'lucide-react';
import { fetchContactMessages, deleteContactMessage, addProjectApi, fetchServerStatus } from '../api/apiService';

export const AdminModal = ({ isOpen, onClose, onProjectAdded }) => {
  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState(null);

  // New Project Form State
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    longDescription: '',
    category: 'Full-Stack',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    techStack: 'React, Node.js, MongoDB',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  });
  const [addStatus, setAddStatus] = useState({ loading: false, msg: '' });

  const loadAdminData = async () => {
    setLoading(true);
    const msgs = await fetchContactMessages();
    setMessages(msgs);

    const status = await fetchServerStatus();
    setDbStatus(status.database);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadAdminData();
    }
  }, [isOpen]);

  const handleDeleteMessage = async (id) => {
    if (confirm('Are you sure you want to delete this message from the database?')) {
      await deleteContactMessage(id);
      loadAdminData();
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setAddStatus({ loading: true, msg: '' });
    try {
      const payload = {
        ...newProject,
        techStack: newProject.techStack.split(',').map(s => s.trim())
      };
      await addProjectApi(payload);
      setAddStatus({ loading: false, msg: 'Project created in database!' });
      if (onProjectAdded) onProjectAdded();
      setNewProject({
        title: '',
        description: '',
        longDescription: '',
        category: 'Full-Stack',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        techStack: 'React, Node.js, MongoDB',
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com'
      });
    } catch (err) {
      setAddStatus({ loading: false, msg: 'Error adding project' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border-indigo-500/50 relative shadow-2xl">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Admin Dashboard & DB Console</h2>
              <span className="text-xs font-mono text-gray-400">Manage MongoDB Portfolio Data</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={loadAdminData}
              className="p-2 text-gray-400 hover:text-white rounded-lg bg-slate-800 border border-white/10"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-lg bg-slate-800 border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* DB Health Status Banner */}
        <div className="bg-slate-900/90 px-6 py-3 border-b border-white/5 flex flex-wrap items-center justify-between text-xs font-mono text-gray-300">
          <div className="flex items-center gap-3">
            <Database className="w-4 h-4 text-indigo-400" />
            <span>MongoDB Connection:</span>
            {dbStatus?.isConnected ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                ACTIVE ({dbStatus.host}/{dbStatus.name})
              </span>
            ) : (
              <span className="text-amber-400 font-bold">
                FALLBACK IN-MEMORY MODE (Start local MongoDB or set MONGO_URI in .env)
              </span>
            )}
          </div>
          <span>Messages Stored: {messages.length}</span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 px-6 bg-slate-900/40">
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-3 px-4 text-xs font-mono font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'messages'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            Contact Messages ({messages.length})
          </button>
          <button
            onClick={() => setActiveTab('addProject')}
            className={`py-3 px-4 text-xs font-mono font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'addProject'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Plus className="w-4 h-4" />
            Add New Project to DB
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-4">
          
          {/* TAB 1: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-12 text-gray-500 font-mono text-sm">
                  No contact messages in the database yet. Send a test message from the Contact form!
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg._id} className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col gap-2">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{msg.name}</span>
                        <span className="text-xs font-mono text-cyan-400">({msg.email})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono text-gray-500">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleDeleteMessage(msg._id)}
                          className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-indigo-300">Subject: {msg.subject}</h4>
                    <p className="text-xs text-gray-300 bg-slate-950/50 p-3 rounded border border-white/5 whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: ADD PROJECT */}
          {activeTab === 'addProject' && (
            <form onSubmit={handleAddProject} className="space-y-4 max-w-xl mx-auto">
              {addStatus.msg && (
                <div className="p-3 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
                  {addStatus.msg}
                </div>
              )}
              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="input-field"
                  placeholder="e.g. Real-Time Chat App"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Category</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="input-field bg-slate-900"
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="AI & ML">AI & ML</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={newProject.techStack}
                    onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Short Description</label>
                <textarea
                  required
                  rows={2}
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="input-field"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full text-xs">
                Save Project to Database
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};

export default AdminModal;
