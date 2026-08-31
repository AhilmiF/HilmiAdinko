import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Star,
  MessageSquare,
  Layers,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  LogOut,
  User,
  Search,
  Upload,
  X,
  CheckCircle,
  Clock,
  Sparkles,
  Phone,
  MapPin,
  Menu
} from 'lucide-react';
import { portfolioData, testimonialsData, siteConfig, servicesData } from '../../data/siteData';
import { AdinkoLogo } from '../../assets/Logos';
import { WhatsAppIcon } from '../../assets/Icons';
import './AdminStyles.css';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Admin user state
  const [adminUser, setAdminUser] = useState({ name: 'Admin Hilmi Adinko', role: 'Super Admin' });

  // Data states
  const [portfolios, setPortfolios] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [syncingGmaps, setSyncingGmaps] = useState(false);
  const [categories, setCategories] = useState([
    { id: 1, name: 'Taman Rumah' },
    { id: 2, name: 'Dekorasi Indoor & Outdoor' },
    { id: 3, name: 'Area Komersial' },
    { id: 4, name: 'Vertical Garden' },
    { id: 5, name: 'Lapangan Futsal' },
    { id: 6, name: 'Lapangan Minisoccer' },
    { id: 7, name: 'Mini Golf' },
    { id: 8, name: 'Area Olahraga Lainnya' }
  ]);

  // Services state (Kelola Layanan)
  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem('local_services');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return servicesData.allGrid;
  });

  // Loading & Toast notification state
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Search queries
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State for CRUD
  const [modalType, setModalType] = useState(null); // 'portfolio', 'testimoni', 'layanan'
  const [editingItem, setEditingItem] = useState(null);

  // Form states
  const [portfolioForm, setPortfolioForm] = useState({
    nama_proyek: '',
    kategori: 'Taman Rumah',
    tahun: new Date().getFullYear().toString(),
    lokasi: '',
    deskripsi: '',
    image_url: '',
    images: []
  });

  const [serviceForm, setServiceForm] = useState({
    title: '',
    category: 'Adinko',
    tag: 'Outdoor / Semi Outdoor',
    location: 'Pekanbaru, Riau',
    description: '',
    image: '',
    images: []
  });

  const [testimoniForm, setTestimoniForm] = useState({
    nama_klien: '',
    waktu: 'Terbaru',
    rating: 5,
    deskripsi: ''
  });





  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://hilmiadinko-production.up.railway.app';

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Load User & All Data
  useEffect(() => {
    const userStr = localStorage.getItem('adminUser');
    if (userStr) {
      try {
        setAdminUser(JSON.parse(userStr));
      } catch (e) {}
    }
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);

    // 1. Fetch Portfolios
    try {
      const pRes = await fetch(`${apiBaseUrl}/portfolio`);
      const pData = await pRes.json();
      if (pData && pData.data && pData.data.length > 0) {
        setPortfolios(pData.data);
      } else {
        setPortfolios(portfolioData);
      }
    } catch (err) {
      setPortfolios(portfolioData);
    }

    // 2. Fetch Testimonials
    try {
      const tRes = await fetch(`${apiBaseUrl}/testimoniRoute`);
      const tData = await tRes.json();
      if (tData && tData.data && tData.data.length > 0) {
        setTestimonials(tData.data);
      } else {
        setTestimonials(testimonialsData);
      }
    } catch (err) {
      setTestimonials(testimonialsData);
    }



    // 3. Fetch Contacts (Inquiries) with Local Storage Sync
    let apiContacts = [];
    try {
      const cRes = await fetch(`${apiBaseUrl}/contact`);
      const cData = await cRes.json();
      if (cData && cData.data && Array.isArray(cData.data)) {
        apiContacts = cData.data;
      }
    } catch (err) {
      console.warn('Backend contacts API offline / fallback mode:', err);
    }

    let localContacts = [];
    try {
      const localStr = localStorage.getItem('local_contacts');
      if (localStr) {
        localContacts = JSON.parse(localStr);
      }
    } catch (e) {}

    const combinedContacts = [...localContacts, ...apiContacts];
    const uniqueContacts = [];
    const seenKeys = new Set();

    combinedContacts.forEach(item => {
      const key = item.id || `${item.nama_lengkap}-${item.no_whatsapp}-${item.keterangan}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        uniqueContacts.push(item);
      }
    });

    if (uniqueContacts.length > 0) {
      setContacts(uniqueContacts);
    } else {
      setContacts([
        {
          id: 101,
          nama_lengkap: 'Bpk. Hendra Gunawan',
          no_whatsapp: '081268192831',
          lokasi: 'Pekanbaru, Riau',
          keterangan: 'Ingin pesan rumput sintetis tipe Swiss 30mm untuk halaman rumah 50m2.',
          kategori_layanan: 'Rumput Sintetis Taman',
          created_at: '2026-08-26'
        },
        {
          id: 102,
          nama_lengkap: 'Ibu Rina Saptari',
          no_whatsapp: '082199201923',
          lokasi: 'Simpang Tiga',
          keterangan: 'Mohon survei lokasi pembuatan vertical garden kantor 3x4 meter.',
          kategori_layanan: 'Vertical Garden',
          created_at: '2026-08-25'
        }
      ]);
    }

    // 4. Fetch Categories
    try {
      const kRes = await fetch(`${apiBaseUrl}/kategori`);
      const kData = await kRes.json();
      if (kData && kData.data && kData.data.length > 0) {
        setCategories(kData.data);
      }
    } catch (err) {}

    setLoading(false);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    showToast('Berhasil keluar dari sesi Admin.', 'info');
    navigate('/admin/login');
  };

  // Image File Upload Handler (Supports Multi-File Upload)
  const handleFileUpload = async (e, type) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const token = localStorage.getItem('adminToken');
    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('pictures', file);

      try {
        const res = await fetch(`${apiBaseUrl}/upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        });
        const data = await res.json();
        if (data.image_url) {
          const fullUrl = data.image_url.startsWith('http') ? data.image_url : `${apiBaseUrl}${data.image_url}`;
          uploadedUrls.push(fullUrl);
        }
      } catch (err) {
        console.warn('Upload API offline, creating local blob preview:', err);
        const objectUrl = URL.createObjectURL(file);
        uploadedUrls.push(objectUrl);
      }
    }

    if (uploadedUrls.length > 0 && type === 'portfolio') {
      setPortfolioForm(prev => {
        const newImages = [...(prev.images || []), ...uploadedUrls];
        return {
          ...prev,
          image_url: newImages[0] || prev.image_url,
          images: newImages
        };
      });
      showToast(`${uploadedUrls.length} Foto berhasil ditambahkan!`);
    }
  };

  // Helper to add manual image URL
  const handleAddImageUrl = (url) => {
    if (!url || !url.trim()) return;
    const cleanUrl = url.trim();
    setPortfolioForm(prev => {
      const newImages = [...(prev.images || []), cleanUrl];
      return {
        ...prev,
        image_url: newImages[0] || prev.image_url,
        images: newImages
      };
    });
  };

  // Helper to remove image at index
  const handleRemoveImage = (indexToRemove) => {
    setPortfolioForm(prev => {
      const updatedImages = (prev.images || []).filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        image_url: updatedImages[0] || '',
        images: updatedImages
      };
    });
  };

  // CRUD Operations - Portfolio
  const handleSavePortfolio = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    const finalImages = (portfolioForm.images && portfolioForm.images.length > 0)
      ? portfolioForm.images
      : (portfolioForm.image_url ? [portfolioForm.image_url] : []);

    const payload = {
      ...portfolioForm,
      title: portfolioForm.nama_proyek,
      category: portfolioForm.kategori,
      location: portfolioForm.lokasi ? `${portfolioForm.lokasi} · ${portfolioForm.tahun}` : portfolioForm.tahun,
      description: portfolioForm.deskripsi,
      image: finalImages[0] || portfolioForm.image_url,
      images: finalImages
    };

    if (editingItem) {
      // Update
      try {
        await fetch(`${apiBaseUrl}/portfolio/${editingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {}

      setPortfolios(prev =>
        prev.map(item => item.id === editingItem.id ? { ...item, ...payload } : item)
      );
      showToast('Portofolio berhasil diperbarui!');
    } else {
      // Create New
      const newItem = {
        id: Date.now(),
        ...payload
      };
      try {
        await fetch(`${apiBaseUrl}/portfolio`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {}

      setPortfolios(prev => [newItem, ...prev]);
      showToast('Portofolio baru berhasil ditambahkan!');
    }

    closeModal();
  };

  const handleDeletePortfolio = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus portofolio ini?')) return;
    const token = localStorage.getItem('adminToken');

    try {
      await fetch(`${apiBaseUrl}/portfolio/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (err) {}

    setPortfolios(prev => prev.filter(item => item.id !== id));
    showToast('Portofolio berhasil dihapus.');
  };



  // Contact Delete
  const handleDeleteContact = async (id) => {
    if (!window.confirm('Hapus pesan masukan dari klien ini?')) return;
    const token = localStorage.getItem('adminToken');

    try {
      await fetch(`${apiBaseUrl}/contact/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (err) {}

    setContacts(prev => prev.filter(item => item.id !== id));
    showToast('Pesan konsultasi berhasil dihapus.');
  };

  // CRUD Operations - Testimoni
  const handleSaveTestimoni = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    if (editingItem) {
      try {
        await fetch(`${apiBaseUrl}/testimoniRoute/${editingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(testimoniForm)
        });
      } catch (err) {}

      setTestimonials(prev =>
        prev.map(item => item.id === editingItem.id ? { ...item, ...testimoniForm } : item)
      );
      showToast('Testimoni berhasil diperbarui!');
    } else {
      const newItem = {
        id: Date.now(),
        ...testimoniForm
      };
      try {
        await fetch(`${apiBaseUrl}/testimoniRoute`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(testimoniForm)
        });
      } catch (err) {}

      setTestimonials(prev => [newItem, ...prev]);
      showToast('Testimoni baru berhasil ditambahkan!');
    }

    closeModal();
  };

  const handleDeleteTestimoni = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) return;
    const token = localStorage.getItem('adminToken');

    try {
      await fetch(`${apiBaseUrl}/testimoniRoute/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (err) {}

    setTestimonials(prev => prev.filter(item => item.id !== id));
    showToast('Testimoni berhasil dihapus.');
  };

  const handleSyncGmapsTestimoni = async () => {
    setSyncingGmaps(true);
    try {
      const res = await fetch(`${apiBaseUrl}/testimoniRoute/sync-gmaps`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        setTestimonials(prev => [...data.data, ...prev]);
        showToast(data.message || 'Berhasil sinkronisasi ulasan Google Maps!');
      } else {
        showToast(data.message || 'Tidak ada ulasan baru dari Google Maps (pastikan API Key terpasang).', 'danger');
      }
    } catch (err) {
      showToast('Gagal menghubungi server untuk sync Google Maps.', 'danger');
    } finally {
      setSyncingGmaps(false);
    }
  };



  // CRUD Operations - Layanan (Services)
  const handleSaveService = (e) => {
    e.preventDefault();

    const finalImages = (serviceForm.images && serviceForm.images.length > 0)
      ? serviceForm.images
      : (serviceForm.image ? [serviceForm.image] : []);

    const payload = {
      ...serviceForm,
      image: finalImages[0] || serviceForm.image || '',
      images: finalImages
    };

    let updatedServices;
    if (editingItem) {
      updatedServices = services.map(item =>
        item.id === editingItem.id ? { ...item, ...payload } : item
      );
      setServices(updatedServices);
      showToast('Layanan berhasil diperbarui!');
    } else {
      const newItem = { id: Date.now(), ...payload };
      updatedServices = [newItem, ...services];
      setServices(updatedServices);
      showToast('Layanan baru berhasil ditambahkan!');
    }

    // Persist to localStorage so Layanan page reads it
    try {
      localStorage.setItem('local_services', JSON.stringify(updatedServices));
    } catch (e) {}

    closeModal();
  };

  const handleDeleteService = (id) => {
    if (!window.confirm('Hapus layanan ini dari halaman publik?')) return;
    const updatedServices = services.filter(item => item.id !== id);
    setServices(updatedServices);
    try {
      localStorage.setItem('local_services', JSON.stringify(updatedServices));
    } catch (e) {}
    showToast('Layanan berhasil dihapus.');
  };

  // Service Image helpers (same pattern as portfolio)
  const handleAddServiceImageUrl = (url) => {
    if (!url || !url.trim()) return;
    const cleanUrl = url.trim();
    setServiceForm(prev => {
      const newImages = [...(prev.images || []), cleanUrl];
      return { ...prev, image: newImages[0] || prev.image, images: newImages };
    });
  };

  const handleRemoveServiceImage = (indexToRemove) => {
    setServiceForm(prev => {
      const updated = (prev.images || []).filter((_, idx) => idx !== indexToRemove);
      return { ...prev, image: updated[0] || '', images: updated };
    });
  };

  // Modal Control Helpers
  const openAddModal = (type) => {
    setModalType(type);
    setEditingItem(null);
    if (type === 'portfolio') {
      const defaultImg = 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=800&q=80';
      setPortfolioForm({
        nama_proyek: '',
        kategori: 'Taman Rumah',
        tahun: new Date().getFullYear().toString(),
        lokasi: 'Pekanbaru',
        deskripsi: '',
        image_url: defaultImg,
        images: [defaultImg]
      });
    } else if (type === 'layanan') {
      const defaultSvcImg = 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=700&q=80';
      setServiceForm({
        title: '',
        category: 'Adinko',
        tag: 'Outdoor / Semi Outdoor',
        location: 'Pekanbaru, Riau',
        description: '',
        image: defaultSvcImg,
        images: [defaultSvcImg]
      });
    } else if (type === 'testimoni') {
      setTestimoniForm({
        nama_klien: '',
        waktu: 'Terbaru',
        rating: 5,
        deskripsi: ''
      });
    }
  };

  const openEditModal = (type, item) => {
    setModalType(type);
    setEditingItem(item);
    if (type === 'portfolio') {
      const existingImages = (item.images && Array.isArray(item.images) && item.images.length > 0)
        ? item.images
        : (item.image || item.image_url ? [item.image || item.image_url] : []);

      setPortfolioForm({
        nama_proyek: item.nama_proyek || item.title || '',
        kategori: item.kategori || item.category || 'Taman Rumah',
        tahun: item.tahun || item.year || '2026',
        lokasi: item.lokasi || item.location || '',
        deskripsi: item.deskripsi || item.description || '',
        image_url: existingImages[0] || item.image_url || item.image || '',
        images: existingImages
      });
    } else if (type === 'layanan') {
      const existingImages = (item.images && Array.isArray(item.images) && item.images.length > 0)
        ? item.images
        : (item.image ? [item.image] : []);

      setServiceForm({
        title: item.title || '',
        category: item.category || 'Adinko',
        tag: item.tag || 'Outdoor / Semi Outdoor',
        location: item.location || 'Pekanbaru, Riau',
        description: item.description || '',
        image: existingImages[0] || item.image || '',
        images: existingImages
      });

    } else if (type === 'testimoni') {
      setTestimoniForm({
        nama_klien: item.nama_klien || item.name || '',
        waktu: item.waktu || item.date || 'Terbaru',
        rating: item.rating || 5,
        deskripsi: item.deskripsi || item.text || ''
      });
    }
  };

  const closeModal = () => {
    setModalType(null);
    setEditingItem(null);
  };

  return (
    <div className="admin-dashboard-container">
      {/* Toast Notification */}
      {toast.show && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: toast.type === 'danger' ? '#E53E3E' : '#005C45',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.9rem',
          fontWeight: '600',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <CheckCircle size={18} />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="admin-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            className="admin-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="admin-brand">
            <AdinkoLogo size={32} />
            <span className="admin-brand-title">Hilmi Adinko</span>
            <span className="admin-brand-tag">ADMIN</span>
          </div>
        </div>

        <div className="admin-navbar-actions">
          <button
            onClick={() => window.open('/', '_blank')}
            className="admin-btn-icon"
            title="Buka Website Publik"
          >
            <ExternalLink size={15} />
            <span>Lihat Website</span>
          </button>

          <div className="admin-user-info">
            <div className="admin-avatar">
              {adminUser.name ? adminUser.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div>
              <div style={{ fontWeight: '700', lineHeight: 1.2 }}>{adminUser.name || 'Admin'}</div>
              <div style={{ fontSize: '0.72rem', color: '#9EAF9F' }}>Administrator</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="admin-btn-icon admin-btn-logout"
            title="Keluar Sesi Admin"
          >
            <LogOut size={15} />
            <span>Keluar</span>
          </button>
        </div>
      </header>

      {/* Main Layout (Sidebar + Content) */}
      <div className="admin-main-layout">
        {/* Mobile Backdrop Overlay */}
        {mobileMenuOpen && (
          <div 
            className="admin-sidebar-backdrop" 
            onClick={() => setMobileMenuOpen(false)} 
          />
        )}

        {/* Sidebar */}
        <aside className={`admin-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <button
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard Overview</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => { setActiveTab('portfolio'); setMobileMenuOpen(false); }}
          >
            <Briefcase size={18} />
            <span>Kelola Portofolio</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'testimoni' ? 'active' : ''}`}
            onClick={() => { setActiveTab('testimoni'); setMobileMenuOpen(false); }}
          >
            <Star size={18} />
            <span>Kelola Testimoni</span>
          </button>



          <button
            className={`admin-nav-item ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }}
          >
            <MessageSquare size={18} />
            <span>Pesan & Konsultasi</span>
            {contacts.length > 0 && (
              <span style={{
                marginLeft: 'auto',
                background: '#25D366',
                color: '#000',
                fontSize: '0.7rem',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: '10px'
              }}>
                {contacts.length}
              </span>
            )}
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'layanan' ? 'active' : ''}`}
            onClick={() => { setActiveTab('layanan'); setMobileMenuOpen(false); }}
          >
            <Layers size={18} />
            <span>Kelola Layanan</span>
          </button>


        </aside>

        {/* Body Content */}
        <main className="admin-body">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h1 className="admin-page-title">Ringkasan Sistem</h1>
                  <p className="admin-page-sub">
                    Selamat datang kembali! Berikut statistik umum konten website Adinko x GhaziSportsHub.
                  </p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <div className="admin-stat-icon">
                    <Briefcase size={26} />
                  </div>
                  <div>
                    <div className="admin-stat-val">{portfolios.length}</div>
                    <div className="admin-stat-lbl">Total Portofolio Proyek</div>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon" style={{ background: 'rgba(237, 137, 54, 0.2)', color: '#ED8936' }}>
                    <Star size={26} />
                  </div>
                  <div>
                    <div className="admin-stat-val">{testimonials.length}</div>
                    <div className="admin-stat-lbl">Total Testimoni Klien</div>
                  </div>
                </div>



                <div className="admin-stat-card">
                  <div className="admin-stat-icon" style={{ background: 'rgba(37, 211, 102, 0.2)', color: '#25D366' }}>
                    <MessageSquare size={26} />
                  </div>
                  <div>
                    <div className="admin-stat-val">{contacts.length}</div>
                    <div className="admin-stat-lbl">Pesan Masuk Konsultasi</div>
                  </div>
                </div>


              </div>

              {/* Recent Inquiry Messages Preview */}
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Pesan Konsultasi Terbaru dari Klien</h3>
                  <button onClick={() => setActiveTab('contact')} className="admin-btn-icon">
                    <span>Lihat Semua ({contacts.length})</span>
                  </button>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Nama Klien</th>
                        <th>WhatsApp</th>
                        <th>Lokasi</th>
                        <th>Kebutuhan</th>
                        <th>Aksi WA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.slice(0, 5).map((item) => (
                        <tr key={item.id}>
                          <td style={{ fontWeight: '700' }}>{item.nama_lengkap || item.name}</td>
                          <td>{item.no_whatsapp || item.whatsapp}</td>
                          <td>{item.lokasi || '-'}</td>
                          <td>
                            <span className="admin-badge">
                              {item.kategori_layanan || item.kebutuhan || 'Konsultasi'}
                            </span>
                          </td>
                          <td>
                            <button
                              className="admin-btn-wa"
                              onClick={() => {
                                const waNum = (item.no_whatsapp || '').replace(/[^0-9]/g, '');
                                window.open(`https://wa.me/${waNum}?text=Halo%20${encodeURIComponent(item.nama_lengkap || '')},%20terima%20kasih%20telah%20menghubungi%20Adinko`, '_blank');
                              }}
                            >
                              <WhatsAppIcon size={14} color="#000" />
                              <span>Hubungi WA</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PORTOFOLIO */}
          {activeTab === 'portfolio' && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h1 className="admin-page-title">Kelola Portofolio</h1>
                  <p className="admin-page-sub">Tambah, ubah, atau hapus karya proyek terbaik Adinko x GhaziSportsHub.</p>
                </div>

                <button onClick={() => openAddModal('portfolio')} className="admin-btn-primary">
                  <Plus size={16} />
                  <span>Tambah Portofolio Baru</span>
                </button>
              </div>

              {/* Data Table */}
              <div className="admin-card">
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Gambar</th>
                        <th>Nama Proyek</th>
                        <th>Kategori</th>
                        <th>Tahun</th>
                        <th>Lokasi</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolios.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <img
                              src={item.image_url || item.image || 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=400&q=80'}
                              alt="preview"
                              className="admin-table-img"
                            />
                          </td>
                          <td style={{ fontWeight: '700' }}>{item.nama_proyek || item.title}</td>
                          <td>
                            <span className="admin-badge">
                              {item.kategori || item.category || 'Taman'}
                            </span>
                          </td>
                          <td>{item.tahun || item.year || '2026'}</td>
                          <td>{item.lokasi || item.location || 'Pekanbaru'}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                className="admin-btn-icon"
                                onClick={() => openEditModal('portfolio', item)}
                                title="Edit"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                className="admin-btn-danger"
                                onClick={() => handleDeletePortfolio(item.id)}
                                title="Hapus"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}



          {/* TAB 4: PESAN & KONSULTASI */}
          {activeTab === 'contact' && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h1 className="admin-page-title">Pesan & Konsultasi Masuk</h1>
                  <p className="admin-page-sub">Daftar klien yang mengirim formulir konsultasi dari halaman Kontak.</p>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Nama Lengkap</th>
                        <th>No. WhatsApp</th>
                        <th>Lokasi Proyek</th>
                        <th>Kebutuhan</th>
                        <th>Keterangan / Pesan</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((item) => (
                        <tr key={item.id}>
                          <td style={{ fontWeight: '700' }}>{item.nama_lengkap || item.name}</td>
                          <td>
                            <a
                              href={`https://wa.me/${(item.no_whatsapp || '').replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              style={{ color: '#25D366', fontWeight: 600, textDecoration: 'none' }}
                            >
                              {item.no_whatsapp || item.whatsapp}
                            </a>
                          </td>
                          <td>{item.lokasi || '-'}</td>
                          <td>
                            <span className="admin-badge">
                              {item.kategori_layanan || item.kebutuhan || 'Konsultasi'}
                            </span>
                          </td>
                          <td style={{ maxWidth: '240px', fontSize: '0.85rem' }}>{item.keterangan || '-'}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                className="admin-btn-wa"
                                onClick={() => {
                                  const waNum = (item.no_whatsapp || '').replace(/[^0-9]/g, '');
                                  window.open(`https://wa.me/${waNum}?text=Halo%20${encodeURIComponent(item.nama_lengkap || '')},%20terima%20kasih%20telah%20menghubungi%20Adinko`, '_blank');
                                }}
                              >
                                <WhatsAppIcon size={14} color="#000" />
                                <span>Hubungi WA</span>
                              </button>
                              <button
                                className="admin-btn-danger"
                                onClick={() => handleDeleteContact(item.id)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: KELOLA LAYANAN */}
          {activeTab === 'layanan' && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h1 className="admin-page-title">Kelola Layanan</h1>
                  <p className="admin-page-sub">Atur konten kartu layanan yang tampil di halaman publik /layanan.</p>
                </div>
                <button onClick={() => openAddModal('layanan')} className="admin-btn-primary">
                  <Plus size={16} />
                  <span>Tambah Layanan</span>
                </button>
              </div>

              <div className="admin-card">
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th style={{ width: '64px' }}>Foto</th>
                        <th>Nama Layanan</th>
                        <th>Brand</th>
                        <th>Tag</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <img
                              src={item.image || (item.images && item.images[0]) || ''}
                              alt={item.title}
                              style={{ width: '52px', height: '40px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--admin-border)' }}
                            />
                          </td>
                          <td style={{ fontWeight: '700' }}>{item.title}</td>
                          <td>
                            <span className="admin-badge" style={{ background: item.category === 'GhaziSportsHub' ? '#0A2850' : '' }}>
                              {item.category}
                            </span>
                          </td>
                          <td style={{ fontSize: '0.82rem', color: 'var(--admin-text-sub)' }}>{item.tag}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                className="admin-btn-icon"
                                title="Edit Layanan"
                                onClick={() => openEditModal('layanan', item)}
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                className="admin-btn-icon"
                                title="Hapus Layanan"
                                style={{ color: '#E53E3E' }}
                                onClick={() => handleDeleteService(item.id)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TESTIMONI */}
          {activeTab === 'testimoni' && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h1 className="admin-page-title">Kelola Testimoni Klien</h1>
                  <p className="admin-page-sub">Kelola ulasan dan kepuasan pelanggan dari Google Maps atau manual.</p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={handleSyncGmapsTestimoni} 
                    disabled={syncingGmaps}
                    className="admin-btn-icon"
                    style={{ background: 'rgba(66, 153, 225, 0.2)', color: '#63B3ED', border: '1px solid rgba(99, 179, 237, 0.4)' }}
                  >
                    <Sparkles size={16} />
                    <span>{syncingGmaps ? 'Proses Sync...' : 'Sync Review Google Maps'}</span>
                  </button>

                  <button onClick={() => openAddModal('testimoni')} className="admin-btn-primary">
                    <Plus size={16} />
                    <span>Tambah Testimoni</span>
                  </button>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Nama Klien</th>
                        <th>Rating</th>
                        <th>Waktu / Tanggal</th>
                        <th>Isi Ulasan</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonials.map((item) => (
                        <tr key={item.id}>
                          <td style={{ fontWeight: '700' }}>{item.nama_klien || item.name}</td>
                          <td>
                            <div style={{ color: '#F6AD55', display: 'flex', gap: '2px' }}>
                              {Array.from({ length: item.rating || 5 }).map((_, i) => (
                                <Star key={i} size={14} fill="#F6AD55" />
                              ))}
                            </div>
                          </td>
                          <td>{item.waktu || item.date || 'Terbaru'}</td>
                          <td style={{ maxWidth: '300px', fontSize: '0.85rem', color: '#A0AEC0' }}>
                            "{item.deskripsi || item.text}"
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                className="admin-btn-icon"
                                onClick={() => openEditModal('testimoni', item)}
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                className="admin-btn-danger"
                                onClick={() => handleDeleteTestimoni(item.id)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}


        </main>
      </div>

      {/* MODAL DIALOG FOR CRUD */}
      {modalType && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h3>
                {editingItem ? 'Edit ' : 'Tambah '}
                {modalType === 'portfolio' && 'Portofolio'}
                {modalType === 'layanan' && 'Layanan'}
                {modalType === 'testimoni' && 'Testimoni'}
              </h3>
              <button onClick={closeModal} className="admin-btn-icon">
                <X size={18} />
              </button>
            </div>

            {/* FORM PORTOFOLIO */}
            {modalType === 'portfolio' && (
              <form onSubmit={handleSavePortfolio}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Nama Proyek</label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    style={{ paddingLeft: '14px' }}
                    placeholder="Contoh: Lapangan Minisoccer Pekanbaru"
                    value={portfolioForm.nama_proyek}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, nama_proyek: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Kategori</label>
                  <select
                    className="admin-input"
                    style={{ paddingLeft: '14px' }}
                    value={portfolioForm.kategori}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, kategori: e.target.value })}
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name || cat.kategori_layanan}>{cat.name || cat.kategori_layanan}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Tahun Proyek</label>
                    <input
                      type="text"
                      className="admin-input"
                      style={{ paddingLeft: '14px' }}
                      value={portfolioForm.tahun}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, tahun: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Lokasi</label>
                    <input
                      type="text"
                      className="admin-input"
                      style={{ paddingLeft: '14px' }}
                      value={portfolioForm.lokasi}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, lokasi: e.target.value })}
                    />
                  </div>
                </div>

                {/* Multi-Photo Manager Section */}
                <div className="admin-form-group">
                  <label className="admin-form-label">Daftar Galeri Foto Proyek (Multi-Foto)</label>
                  
                  {/* Thumbnails Preview Grid */}
                  {portfolioForm.images && portfolioForm.images.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      {portfolioForm.images.map((imgUrl, idx) => (
                        <div 
                          key={idx} 
                          style={{
                            position: 'relative',
                            width: '74px',
                            height: '74px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid var(--admin-border)'
                          }}
                        >
                          <img 
                            src={imgUrl} 
                            alt={`Preview ${idx + 1}`} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            style={{
                              position: 'absolute',
                              top: '2px',
                              right: '2px',
                              background: 'rgba(229, 62, 62, 0.85)',
                              color: '#FFF',
                              border: 'none',
                              borderRadius: '50%',
                              width: '20px',
                              height: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '11px',
                              cursor: 'pointer'
                            }}
                            title="Hapus foto ini"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add URL Input */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      id="manual-url-input"
                      className="admin-input"
                      style={{ paddingLeft: '14px', flex: 1 }}
                      placeholder="Masukkan URL foto baru (https://...)"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('manual-url-input');
                        if (el && el.value) {
                          handleAddImageUrl(el.value);
                          el.value = '';
                        }
                      }}
                      className="admin-btn-icon"
                      style={{ whiteSpace: 'nowrap', background: 'var(--admin-emerald)', color: '#FFF' }}
                    >
                      + Tambah URL
                    </button>
                  </div>

                  {/* Upload Multi Files Input */}
                  <div style={{ background: '#0B130E', padding: '10px 14px', borderRadius: '8px', border: '1px dashed var(--admin-border)' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-sub)', display: 'block', marginBottom: '4px' }}>
                      Atau Unggah File Foto dari Perangkat (Bisa Pilih Banyak Foto Sekaligus):
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileUpload(e, 'portfolio')}
                      style={{ fontSize: '0.82rem', color: '#A0AEC0' }}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Deskripsi Singkat</label>
                  <textarea
                    rows={3}
                    className="admin-input"
                    style={{ paddingLeft: '14px' }}
                    placeholder="Penjelasan pengerjaan proyek..."
                    value={portfolioForm.deskripsi}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, deskripsi: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                  <button type="button" onClick={closeModal} className="admin-btn-icon">
                    Batal
                  </button>
                  <button type="submit" className="admin-btn-primary">
                    Simpan Portofolio
                  </button>
                </div>
              </form>
            )}



            {/* FORM LAYANAN */}
            {modalType === 'layanan' && (
              <form onSubmit={handleSaveService}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Nama Layanan</label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    style={{ paddingLeft: '14px' }}
                    placeholder="Contoh: Lapangan Futsal"
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Brand</label>
                    <select
                      className="admin-input"
                      style={{ paddingLeft: '14px' }}
                      value={serviceForm.category}
                      onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    >
                      <option value="Adinko">Adinko</option>
                      <option value="GhaziSportsHub">GhaziSportsHub</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Tag</label>
                    <select
                      className="admin-input"
                      style={{ paddingLeft: '14px' }}
                      value={serviceForm.tag}
                      onChange={(e) => setServiceForm({ ...serviceForm, tag: e.target.value })}
                    >
                      <option value="Outdoor / Semi Outdoor">Outdoor / Semi Outdoor</option>
                      <option value="Indoor / Outdoor">Indoor / Outdoor</option>
                      <option value="Outdoor">Outdoor</option>
                      <option value="Indoor">Indoor</option>
                      <option value="Komersial">Komersial</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Lokasi</label>
                  <input
                    type="text"
                    className="admin-input"
                    style={{ paddingLeft: '14px' }}
                    value={serviceForm.location}
                    onChange={(e) => setServiceForm({ ...serviceForm, location: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Deskripsi Layanan</label>
                  <textarea
                    rows={3}
                    className="admin-input"
                    style={{ paddingLeft: '14px' }}
                    placeholder="Jelaskan layanan ini..."
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  />
                </div>

                {/* Multi-Photo Manager for Services */}
                <div className="admin-form-group">
                  <label className="admin-form-label">Galeri Foto Layanan (Multi-Foto)</label>
                  
                  {serviceForm.images && serviceForm.images.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      {serviceForm.images.map((imgUrl, idx) => (
                        <div 
                          key={idx} 
                          style={{
                            position: 'relative',
                            width: '74px',
                            height: '74px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid var(--admin-border)'
                          }}
                        >
                          <img 
                            src={imgUrl} 
                            alt={`Preview ${idx + 1}`} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveServiceImage(idx)}
                            style={{
                              position: 'absolute',
                              top: '2px',
                              right: '2px',
                              background: 'rgba(229, 62, 62, 0.85)',
                              color: '#FFF',
                              border: 'none',
                              borderRadius: '50%',
                              width: '20px',
                              height: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '11px',
                              cursor: 'pointer'
                            }}
                            title="Hapus foto ini"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      id="svc-url-input"
                      className="admin-input"
                      style={{ paddingLeft: '14px', flex: 1 }}
                      placeholder="Masukkan URL foto baru (https://...)"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('svc-url-input');
                        if (el && el.value) {
                          handleAddServiceImageUrl(el.value);
                          el.value = '';
                        }
                      }}
                      className="admin-btn-icon"
                      style={{ whiteSpace: 'nowrap', background: 'var(--admin-emerald)', color: '#FFF' }}
                    >
                      + Tambah URL
                    </button>
                  </div>

                  <div style={{ background: '#0B130E', padding: '10px 14px', borderRadius: '8px', border: '1px dashed var(--admin-border)' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-sub)', display: 'block', marginBottom: '4px' }}>
                      Atau Unggah File Foto (Bisa Pilih Banyak Sekaligus):
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        files.forEach(file => {
                          const objectUrl = URL.createObjectURL(file);
                          handleAddServiceImageUrl(objectUrl);
                        });
                      }}
                      style={{ fontSize: '0.82rem', color: '#A0AEC0' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                  <button type="button" onClick={closeModal} className="admin-btn-icon">
                    Batal
                  </button>
                  <button type="submit" className="admin-btn-primary">
                    Simpan Layanan
                  </button>
                </div>
              </form>
            )}

            {/* FORM TESTIMONI */}
            {modalType === 'testimoni' && (
              <form onSubmit={handleSaveTestimoni}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Nama Klien</label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    style={{ paddingLeft: '14px' }}
                    placeholder="Contoh: Bpk. Budi Santoso"
                    value={testimoniForm.nama_klien}
                    onChange={(e) => setTestimoniForm({ ...testimoniForm, nama_klien: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Rating (1-5 ⭐)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    className="admin-input"
                    style={{ paddingLeft: '14px' }}
                    value={testimoniForm.rating}
                    onChange={(e) => setTestimoniForm({ ...testimoniForm, rating: parseInt(e.target.value) })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Waktu / Bulan</label>
                  <input
                    type="text"
                    className="admin-input"
                    style={{ paddingLeft: '14px' }}
                    placeholder="Contoh: Agustus 2026"
                    value={testimoniForm.waktu}
                    onChange={(e) => setTestimoniForm({ ...testimoniForm, waktu: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Isi Ulasan Testimoni</label>
                  <textarea
                    rows={4}
                    required
                    className="admin-input"
                    style={{ paddingLeft: '14px' }}
                    placeholder="Hasil kerja rapi dan tepat waktu..."
                    value={testimoniForm.deskripsi}
                    onChange={(e) => setTestimoniForm({ ...testimoniForm, deskripsi: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                  <button type="button" onClick={closeModal} className="admin-btn-icon">
                    Batal
                  </button>
                  <button type="submit" className="admin-btn-primary">
                    Simpan Testimoni
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
