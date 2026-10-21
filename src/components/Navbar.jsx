import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();

  // Pages with a dark/image hero banner where transparent navbar looks stunning (Gambar 1)
  // Blog detail doesn't have a hero banner, so it uses solid navbar (Gambar 2)
  const hasHero = !location.pathname.startsWith('/blog/') || location.pathname === '/blog';
  const isTransparent = !isScrolled && hasHero && !isOpen;

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('kriya_lang', newLang);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Track scroll position:
  // When at top (banner), transparent navbar with white text (Gambar 1).
  // As user scrolls down, smoothly transitions to solid white with dark text (Gambar 2).
  // The navbar stays fixed and pinned at top, never disappearing!
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 25);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsMoreOpen(false);
  };

  return (
    <nav className={`navbar ${isTransparent ? 'navbar--transparent' : 'navbar--solid'}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" aria-label="Kriya Kayu Nusantara" onClick={handleLinkClick}>
          {/* Dual logos with smooth CSS opacity cross-fade to eliminate any flicker */}
          <img
            src="/brand-logo-light.png"
            alt="Kriya Kayu Nusantara"
            className="navbar-logo-img logo-light"
          />
          <img
            src="/brand-logo.png"
            alt="Kriya Kayu Nusantara"
            className="navbar-logo-img logo-dark"
          />
        </Link>

        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <NavLink to="/" end onClick={handleLinkClick}>{t('navbar.home')}</NavLink>
          <NavLink to="/about" onClick={handleLinkClick}>{t('navbar.about')}</NavLink>
          <NavLink to="/craftsmanship" onClick={handleLinkClick}>{t('navbar.craftsmanship')}</NavLink>
          <NavLink to="/products" onClick={handleLinkClick}>{t('navbar.products')}</NavLink>
          <NavLink to="/services" onClick={handleLinkClick}>{t('navbar.services')}</NavLink>

          {/* More Dropdown (Kontak, Blog, Admin) */}
          <div 
            className={`navbar-more-dropdown ${isMoreOpen ? 'open' : ''}`} 
            ref={dropdownRef}
            onMouseEnter={() => window.innerWidth > 992 && setIsMoreOpen(true)}
            onMouseLeave={() => window.innerWidth > 992 && setIsMoreOpen(false)}
          >
            <button
              type="button"
              className={`nav-more-btn ${isMoreOpen ? 'open' : ''} ${['/contact', '/blog', '/admin'].some(p => location.pathname.startsWith(p)) ? 'active' : ''}`}
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              aria-haspopup="true"
              aria-expanded={isMoreOpen}
            >
              <span>{t('navbar.more', 'More')}</span>
              <ChevronDown size={14} className={`more-chevron ${isMoreOpen ? 'rotate' : ''}`} />
            </button>

            <div className={`more-menu-panel ${isMoreOpen ? 'visible' : ''}`}>
              <NavLink to="/contact" className="more-menu-item" onClick={handleLinkClick}>
                <div className="menu-item-text">
                  <span className="item-title">{t('navbar.contact', 'Kontak')}</span>
                  <span className="item-desc">{t('navbar.contact_desc', 'Konsultasi & hubungi tim kami')}</span>
                </div>
              </NavLink>

              <NavLink to="/blog" className="more-menu-item" onClick={handleLinkClick}>
                <div className="menu-item-text">
                  <span className="item-title">{t('navbar.blog', 'Blog')}</span>
                  <span className="item-desc">{t('navbar.blog_desc', 'Artikel, tren & wawasan')}</span>
                </div>
              </NavLink>

              <div className="more-menu-divider"></div>

              <NavLink to="/admin" className="more-menu-item admin-item" onClick={handleLinkClick}>
                <div className="menu-item-text">
                  <span className="item-title">{t('navbar.admin', 'Admin')}</span>
                  <span className="item-desc">{t('navbar.admin_desc', 'Masuk dashboard admin')}</span>
                </div>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="navbar-actions">
          <div className="navbar-toggles">
            <button className="icon-btn" onClick={toggleLanguage} aria-label="Toggle Language">
              <Globe size={18} />
              <span className="lang-text">{i18n.language.toUpperCase()}</span>
            </button>
            <div className="toggle-divider"></div>
            <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
