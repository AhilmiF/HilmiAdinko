import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ProjectCard = ({ project }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Normalize image list (supports project.images array or single image string)
  const imageList = (project.images && Array.isArray(project.images) && project.images.length > 0)
    ? project.images
    : [project.image || project.image_url || 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=800&q=80'];

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  const selectImage = (e, index) => {
    e.stopPropagation();
    setCurrentIdx(index);
  };

  return (
    <div className="project-card">
      <div className="project-img-wrapper">
        <img 
          src={imageList[currentIdx]} 
          alt={`${project.title} - Gambar ${currentIdx + 1}`} 
          loading="lazy" 
        />

        {/* Top-left tag badge */}
        <span className="project-tag-badge">
          {project.tag || project.category || 'Outdoor / semi outdoor'}
        </span>

        {/* Carousel Prev/Next Arrow Controls (shown when > 1 image) */}
        {imageList.length > 1 && (
          <>
            <button 
              type="button" 
              className="carousel-arrow prev" 
              onClick={prevImage}
              aria-label="Gambar Sebelumnya"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              type="button" 
              className="carousel-arrow next" 
              onClick={nextImage}
              aria-label="Gambar Berikutnya"
            >
              <ChevronRight size={16} />
            </button>

            {/* Pagination Dots Indicator */}
            <div className="card-carousel-dots">
              {imageList.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`carousel-dot ${idx === currentIdx ? 'active' : ''}`}
                  onClick={(e) => selectImage(e, idx)}
                  aria-label={`Lihat Foto ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="project-body">
        <h4 className="project-title">{project.title || project.nama_proyek}</h4>
        <div className="project-location-pill">
          {project.location || project.lokasi || 'Pekanbaru, Riau'}
        </div>
        <p className="project-desc">{project.description || project.deskripsi}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
