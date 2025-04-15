"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import GlassCard from './components/ui/glass-card/glass-card';
import Hero from './components/components/hero/hero';
import TechStack from './components/components/tech-stack/tech-stack';
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Services from './components/components/services/services';
import Contact from './components/components/contact/contact';

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero 
        title="Full Stack Developer"
        subtitle="Frontend Developer & UI/UX Enthusiast"
        imageSrc="/images/LinkedinPedro-removebg-preview.png"
        imageAlt="Portfolio hero image"
      />
      {/* About Me Section */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutContent}>
            <h2 className={styles.aboutTitle}>About Me</h2>
            <p className={styles.aboutText}>
              I'm a passionate Full Stack Developer with expertise in modern web technologies.
              I specialize in creating beautiful, responsive, and user-friendly applications
              that provide exceptional user experiences.
            </p>
            <p className={styles.aboutText}>
              With a strong foundation in both frontend and backend development,
              I bring ideas to life through clean code and innovative solutions.
            </p>
          </div>
          <div className={styles.aboutAnimation}>
            <DotLottieReact
              src="/images/Animation - 1744220659583.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      </section>
      <TechStack />
      <Services />
      <Contact />
    </div>
  );
}
