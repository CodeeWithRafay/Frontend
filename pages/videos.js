import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Fetching } from './api/fetching';
import Spinner from '@/components/Spinner';
import Head from 'next/head';


const Videos = ({ mappedDocuments }) =>
{
  const [courses, setCourses] = useState(mappedDocuments);

  return (
    <>
     <Head>
        <title>Courses | CodeWithRafay</title>
        <meta name="description" content="Confused on which course to take? I have got you covered. Explore our best premium web development courses. It's free." />
        <link rel="canonical" href="https://www.codewithrafay.com/work" />
        <meta name="keywords" content="web development courses, premium courses, web development , CodeWithRafay courses"></meta>
      </Head>
      {
        (
        <div className='min-h-screen'><div className="pt-8 w-full container mx-auto flex justify-center items-center flex-col mb-8">
        <h2 className='capitalize text-3xl text-center text-purple-700 font-semibold dark:text-purple-400'>Premium Courses</h2>
        <div className='courses-grid w-full grid grid-cols-3 justify-items-center items-center mt-8 gap-6' >
          {
            courses.map((item) => (
              <div key={item.$id} className='w-96 bg-white shadow-lg shadow-gray-300 rounded-2xl text-md dark:bg-slate-800 dark:shadow-black dark:shadow-sm' style={{ height: "100%" }}>
                <div className='relative h-48 w-full overflow-hidden'>
                  <Image
                    className="absolute inset-0 w-full h-full border-t-2 dark:border-none"
                    src={`${item['Course-Image']}`}
                    alt='img codewithrafay course-image'
                    layout="responsive"
                    width={100}
                    height={100}
                    style={{ borderRadius: "1rem 1rem 0 0" }}
                 
                  />
                </div>
                <div className='px-6 pt-4 pb-2'>
                  <span className='uppercase font-medium text-xs tracking-widest dark:text-gray-400'>FREE COURSE</span>
                  <h3 className='font-medium text-lg overflow-hidden overflow-ellipsis whitespace-nowrap dark:text-white'>{item['Course-Title']}</h3>
                  <p className='mt-3 h-32 dark:text-gray-400'>{item['Course-Description']}</p>
                  <div className='mt-6'>
                    <Link href={`/videos/${item.AllVideosSlug[0]}`}>
                      <button
                        type="button"
                        className="text-white bg-purple-700 focus:outline-none focus:ring-purple-300 font-semibold rounded-full text-sm px-4 py-2.5 text-center mb-2"
                      >
                        Start Watching
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

            ))
          }

        </div>
      </div>
      </div>
      )}
    </>
  )
}

export default Videos;


export async function getStaticProps(context) {
  let mappedDocuments = [];

  try {
    const collectionId = '66836b64001276075376';
    const documents = await Fetching(collectionId);
    mappedDocuments = documents.documents.map((document) => document);
  } catch (error) {
    toast.error("Something Went Wrong!, Please come back after some time");
  }

  return {
    props: {
      mappedDocuments,
    },
    revalidate: 86400,
  };
}
