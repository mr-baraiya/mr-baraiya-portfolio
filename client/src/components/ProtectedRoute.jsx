import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyAdminToken } from '../api/apiService';
import { Shield } from 'lucide-react';

export const ProtectedRoute = ({ children }) => {
  const [authStatus, setAuthStatus] = useState({ loading: true, isAuthenticated: false });

  useEffect(() => {
    const checkAuth = async () => {
      const res = await verifyAdminToken();
      if (res.success) {
        setAuthStatus({ loading: false, isAuthenticated: true });
      } else {
        setAuthStatus({ loading: false, isAuthenticated: false });
      }
    };
    checkAuth();
  }, []);

  if (authStatus.loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-gray-300 font-mono text-sm">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-indigo-400 animate-spin" />
          <span>Verifying Admin Session...</span>
        </div>
      </div>
    );
  }

  if (!authStatus.isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
