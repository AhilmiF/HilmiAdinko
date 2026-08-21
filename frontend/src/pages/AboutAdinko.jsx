import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Gem, Sparkles, LayoutGrid, Wallet } from 'lucide-react';
import { HeroFloatingBadge } from '../components/FloatingCta';

export const AboutAdinko = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  const playgroundSlides = [
    "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80"
  ];

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % playgroundSlides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + playgroundSlides.length) % playgroundSlides.length);
  };

  const solutions = [
    { title: "Taman rumah", img: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=600&q=80" },
    { title: "Dekorasi indoor & outdoor", img: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80" },
    { title: "Area komersial (cafe, kantor, dll)", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80" },
    { title: "Vertical garden", img: "https://images.unsplash.com/photo-1534710961216-75c88202f43e?auto=format&fit=crop&w=600&q=80" }
  ];

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section 
        className="hero-wrapper"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1800&q=80')` }}
      >
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-tag">
              Tentang Adinko
            </div>
            <h1 className="hero-title">
              Solusi Rumput Sintetis Berkualitas untuk Berbagai Kebutuhan
            </h1>
            <p className="hero-subtitle">
              Dari rumah pribadi hingga area komersial, Adinko menghadirkan rumput sintetis dengan tampilan alami, pemasangan presisi, dan daya tahan tinggi.
            </p>
          </div>
        </div>

        <HeroFloatingBadge />
      </section>

      {/* 2. SIAPA KAMI SECTION */}
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="dual-brand-grid">
            <div>
              <span className="section-tag">SIAPA KAMI ?</span>
              <h2 className="section-title">
                Berpengalaman dalam Pemasangan Rumput Sintetis Profesional
              </h2>
              <p className="section-subtitle" style={{ marginBottom: '28px' }}>
                Adinko adalah penyedia jasa rumput sintetis di Pekanbaru yang telah dipercaya oleh berbagai klien. Kami fokus pada kualitas material, kerapian pengerjaan, dan hasil akhir yang estetis serta tahan lama.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ 
                  background: 'var(--green-600)', 
                  color: '#FFFFFF', 
                  padding: '10px 22px', 
                  borderRadius: '9999px', 
                  fontSize: '0.88rem', 
                  fontWeight: 600 
                }}>
                  Rumput Sintetis
                </span>
                <span style={{ 
                  background: 'var(--green-600)', 
                  color: '#FFFFFF', 
                  padding: '10px 22px', 
                  borderRadius: '9999px', 
                  fontSize: '0.88rem', 
                  fontWeight: 600 
                }}>
                  Vertical & Garden Sintetis
                </span>
              </div>
            </div>

            {/* Image Slider / Carousel */}
            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '360px', boxShadow: 'var(--shadow-md)' }}>
              <img 
                src={playgroundSlides[activeSlide]} 
                alt="Playground Adinko" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              
              {/* Slider Arrows */}
              <button 
                onClick={handlePrevSlide}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--black)',
                  boxShadow: 'var(--shadow-sm)'
                }}
                aria-label="Previous Slide"
              >
                <ChevronLeft size={20} />
              </button>

              <button 
                onClick={handleNextSlide}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--black)',
                  boxShadow: 'var(--shadow-sm)'
                }}
                aria-label="Next Slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISI & MISI SECTION */}
      <section style={{ padding: '80px 0', background: 'var(--gray-bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'flex-start', marginBottom: '40px' }}>
            <div>
              <span className="section-tag">VISI & MISI</span>
              <h2 className="section-title" style={{ margin: 0 }}>
                Tumbuh Menjadi Penyedia Terpercaya di Pekanbaru
              </h2>
            </div>
            <div>
              <p className="section-subtitle" style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>
                Kami berkomitmen memberikan layanan terbaik lewat kualitas produk, pelayanan profesional, dan kepuasan pelanggan.
              </p>
            </div>
          </div>

          <div className="vision-mission-grid">
            {/* Left: Image with Nilai Kami Tags */}
            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <img 
                src="https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=800&q=80" 
                alt="Instalasi Rumput Sintetis Adinko" 
                style={{ width: '100%', height: '340px', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                background: 'rgba(13, 21, 11, 0.75)',
                backdropFilter: 'blur(8px)',
                padding: '16px 20px',
                borderRadius: '16px',
                color: '#FFFFFF'
              }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Nilai Kami</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge-tag" style={{ border: '1px solid rgba(255,255,255,0.4)', borderRadius: '9999px', padding: '4px 12px', fontSize: '0.8rem' }}>Kualitas</span>
                  <span className="badge-tag" style={{ border: '1px solid rgba(255,255,255,0.4)', borderRadius: '9999px', padding: '4px 12px', fontSize: '0.8rem' }}>Kerapian</span>
                  <span className="badge-tag" style={{ border: '1px solid rgba(255,255,255,0.4)', borderRadius: '9999px', padding: '4px 12px', fontSize: '0.8rem' }}>Profesionalisme</span>
                </div>
              </div>
            </div>

            {/* Right: Visi & Misi Boxes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#EAF5D8', padding: '24px', borderRadius: '20px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#121212', marginBottom: '8px' }}>
                  Visi kami
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#444444', lineHeight: 1.5 }}>
                  Menjadi penyedia solusi rumput sintetis dan fasilitas olahraga terbaik di Pekanbaru dan sekitarnya.
                </p>
              </div>

              <div style={{ background: 'var(--green-600)', padding: '24px', borderRadius: '20px', color: '#FFFFFF' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
                  Misi kami
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFFFFF', display: 'inline-block', flexShrink: 0 }} />
                    <span>Memberikan produk berkualitas tinggi dengan material premium terpilih</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFFFFF', display: 'inline-block', flexShrink: 0 }} />
                    <span>Pelayanan profesional</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFFFFF', display: 'inline-block', flexShrink: 0 }} />
                    <span>Harga kompetitif</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFFFFF', display: 'inline-block', flexShrink: 0 }} />
                    <span>Pengerjaan tepat waktu</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KENAPA MEMILIH KAMI? SECTION */}
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="text-center">
            <span className="section-tag">KENAPA MEMILIH KAMI ?</span>
            <h2 className="section-title">Kami Mengutamakan Kualitas di Setiap Detail</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '40px' }}>
            {/* Card 001 */}
            <div style={{ 
              background: '#FFFFFF', 
              border: '2px solid var(--green-400)', 
              borderRadius: '20px', 
              padding: '24px', 
              boxShadow: 'var(--shadow-sm)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ color: 'var(--green-600)' }}><Gem size={28} /></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#AAAAAA' }}>001</span>
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#121212', lineHeight: 1.4 }}>
                Material rumput sintetis berkualitas premium
              </h4>
            </div>

            {/* Card 002 */}
            <div style={{ 
              background: '#FFFFFF', 
              border: '1px solid var(--gray-border)', 
              borderRadius: '20px', 
              padding: '24px', 
              boxShadow: 'var(--shadow-sm)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ color: 'var(--gray-text)' }}><Sparkles size={28} /></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#AAAAAA' }}>002</span>
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#121212', lineHeight: 1.4 }}>
                Pemasangan rapi & presisi
              </h4>
            </div>

            {/* Card 003 */}
            <div style={{ 
              background: '#FFFFFF', 
              border: '1px solid var(--gray-border)', 
              borderRadius: '20px', 
              padding: '24px', 
              boxShadow: 'var(--shadow-sm)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ color: 'var(--gray-text)' }}><LayoutGrid size={28} /></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#AAAAAA' }}>003</span>
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#121212', lineHeight: 1.4 }}>
                Bisa custom sesuai kebutuhan desain
              </h4>
            </div>

            {/* Card 004 */}
            <div style={{ 
              background: '#FFFFFF', 
              border: '1px solid var(--gray-border)', 
              borderRadius: '20px', 
              padding: '24px', 
              boxShadow: 'var(--shadow-sm)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ color: 'var(--gray-text)' }}><Wallet size={28} /></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#AAAAAA' }}>004</span>
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#121212', lineHeight: 1.4 }}>
                Harga transparan tanpa biaya tersembunyi
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LAYANAN KAMI SECTION */}
      <section style={{ padding: '80px 0', background: 'var(--gray-bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'flex-start', marginBottom: '40px' }}>
            <div>
              <span className="section-tag">LAYANAN KAMI</span>
              <h2 className="section-title" style={{ margin: 0 }}>
                Solusi Rumput Sintetis untuk Berbagai Kebutuhan
              </h2>
            </div>
            <div>
              <p className="section-subtitle" style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>
                Kami melayani pemasangan rumput sintetis untuk taman rumah, dekorasi, hingga area komersial dengan hasil yang rapi dan modern.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', margin: '40px 0' }}>
            {solutions.map((item, idx) => (
              <div key={idx} className="project-card">
                <div className="project-img-wrapper" style={{ height: '180px' }}>
                  <img src={item.img} alt={item.title} />
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

      {/* 6. MULAI SEKARANG BANNER (Dark Green Card) */}
      <section className="container" style={{ margin: '60px auto' }}>
        <div style={{ 
          background: 'var(--green-900)', 
          borderRadius: '24px', 
          padding: '60px 40px', 
          color: '#FFFFFF',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <span className="section-tag" style={{ color: 'var(--green-300)' }}>MULAI SEKARANG</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '10px 0 16px 0', color: '#FFFFFF' }}>
            Tertarik? Mari Diskusikan Proyek Anda
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '550px', margin: '0 auto 30px auto', fontSize: '0.95rem' }}>
            Survei gratis, konsultasi gratis, tanpa komitmen awal.
          </p>
          <button 
            onClick={() => navigate('/kontak')}
            style={{
              background: '#FFFFFF',
              color: 'var(--green-900)',
              padding: '14px 32px',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <span>Gabung dengan ratusan klien</span>
            <span className="arrow-circle" style={{ background: 'var(--green-600)', color: '#FFFFFF' }}>
              <ArrowRight size={14} />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
