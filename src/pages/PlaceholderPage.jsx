import React from 'react';

const PlaceholderPage = ({ title }) => {
  return (
    <div className="section text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 className="section-title">{title}</h1>
      <p className="section-subtitle">Halaman ini sedang dalam tahap pengembangan.</p>
    </div>
  );
};

export default PlaceholderPage;
