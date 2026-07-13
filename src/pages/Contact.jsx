import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'residential',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert(t('contact.alert'));
    setFormData({
      name: '',
      email: '',
      projectType: 'residential',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-overlay"></div>
        <AnimatedSection className="container text-center contact-hero-content" yOffset={30}>
          <h1>{t('contact.hero_title')}</h1>
          <p>{t('contact.hero_desc')}</p>
        </AnimatedSection>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="contact-grid grid grid-cols-2">
            <AnimatedSection className="contact-info" delay={0.1}>
              <h2>{t('contact.info_title')}</h2>
              <p className="contact-subtitle">
                {t('contact.info_subtitle')}
              </p>
              
              <div className="info-block mt-md">
                <h3>📍 {t('contact.office')}</h3>
                <p>Jl. Sekar Tunjung XV No. 1A, Denpasar, Bali, Indonesia. 80237</p>
              </div>
              
              <div className="info-block">
                <h3>📞 {t('contact.phone')}</h3>
                <p>+62 851-8461-1918</p>
                <Button 
                  href="https://wa.me/6285184611918" 
                  target="_blank" 
                  className="whatsapp-btn mt-sm"
                >
                  {t('contact.btn_wa')}
                </Button>
              </div>
              
              <div className="info-block">
                <h3>✉️ {t('contact.email')}</h3>
                <p>project.kriyakayunusantara@gmail.com</p>
              </div>

              <div className="info-block social-block">
                <h3>{t('contact.follow')}</h3>
                <div className="social-links">
                  <a href="#">Instagram</a>
                  <a href="#">TikTok</a>
                  <a href="#">LinkedIn</a>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="contact-form-container" delay={0.3}>
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2>{t('contact.form_title')}</h2>
                <div className="form-group">
                  <label htmlFor="name">{t('contact.lbl_name')}</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    placeholder={t('contact.plc_name')}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">{t('contact.lbl_email')}</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="projectType">{t('contact.lbl_type')}</label>
                  <select 
                    id="projectType" 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                  >
                    <option value="residential">{t('contact.opt_res')}</option>
                    <option value="hospitality">{t('contact.opt_hos')}</option>
                    <option value="villa">{t('contact.opt_vil')}</option>
                    <option value="restaurant">{t('contact.opt_rest')}</option>
                    <option value="other">{t('contact.opt_other')}</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">{t('contact.lbl_msg')}</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.plc_msg')}
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full">{t('contact.btn_submit')}</Button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
