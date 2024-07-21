import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import logo from '@/image/logo.png';
import Head from 'next/head';
import { Client, Databases, Query } from "appwrite";
import InfiniteScroll from "react-infinite-scroll-component";
import ShortSpinner from '@/components/ShortSpinner';

const Blog = ({ initialBlogs }) => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState(initialBlogs);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState(null);

  const collectionId = '65e6a2957e9c71c0db5c';
  const limit = 10;

  const getMorePost = async () => {
    try {
      setLoading(true);

      const client = new Client();
      const databases = new Databases(client);

      client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('65e69a022811af019dca');

      const queries = [
        Query.limit(limit),
        Query.orderDesc('$createdAt'),
      ];

      if (cursor) {
        queries.push(Query.cursorAfter(cursor));
      }

      const response = await databases.listDocuments('65e6a28976615aa73abb', collectionId, queries);

      const newBlogs = response.documents.filter(doc => !initialBlogs.some(initialBlog => initialBlog.$id === doc.$id));

      setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);

      if (newBlogs.length > 0) {
        setCursor(newBlogs[newBlogs.length - 1].$id);
      }

      if (newBlogs.length < limit) {
        setHasMore(false);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
        return;
      }
      if (hasMore) {
        getMorePost();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <>
      <Head>
        <title>Blog | CodeWithRafay</title>
        <meta name="description" content="Read the latest blog posts from CodeWithRafay on web development, coding, and the latest technologies. Stay updated with our informative articles." />
        <link rel="canonical" href="https://www.codewithrafay.com/blog" />
        <meta name="keywords" content="web development blog, coding tutorials, backend development, Next.js, React, CodeWithRafay blog"></meta>
      </Head>

      <section className='bg-gray-100 min-h-screen dark:bg-gray-900'>
        <div className="pt-8 mb-4 p-6 lg:w-10/12 mx-auto">
          <h2 className='capitalize text-3xl sm:text-3xl mx-4 ml-10  md:text-left md:text-4xl  font-semibold dark:text-white '>Coding Articles</h2>

          <InfiniteScroll
            dataLength={blogs.length}
            next={getMorePost}
            hasMore={hasMore}
            loader={<ShortSpinner />}
            endMessage={<h4 className='font-semibold text-center mt-4 text-pretty text-lg dark:text-gray-300'>You&apos;ve reached the End!</h4>}
          >
            {blogs.map((item) => (
              <div key={item.$id} className='mt-6 mx-auto'>
                <div className='px-8 py-6 rounded-lg bg-white shadow-md blog-container-item dark:bg-slate-700 border dark:border-gray-600' style={{ width: "65%" }}>
                  <h2 className='font-semibold text-3xl dark:text-white break-words'>{item.title}</h2>
                  <div className='flex mt-2 gap-1 items-center'>
                    <Image width={30} className='rounded-full' src={logo} alt='img CodeWithRafay' />
                    <h5 className='text-sm ml-1 dark:text-white text-gray-700'>Abdul Rafay</h5>
                    <span className='text-gray-700 font-bold text-sm dark:text-gray-400'>&middot;</span>
                    <span className='text-sm dark:text-gray-400'>{new Date(item.CreatedOn).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <p className='mt-3 text-lg dark:text-gray-400'>{item.Description}</p>
                  <Link href={`/blogpost/${item.slug}`}>
                    <button type="button" className="text-white mt-4 bg-purple-600 focus:outline-none focus:ring-purple-300 font-medium rounded-md text-md px-4 py-2 text-center">Read More</button>
                  </Link>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </section>
    </>
  );
};

export async function getStaticProps() {
  try {
    const client = new Client();
    const databases = new Databases(client);

    client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('65e69a022811af019dca');

    const response = await databases.listDocuments('65e6a28976615aa73abb', '65e6a2957e9c71c0db5c', [
      Query.limit(10),
      Query.orderDesc('$createdAt'),
    ]);

    const initialBlogs = response.documents;

    return {
      props: {
        initialBlogs,
      },
      revalidate: 86400, 
    };
  } catch (error) {
    return {
      props: {
        initialBlogs: [],
      },
    };
  }
}

export default Blog;
