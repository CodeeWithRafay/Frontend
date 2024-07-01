import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import logo from '@/image/logo.png';
import Head from 'next/head';
import { Client, Databases, Query } from "appwrite";
import InfiniteScroll from "react-infinite-scroll-component";

const Blog = () =>
{
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState(null);

  const collectionId = '65e6a2957e9c71c0db5c';
  const limit = 10;

  const getMorePost = async () =>
  {
    try {
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


      const newBlogs = response.documents;

      setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);

      if (newBlogs.length > 0) {
        setCursor(newBlogs[newBlogs.length - 1].$id);
      }

      if (newBlogs.length < limit) {
        setHasMore(false);
      }

      setLoading(false);
    } catch (error) {

    }
  };

  useEffect(() =>
  {
    getMorePost();
  }, []);

  return (
    <>
      <Head>
        <title>Blog | CodeWithRafay</title>
        <meta name="description" content="Read the latest blog posts from CodeWithRafay on web development, coding, and the latest technologies. Stay updated with our informative articles." />
        <link rel="canonical" href="https://codewithrafay.com/blog" />
      </Head>

      {loading ? (
        <Spinner />
      ) : (
        <section className='bg-gray-100 min-h-screen dark:bg-gray-900'>
          <div className="pt-8 mb-4 p-6 lg:w-10/12 mx-auto">
            <h2 className='capitalize text-3xl sm:text-3xl mx-4 ml-10 text-black font-semibold md:text-left md:text-4xl dark:text-gray-200'>Coding Articles</h2>

            <InfiniteScroll
              dataLength={blogs.length}
              next={getMorePost}
              hasMore={hasMore}
              loader={<div className='flex justify-center my-4 font-bold'><svg aria-hidden="true" className="overflow-hidden text-center w-8 h-8 font-bold text-purple-200 animate-spin dark:text-purple-200 fill-purple-700 dark:bg-slate-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg></div>}
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
      )}
    </>
  );
};

export default Blog;
