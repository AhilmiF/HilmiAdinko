import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export const ContactForm = ({ title = "Kirim Pesan Sekarang" }) => {
  const [formData, setFormData] = useState({
    nama: '',
    whatsapp: '',
    lokasi: '',
    kebutuhan: 'Instalasi jaring',
    keterangan: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getCategoryId = (kebutuhanName) => {
    const map = {
      'Instalasi jaring': 1,
      'Rumput Sintetis Taman': 2,
      'Vertical Garden': 3,
      'Lapangan Futsal': 4,
      'Mini Soccer': 5,
      'Mini Golf': 6,
      'Padel & Tenis': 6,
      'Lainnya': 6
    };
    return map[kebutuhanName] || 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const categoryId = getCategoryId(formData.kebutuhan);
    
    // Create new contact object
    const newContact = {
      id: Date.now(),
      nama_lengkap: formData.nama.trim(),
      no_whatsapp: formData.whatsapp.trim(),
      lokasi: formData.lokasi.trim(),
      kategori: categoryId,
      kategori_layanan: formData.kebutuhan,
      keterangan: formData.keterangan.trim(),
      created_at: new Date().toISOString().split('T')[0]
    };

    // Save to local storage for instant Admin sync
    try {
      const existingStr = localStorage.getItem('local_contacts');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      const updated = [newContact, ...existing];
      localStorage.setItem('local_contacts', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    // Prepare structured message for WhatsApp
    const rawMessage = `Halo Adinko & GhaziSportsHub,

Saya ingin konsultasi proyek dengan detail berikut:
• Nama Lengkap: ${formData.nama.trim()}
• No. WhatsApp: ${formData.whatsapp.trim()}
• Lokasi Proyek: ${formData.lokasi.trim()}
• Kebutuhan Layanan: ${formData.kebutuhan}
• Keterangan Tambahan: ${formData.keterangan.trim() || '-'}

Mohon informasinya Terima kasih!`;

    const cleanWaNumber = (siteConfig.contacts.directWaNumber || '').replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(rawMessage)}`;
    
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://hilmiadinko-production.up.railway.app';
      await fetch(`${apiBaseUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama_lengkap: formData.nama.trim(),
          no_whatsapp: formData.whatsapp.trim(),
          lokasi: formData.lokasi.trim(),
          keterangan: formData.keterangan.trim(),
          kategori: categoryId
        })
      });
    } catch (err) {
      console.warn('Backend API error / offline:', err);
    }

    setSubmitted(true);
    
    // Open WhatsApp with full form details in chat message
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 400);
  };

  return (
    <div className="form-card">
      <h3 className="form-title">{title}</h3>

      {submitted ? (
        <div style={{ textAlign: 'center', padding: '30px 20px', background: '#FFFFFF', borderRadius: '12px' }}>
          <CheckCircle2 size={48} color="#486F0C" style={{ margin: '0 auto 12px auto' }} />
          <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#121212' }}>Pesan Anda Telah Disiapkan!</h4>
          <p style={{ fontSize: '0.9rem', color: '#667068', marginTop: '6px' }}>
            Membuka WhatsApp untuk mengirim detail konsultasi langsung ke tim kami...
          </p>
          <button 
            type="button" 
            onClick={() => setSubmitted(false)}
            style={{ marginTop: '18px', color: '#486F0C', fontWeight: 600, fontSize: '0.85rem' }}
          >
            ← Kirim pesan baru
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="nama">Nama Lengkap</label>
            <input
              id="nama"
              type="text"
              name="nama"
              required
              className="form-input"
              placeholder="Nama Anda"
              value={formData.nama}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="whatsapp">No. WhatsApp</label>
            <input
              id="whatsapp"
              type="tel"
              name="whatsapp"
              required
              className="form-input"
              placeholder="0822-xxxx-xxxx"
              value={formData.whatsapp}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="lokasi">Lokasi Proyek</label>
            <input
              id="lokasi"
              type="text"
              name="lokasi"
              required
              className="form-input"
              placeholder="Kota / Kecamatan"
              value={formData.lokasi}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="kebutuhan">Kebutuhan Anda</label>
            <select
              id="kebutuhan"
              name="kebutuhan"
              className="form-select"
              value={formData.kebutuhan}
              onChange={handleChange}
            >
              <option value="Instalasi jaring">Instalasi jaring</option>
              <option value="Rumput Sintetis Taman">Rumput Sintetis Taman</option>
              <option value="Vertical Garden">Vertical Garden</option>
              <option value="Lapangan Futsal">Lapangan Futsal</option>
              <option value="Mini Soccer">Mini Soccer</option>
              <option value="Mini Golf">Mini Golf</option>
              <option value="Padel & Tenis">Padel & Tenis</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="keterangan">Keterangan</label>
            <textarea
              id="keterangan"
              name="keterangan"
              className="form-textarea"
              placeholder="Ceritakan detail kebutuhan anda..."
              value={formData.keterangan}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button type="submit" className="btn-form-submit">
              <span>Kirim Pesan</span>
              <Send size={15} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
