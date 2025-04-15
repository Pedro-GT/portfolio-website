"use client";
import { remark } from 'remark';
import html from 'remark-html';
import React, { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import styles from '../../styles/article-page.module.scss';
import { fetchPostBySlug } from '@/app/lib/api';

export default function ArticlePage({ params } : { params: { slug: string } }) {
  // Unwrap the params object using React.use()
  const slug = params.slug;
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [contentHtml, setContentHtml] = useState('');
  
  useEffect(() => {
    async function loadArticle() {
      try {
        const data = await fetchPostBySlug(slug);
        setArticle(data);
      } catch (error) {
        console.error('Error loading article:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadArticle();
  }, [slug]);
  
  useEffect(() => {
    if (article?.content) {
      async function processMarkdown() {
        const processedContent = await remark()
          .use(html)
          .process(article.content);
        setContentHtml(processedContent.toString());
      }
      processMarkdown();
    }
  }, [article]);
  
  if (loading) {
    return <div className={styles.page}>Loading...</div>;
  }
  
  if (!article) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <article className={styles.article}>
        <h1 className={styles.articleTitle}>{article.title}</h1>
        <p className={styles.articleExcerpt}>{article.excerpt}</p>
        <div className={styles.articleContent}>
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </article>
    </div>
  );
}