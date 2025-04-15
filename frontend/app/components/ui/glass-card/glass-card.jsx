import React from 'react';
import styles from './glass-card.module.scss';

const GlassCard = ({ children, className }) => {
  return (
    <div className={`${styles.glassCard} ${className || ''}`}>
      {children}
    </div>
  );
};

export default GlassCard;
