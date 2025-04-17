// ZigZag.jsx
import React from 'react';
import styles from './ZigZag.module.scss';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  codeLink?: string;
  image?: string;
}

const ZigZag: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <section className={styles.zigzagSection}>
      {projects.map((project, index) => (
        <div 
          key={project.id} 
          className={`${styles.projectContainer} ${index % 2 === 0 ? styles.even : styles.odd}`}
        >
          <div className={styles.projectContent}>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectDescription}>{project.description}</p>
            
            <div className={styles.projectTech}>
              {project.technologies.map((tech) => (
                <span key={tech} className={styles.techTag}>{tech}</span>
              ))}
            </div>
            
            <div className={styles.projectLinks}>
              {project.demoLink && (
                <Link href={project.demoLink} className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                  View
                </Link>
              )}
              {project.codeLink && (
                <Link href={project.codeLink} className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                  View Code
                </Link>
              )}
            </div>
          </div>
          
          <div className={styles.projectVisual}>
            {project.image && (
              <div className={styles.imageWrapper}>
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 700px"
                  className={styles.projectImage}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ZigZag;