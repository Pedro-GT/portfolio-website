import React from 'react';
import Image from 'next/image';
import GlassCard from '../../ui/glass-card/glass-card';
import styles from './tech-stack.module.scss';

// You can add more languages as needed
const techStack = [
  {
    name: 'JavaScript',
    logo: '/images/tech/js.svg',
  },
  {
    name: 'Html',
    logo: '/images/tech/html.svg',
  },
  {
    name: 'python',
    logo: '/images/tech/python.svg',
  },
  {
    name: 'React',
    logo: '/images/tech/react.svg',
  },
  {
    name: 'Php',
    logo: '/images/tech/php.svg',
  },
  {
    name: 'Wordpress',
    logo: '/images/tech/wordpress.svg',
  },

  {
    name: 'Css',
    logo: '/images/tech/css.svg',
  },
  {
    name: 'Java',
    logo: '/images/tech/java.svg',
  },
  {
    name: 'Git',
    logo: '/images/tech/git.svg',
  },
  {
    name: 'Docker',
    logo: '/images/tech/docker.svg',
  },
  // Add more languages as needed
];

const TechStack = () => {
  return (
    <div className={styles.techStackContainer}>
      <div className={styles.backgroundPattern} />
      <GlassCard className={styles.techStackCard}>
        <h2 className={styles.title}>Tech Stack</h2>
        <div className={styles.logoGrid}>
          {techStack.map((tech) => (
            <div key={tech.name} className={styles.logoItem}>
             
                <Image
                  src={tech.logo}
                  alt={`${tech.name} logo`}
                  width={60}
                  height={60}
                  className={styles.logo}
                />
              
              <span className={styles.techName}>{tech.name}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default TechStack; 