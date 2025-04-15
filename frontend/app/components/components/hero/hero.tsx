import React from 'react';
import Image from 'next/image';
import styles from './hero.module.scss';

interface HeroProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, imageSrc, imageAlt }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.leftSection}>
          <div className={styles.cubeContainer}>
            <div className={styles.square1}>
              <div className={styles.textContent}>
                <h1 className={styles.title}>{title}</h1>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
              </div>
            </div>
            <div className={styles.square2}></div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.imageContainer}>
            <div className={styles.rectangle1}></div>
            <div className={styles.rectangle2}>
              <Image 
                src={imageSrc} 
                alt={imageAlt} 
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
