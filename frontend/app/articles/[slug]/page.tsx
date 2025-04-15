"use client";
import { remark } from 'remark';
import html from 'remark-html';
import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import styles from '../../styles/article-page.module.scss';

// Example articles with Markdown content
const articles = [
  {
    id: 1,
    title: 'Building Modern Web Applications with NextJS',
    excerpt: 'Explore the benefits of server-side rendering and static site generation in modern web development.',
    slug: 'building-modern-web-applications',
    content: `# Building Modern Web Applications with NextJS

## Introduction

Next.js is a React framework that enables several exciting features.
    `
  },
  // ...other articles with Markdown content
];

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find(article => article.slug === params.slug);
  
  if (!article) {
    notFound();
  }

  const [contentHtml, setContentHtml] = useState('');

  useEffect(() => {
    async function processMarkdown() {
      const processedContent = await remark()
        .use(html)
        .process(article.content);
      setContentHtml(processedContent.toString());
    }
    processMarkdown();
  }, [article.content]);

  return (
    <div className={styles.page}>
      <article className={styles.article}>
        <h1 className={styles.articleTitle}>{article.title}</h1>
        <p className={styles.articleExcerpt}>{article.excerpt}</p>
        <div >
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </article>
    </div>
  );
}
