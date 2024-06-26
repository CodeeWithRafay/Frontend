'use client'
import React from 'react';
import Link from 'next/link';


const Page = () =>
{
  return (
    <>
     <title>Tools | CodeWithRafay</title>
<meta name="description" content="Explore CodeWithRafay's tools page for useful utilities like word counters, text editors, and more. Enhance your productivity with our handy web development tools."/>

      <style global jsx>{ `
          *{
            margin:0;
          }
      `}</style>
      <div className='min-h-screen'>
        <div className="pt-3 w-full container mx-auto flex justify-center items-center flex-col mb-16 my-4">
          <h2 className='capitalize text-3xl font-semibold text-center text-purple-700 dark:text-purple-500
        00'>Our Tools</h2>
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-10 mx-auto">
              <div className="p-4 flex flex-col items-start bg-gray-100 dark:bg-gray-800 rounded border dark:border-gray-600">
                <span className="inline-block py-1 px-2 rounded bg-indigo-100 text-indigo-500 text-xs font-medium tracking-widest dark:text-white dark:bg-gray-700">Word Counter & Text Editor</span>
                <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4 dark:text-white">Text Editor and Word Counter</h2>
                <p className="leading-relaxed mb-5 dark:text-gray-300">The Ultimate Text Editor and Word Counter offers a seamless writing experience packed with essential features. Track your progress effortlessly with real-time word and character counts. Personalize your text with various formatting options, including bold, italic, underline, and strikethrough. Enhance your content with superscript, subscript, and organized lists (ordered and unordered).
                  Easily undo and redo changes to maintain your workflow. Insert images directly from URLs and create hyperlinks to enrich your documents. Choose from a diverse range of font names and sizes, adjust text alignment, and control indentation to suit your layout needs. Customize your text with a variety of font and background colors. The editor supports a responsive full-page height interface, light and dark modes, ensuring a user-friendly and adaptable experience for all your text editing requirements.</p>
                <div className="flex items-center flex-wrap  border-gray-100 mt-auto w-full">
                  <Link href="/tools/texteditor">
                    <button className="inline-flex font-semibold text-sm items-center tracking-wide bg-purple-700 dark:bg-purple-600 text-white border-0 py-2 px-3 focus:outline-none hover:bg-purple-800 rounded-lg">
                      Start Using!
                    </button>
                  </Link>
                  <span className="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>33.4k
                  </span>
                  <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>644
                  </span>
                </div>

              </div>
             

            </div>
          </section>
        </div>
      </div>
    </>
  )
}


export default Page