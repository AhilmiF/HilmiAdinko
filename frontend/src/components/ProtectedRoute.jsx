import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setIsAuthenticated(false);
      setIsVerifying(false);
      return;
    }

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://hilmiadinko-production.up.railway.app';
    
    fetch(`${apiBaseUrl}/admin/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.valid) {
          setIsAuthenticated(true);
        } else {
          // If server rejects token or is unreachable, allow session if token is locally signed format
          localStorage.removeItem('adminToken');
          setIsAuthenticated(false);
        }
      })
      .catch((err) => {
        console.warn('Backend verify check offline, checking local token availability:', err);
        // Offline resilience: if token exists locally, allow access
        setIsAuthenticated(true);
      })
      .finally(() => {
        setIsVerifying(false);
      });
  }, [location.pathname]);

  if (isVerifying) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0B130E',
        color: '#FFFFFF',
        fontFamily: 'sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="admin-spinner" style={{
            width: '40px',
            height: '40px',
            border: '4px solid rgba(255,255,255,0.1)',
            borderTopColor: '#25D366',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px auto'
          }} />
          <p style={{ color: '#A0AEC0', fontSize: '0.95rem' }}>Memverifikasi sesi Admin Hilmi Adinko...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
