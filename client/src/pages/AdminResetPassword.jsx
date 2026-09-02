import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { resetPasswordApi } from '../api/apiService';

export const AdminResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: false, msg: '', error: '' });

  const validate = () => {
    const errors = {};
    if (!newPassword) {
      errors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: false, success: false, msg: '', error: '' });

    if (!token) {
      return setStatus({ loading: false, success: false, msg: '', error: 'Reset token missing from URL.' });
    }

    if (!validate()) return;

    setStatus({ loading: true, success: false, msg: '', error: '' });

    try {
      const res = await resetPasswordApi(token, newPassword);
      if (res.success) {
        setStatus({
          loading: false,
          success: true,
          msg: res.message || 'Password reset successfully! You can now login.',
          error: ''
        });
        setTimeout(() => {
          navigate('/admin/login');
        }, 2000);
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        msg: '',
        error: err.error || 'Failed to reset password. The link may have expired.'
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
            <h1 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight">Set New Admin Password</h1>
          </div>

          {status.success && (
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-emerald-400 text-xs">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-sm">Password Updated!</span>
                <span>{status.msg} Redirecting to login...</span>
              </div>
            </div>
          )}

          {status.error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-xs">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-sm">Error Resetting Password</span>
                <span>{status.error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F8FAFC]/80 block">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (fieldErrors.newPassword) setFieldErrors({ ...fieldErrors, newPassword: '' });
                }}
                placeholder="Minimum 6 characters"
                className={`input-field ${fieldErrors.newPassword ? 'border-red-500/80 focus:border-red-500' : ''}`}
              />
              {fieldErrors.newPassword && (
                <p className="text-[11px] font-mono text-red-400 mt-1">{fieldErrors.newPassword}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F8FAFC]/80 block">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: '' });
                }}
                placeholder="Re-enter new password"
                className={`input-field ${fieldErrors.confirmPassword ? 'border-red-500/80 focus:border-red-500' : ''}`}
              />
              {fieldErrors.confirmPassword && (
                <p className="text-[11px] font-mono text-red-400 mt-1">{fieldErrors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="w-full py-3.5 rounded-lg bg-[#15D8B3] text-[#050508] font-bold text-sm hover:bg-[#15D8B3]/90 transition-all shadow-lg shadow-[#15D8B3]/25 mt-2 cursor-pointer border-none"
            >
              {status.loading ? 'Updating Password...' : 'Save New Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminResetPassword;
