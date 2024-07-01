import React from 'react'
import logo from "@/image/logo.png"
import Image from 'next/image';
import Head from 'next/head';

const Page = () =>
{

  return (
    <>
      <Head>
        <title>Contact Us | CodeWithRafay</title>
        <meta name="description" content="Get in touch with CodeWithRafay for any inquiries or to discuss your project needs. We are here to help you with all your web development requirements." />
        <link rel="canonical" href="https://codewithrafay.com/contact"/>
      </Head>

      <div className='container mx-auto w-full md:mt-24 md:px-32 min-h-screen'>
        <div className='card w-full flex flex-col justify-center items-center py-8  rounded-2xl shadow-lg'>
          <h3 className='text-3xl font-semibold mt-5 dark:text-white'>Feel Free To Contact us!</h3>
          <Image className='rounded-full mt-10 border-black border-2 ' width={130} height={50} src={logo} alt='img CodeWithRafay logo' layout="fixed"/>
          <div className='card flex gap-14 mt-10 mb-5  dark:bg-gray-600 rounded-xl bg-gray-300 p-5' >
            <a href="https://www.linkedin.com/in/abdul-rafay-97285b274/" target="_blank" rel="noopener noreferrer" aria-label="Linkedin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 dark:text-white dark:hover:text-purple-600 hover:text-purple-600 transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/codeewithrafay/" target="_blank" rel="noopener noreferrer"  aria-label="facebook"><svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 dark:text-white dark:hover:text-purple-600 hover:text-purple-600 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path
                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg></a>
            <a href="https://www.instagram.com/officialcodewithrafay/" target="_blank" rel="noopener noreferrer" aria-label="instagram"><svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 dark:text-white dark:hover:text-purple-600 hover:text-purple-600 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg></a>
            <a href="https://twitter.com/codewithraafay" target="_blank" rel="noopener noreferrer" aria-label="twitter"><svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 dark:text-white dark:hover:text-purple-600 hover:text-purple-600 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg></a>
          </div>
        </div>

      </div>
    </>
  )
}

export default Page