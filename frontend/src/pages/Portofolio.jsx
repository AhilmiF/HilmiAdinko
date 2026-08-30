import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/siteData';
import { ProjectCard } from '../components/ProjectCard';
import { HeroFloatingBadge } from '../components/FloatingCta';

export const Portofolio = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [apiProjects, setApiProjects] = useState([]);

  useEffect(() => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://hilmiadinko-production.up.railway.app';
    fetch(`${apiBaseUrl}/portfolio`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData && resData.data && resData.data.length > 0) {
          setApiProjects(resData.data);
        }
      })
      .catch((err) => console.log('Portfolio API:', err));
  }, []);

  const filterTabs = ['Semua', 'Taman', 'Vertical Garden', 'Lapangan Futsal', 'Minisoccer', 'Olahraga Lainnya'];

  const projectsToDisplay = apiProjects.length > 0 ? apiProjects : portfolioData;

  const filteredProjects = projectsToDisplay.filter(item => {
    if (activeFilter === 'Semua') return true;
    return (item.category === activeFilter) || (item.kategori === activeFilter);
  });

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
              Hasil Nyata, Klien Puas
            </div>
            <h1 className="hero-title">
              Hasil Pekerjaan Kami
            </h1>
            <p className="hero-subtitle">
              Kami telah mengerjakan berbagai proyek dengan hasil memuaskan, baik untuk hunian hingga komersial besar. Setiap proyek dirancang dan dipasang rapi.
            </p>
          </div>
        </div>

        <HeroFloatingBadge />
      </section>

      {/* 2. PORTOFOLIO GRID & FILTERS */}
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          {/* Interactive Filter Pills */}
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

          {/* 9 Projects Grid */}
          <div className="portfolio-grid" style={{ marginTop: '36px' }}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '48px' }}>
            <button 
              onClick={() => navigate('/kontak')} 
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
    </div>
  );
};
