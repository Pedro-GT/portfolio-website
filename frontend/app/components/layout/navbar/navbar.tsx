"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './navbar.module.scss';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Articles', href: '/articles' },
  { label: 'Contact', href: '/#contact' },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/">
            <span>Portfolio</span>
          </Link>
        </div>
        
        <div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={styles.navLink}
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        <button 
          className={`${styles.menuButton} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
