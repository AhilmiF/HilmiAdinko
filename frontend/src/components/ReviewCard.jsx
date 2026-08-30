import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export const ReviewCard = ({ review, variant = "light", isActive = false }) => {
  const isDark = variant === "dark";

  const handleOpenGmaps = (e) => {
    e.stopPropagation();
    window.open(siteConfig.contacts.mapsReviewUrl || siteConfig.contacts.mapsUrl, '_blank');
  };

  return (
    <div 
      className={isDark ? "review-card" : "review-card-light"}
      style={isActive ? { border: '2px solid var(--green-500)', background: '#FFFFFF' } : {}}
    >
      {/* Top Google Maps Verification Badge */}
      <div 
        onClick={handleOpenGmaps}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: isDark ? 'rgba(255,255,255,0.1)' : '#F0F7FF',
          color: isDark ? '#60A5FA' : '#1A73E8',
          border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid #D0E3FF',
          padding: '4px 10px',
          borderRadius: '9999px',
          fontSize: '0.72rem',
          fontWeight: 700,
          marginBottom: '14px',
          cursor: 'pointer'
        }}
        title="Buka ulasan ini di Google Maps"
      >
        <span>Google Maps Review</span>
        <ExternalLink size={11} />
      </div>

      <p className="review-text">
        "{review.text}"
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
        <div className="review-author">
          <img 
            src={review.avatar} 
            alt={review.name} 
            className="review-avatar" 
            loading="lazy" 
          />
          <div>
            <div className="author-name" style={{ color: isDark ? '#FFFFFF' : '#121212' }}>
              {review.name}
            </div>
            <div className="author-time" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#888888' }}>
              {review.time} · {review.category || 'Rumput Sintetis Pekanbaru'}
            </div>
          </div>
        </div>

        <div className="star-rating">
          {[...Array(review.rating || 5)].map((_, i) => (
            <Star key={i} size={14} fill="#C5A638" color="#C5A638" />
          ))}
        </div>
      </div>
    </div>
  );
};
