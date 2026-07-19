import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';
import {
  IconTeak, IconCustom, IconCraftsmen, IconSupport,
  IconHotel, IconVilla, IconRestaurant, IconArchitect
} from '../components/Icons';
import { categories, products } from '../data/products';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './Home.css';

// Cover photograph for each catalogue collection, taken from the printed catalogue.
const COLLECTION_COVERS = {
  Restoran: '/img/restaurant-interior.jpg',
  KolamRenang: '/img/poolside-loungers.jpg',
  Lampu: '/img/living-room-lamps.jpg',
  InRoom: '/img/bedroom-detail.jpg'
};

const Home = () => {
  const { t, i18n } = useTranslation();

  const heroSlides = [
    {
      image: '/img/restaurant-interior.jpg',
      title: t('home.hero1_title'),
      subtitle: t('home.hero1_subtitle')
    },
    {
      image: '/img/rattan-lounge.jpg',
      title: t('home.hero2_title'),
      subtitle: t('home.hero2_subtitle')
    },
    {
      image: '/img/poolside-loungers.jpg',
      title: t('home.hero3_title'),
      subtitle: t('home.hero3_subtitle')
    }
  ];

  const collections = categories
    .filter((c) => c.id !== 'All')
    .map((c) => ({
      id: c.id,
      name: i18n.language === 'id' ? c.labelId : c.label,
      image: COLLECTION_COVERS[c.id],
      count: products.filter((p) => p.category === c.id).length
    }));

  const industries = [
    { Icon: IconHotel, name: t('home.ind1'), desc: t('home.ind1_desc') },
    { Icon: IconVilla, name: t('home.ind2'), desc: t('home.ind2_desc') },
    { Icon: IconRestaurant, name: t('home.ind3'), desc: t('home.ind3_desc') },
    { Icon: IconArchitect, name: t('home.ind4'), desc: t('home.ind4_desc') }
  ];

  const steps = [
    { title: t('home.w1'), desc: t('home.w1_desc') },
    { title: t('home.w2'), desc: t('home.w2_desc') },
    { title: t('home.w3'), desc: t('home.w3_desc') },
    { title: t('home.w4'), desc: t('home.w4_desc') },
    { title: t('home.w5'), desc: t('home.w5_desc') }
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
            <img src="/img/living-room-teak.jpg" alt="Premium Teak Interior" loading="lazy" />
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
            {[
              { Icon: IconTeak, title: t('home.f1_title'), desc: t('home.f1_desc') },
              { Icon: IconCustom, title: t('home.f2_title'), desc: t('home.f2_desc') },
              { Icon: IconCraftsmen, title: t('home.f3_title'), desc: t('home.f3_desc') },
              { Icon: IconSupport, title: t('home.f4_title'), desc: t('home.f4_desc') }
            ].map(({ Icon, title, desc }, index) => (
              <AnimatedSection key={title} className="feature-card" delay={0.1 * (index + 1)}>
                <div className="feature-icon"><Icon /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase — the four real catalogue collections */}
      <section id="catalog" className="section bg-light">
        <div className="container">
          <AnimatedSection className="section-header text-center" yOffset={30}>
            <h2 className="section-title">{t('home.col_title')}</h2>
            <p className="section-subtitle max-w-3xl mx-auto">{t('home.col_subtitle')}</p>
          </AnimatedSection>

          <div className="collection-tiles mt-lg">
            {collections.map((collection, index) => (
              <AnimatedSection key={collection.id} delay={0.1 * index} yOffset={30}>
                <Link to="/products" className="collection-tile">
                  <img src={collection.image} alt={collection.name} loading="lazy" />
                  <div className="collection-tile-overlay"></div>
                  <div className="collection-tile-body">
                    <span className="collection-tile-count">
                      {collection.count} {t('products.pieces')}
                    </span>
                    <h3>{collection.name}</h3>
                    <span className="collection-tile-link">{t('home.col_view')}</span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
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
            <img src="/img/workshop-weaving.jpg" alt="Craftsmanship process" loading="lazy" />
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
      <section className="section bg-white">
        <div className="container">
          <AnimatedSection className="text-center">
            <h2 className="section-title">{t('home.ind_title')}</h2>
            <p className="section-subtitle">{t('home.ind_subtitle')}</p>
          </AnimatedSection>
          <div className="industries-grid mt-lg">
            {industries.map(({ Icon, name, desc }, index) => (
              <AnimatedSection key={name} className="industry-card" delay={0.1 * (index + 1)} yOffset={30}>
                <div className="industry-icon"><Icon /></div>
                <div className="industry-body">
                  <h4>{name}</h4>
                  <p>{desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Order Process */}
      <section className="section bg-light">
        <div className="container">
          <AnimatedSection className="text-center">
            <h2 className="section-title">{t('home.work_title')}</h2>
            <p className="section-subtitle">{t('home.work_subtitle')}</p>
          </AnimatedSection>
          <div className="process-steps mt-lg">
            {steps.map((step, index) => (
              <AnimatedSection key={step.title} className="process-step" delay={0.1 * index} yOffset={30}>
                <div className="step-head">
                  <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="step-rule"></span>
                </div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
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
          <Button href="https://wa.me/6285184611918" target="_blank" variant="on-primary">
            {t('home.final_btn')}
          </Button>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default Home;
