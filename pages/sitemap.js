import React, { useEffect, useState } from 'react';
import { Fetching } from '@/pages/api/fetching';

const generateBlogURLs = (blogs) => {
  let urls = '';

  blogs.forEach((blog) => {
    urls += `
      <url>
        <loc>https://www.codewithrafay.com/blogpost/${blog.slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>`;
  });

  return urls;
};

const generateOtherURLs = () => {
  const otherPages = [
    { url: 'https://www.codewithrafay.com/', changefreq: 'daily', priority: '1.0' },
    { url: 'https://www.codewithrafay.com/services', changefreq: 'weekly', priority: '1.0' },
    { url: 'https://www.codewithrafay.com/work', changefreq: 'daily', priority: '1.0' },
    { url: 'https://www.codewithrafay.com/contact', changefreq: 'monthly', priority: '0.8' },
    { url: 'https://www.codewithrafay.com/blog', changefreq: 'daily', priority: '1.0' },
    { url: 'https://www.codewithrafay.com/tools', changefreq: 'weekly', priority: '1.0' },
    { url: 'https://www.codewithrafay.com/hire', changefreq: 'monthly', priority: '0.8' },
    { url: 'https://www.codewithrafay.com/login', changefreq: 'monthly', priority: '0.8' },
    { url: 'https://www.codewithrafay.com/signup', changefreq: 'monthly', priority: '0.8' },
    { url: 'https://www.codewithrafay.com/privacy', changefreq: 'monthly', priority: '0.5' },
    { url: 'https://www.codewithrafay.com/terms', changefreq: 'monthly', priority: '0.5' },
  ];

  let urls = '';
  otherPages.forEach((page) => {
    urls += `
      <url>
        <loc>${page.url}</loc>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>`;
  });

  return urls;
};

const Sitemap = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const collectionId = '65e6a2957e9c71c0db5c';
        const documents = await Fetching(collectionId);
        const mappedDocuments = documents.documents.map((document) => ({ slug: document.slug }));
        setBlogs(mappedDocuments);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const blogURLs = generateBlogURLs(blogs);
  const otherURLs = generateOtherURLs();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${blogURLs}
      ${otherURLs}
    </urlset>`;

  return <pre>{xml}</pre>;
};

export default Sitemap;
