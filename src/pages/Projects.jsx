import React from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import './Projects.css';

const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: t('projects.p1_title'),
      client: t('projects.p1_client'),
      location: t('projects.p1_loc'),
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200",
      description: t('projects.p1_desc')
    },
    {
      title: t('projects.p2_title'),
      client: t('projects.p2_client'),
      location: t('projects.p2_loc'),
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200",
      description: t('projects.p2_desc')
    },
    {
      title: t('projects.p3_title'),
      client: t('projects.p3_client'),
      location: t('projects.p3_loc'),
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09c15468?q=80&w=1200",
      description: t('projects.p3_desc')
    },
    {
      title: t('projects.p4_title'),
      client: t('projects.p4_client'),
      location: t('projects.p4_loc'),
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200",
      description: t('projects.p4_desc')
    }
  ];

  return (
    <div className="projects-page">
      <section className="projects-hero">
        <div className="projects-hero-overlay"></div>
        <AnimatedSection className="container text-center projects-hero-content" yOffset={30}>
          <h1>{t('projects.hero_title')}</h1>
          <p>{t('projects.hero_desc')}</p>
        </AnimatedSection>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="projects-list">
            {projects.map((project, index) => (
              <AnimatedSection key={index} className="project-item" delay={0.1} yOffset={40}>
                <div className="project-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                </div>
                <div className="project-info">
                  <span className="project-category">{project.client}</span>
                  <h2>{project.title}</h2>
                  <div className="project-meta">
                    <span>📍 {project.location}</span>
                  </div>
                  <p>{project.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
