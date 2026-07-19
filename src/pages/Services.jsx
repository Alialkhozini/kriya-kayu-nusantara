import React from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';
import {
  IconConsult,
  IconDrawing,
  IconMaterial,
  IconManufacture,
  IconFinishing,
  IconDelivery
} from '../components/Icons';
import './Services.css';

const Services = () => {
  const { t } = useTranslation();

  // The six services read as one continuous journey, from first conversation
  // to installed furniture — so they are laid out as stages, not as a grid.
  const stages = [
    { Icon: IconConsult, title: t('services.s1_title'), description: t('services.s1_desc') },
    { Icon: IconDrawing, title: t('services.s2_title'), description: t('services.s2_desc') },
    { Icon: IconMaterial, title: t('services.s3_title'), description: t('services.s3_desc') },
    { Icon: IconManufacture, title: t('services.s4_title'), description: t('services.s4_desc') },
    { Icon: IconFinishing, title: t('services.s5_title'), description: t('services.s5_desc') },
    { Icon: IconDelivery, title: t('services.s6_title'), description: t('services.s6_desc') }
  ];

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="services-hero-overlay"></div>
        <AnimatedSection className="container text-center services-hero-content" yOffset={30}>
          <span className="services-hero-eyebrow">{t('services.eyebrow')}</span>
          <h1>{t('services.hero_title')}</h1>
          <p>{t('services.hero_desc')}</p>
        </AnimatedSection>
      </section>

      {/* Editorial intro */}
      <section className="section bg-white services-intro-section">
        <div className="container services-intro">
          <AnimatedSection className="services-intro-lead" delay={0.1}>
            <h2>{t('services.intro_title')}</h2>
          </AnimatedSection>
          <AnimatedSection className="services-intro-body" delay={0.25}>
            <p>{t('services.intro_desc')}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* The journey */}
      <section className="section bg-light">
        <div className="container">
          <div className="services-journey">
            {stages.map(({ Icon, title, description }, index) => (
              <AnimatedSection
                key={title}
                className={`journey-stage ${index % 2 === 0 ? 'is-left' : 'is-right'}`}
                delay={0.08 * index}
                yOffset={30}
              >
                <div className="journey-marker" aria-hidden="true">
                  <Icon />
                </div>
                <div className="journey-card">
                  <span className="journey-step">
                    {t('services.stage')} {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-dark text-light text-center cta-section">
        <AnimatedSection className="container" yOffset={30}>
          <h2 className="text-light">{t('services.cta_title')}</h2>
          <p className="text-light services-cta-desc">{t('services.cta_desc')}</p>
          <Button href="/contact" variant="secondary">{t('services.cta_btn')}</Button>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default Services;
