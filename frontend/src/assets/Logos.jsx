import React from 'react';

// Adinko / Abiya PNG Logo
export const AdinkoLogo = ({ className = "", size = 46, style = {} }) => {
  return (
    <div 
      className={`logo-adinko-wrapper ${className}`} 
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style }}
    >
      <img 
        src="/images/abiya-logo.png" 
        alt="Adinko / Abiya Logo" 
        style={{ width: size, height: 'auto', maxHeight: size, objectFit: 'contain', display: 'block' }} 
      />
    </div>
  );
};

// GhaziSportsHub PNG Logo
export const GhaziLogo = ({ className = "", size = 42, style = {} }) => {
  return (
    <div 
      className={`logo-ghazi-wrapper ${className}`} 
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style }}
    >
      <img 
        src="/images/ghazi-logo.png" 
        alt="GhaziSportsHub Logo" 
        style={{ width: size, height: 'auto', maxHeight: size, objectFit: 'contain', display: 'block' }} 
      />
    </div>
  );
};

// Dual Brand Combination Logo (Used in Footer & Hero Badges)
export const DualBrandLogo = ({ className = "", size = 42, light = false }) => {
  return (
    <div className={`dual-brand-logo ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '14px' }}>
      <AdinkoLogo size={size} />
      <div style={{ width: '1.5px', height: `${size * 0.7}px`, background: light ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)' }} />
      <GhaziLogo size={size} />
    </div>
  );
};
