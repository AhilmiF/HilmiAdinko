import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '../data/siteData';
import { HeroFloatingBadge } from '../components/FloatingCta';

export const Layanan = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section 
        className="hero-wrapper"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1800&q=80')` }}
      >
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-tag">
              Layanan Kami
            </div>
            <h1 className="hero-title">
              Solusi Lengkap Rumput Sintetis & Lapangan Olahraga
            </h1>
            <p className="hero-subtitle">
              Kami hadir sebagai mitra terpercaya untuk kebutuhan taman sintetis maupun fasilitas olahraga profesional Anda.
            </p>
          </div>
        </div>

        <HeroFloatingBadge />
      </section>

      {/* 2. DUAL BRAND SERVICES CATALOG */}
      <section style={{ padding: '80px 0', background: 'var(--gray-bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
            {/* Brand 1: ADINKO */}
            <div>
              <span className="section-tag">{servicesData.adinko.brand}</span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '14px', color: 'var(--black)' }}>
                {servicesData.adinko.title}
              </h2>
              <p style={{ color: 'var(--gray-text)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '28px' }}>
                {servicesData.adinko.description}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', maxWidth: '380px' }}>
                {servicesData.adinko.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    style={{ 
                      background: '#EAF5D8', 
                      color: 'var(--green-800)', 
                      padding: '10px 16px', 
                      borderRadius: '9999px', 
                      fontSize: '0.85rem', 
                      fontWeight: 600,
                      textAlign: 'center'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Brand 2: GhaziSportsHub */}
            <div>
              <span className="section-tag">{servicesData.ghazi.brand}</span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '14px', color: 'var(--black)' }}>
                {servicesData.ghazi.title}
              </h2>
              <p style={{ color: 'var(--gray-text)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '28px' }}>
                {servicesData.ghazi.description}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', maxWidth: '380px' }}>
                {servicesData.ghazi.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    style={{ 
                      background: '#E2E6E2', 
                      color: 'var(--black)', 
                      padding: '10px 16px', 
                      borderRadius: '9999px', 
                      fontSize: '0.85rem', 
                      fontWeight: 600,
                      textAlign: 'center'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SATU SOLUSI UNTUK SEMUA KEBUTUHAN ANDA (8 Cards Grid) */}
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'flex-start', marginBottom: '40px' }}>
            <div>
              <span className="section-tag">LAYANAN KAMI</span>
              <h2 className="section-title" style={{ margin: 0 }}>
                Satu Solusi untuk Semua Kebutuhan Anda
              </h2>
            </div>
            <div>
              <p className="section-subtitle" style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>
                Dari pemasangan rumput sintetis hingga pembangunan lapangan olahraga, kami menghadirkan layanan lengkap
              </p>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '20px', 
            margin: '40px 0' 
          }}>
            {servicesData.allGrid.map((item) => (
              <div key={item.id} className="project-card">
                <div className="project-img-wrapper" style={{ height: '180px' }}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className="project-body" style={{ textAlign: 'left', padding: '16px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button 
              onClick={() => navigate('/kontak')} 
              className="btn-primary-hero"
            >
              <span>Konsultasi GRATIS Sekarang</span>
              <span className="arrow-circle">
                <ArrowRight size={14} />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
