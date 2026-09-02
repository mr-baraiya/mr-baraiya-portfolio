import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { loginAdmin } from '../api/apiService';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!username.trim()) {
      errors.username = 'Username or email is required';
    } else if (username.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username.trim())) {
      errors.username = 'Please enter a valid email address';
    } else if (username.trim().length < 3) {
      errors.username = 'Must be at least 3 characters';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 4) {
      errors.password = 'Password must be at least 4 characters';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await loginAdmin(username.trim(), password);
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setError(res.error || 'Invalid username or password');
      }
    } catch (err) {
      setError(err.error || 'Server authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-[#F8FAFC] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Cyan Ambient Background Aura Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#15D8B3]/15 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono text-[#F8FAFC]/70 hover:text-[#15D8B3] transition-colors no-underline">
          <ArrowLeft className="w-4 h-4 text-[#15D8B3]" />
          <span>Back to Public Portfolio</span>
        </Link>

        {/* Admin Login Card */}
        <div className="glass-card p-8 bg-[#0c0d14] border-[#15D8B3]/30 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <img src="/logo.svg" alt="Logo" className="w-14 h-14 object-contain mx-auto transition-transform hover:scale-105" />
            <h1 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight">Admin Console Login</h1>
          </div>

          {error && (
            <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-400 text-xs font-medium">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F8FAFC]/80 block">
                Username or Email
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (fieldErrors.username) setFieldErrors({ ...fieldErrors, username: '' });
                }}
                placeholder="Enter email or username"
                className={`input-field ${fieldErrors.username ? 'border-red-500/80 focus:border-red-500' : ''}`}
              />
              {fieldErrors.username && (
                <p className="text-[11px] font-mono text-red-400 mt-1">{fieldErrors.username}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-[#F8FAFC]/80 block">
                  Password
                </label>
                <Link
                  to="/admin/forgot-password"
                  className="text-xs font-mono text-[#15D8B3] hover:underline no-underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: '' });
                }}
                placeholder="Enter password"
                className={`input-field ${fieldErrors.password ? 'border-red-500/80 focus:border-red-500' : ''}`}
              />
              {fieldErrors.password && (
                <p className="text-[11px] font-mono text-red-400 mt-1">{fieldErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg bg-[#15D8B3] text-[#050508] font-bold text-sm hover:bg-[#15D8B3]/90 transition-all shadow-lg shadow-[#15D8B3]/25 mt-2 cursor-pointer border-none"
            >
              {loading ? 'Authenticating...' : 'Login to Admin Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
