import React from 'react';
import ArticleCard from '../components/ui/article-card/article-card';
import styles from '../styles/article.module.scss';

// Example article data - in a real app, you'd fetch this from an API or CMS
const articles = [
  {
    id: 1,
    title: 'Building Modern Web Applications with NextJS',
    excerpt: 'Explore the benefits of server-side rendering and static site generation in modern web development.',
    slug: 'building-modern-web-applications'
  },
  {
    id: 2,
    title: 'The Power of CSS Modules',
    excerpt: 'Learn how CSS Modules can help you write more maintainable and scalable styles for your components.',
    slug: 'power-of-css-modules'
  },
  {
    id: 3,
    title: 'Responsive Design Best Practices',
    excerpt: 'Discover the latest techniques for creating websites that look great on any device.',
    slug: 'responsive-design-best-practices'
  },
  {
    id: 4,
    title: 'State Management in React Applications',
    excerpt: 'A comparison of different state management solutions for React applications.',
    slug: 'state-management-react'
  },
  {
    id: 5,
    title: 'Optimizing Web Performance',
    excerpt: 'Strategies to improve loading times and create faster user experiences.',
    slug: 'optimizing-web-performance'
  },
  {
    id: 6,
    title: 'Accessibility in Web Design',
    excerpt: 'Making your websites accessible to everyone is not just right but also good for business.',
    slug: 'accessibility-web-design'
  }
];

export default function ArticlesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.articlesSection}>
        <div className={styles.articlesContainer}>
          <h1 className={styles.articlesTitle}>Articles</h1>
          <p className={styles.articlesDescription}>
            Explore my thoughts, tutorials, and insights on web development and design.
          </p>
          
          <div className={styles.articlesGrid}>
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                excerpt={article.excerpt}
                slug={article.slug}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}