import React from 'react';
import { socials } from '../data/socials';
import './FloatingSocials.css';

const FloatingSocials = () => {
  return (
    <div className="floating-socials">
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
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
};

export default FloatingSocials;
