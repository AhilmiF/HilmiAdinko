import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Phone, ExternalLink } from 'lucide-react';
import { InstagramIcon } from '../assets/Icons';
import { siteConfig, portfolioData, testimonialsData } from '../data/siteData';
import { FeatureCards } from '../components/FeatureCards';
import { ProjectCard } from '../components/ProjectCard';
import { ReviewCard } from '../components/ReviewCard';
import { ContactForm } from '../components/ContactForm';
import { HeroFloatingBadge } from '../components/FloatingCta';
import { AdinkoLogo, GhaziLogo } from '../assets/Logos';

export const Home = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Taman');

  const filterTabs = ['Taman', 'Vertical Garden', 'Lapangan Futsal', 'Minisoccer', 'Olahraga Lainnya'];

  const filteredProjects = portfolioData.filter(item => {
    if (activeFilter === 'Taman') return item.category === 'Taman';
    if (activeFilter === 'Vertical Garden') return item.category === 'Vertical Garden';
    if (activeFilter === 'Lapangan Futsal') return item.category === 'Lapangan Futsal';
    if (activeFilter === 'Minisoccer') return item.category === 'Minisoccer';
    if (activeFilter === 'Olahraga Lainnya') return item.category === 'Olahraga Lainnya';
    return true;
  }).slice(0, 6);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section 
        className="hero-wrapper"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1800&q=80')` }}
      >
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-tag">
              Terpercaya Sejak 2018
            </div>
            <h1 className="hero-title">
              Jasa Rumput Sintetis & Lapangan Olahraga Profesional Pekanbaru
            </h1>
            <p className="hero-subtitle">
              Solusi lengkap untuk taman, dekorasi, hingga lapangan futsal & minisoccer dengan hasil rapi, kuat, dan bergaransi.
            </p>
            <div className="hero-actions">
              <button 
                onClick={() => navigate('/kontak')} 
                className="btn-primary-hero"
              >
                <span>Konsultasi Gratis</span>
                <span className="arrow-circle">
                  <ArrowRight size={14} />
                </span>
              </button>
              <button 
                onClick={() => navigate('/portofolio')} 
                className="btn-secondary-hero"
              >
                <span>Lihat Portofolio</span>
                <span className="arrow-circle" style={{ background: 'rgba(255,255,255,0.2)', color: '#FFFFFF' }}>
                  <ArrowRight size={14} />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Top-Right Slot Badge & WhatsApp */}
        <HeroFloatingBadge />
      </section>

      {/* 2. STATS BAR (TRUST METRICS) */}
      <section className="stats-bar">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '16px' }}>
            <span className="section-tag" style={{ margin: 0 }}>TRUST</span>
          </div>
          <div className="stats-grid">
            {siteConfig.stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DUAL BRAND SHOWCASE */}
      <section className="dual-brand-section">
        <div className="container">
          <div className="dual-brand-grid">
            <div>
              <span className="section-tag">TENTANG KAMI</span>
              <h2 className="section-title">
                Dua Brand, Satu Komitmen: Kualitas Terbaik
              </h2>
              <p className="section-subtitle" style={{ marginBottom: '28px' }}>
                Adinko adalah penyedia jasa rumput sintetis di Pekanbaru yang telah dipercaya oleh berbagai klien, mulai dari rumah pribadi hingga proyek komersial. Kini kami berkembang menyediakan solusi pembangunan lapangan olahraga melalui unit khusus kami.
              </p>
              <button 
                onClick={() => navigate('/layanan')}
                className="btn-primary-hero"
                style={{ padding: '12px 24px', fontSize: '0.9rem' }}
              >
                <span>Lihat Selengkapnya</span>
                <span className="arrow-circle">
                  <ArrowRight size={14} />
                </span>
              </button>
            </div>

            <div className="dual-brand-cards">
              {/* Brand 1: Adinko */}
              <div 
                className="brand-showcase-card"
                onClick={() => navigate('/tentang-adinko')}
                style={{ cursor: 'pointer' }}
              >
                <div className="brand-card-img-wrapper">
                  <img 
                    src="https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=700&q=80" 
                    alt="Rumput Sintetis Adinko" 
                  />
                  <div className="brand-card-logo-overlay">
                    <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '50%' }}>
                      <AdinkoLogo size={42} />
                    </div>
                  </div>
                </div>
                <div className="brand-card-body">
                  <h3 className="brand-card-title">Rumput Sintetis</h3>
                  <p className="brand-card-text">Untuk taman, dekorasi, dan area komersial.</p>
                </div>
              </div>

              {/* Brand 2: GhaziSportsHub */}
              <div 
                className="brand-showcase-card"
                onClick={() => navigate('/tentang-ghazi')}
                style={{ cursor: 'pointer' }}
              >
                <div className="brand-card-img-wrapper">
                  <img 
                    src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=700&q=80" 
                    alt="Lapangan Olahraga Ghazi" 
                  />
                  <div className="brand-card-logo-overlay">
                    <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '50%' }}>
                      <GhaziLogo size={42} />
                    </div>
                  </div>
                </div>
                <div className="brand-card-body">
                  <h3 className="brand-card-title">Lapangan Olahraga</h3>
                  <p className="brand-card-text">Futsal, minisoccer, mini golf, dan lainnya.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE FEATURE CARDS (001 - 004) */}
      <section className="interactive-features-section">
        <div className="container">
          <div className="text-center">
            <span className="section-tag">KEUNGGULAN</span>
            <h2 className="section-title">Solusi Tepat untuk Hunian Anda</h2>
          </div>

          <FeatureCards activeIndexDefault={0} />

          <div className="text-center" style={{ marginTop: '36px' }}>
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

      {/* 5. PORTOFOLIO / HASIL PEKERJAAN KAMI */}
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="text-center">
            <span className="section-tag">GALLERY</span>
            <h2 className="section-title">Hasil Pekerjaan Kami</h2>
          </div>

          {/* Filter Tabs */}
          <div className="filter-container">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                className={`filter-pill ${activeFilter === tab ? 'active' : ''}`}
                onClick={() => setActiveFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 6 Projects Grid */}
          <div className="portfolio-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '40px' }}>
            <button 
              onClick={() => navigate('/portofolio')} 
              className="btn-primary-hero"
            >
              <span>Lihat lebih banyak proyek</span>
              <span className="arrow-circle">
                <ArrowRight size={14} />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION (Dark Box Container) */}
      <section className="container">
        <div className="testimonials-dark-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span className="section-tag" style={{ color: 'var(--green-300)' }}>TESTIMONI KLIEN</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2 }}>
                Apa Kata Klien Kami?
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#FFFFFF' }}>5.0</span>
                <div style={{ display: 'flex', gap: '2px', color: 'var(--gold-400)' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--gold-400)" color="var(--gold-400)" />
                  ))}
                </div>
                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>· Based on 100+ reviews</span>
              </div>
            </div>

            {/* Google Review Pill Button */}
            <button 
              onClick={() => window.open(siteConfig.contacts.mapsReviewUrl || siteConfig.contacts.mapsUrl, '_blank')}
              style={{ 
                background: '#FFFFFF', 
                color: '#121212',
                padding: '10px 20px', 
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                cursor: 'pointer'
              }}
            >
              <span>Review us on Google</span>
              <MapPin size={16} color="#E94235" />
            </button>
          </div>

          {/* 3 Review Cards Grid */}
          <div className="testimonials-grid">
            {testimonialsData.slice(0, 3).map((review) => (
              <ReviewCard key={review.id} review={review} variant="dark" />
            ))}
          </div>

          <div className="text-center">
            <button 
              onClick={() => navigate('/testimoni')}
              style={{
                background: '#FFFFFF',
                color: 'var(--green-900)',
                padding: '12px 28px',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
              }}
            >
              <span>Gabung dengan ratusan klien</span>
              <span className="arrow-circle" style={{ background: 'var(--green-600)', color: '#FFFFFF' }}>
                <ArrowRight size={14} />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. CONTACT & CONSULTATION FORM SECTION */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Left Column: Contact Details & Google Maps */}
            <div className="contact-info-card">
              <span className="section-tag">CONTACT</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px' }}>
                Hubungi Kami
              </h2>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="contact-item-title">Alamat</div>
                  <div className="contact-item-text">{siteConfig.contacts.address}</div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="contact-item-title">WhatsApp</div>
                  <div className="contact-item-text">
                    <div>{siteConfig.contacts.whatsappAdinko} (Adinko)</div>
                    <div>{siteConfig.contacts.whatsappAdinko2}</div>
                    <div>{siteConfig.contacts.whatsappGhazi} (GhaziSportsHub)</div>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <InstagramIcon size={20} />
                </div>
                <div>
                  <div className="contact-item-title">Instagram</div>
                  <div className="contact-item-text">
                    <div>{siteConfig.contacts.instagramAdinko}</div>
                    <div>{siteConfig.contacts.instagramGhazi}</div>
                  </div>
                </div>
              </div>

              {/* Google Maps Interactive Container (Opens Review / Place in new tab) */}
              <div 
                className="map-embed-wrapper"
                onClick={() => window.open(siteConfig.contacts.mapsReviewUrl || siteConfig.contacts.mapsUrl, '_blank')}
                title="Klik untuk membuka ulasan Google Maps Adinko Pekanbaru"
              >
                <div className="map-overlay-badge">
                  <span>Maps</span>
                  <ExternalLink size={13} />
                </div>
                <iframe
                  title="Google Maps Location Adinko"
                  src={siteConfig.contacts.mapsEmbedUrl}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <button 
                onClick={() => navigate('/kontak')}
                className="btn-primary-hero"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Konsultasi GRATIS Sekarang</span>
                <span className="arrow-circle">
                  <ArrowRight size={14} />
                </span>
              </button>
            </div>

            {/* Right Column: Interactive Consultation Form */}
            <ContactForm title="Kirim Pesan Sekarang" />
          </div>
        </div>
      </section>

      {/* 8. BOTTOM CALLOUT BANNER */}
      <section style={{ padding: '60px 0', background: '#FFFFFF', textAlign: 'center' }}>
        <div className="container">
          <span className="section-tag">USE OUR SERVICES</span>
          <h3 style={{ 
            fontSize: '1.35rem', 
            fontWeight: 700, 
            color: 'var(--black)', 
            maxWidth: '750px', 
            margin: '8px auto 0 auto',
            lineHeight: 1.5
          }}>
            Jangan tunda lagi, wujudkan taman atau lapangan impian Anda bersama kami sekarang juga.
          </h3>
        </div>
      </section>
    </div>
  );
};
