import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalWhatsAppSticky } from './components/FloatingCta';
import { ScrollToTop } from './components/ScrollToTop';

import { Home } from './pages/Home';
import { AboutAdinko } from './pages/AboutAdinko';
import { AboutGhazi } from './pages/AboutGhazi';
import { Layanan } from './pages/Layanan';
import { Portofolio } from './pages/Portofolio';
import { Testimoni } from './pages/Testimoni';
import { Kontak } from './pages/Kontak';

// Admin imports
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const PublicLayout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="app-container">
      {/* Floating Capsule Header */}
      <Navbar />

      {/* Page Content */}
      <main className="public-main-content">
        {children}
      </main>

      {/* Global Floating Sticky WhatsApp button */}
      <GlobalWhatsAppSticky />

      {/* Global Dark Green Footer */}
      <Footer />
    </div>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PublicLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/tentang-adinko" element={<AboutAdinko />} />
          <Route path="/tentang-ghazi" element={<AboutGhazi />} />
          <Route path="/layanan" element={<Layanan />} />
          <Route path="/portofolio" element={<Portofolio />} />
          <Route path="/testimoni" element={<Testimoni />} />
          <Route path="/kontak" element={<Kontak />} />

          {/* Admin Dedicated Routes (URL-only) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PublicLayout>
    </BrowserRouter>
  );
};

export default App;
