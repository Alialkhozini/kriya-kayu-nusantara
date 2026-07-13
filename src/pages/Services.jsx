import React from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';
import './Services.css';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: "📐",
      title: t('services.s1_title'),
      description: t('services.s1_desc')
    },
    {
      icon: "✍️",
      title: t('services.s2_title'),
      description: t('services.s2_desc')
    },
    {
      icon: "🪵",
      title: t('services.s3_title'),
      description: t('services.s3_desc')
    },
    {
      icon: "🔨",
      title: t('services.s4_title'),
      description: t('services.s4_desc')
    },
    {
      icon: "🎨",
      title: t('services.s5_title'),
      description: t('services.s5_desc')
    },
    {
      icon: "🚚",
      title: t('services.s6_title'),
      description: t('services.s6_desc')
    }
  ];

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="services-hero-overlay"></div>
        <AnimatedSection className="container text-center services-hero-content" yOffset={30}>
          <h1>{t('services.hero_title')}</h1>
          <p>{t('services.hero_desc')}</p>
        </AnimatedSection>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="services-grid grid grid-cols-3">
            {services.map((service, index) => (
              <AnimatedSection key={index} className="service-card" delay={0.1 * index} yOffset={20}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-dark text-light text-center cta-section">
        <AnimatedSection className="container" yOffset={30}>
          <h2>{t('services.cta_title')}</h2>
          <p className="max-w-2xl mx-auto mt-sm mb-md text-secondary" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            {t('services.cta_desc')}
          </p>
          <Button href="/contact" variant="secondary">{t('services.cta_btn')}</Button>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default Services;
