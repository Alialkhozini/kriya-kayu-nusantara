import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';
import CatalogCard from '../components/CatalogCard';
import { categories, products } from '../data/products';
import './Products.css';

const Products = () => {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('All');

  const label = (category) => (i18n.language === 'id' ? category.labelId : category.label);

  // Collections shown, in catalogue order. "All" renders every collection
  // as its own chapter; a filter narrows it to a single chapter.
  const collections = useMemo(() => {
    const source = categories.filter((c) => c.id !== 'All');
    const visible = activeFilter === 'All' ? source : source.filter((c) => c.id === activeFilter);

    return visible
      .map((category) => ({
        ...category,
        items: products.filter((p) => p.category === category.id)
      }))
      .filter((category) => category.items.length > 0);
  }, [activeFilter]);

  const totalShown = collections.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="products-hero-overlay"></div>
        <AnimatedSection className="container text-center products-hero-content">
          <span className="products-hero-eyebrow">{t('products.eyebrow')}</span>
          <h1>{t('products.hero_title')}</h1>
          <p>{t('products.hero_desc')}</p>
        </AnimatedSection>
      </section>

      {/* Catalogue note — sets the no-price, made-to-order expectation up front */}
      <section className="catalog-note-bar">
        <div className="container catalog-note">
          <p>{t('products.catalog_note')}</p>
          <Button href="https://wa.me/6285184611918" target="_blank">
            {t('products.catalog_cta')}
          </Button>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          {/* Catalogue index */}
          <div className="category-filter-wrap">
            <AnimatedSection className="category-filter" yOffset={20}>
              {categories.map((category) => {
                const count =
                  category.id === 'All'
                    ? products.length
                    : products.filter((p) => p.category === category.id).length;

                return (
                  <button
                    key={category.id}
                    className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                    onClick={() => setActiveFilter(category.id)}
                  >
                    {label(category)}
                    <span className="filter-count">{count}</span>
                  </button>
                );
              })}
            </AnimatedSection>
          </div>

          {/* Collections */}
          {collections.map((collection, collectionIndex) => (
            <section key={collection.id} className="catalog-collection">
              <AnimatedSection className="collection-header" yOffset={20}>
                <span className="collection-index">
                  {String(collectionIndex + 1).padStart(2, '0')}
                </span>
                <h2 className="collection-title">{label(collection)}</h2>
                <span className="collection-count">
                  {collection.items.length} {t('products.pieces')}
                </span>
              </AnimatedSection>

              <div className="product-catalog-grid">
                {collection.items.map((product, index) => (
                  <AnimatedSection key={product.title} delay={0.08 * (index % 3)} yOffset={30}>
                    <CatalogCard
                      index={index}
                      title={product.title}
                      subCategory={product.subCategory}
                      material={product.material}
                      image={product.image}
                      note={t('products.custom_size')}
                    />
                  </AnimatedSection>
                ))}
              </div>
            </section>
          ))}

          {totalShown === 0 && (
            <div className="text-center mt-lg">
              <p>{t('products.empty')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section bg-dark text-light text-center">
        <AnimatedSection className="container" yOffset={30}>
          <h2 className="text-light">{t('products.cta_title')}</h2>
          <p className="text-light catalog-cta-desc">{t('products.cta_desc')}</p>
          <Button href="/contact" variant="secondary">{t('products.cta_btn')}</Button>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default Products;
