import React from 'react';
import { useLocation } from 'react-router-dom';
import { socials } from '../data/socials';
import './FloatingSocials.css';

const FloatingSocials = () => {
  const location = useLocation();

  // Pages with a hero banner where navbar starts transparent at top
  const hasHero = !location.pathname.startsWith('/blog/') || location.pathname === '/blog';
  const [isVisible, setIsVisible] = React.useState(!hasHero);

  React.useEffect(() => {
    const checkVisibility = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      // Navbar turns white when scrollY > 25.
      // On pages without hero banner, navbar is always white.
      const isNavbarWhite = hasHero ? scrollY > 25 : true;
      setIsVisible(isNavbarWhite);
    };

    // Check immediately on mount and route change
    checkVisibility();

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [hasHero, location.pathname]);

  return (
    <div
      className={`floating-socials ${isVisible ? 'is-visible' : ''}`}
      aria-hidden={!isVisible}
    >
      {socials.map(({ key, label, href, Icon }) => {
        const external = href.startsWith('http');
        return (
          <a
            key={key}
            href={href}
            className={`social-btn social-btn--${key}`}
            title={label}
            aria-label={label}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            tabIndex={isVisible ? 0 : -1}
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
};

export default FloatingSocials;
