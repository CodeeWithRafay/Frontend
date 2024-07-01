
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Fetching } from './api/fetching';
import Spinner from '@/components/Spinner';
import Head from 'next/head';
import { toast } from 'react-toastify';

const Work = () =>
{
  const [loading, setLoading] = useState(true);
  const [Work, setWork] = useState([]);

  useEffect(() =>
  {
    const fetchWork = async () =>
    {
      try {
        const collectionId = '66594c42003b5b5332f7';
        const documents = await Fetching(collectionId);
        const mappedDocuments = documents.documents.map((document) => document);
        setWork(mappedDocuments);
        setLoading(false);
      } catch (error) {
        toast.error("Something Went Wrong!, Please come back after some time")
      }
    };

    fetchWork();
  }, []);



  return (
    <>
      <Head>
        <title>Our Work | CodeWithRafay</title>
        <meta name="description" content="Explore the portfolio of CodeWithRafay. See our past projects and the quality of work we deliver in web development, CMS, e-commerce, and more." />
        <link rel="canonical" href="https://codewithrafay.com/work" />
      </Head>

      <div className='min-h-screen'>
        <div className='my-1'>
          {loading ? (
            <Spinner />
          ) : (
            <div className="pt-8 w-full container mx-auto flex justify-center items-center flex-col mb-8">
              <h2 className='capitalize text-3xl  text-center text-purple-700 font-semibold dark:text-purple-400'>Our Latest Work</h2>
              <div className='courses-grid w-full grid grid-cols-3 justify-items-center items-center mt-8 gap-12 mb-12' >
                {
                  Work && Work.map((item) =>
                  {
                    return <div key={item.ProjectTitle} className='dark:bg-slate-800 dark:shadow-black dark:shadow-sm w-96 bg-white shadow-lg shadow-gray-300 rounded-2xl text-md h-96' style={{ height: "100%" }}>
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          width={100}
                          height={100}
                          layout="responsive"
                          className="absolute inset-0 w-full h-full border-t-2 dark:border-none"
                          src={`${item.ProjectImage}`}
                          style={{ borderRadius: "1rem 1rem 0 0" }}
                          alt="image project CodeWithRafay"
                        />
                      </div>
                      <div className='px-6 pt-4 pb-2'>
                        <span className='uppercase font-medium text-xs tracking-widest dark:text-gray-400'>{item.ProjectType}</span>
                        <h3 className='font-medium text-lg overflow-hidden overflow-ellipsis whitespace-nowrap dark:text-white'>{item.ProjectTitle}</h3>
                        <p className='mt-3 h-32 dark:text-gray-400'>{item.ProjectDesc}</p>
                        <div className='mt-6'>
                          <a href={item.LinkToProject} target='_blank' aria-label="Project Preview"> <button type="button" className="text-white   bg-purple-700 hover:bg-purple-600 focus:outline-none  focus:ring-purple-300 font-semibold rounded-full text-sm px-4 py-2.5 text-center mb-2 dark:bg-purple-700 dark:hover:bg-purple-600 transition-all">Live Preview</button></a>
                        </div>
                      </div>
                    </div>

                  })
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}


export default Work;