import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', onClick, className = '', href, target }) => {
  const baseClass = `btn btn-${variant} ${className}`;
  
  if (href) {
    return (
      <a href={href} target={target} className={baseClass} rel={target === '_blank' ? 'noopener noreferrer' : ''}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClass}>
      {children}
    </button>
  );
};

export default Button;
