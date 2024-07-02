'use client'
import React from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import html from "@/image/logo/html.webp"
import css from "@/image/logo/css.webp"
import js from "@/image/logo/js.webp"
import reactjs from "@/image/logo/reactjs.webp"
import python from "@/image/logo/python.webp"
import node from "@/image/logo/node.png"
import next from "@/image/logo/next.png"
import strapi from "@/image/logo/strapi.png"
import wordpress from "@/image/logo/wordpress.png"
import Footer from '@/components/footer';


const Page = () => {
  return (
    <>
      <Head>
        <title>Tutorials | CodeWithRafay</title>
      </Head>
      <style global jsx>{`
          *{
            margin:0;
          }
      `}</style>
      <section className="text-gray-600 body-font min-h-screen">
        <div className="py-8 ">
          <div className="flex flex-wrap w-full flex-col text-center">
            <h1 className="sm:text-3xl text-2xl font-semibold title-font mb-2 text-purple-700 dark:text-purple-400">Tutorials</h1>
            <div className="grid grid-cols-4 items-center justify-items-center mt-8 gap-2 mx-8 gap-y-10 tutorials-grid-container">
              <div className='border flex-wrap flex shadow-md rounded-xl tutorials-grid-container-item dark:bg-slate-800 dark:border-black'>
                <div className='flex-wrap mx-auto flex flex-col justify-center items-center p-6 tutorials-grid-container-item-inner-div' style={{ width: "20vw", }}>
                  <Image className='h-25' width={100} src={html} alt="img" style={{ width: 'auto' }} priority={true} />
                  <h3 className='capitalize text-xl mt-3 font-medium dark:text-white'>HTML Tutorial</h3>
                  <Link href="/tutorials/html"><button className="flex mx-auto mt-5 text-white bg-purple-700 border-0 py-2 px-4 focus:outline-none hover:bg-purple-800 text-sm font-semibold rounded-3xl">Start Learning!</button></Link>
                </div>
              </div>
              <div className='border flex-wrap flex shadow-md rounded-xl tutorials-grid-container-item  dark:bg-slate-800 dark:border-black'>
                <div className='flex-wrap mx-auto flex flex-col justify-center items-center p-6 tutorials-grid-container-item-inner-div' style={{ width: "20vw" }}>
                  <Image className='h-25' width={100} src={css} alt="img" style={{ width: 'auto' }} />
                  <h3 className='capitalize text-xl mt-3 font-medium dark:text-white'>CSS Tutorial</h3>
                  <Link href="/tutorials/css"><button className="flex mx-auto mt-5 text-white bg-purple-700 border-0 py-2 px-4 focus:outline-none hover:bg-purple-800 text-sm font-semibold rounded-3xl">Start Learning!</button></Link>
                </div>
              </div>
              <div className='border flex-wrap flex shadow-md rounded-xl tutorials-grid-container-item  dark:bg-slate-800 dark:border-black'>
                <div className='flex-wrap mx-auto flex flex-col justify-center items-center py-6 tutorials-grid-container-item-inner-div' style={{ width: "20vw" }}>
                  <Image className='h-25' width={100} src={js} alt="img" style={{ width: 'auto' }} />
                  <h3 className='capitalize text-xl mt-3 font-medium dark:text-white'>JavaScript Tutorial</h3>
                  <Link href="/tutorials/js"><button className="flex mx-auto mt-5 text-white bg-purple-700 border-0 py-2 px-4 focus:outline-none hover:bg-purple-800 text-sm font-semibold rounded-3xl">Start Learning!</button></Link>
                </div>
              </div>
              <div className='border flex-wrap flex shadow-md rounded-xl tutorials-grid-container-item  dark:bg-slate-800 dark:border-black'>
                <div className='flex-wrap mx-auto flex flex-col justify-center items-center py-6 tutorials-grid-container-item-inner-div' style={{ width: "20vw" }}>
                  <Image className='h-25' width={100} src={reactjs} alt="img" style={{ width: 'auto' }} />
                  <h3 className='capitalize text-xl mt-3 font-medium dark:text-white'>React Tutorial</h3>
                  <Link href="/tutorials/react"><button className="flex mx-auto mt-5 text-white bg-purple-700 border-0 py-2 px-4 focus:outline-none hover:bg-purple-800 text-sm font-semibold rounded-3xl">Start Learning!</button></Link>
                </div>
              </div>
              <div className='border flex-wrap flex shadow-md rounded-xl tutorials-grid-container-item  dark:bg-slate-800 dark:border-black'>
                <div className='flex-wrap mx-auto flex flex-col justify-center items-center py-6 tutorials-grid-container-item-inner-div' style={{ width: "20vw" }}>
                  <Image className='h-25' width={100} height={100} src={next} alt="img" style={{ width: 'auto' }} />
                  <h3 className='capitalize text-xl mt-3 font-medium dark:text-white'>Next Tutorial</h3>
                  <Link href="/tutorials/next"><button className="flex mx-auto mt-5 text-white bg-purple-700 border-0 py-2 px-4 focus:outline-none hover:bg-purple-800 text-sm font-semibold rounded-3xl">Start Learning!</button></Link>
                </div>
              </div>
              <div className='border flex-wrap flex shadow-md rounded-xl tutorials-grid-container-item  dark:bg-slate-800 dark:border-black'>
                <div className='flex-wrap mx-auto flex flex-col justify-center items-center py-6 tutorials-grid-container-item-inner-div' style={{ width: "20vw" }}>
                  <Image className='h-25' height={100} width={100} src={node} alt="img" style={{ width: 'auto' }} />
                  <h3 className='capitalize text-xl mt-3 font-medium dark:text-white'>Node Tutorial</h3>
                  <Link href="/tutorials/node"><button className="flex mx-auto mt-5 text-white bg-purple-700 border-0 py-2 px-4 focus:outline-none hover:bg-purple-800 text-sm font-semibold rounded-3xl">Start Learning!</button></Link>
                </div>
              </div>
              <div className='border flex-wrap flex shadow-md rounded-xl tutorials-grid-container-item  dark:bg-slate-800 dark:border-black'>
                <div className='flex-wrap mx-auto flex flex-col justify-center items-center py-6 tutorials-grid-container-item-inner-div' style={{ width: "20vw" }}>
                  <Image className='h-25' height={90} width={100} src={wordpress} alt="img" style={{ width: 'auto' }} />
                  <h3 className='capitalize text-xl mt-3 font-medium dark:text-white'>Wordpress Tutorial</h3>
                  <Link href="/tutorials/wordpress"><button className="flex mx-auto mt-5 text-white bg-purple-700 border-0 py-2 px-4 focus:outline-none hover:bg-purple-800 text-sm font-semibold rounded-3xl">Start Learning!</button></Link>
                </div>
              </div>
              <div className='border flex-wrap flex shadow-md rounded-xl tutorials-grid-container-item  dark:bg-slate-800 dark:border-black'>
                <div className='flex-wrap mx-auto flex flex-col justify-center items-center py-6 tutorials-grid-container-item-inner-div' style={{ width: "20vw" }}>
                  <Image className='h-25 rounded-full' height={100} width={100} src={strapi} alt="img" style={{ width: 'auto' }} />
                  <h3 className='capitalize text-xl mt-3 font-medium dark:text-white'>Strapi Tutorial</h3>
                  <Link href="/tutorials/strapi"><button className="flex mx-auto mt-5 text-white bg-purple-700 border-0 py-2 px-4 focus:outline-none hover:bg-purple-800 text-sm font-semibold rounded-3xl">Start Learning!</button></Link>
                </div>
              </div>
              <div className='border flex-wrap flex shadow-md rounded-xl tutorials-grid-container-item  dark:bg-slate-800 dark:border-black'>
                <div className='flex-wrap mx-auto flex flex-col justify-center items-center py-6 tutorials-grid-container-item-inner-div' style={{ width: "20vw" }}>
                  <Image className='h-25' height={100} width={100} src={python} alt="img" style={{ width: 'auto' }} />
                  <h3 className='capitalize text-xl mt-3 font-medium dark:text-white'>Python Tutorial</h3>
                  <Link href="/tutorials/python"><button className="flex mx-auto mt-5 text-white bg-purple-700 border-0 py-2 px-4 focus:outline-none hover:bg-purple-800 text-sm font-semibold rounded-3xl">Start Learning!</button></Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Page