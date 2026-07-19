import React from 'react';
import { useTranslation } from 'react-i18next';
import './CatalogCard.css';

const WA_NUMBER = '6285184611918';

/**
 * Catalog piece card — editorial furniture-catalogue style.
 * Deliberately price-free: the card sells the piece and routes to an inquiry.
 */
const CatalogCard = ({ title, subCategory, material, image, note, index }) => {
  const { t } = useTranslation();

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Halo Kriya Kayu Nusantara, saya tertarik dengan ${title} (${material}). Boleh minta informasi lebih lanjut?`
  )}`;

  return (
    <article className="catalog-card">
      <div className="catalog-card-media">
        <img src={image} alt={title} loading="lazy" />
        <span className="catalog-card-ref">
          {String(index + 1).padStart(3, '0')}
        </span>
        <a
          className="catalog-card-inquire"
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('products.inquire')}
        </a>
      </div>

      <div className="catalog-card-body">
        <span className="catalog-card-eyebrow">{subCategory}</span>
        <h3 className="catalog-card-title">{title}</h3>
        <dl className="catalog-card-specs">
          <div>
            <dt>{t('products.material')}</dt>
            <dd>{material}</dd>
          </div>
          <div>
            <dt>{t('products.dimension')}</dt>
            <dd>{note}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
};

export default CatalogCard;
