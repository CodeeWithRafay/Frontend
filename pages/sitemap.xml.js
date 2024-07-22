import { Fetching } from '@/pages/api/fetching';

const generateBlogURLs = (blogs) => {
  let urls = '';

  blogs.forEach((blog) => {
    urls += `
      <url>
        <loc>https://www.codewithrafay.com/blogpost/${blog.slug}/</loc>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>`;
  });

  return urls;
};

const generateVideoURLs = (videos) => {
  let urls = '';

  videos.forEach((video) => {
    urls += `
      <url>
        <loc>https://www.codewithrafay.com/videos/${video.slug}/</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>`;
  });

  return urls;
};

const generateOtherURLs = () => {
  const otherPages = [
    { url: 'https://www.codewithrafay.com/', changefreq: 'monthly', priority: '1.0' },
    { url: 'https://www.codewithrafay.com/services/', changefreq: 'monthly', priority: '1.0' },
    { url: 'https://www.codewithrafay.com/work/', changefreq: 'monthly', priority: '1.0' },
    { url: 'https://www.codewithrafay.com/contact/', changefreq: 'monthly', priority: '1.0' },
    { url: 'https://www.codewithrafay.com/blog/', changefreq: 'monthly', priority: '1.0' },
    { url: 'https://www.codewithrafay.com/tools/', changefreq: 'monthly', priority: '1.0' },
    { url: 'https://www.codewithrafay.com/hire/', changefreq: 'monthly', priority: '1.0' },
    { url: 'https://www.codewithrafay.com/login/', changefreq: 'monthly', priority: '1.0' },
    { url: 'https://www.codewithrafay.com/signup/', changefreq: 'monthly', priority: '1.0' },
    { url: 'https://www.codewithrafay.com/privacy/', changefreq: 'monthly', priority: '1.0' },
    { url: 'https://www.codewithrafay.com/terms/', changefreq: 'monthly', priority: '1.0' },
    { url: 'https://www.codewithrafay.com/videos/', changefreq: 'monthly', priority: '1.0' },
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

export async function getServerSideProps({ res }) {
  try {
    const blogCollectionId = process.env.NEXT_PUBLIC_APPWRITE_BLOG_COLLECTION_ID; 

    const videoCollectionId = process.env.NEXT_PUBLIC_APPWRITE_VIDEOS_COLLECTION_ID;

    const blogDocuments = await Fetching(blogCollectionId);
    const videoDocuments = await Fetching(videoCollectionId);

    const mappedBlogDocuments = blogDocuments.documents.map((document) => ({ slug: document.slug }));
    const mappedVideoDocuments = videoDocuments.documents.map((document) => ({ slug: document.VideoSlug }));

    const blogURLs = generateBlogURLs(mappedBlogDocuments);
    const videoURLs = generateVideoURLs(mappedVideoDocuments);
    const otherURLs = generateOtherURLs();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${blogURLs}
        ${videoURLs}
        ${otherURLs}
      </urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.write(xml);
    res.end();
  } catch (error) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(500).end('Internal Server Error');
  }

  return {
    props: {},
  };
}

export default function SitemapXML() {
  return null;
}
