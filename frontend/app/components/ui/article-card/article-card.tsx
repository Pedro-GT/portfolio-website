import React from 'react';
import GlassCard from '../glass-card/glass-card';
import styles from './article-card.module.scss';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  slug: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, excerpt, slug }) => {
  return (
    <GlassCard className={styles.articleCard}>
      <div className={styles.articleContent}>
        <h3 className={styles.articleTitle}>{title}</h3>
        <p className={styles.articleExcerpt}>{excerpt}</p>
        <a href={`/articles/${slug}`} className={styles.readMoreLink}>
          Read more
        </a>
      </div>
    </GlassCard>
  );
};

export default ArticleCard;