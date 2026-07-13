import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2000",
      title: t('home.hero1_title'),
      subtitle: t('home.hero1_subtitle')
    },
    {
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000",
      title: t('home.hero2_title'),
      subtitle: t('home.hero2_subtitle')
    },
    {
      image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=2000",
      title: t('home.hero3_title'),
      subtitle: t('home.hero3_subtitle')
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section with Smooth Swiper Carousel and Animated Text */}
      <section className="hero-section">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          effect="fade"
          speed={1500}
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={true}
          className="hero-swiper"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div 
                  className="hero-slide-bg"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="hero-overlay"></div>
                  <div className="container hero-content">
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -40 }}
                          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        >
                          <h1 className="hero-title">{slide.title}</h1>
                          <p className="hero-subtitle">{slide.subtitle}</p>
                          <div className="hero-ctas">
                            <Button href="https://wa.me/6285184611918" target="_blank">{t('home.cta_discuss')}</Button>
                            <Button variant="outline" href="#catalog">{t('home.cta_explore')}</Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Brand Introduction */}
      <section className="section bg-light">
        <div className="container brand-intro grid grid-cols-2">
          <AnimatedSection className="brand-intro-text" delay={0.1}>
            <h2>{t('home.brand_title')}</h2>
            <p>{t('home.brand_p1')}</p>
            <p>{t('home.brand_p2')}</p>
            <Button variant="secondary" className="mt-md" href="/about">{t('home.brand_btn')}</Button>
          </AnimatedSection>
          <AnimatedSection className="brand-intro-image" delay={0.3}>
            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200" alt="Premium Teak Interior" loading="lazy" />
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us & Manufacturing Capability */}
      <section className="section bg-white">
        <div className="container">
          <AnimatedSection className="section-header text-center" yOffset={30}>
            <h2 className="section-title">{t('home.why_title')}</h2>
            <p className="section-subtitle max-w-3xl mx-auto">{t('home.why_subtitle')}</p>
          </AnimatedSection>
          <div className="features-grid grid grid-cols-4 mt-lg">
            <AnimatedSection className="feature-card" delay={0.1}>
              <div className="feature-icon">🌿</div>
              <h3>{t('home.f1_title')}</h3>
              <p>{t('home.f1_desc')}</p>
            </AnimatedSection>
            <AnimatedSection className="feature-card" delay={0.2}>
              <div className="feature-icon">🛠️</div>
              <h3>{t('home.f2_title')}</h3>
              <p>{t('home.f2_desc')}</p>
            </AnimatedSection>
            <AnimatedSection className="feature-card" delay={0.3}>
              <div className="feature-icon">👨‍🔧</div>
              <h3>{t('home.f3_title')}</h3>
              <p>{t('home.f3_desc')}</p>
            </AnimatedSection>
            <AnimatedSection className="feature-card" delay={0.4}>
              <div className="feature-icon">📦</div>
              <h3>{t('home.f4_title')}</h3>
              <p>{t('home.f4_desc')}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section id="catalog" className="section bg-light">
        <div className="container">
          <AnimatedSection className="section-header text-center" yOffset={30}>
            <h2 className="section-title">{t('home.col_title')}</h2>
            <p className="section-subtitle max-w-3xl mx-auto">{t('home.col_subtitle')}</p>
          </AnimatedSection>
          <div className="product-grid grid grid-cols-3 mt-lg">
            <AnimatedSection delay={0.1}>
              <ProductCard 
                title={t('home.c1_title')} 
                category={t('home.c1_cat')} 
                image="https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=800"
                description={t('home.c1_desc')}
              />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <ProductCard 
                title={t('home.c2_title')} 
                category={t('home.c2_cat')} 
                image="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=800"
                description={t('home.c2_desc')}
              />
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <ProductCard 
                title={t('home.c3_title')} 
                category={t('home.c3_cat')} 
                image="https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800"
                description={t('home.c3_desc')}
              />
            </AnimatedSection>
          </div>
          <AnimatedSection className="text-center mt-xl" yOffset={20}>
            <Button variant="secondary" href="/products">{t('home.col_btn')}</Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Craftsmanship Process */}
      <section className="section bg-dark text-light craftsmanship-section">
        <div className="container grid grid-cols-2">
          <AnimatedSection className="craftsmanship-image" delay={0.1}>
            <img src="https://images.unsplash.com/photo-1595514535415-8473c3cb4529?q=80&w=800" alt="Craftsmanship process" loading="lazy" />
          </AnimatedSection>
          <AnimatedSection className="craftsmanship-text" delay={0.3}>
            <h2 className="text-light">{t('home.craft_title')}</h2>
            <p className="text-light">{t('home.craft_desc')}</p>
            <ul className="craftsmanship-list text-light">
              <li>{t('home.craft_l1')}</li>
              <li>{t('home.craft_l2')}</li>
              <li>{t('home.craft_l3')}</li>
              <li>{t('home.craft_l4')}</li>
            </ul>
            <Button href="/craftsmanship">{t('home.craft_btn')}</Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Industries Served */}
      <section className="section bg-white text-center">
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">{t('home.ind_title')}</h2>
          </AnimatedSection>
          <div className="industries-grid grid grid-cols-4 mt-lg">
            <AnimatedSection className="industry-card" delay={0.1} yOffset={30}>
              <h4>{t('home.ind1')}</h4>
            </AnimatedSection>
            <AnimatedSection className="industry-card" delay={0.2} yOffset={30}>
              <h4>{t('home.ind2')}</h4>
            </AnimatedSection>
            <AnimatedSection className="industry-card" delay={0.3} yOffset={30}>
              <h4>{t('home.ind3')}</h4>
            </AnimatedSection>
            <AnimatedSection className="industry-card" delay={0.4} yOffset={30}>
              <h4>{t('home.ind4')}</h4>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Custom Order Process */}
      <section className="section bg-light">
        <div className="container">
          <AnimatedSection className="text-center mb-xl">
            <h2 className="section-title">{t('home.work_title')}</h2>
          </AnimatedSection>
          <div className="process-steps">
            {[t('home.w1'), t('home.w2'), t('home.w3'), t('home.w4'), t('home.w5')].map((step, index) => (
              <AnimatedSection key={index} className="process-step" delay={0.1 * index} yOffset={30}>
                <div className="step-number">{index + 1}</div>
                <h4>{step}</h4>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-primary text-center">
        <AnimatedSection className="container final-cta" yOffset={30}>
          <h2 className="text-light mb-sm">{t('home.final_title')}</h2>
          <p className="text-light mb-md">{t('home.final_desc')}</p>
          <Button href="https://wa.me/6285184611918" target="_blank" variant="secondary" className="bg-white" style={{ color: 'var(--c-primary-dark)' }}>
            {t('home.final_btn')}
          </Button>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default Home;
