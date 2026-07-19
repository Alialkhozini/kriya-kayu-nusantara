import React from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';
import './About.css';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <AnimatedSection className="container about-hero-content" yOffset={30}>
          <h1>{t('about.hero_title')}</h1>
          <p>{t('about.hero_desc')}</p>
        </AnimatedSection>
      </section>

      {/* Company Story */}
      <section className="section bg-white">
        <div className="container grid grid-cols-2">
          <AnimatedSection className="about-story-text" delay={0.1}>
            <h2 className="section-title">{t('about.legacy_title')}</h2>
            <p>{t('about.legacy_p1')}</p>
            <p>{t('about.legacy_p2')}</p>
          </AnimatedSection>
          <AnimatedSection className="about-story-image" delay={0.3}>
            <img src="/img/joinery-detail.jpg" alt="Woodworking tools" loading="lazy" />
          </AnimatedSection>
        </div>
      </section>

      {/* Workshop Capability */}
      <section className="section bg-light">
        <div className="container">
          <AnimatedSection className="section-header text-center" yOffset={30}>
            <h2 className="section-title">{t('about.workshop_title')}</h2>
            <p className="section-subtitle max-w-3xl mx-auto">{t('about.workshop_subtitle')}</p>
          </AnimatedSection>
          
          <div className="workshop-grid grid grid-cols-3 mt-lg">
            <AnimatedSection className="workshop-card" delay={0.1}>
              <div className="workshop-img-wrapper">
                <img src="/img/workshop-weaving.jpg" alt="Craftsmen at work" loading="lazy" />
              </div>
              <div className="workshop-content">
                <h3>{t('about.w1_title')}</h3>
                <p>{t('about.w1_desc')}</p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection className="workshop-card" delay={0.2}>
              <div className="workshop-img-wrapper">
                <img src="/img/workshop-frames.jpg" alt="Production process" loading="lazy" />
              </div>
              <div className="workshop-content">
                <h3>{t('about.w2_title')}</h3>
                <p>{t('about.w2_desc')}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection className="workshop-card" delay={0.3}>
              <div className="workshop-img-wrapper">
                <img src="/img/workshop-sanding.jpg" alt="Premium Teak" loading="lazy" />
              </div>
              <div className="workshop-content">
                <h3>{t('about.w3_title')}</h3>
                <p>{t('about.w3_desc')}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-dark text-light">
        <div className="container text-center">
          <AnimatedSection yOffset={30}>
            <h2 className="section-title text-light">{t('about.why_title')}</h2>
            <p className="section-subtitle max-w-3xl mx-auto">{t('about.why_subtitle')}</p>
          </AnimatedSection>
          
          <div className="why-choose-grid grid grid-cols-4 mt-lg text-left">
            <AnimatedSection className="why-choose-item" delay={0.1}>
              <h3 className="why-choose-title">{t('about.why1_title')}</h3>
              <p>{t('about.why1_desc')}</p>
            </AnimatedSection>
            <AnimatedSection className="why-choose-item" delay={0.2}>
              <h3 className="why-choose-title">{t('about.why2_title')}</h3>
              <p>{t('about.why2_desc')}</p>
            </AnimatedSection>
            <AnimatedSection className="why-choose-item" delay={0.3}>
              <h3 className="why-choose-title">{t('about.why3_title')}</h3>
              <p>{t('about.why3_desc')}</p>
            </AnimatedSection>
            <AnimatedSection className="why-choose-item" delay={0.4}>
              <h3 className="why-choose-title">{t('about.why4_title')}</h3>
              <p>{t('about.why4_desc')}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="section bg-white text-center">
        <AnimatedSection className="container" yOffset={20}>
          <h2>{t('about.cta_title')}</h2>
          <p className="mt-sm mb-md">{t('about.cta_desc')}</p>
          <Button href="/contact">{t('about.cta_btn')}</Button>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default About;
