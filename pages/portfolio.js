import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Fetching } from './api/fetching';
import Head from 'next/head';
import { toast } from 'react-toastify';

const Work = ({ mappedDocuments }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Head>
        <title>Our Work | CodeWithRafay</title>
        <meta name="description" content="Explore the portfolio of CodeWithRafay. See our past projects and the quality of work we deliver in web development, CMS, e-commerce, and more." />
        <link rel="canonical" href="https://www.codewithrafay.com/work" />
        <meta name="keywords" content="web development portfolio, client projects, case studies, CodeWithRafay work"></meta>
      </Head>

      <div className='min-h-screen'>
        <div className='my-1'>
          <div className="pt-8 w-full container mx-auto flex justify-center items-center flex-col mb-8">
            <h2 className='capitalize text-3xl text-center text-purple-700 font-semibold dark:text-purple-400'>Our Portfolio</h2>
            <div className='courses-grid w-full grid grid-cols-3 justify-items-center items-center mt-8 gap-12 mb-12'>
              {
               mappedDocuments?.map((item) => (
                <div key={item.ProjectTitle} className='dark:bg-slate-800 dark:shadow-black dark:shadow-sm w-96 bg-white shadow-lg shadow-gray-300 rounded-2xl text-md h-auto'>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="absolute inset-0 w-full h-full border-t-2 dark:border-none"
                    src={item.ProjectImage}
                    style={{ borderRadius: "1rem 1rem 0 0" }}
                    alt="Project Image"
                  />
                </div>
                
                <div className='px-6 pt-4 pb-2'>
                  <span className='uppercase font-medium text-xs tracking-widest dark:text-gray-400'>{item.ProjectType}</span>
                  <h3 className='font-medium text-lg overflow-hidden overflow-ellipsis whitespace-nowrap dark:text-white'>{item.ProjectTitle}</h3>
                  <p className={`mt-3 ${isExpanded ? 'h-auto' : 'h-32'} dark:text-gray-400 transition-all`} onClick={() => setIsExpanded(!isExpanded)}>
                    {item.ProjectDesc}
                  </p>
                  
                  {/* Image Carousel */}
                  {item.ProjectImages && item.ProjectImages.length > 1 && (
                    <div className="relative mt-4">
                      <div className="flex overflow-x-auto space-x-2 py-2">
                        {item.ProjectImages.map((img, index) => (
                          <div key={index} className="relative w-24 h-24 overflow-hidden rounded-lg cursor-pointer">
                            <Image
                              fill
                              className="object-cover"
                              src={img}
                              alt={`Gallery Image ${index + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Project Details */}
                  <div className='mt-6'>
                    <a href={item.LinkToProject} target='_blank' aria-label="Project Preview">
                      <button type="button" className="text-white bg-purple-700 hover:bg-purple-600 font-semibold rounded-full text-sm px-4 py-2.5 text-center mb-2 dark:bg-purple-700 dark:hover:bg-purple-600 transition-all">Live Preview</button>
                    </a>
                  </div>
                </div>
              </div>
              ))
              
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Work;

export async function getStaticProps(context) {
  let mappedDocuments = [];

  try {
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_PORTFOLIO_COLLECTION_ID;
    const documents = await Fetching(collectionId);
    mappedDocuments = documents.documents.map((document) => document);
  } catch (error) {
    toast.error("Something Went Wrong!, Please come back after some time");
  }

  return {
    props: {
      mappedDocuments,
    },
    revalidate: 172800,
  };
}
