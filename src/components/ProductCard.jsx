import React from 'react';
import './ProductCard.css';

const ProductCard = ({ title, category, image, description }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" loading="lazy" />
        <div className="product-overlay">
          <span className="product-category">{category}</span>
        </div>
      </div>
      <div className="product-info">
        <h4 className="product-title">{title}</h4>
        {description && <p className="product-description">{description}</p>}
      </div>
    </div>
  );
};

export default ProductCard;
