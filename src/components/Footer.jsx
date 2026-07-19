import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { socials } from '../data/socials';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          {/* The footer sits on walnut in both themes, so it always uses the reversed logo. */}
          <Link to="/" className="footer-logo" aria-label="Kriya Kayu Nusantara">
            <img src="/brand-logo-light.png" alt="Kriya Kayu Nusantara" />
          </Link>
          <p>{t('footer.desc')}</p>
          {/* Same channels, order, and icons as the floating CTA rail. */}
          <div className="footer-social">
            {socials.map(({ key, label, href, Icon }) => {
              const external = href.startsWith('http');
              return (
                <a
                  key={key}
                  href={href}
                  title={label}
                  aria-label={label}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                >
                  <Icon />
                </a>
              );
            })}
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
