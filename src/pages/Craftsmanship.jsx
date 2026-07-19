import React from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import './Craftsmanship.css';

const Craftsmanship = () => {
  const { t } = useTranslation();

  const processes = [
    {
      title: t('craftsmanship.p1_title'),
      description: t('craftsmanship.p1_desc'),
      image: "/img/joinery-detail.jpg"
    },
    {
      title: t('craftsmanship.p2_title'),
      description: t('craftsmanship.p2_desc'),
      image: "/img/workshop-sanding.jpg"
    },
    {
      title: t('craftsmanship.p3_title'),
      description: t('craftsmanship.p3_desc'),
      image: "/img/workshop-daybed.jpg"
    },
    {
      title: t('craftsmanship.p4_title'),
      description: t('craftsmanship.p4_desc'),
      image: "/img/workshop-weaving.jpg"
    },
    {
      title: t('craftsmanship.p5_title'),
      description: t('craftsmanship.p5_desc'),
      image: "/img/rattan-cabinet-detail.jpg"
    }
  ];

  return (
    <div className="craftsmanship-page">
      <section className="craft-hero">
        <div className="craft-hero-overlay"></div>
        <AnimatedSection className="container craft-hero-content text-center">
          <h1>{t('craftsmanship.hero_title')}</h1>
          <p>{t('craftsmanship.hero_desc')}</p>
        </AnimatedSection>
      </section>

      <section className="section bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-xl">
            <h2 className="section-title">{t('craftsmanship.process_title')}</h2>
            <p className="section-subtitle">{t('craftsmanship.process_subtitle')}</p>
          </AnimatedSection>

          <div className="process-timeline">
            {processes.map((process, index) => (
              <div className={`process-row ${index % 2 !== 0 ? 'process-reverse' : ''}`} key={index}>
                <AnimatedSection 
                  className="process-image-col" 
                  delay={0.1} 
                  yOffset={30}
                >
                  <img src={process.image} alt={process.title} loading="lazy" />
                </AnimatedSection>
                <AnimatedSection 
                  className="process-text-col" 
                  delay={0.3}
                  yOffset={30}
                >
                  <h3>{process.title}</h3>
                  <p>{process.description}</p>
                </AnimatedSection>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section bg-light">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="section-title">{t('craftsmanship.quality_title')}</h2>
            <p className="max-w-3xl mx-auto text-secondary mt-sm" style={{ lineHeight: '1.8' }}>
              {t('craftsmanship.quality_desc')}
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Craftsmanship;
