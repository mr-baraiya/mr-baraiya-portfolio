import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { forgotPasswordApi } from '../api/apiService';

export const AdminForgotPassword = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [status, setStatus] = useState({ loading: false, success: false, msg: '', error: '' });

  const validate = () => {
    if (!usernameOrEmail.trim()) {
      setFieldError('Username or email address is required');
      return false;
    }
    if (usernameOrEmail.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail.trim())) {
      setFieldError('Please enter a valid email address');
      return false;
    }
    if (usernameOrEmail.trim().length < 3) {
      setFieldError('Must be at least 3 characters');
      return false;
    }
    setFieldError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ loading: true, success: false, msg: '', error: '' });

    try {
      const res = await forgotPasswordApi(usernameOrEmail.trim());
      if (res.success) {
        setStatus({
          loading: false,
          success: true,
          msg: res.message || 'Password reset link sent to your email address!',
          error: ''
        });
        setUsernameOrEmail('');
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        msg: '',
        error: err.error || 'Failed to send reset email. Make sure backend and SMTP settings are correct.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-[#F8FAFC] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#15D8B3]/15 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10 space-y-6">
        <Link to="/admin/login" className="inline-flex items-center gap-2 text-xs font-mono text-[#F8FAFC]/70 hover:text-[#15D8B3] transition-colors no-underline">
          <ArrowLeft className="w-4 h-4 text-[#15D8B3]" />
          <span>Back to Admin Login</span>
        </Link>

        <div className="glass-card p-8 bg-[#0c0d14] border-[#15D8B3]/30 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <img src="/logo.svg" alt="Logo" className="w-14 h-14 object-contain mx-auto transition-transform hover:scale-105" />
            <h1 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight">Forgot Password?</h1>
            <p className="text-xs text-[#F8FAFC]/70 font-mono">Enter your admin email to receive a password reset link</p>
          </div>

          {status.success && (
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-emerald-400 text-xs">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-sm">Reset Email Dispatched!</span>
                <span>{status.msg}</span>
              </div>
            </div>
          )}

          {status.error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-xs">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-sm">Error Sending Email</span>
                <span>{status.error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F8FAFC]/80 block">
                Admin Username or Registered Email
              </label>
              <input
                type="text"
                value={usernameOrEmail}
                onChange={(e) => {
                  setUsernameOrEmail(e.target.value);
                  if (fieldError) setFieldError('');
                }}
                placeholder="Enter email or username"
                className={`input-field ${fieldError ? 'border-red-500/80 focus:border-red-500' : ''}`}
              />
              {fieldError && (
                <p className="text-[11px] font-mono text-red-400 mt-1">{fieldError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="w-full py-3.5 rounded-lg bg-[#15D8B3] text-[#050508] font-bold text-sm hover:bg-[#15D8B3]/90 transition-all shadow-lg shadow-[#15D8B3]/25 mt-2 cursor-pointer border-none"
            >
              {status.loading ? 'Sending Reset Link...' : 'Send Reset Email'}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link to="/admin/login" className="text-xs font-mono text-[#F8FAFC]/70 hover:text-[#15D8B3] underline no-underline">
              Remember your password? Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
