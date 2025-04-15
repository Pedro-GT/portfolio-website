import React from 'react';
import ArticleCard from '../components/ui/article-card/article-card';
import styles from '../styles/article.module.scss';
import { fetchPosts } from '../lib/api';

async function getArticles() {
  try {
    const response = await fetchPosts();
    
    // Check if response has a data property (common API structure)
    const articlesData = response.data || response;
    
    // Make sure we have an array to work with
    const articlesArray = Array.isArray(articlesData) ? articlesData : [];
    
    return articlesArray.map((article: any) => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      slug: article.slug,
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    return []; // Return empty array in case of error
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();
  
  return (
    <div className={styles.page}>
      <section className={styles.articlesSection}>
        <div className={styles.articlesContainer}>
          <h1 className={styles.articlesTitle}>Articles</h1>
          <p className={styles.articlesDescription}>
            Explore my thoughts, tutorials, and insights on web development and design.
          </p>
          <div className={styles.articlesGrid}>
            {articles.length > 0 ? (
              articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  slug={article.slug}
                />
              ))
            ) : (
              <p>No articles found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}