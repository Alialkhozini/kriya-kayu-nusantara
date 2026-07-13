import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <img 
              src="/icon-light.png" 
              alt="Logo Kriya Kayu Nusantara" 
              style={{ height: '40px', objectFit: 'contain' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1, fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--c-bg-white)' }}>
              <span style={{ color: 'var(--c-primary)' }}>Kriya Kayu</span>
              <span>Nusantara</span>
            </div>
          </div>
          <p>{t('footer.desc')}</p>
          <div className="footer-social">
            <a href="https://instagram.com/kriyakayunusantara" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://tiktok.com/@kriyakayunusantara" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h4>{t('footer.company')}</h4>
          <ul>
            <li><Link to="/about">{t('navbar.about')}</Link></li>
            <li><Link to="/craftsmanship">{t('navbar.craftsmanship')}</Link></li>
            <li><Link to="/projects">{t('navbar.projects')}</Link></li>
            <li><Link to="/contact">{t('navbar.contact')}</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>{t('footer.services')}</h4>
          <ul>
            <li><Link to="/products">Custom Furniture</Link></li>
            <li><Link to="/services">Design Consultation</Link></li>
            <li><Link to="/services">Furniture Repair</Link></li>
            <li><Link to="/services">Project Installation</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>{t('footer.contact')}</h4>
          <p><strong>PT KARYA ROTAN INDONESIA</strong></p>
          <p>Jl. Sekar Tunjung XV NO. 1A, Denpasar, Bali, Indonesia. 80237</p>
          <p className="contact-detail">
            <Mail size={16} /> project.kriyakayunusantara@gmail.com
          </p>
          <p className="contact-detail">
            WhatsApp: +62 851-8461-1918
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;
