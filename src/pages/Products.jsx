import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import ProductCard from '../components/ProductCard';
import { categories, products } from '../data/products';
import './Products.css';

const Products = () => {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="products-hero-overlay"></div>
        <AnimatedSection className="container text-center products-hero-content">
          <h1>{t('products.hero_title')}</h1>
          <p>{t('products.hero_desc')}</p>
        </AnimatedSection>
      </section>

      <section className="section bg-light">
        <div className="container">
          {/* Category Filter */}
          <AnimatedSection className="category-filter" yOffset={20}>
            {categories.map((category) => (
              <button 
                key={category.id} 
                className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(category.id)}
              >
                {i18n.language === 'id' ? category.labelId : category.label}
              </button>
            ))}
          </AnimatedSection>

          {/* Product Grid */}
          <div className="product-catalog-grid mt-lg">
            {filteredProducts.map((product, index) => {
              return (
                <AnimatedSection key={index} delay={0.1 * (index % 3)} yOffset={30}>
                  <ProductCard 
                    title={product.title}
                    category={product.subCategory}
                    image={product.image}
                    description={`${t('products.material') || 'Material'}: ${product.material}\n${product.desc}`}
                  />
                </AnimatedSection>
              );
            })}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center mt-lg text-secondary">
              <p>{t('products.empty')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
