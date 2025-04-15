import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import GlassCard from '../../ui/glass-card/glass-card';
import styles from './contact.module.scss';

const Contact = () => {
  // Social media links - replace with your actual links
  const socialMedia = [
    {
      name: 'GitHub',
      icon: '📦',
      url: 'https://github.com/yourusername',
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: 'https://linkedin.com/in/yourusername',
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: 'https://twitter.com/yourusername',
    },
    {
      name: 'Instagram',
      icon: '📸',
      url: 'https://instagram.com/yourusername',
    },
  ];

  // Contact information - replace with your actual information
  const contactInfo = {
    email: 'your.email@example.com',
    phone: '+1 (123) 456-7890',
    location: 'City, Country',
  };

  return (
    <section className={styles.contactSection}>
      <h2 className={styles.sectionTitle}>Contact Me</h2>
      
      <div className={styles.contactContainer}>
        <div className={styles.contactInfo}>
          <GlassCard className={styles.contactCard}>
            <h3 className={styles.contactTitle}>Get In Touch</h3>
            
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📧</span>
              <a href={`mailto:${contactInfo.email}`} className={styles.infoText}>
                {contactInfo.email}
              </a>
            </div>
            
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📱</span>
              <a href={`tel:${contactInfo.phone}`} className={styles.infoText}>
                {contactInfo.phone}
              </a>
            </div>
            
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📍</span>
              <span className={styles.infoText}>{contactInfo.location}</span>
            </div>
            
            <div className={styles.socialMediaContainer}>
              <h4 className={styles.socialTitle}>Follow Me</h4>
              <div className={styles.socialLinks}>
                {socialMedia.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={`Visit my ${social.name} profile`}
                  >
                    <span className={styles.socialIcon}>{social.icon}</span>
                    <span className={styles.socialName}>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
        
        <div className={styles.contactAnimation}>
          <DotLottieReact
            src="/images/Animation - 1744312526108.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    </section>
  );
};

export default Contact; 