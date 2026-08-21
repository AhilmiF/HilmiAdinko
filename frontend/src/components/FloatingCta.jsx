import React from 'react';
import { siteConfig } from '../data/siteData';
import { WhatsAppIcon } from '../assets/Icons';

// Hero Section Floating Badge
export const HeroFloatingBadge = () => {
  const handleWaClick = () => {
    window.open(`https://wa.me/${siteConfig.contacts.directWaNumber}?text=Halo%20Adinko%20%26%20GhaziSportsHub,%20saya%20ingin%20konsultasi%20pembuatan%20taman%20/%20lapangan%20olahraga`, '_blank');
  };

  return (
    <div className="hero-floating-badge">
      <div className="slot-badge">
        Slot terbatas - Pesan sekarang!
      </div>
      <button 
        onClick={handleWaClick}
        className="whatsapp-fab" 
        aria-label="Konsultasi via WhatsApp"
        title="Chat via WhatsApp"
      >
        <WhatsAppIcon size={28} color="#FFFFFF" />
      </button>
    </div>
  );
};

// Global Sticky WhatsApp Floating Button
export const GlobalWhatsAppSticky = () => {
  const handleWaClick = () => {
    window.open(`https://wa.me/${siteConfig.contacts.directWaNumber}?text=Halo%20Adinko%20%26%20GhaziSportsHub,%20saya%20tertarik%20untuk%20konsultasi%20proyek`, '_blank');
  };

  return (
    <div className="global-whatsapp-sticky">
      <button 
        onClick={handleWaClick}
        className="whatsapp-fab" 
        aria-label="Hubungi WhatsApp"
        title="Chat WhatsApp Sekarang"
      >
        <WhatsAppIcon size={30} color="#FFFFFF" />
      </button>
    </div>
  );
};
