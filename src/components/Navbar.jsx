import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('kriya_lang', newLang);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" aria-label="Kriya Kayu Nusantara">
          <img
            src={isDarkMode ? '/brand-logo-light.png' : '/brand-logo.png'}
            alt="Kriya Kayu Nusantara"
            className="navbar-logo-img"
          />
        </Link>

        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <NavLink to="/" end onClick={() => setIsOpen(false)}>{t('navbar.home')}</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)}>{t('navbar.about')}</NavLink>
          <NavLink to="/craftsmanship" onClick={() => setIsOpen(false)}>{t('navbar.craftsmanship')}</NavLink>
          <NavLink to="/products" onClick={() => setIsOpen(false)}>{t('navbar.products')}</NavLink>
          <NavLink to="/services" onClick={() => setIsOpen(false)}>{t('navbar.services')}</NavLink>
          <NavLink to="/projects" onClick={() => setIsOpen(false)}>{t('navbar.projects')}</NavLink>
          <NavLink to="/contact" className="btn-contact" onClick={() => setIsOpen(false)}>{t('navbar.contact')}</NavLink>
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

          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
