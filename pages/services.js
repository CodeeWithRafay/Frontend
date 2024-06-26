import React from 'react'
import Link from 'next/link'
import Head from 'next/head';

const Page = () =>
{
  return (
    <>
       <Head>
        <title>Services | CodeWithRafay</title>
        <meta name="description" content="Explore the services offered by CodeWithRafay, including web app development, CMS, WordPress, e-commerce stores, and website bug fixes. Let us help you build your online presence." />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 pb-5 mx-auto">
          <div className="flex flex-col text-center w-full ">
            <h2 className="text-3xl  title-font dark:text-purple-600 text-purple-700 font-semibold mb-12 text-center ">Top Web Development Services</h2>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/2 ">
              <div className="flex rounded-lg h-full bg-gray-100 dark:bg-slate-800 p-8 flex-col border dark:border-gray-600">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path d="M440.9 136.3a4 4 0 000-6.91L288.16 40.65a64.14 64.14 0 00-64.33 0L71.12 129.39a4 4 0 000 6.91L254 243.88a4 4 0 004.06 0zM54 163.51a4 4 0 00-6 3.49v173.89a48 48 0 0023.84 41.39L234 479.51a4 4 0 006-3.46V274.3a4 4 0 00-2-3.46zM272 275v201a4 4 0 006 3.46l162.15-97.23A48 48 0 00464 340.89V167a4 4 0 00-6-3.45l-184 108a4 4 0 00-2 3.45z" /></svg>
                  </div>
                  <h2 className="text-gray-900 dark:text-white text-lg title-font font-medium">Custom Website Application Development</h2>
                </div>
                <div className="flex-grow px-6 md:my-11 lg:my-0 md:h-72 lg:h-64 lg:py-4 xl:h-52">
                <p className="leading-relaxed text-base dark:text-gray-400">From creating simple web pages to complex solutions, our team has experience developing the best solutions. We use the latest tools and technologies to ensure industry-leading custom website application development services. Be the next market leader and let your business website or application grab the users&apos; attention at a glance.</p>

                  <Link href='https://www.upwork.com/services/product/development-it-full-stack-web-developer-mern-stack-node-js-react-js-mongodb-1687021157238132736?ref=project_share' target='_blank' className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/2 ">
              <div className="flex rounded-lg h-full bg-gray-100 dark:bg-slate-800 p-8 flex-col border dark:border-gray-600">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full  text-white flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path d="M16 352a48.05 48.05 0 0048 48h133.88l-4 32H144a16 16 0 000 32h224a16 16 0 000-32h-49.88l-4-32H448a48.05 48.05 0 0048-48v-48H16zm240-16a16 16 0 11-16 16 16 16 0 0116-16zM496 96a48.05 48.05 0 00-48-48H64a48.05 48.05 0 00-48 48v192h480z" /></svg>
                  </div>
                  <h2 className="text-gray-900 dark:text-white text-lg title-font font-medium">PNG, JPEG, and XD to HTML Conversion</h2>
                </div>
                <div className="flex-grow px-6 md:my-11 lg:my-0 md:h-72 lg:h-64 lg:py-4 xl:h-52">
                  <p className="dark:text-gray-400 leading-relaxed text-base">Convert your designs into responsive web pages with our expert PNG, JPEG, and XD to HTML services. We ensure pixel-perfect, clean HTML code that faithfully represents your original design, delivering an engaging user experience on all devices. Trust us for efficient and high-quality conversions tailored to your needs.</p>
                  <Link href='https://www.upwork.com/services/product/development-it-figma-xd-psd-to-html5-css-js-wordpress-react-js-responsive-websites-1656473734867406848?ref=project_share&tier=1' target='_blank' className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/2 ">
              <div className="flex rounded-lg h-full bg-gray-100 dark:bg-slate-800 p-8 flex-col border dark:border-gray-600 ">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full  text-white flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path d="M414.39 97.61A224 224 0 1097.61 414.39 224 224 0 10414.39 97.61zM192.13 260.18a64 64 0 1159.69 59.69 64.07 64.07 0 01-59.69-59.69zm240-66.64l-96.37 5.84a4.06 4.06 0 01-3.44-1.59 96 96 0 00-18.07-18.07 4.06 4.06 0 01-1.59-3.44l5.84-96.37a4 4 0 015.42-3.51A193 193 0 01435.6 188.12a4 4 0 01-3.51 5.42zM193.54 79.91l5.84 96.37a4.06 4.06 0 01-1.59 3.44 96 96 0 00-18.07 18.07 4.06 4.06 0 01-3.44 1.59l-96.37-5.84a4 4 0 01-3.51-5.42A193 193 0 01188.12 76.4a4 4 0 015.42 3.51zM79.91 318.46l96.37-5.84a4.06 4.06 0 013.44 1.59 96 96 0 0018.07 18.07 4.06 4.06 0 011.59 3.44l-5.84 96.37a4 4 0 01-5.42 3.51A193 193 0 0176.4 323.88a4 4 0 013.51-5.42zm238.55 113.63l-5.84-96.37a4.06 4.06 0 011.59-3.44 96 96 0 0018.07-18.07 4.06 4.06 0 013.44-1.59l96.37 5.84a4 4 0 013.51 5.42A193 193 0 01323.88 435.6a4 4 0 01-5.42-3.51z" /></svg>
                  </div>
                  <h2 className="text-gray-900 dark:text-white text-lg title-font font-medium">Custom Frontend Development</h2>
                </div>
                <div className="flex-grow px-6 md:my-11 lg:my-0 md:h-72 lg:h-64 lg:py-4 xl:h-52">
                  <p className="dark:text-gray-400 leading-relaxed text-base">Our customized frontend web development solutions are tailor-made and are exceptionally easy to maintain. We have a team of dedicated frontend developers who create outstanding custom web development solutions. Begin your online journey with the assistance of one of the top custom web development companies in USA.</p>
                  <Link href='https://www.upwork.com/services/product/development-it-frontend-developer-html-css-js-reactjs-responsive-websites-1680389869907181568?ref=project_share&tier=1' target='_blank' className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* <div className="flex flex-wrap -m-4"> */ }
            <div className="p-4 md:w-1/2 ">
              <div className="flex rounded-lg h-full bg-gray-100 dark:bg-slate-800 p-8 flex-col border dark:border-gray-600 ">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full  text-white flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path d="M496 400h-28.34A47.92 47.92 0 00480 367.86V128.14A48.2 48.2 0 00431.86 80H80.14A48.2 48.2 0 0032 128.14v239.72A47.92 47.92 0 0044.34 400H16a16 16 0 000 32h480a16 16 0 000-32z" /></svg>
                  </div>
                  <h2 className="text-gray-900 dark:text-white text-lg title-font font-medium">Custom Backend Development</h2>
                </div>
                <div className="flex-grow px-6 md:my-11 lg:my-0 md:h-72 lg:h-64 lg:py-4 xl:h-52">
                  <p className="dark:text-gray-400 leading-relaxed text-base">The backend code of a website or an application is never seen but actually drives the whole show. We know this fact well and have a team of skilled backend developers who ensure strong and custom backend development. Drop your requirements to develop a business website and leave the rest to our experts.</p>
                  <Link href='https://www.upwork.com/services/product/development-it-backend-development-in-nodejs-api-integration-1690009455252983808?ref=project_share&tier=1' target='_blank' className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/2 ">
              <div className="flex rounded-lg h-full bg-gray-100 dark:bg-slate-800 p-8 flex-col border dark:border-gray-600 ">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full  text-white flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path d="M479.07 111.35a16 16 0 00-13.15-14.75C379.89 81.18 343.69 69.12 266 34.16c-7.76-2.89-12.57-2.84-20 0-77.69 35-113.89 47-199.92 62.44a16 16 0 00-13.15 14.75c-3.85 61.1 4.34 118 24.36 169.15a348.86 348.86 0 0071.43 112.41c44.67 47.43 94.2 75.12 119.74 85.6a20 20 0 0015.11 0c27-10.92 74.69-37.82 119.71-85.62a348.86 348.86 0 0071.43-112.39c20.02-51.14 28.21-108.05 24.36-169.15z" /></svg>
                  </div>
                  <h2 className="text-gray-900 dark:text-white text-lg title-font font-medium">UX/UI Designing Services</h2>
                </div>
                <div className="flex-grow px-6 md:my-11 lg:my-0 md:h-72 lg:h-64 lg:py-4 xl:h-52">
                <p className="dark:text-gray-400 leading-relaxed text-base">Besides developing a custom website, focusing on the design details is a must to ensure project success. So, we have a team of creative heads who put their 100% effort into creating unique business applications and websites that are enough to steal your customers&apos; hearts. Seek UX/UI designing services for your custom web development solutions.</p>

                  <Link href='https://www.upwork.com/services/product/design-website-website-designer-a-ux-ui-designer-and-a-mobile-designer-1664966290870108160?ref=project_share&tier=1' target='_blank' className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/2 ">
              <div className="flex rounded-lg h-full bg-gray-100 dark:bg-slate-800 p-8 flex-col border dark:border-gray-600 ">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full  text-white flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path d="M256 428c-52.35 0-111.39-11.61-157.93-31-17.07-7.19-31.69-18.82-43.64-28a4 4 0 00-6.43 3.18v12.58c0 28.07 23.49 53.22 66.14 70.82C152.29 471.33 202.67 480 256 480s103.7-8.67 141.86-24.42C440.51 438 464 412.83 464 384.76v-12.58a4 4 0 00-6.43-3.18c-11.95 9.17-26.57 20.81-43.65 28-46.54 19.39-105.57 31-157.92 31zM464 126.51c-.81-27.65-24.18-52.4-66-69.85C359.74 40.76 309.34 32 256 32s-103.74 8.76-141.91 24.66c-41.78 17.41-65.15 42.11-66 69.69L48 144c0 6.41 5.2 16.48 14.63 24.73 11.13 9.73 27.65 19.33 47.78 27.73C153.24 214.36 207.67 225 256 225s102.76-10.68 145.59-28.58c20.13-8.4 36.65-18 47.78-27.73C458.8 160.49 464 150.42 464 144z" /><path d="M413.92 226c-46.53 19.43-105.57 31-157.92 31s-111.39-11.57-157.93-31c-17.07-7.15-31.69-18.79-43.64-28a4 4 0 00-6.43 3.22V232c0 6.41 5.2 14.48 14.63 22.73 11.13 9.74 27.65 19.33 47.78 27.74C153.24 300.34 207.67 311 256 311s102.76-10.68 145.59-28.57c20.13-8.41 36.65-18 47.78-27.74C458.8 246.47 464 238.41 464 232v-30.78a4 4 0 00-6.43-3.18c-11.95 9.17-26.57 20.81-43.65 27.96z" /><path d="M413.92 312c-46.54 19.41-105.57 31-157.92 31s-111.39-11.59-157.93-31c-17.07-7.17-31.69-18.81-43.64-28a4 4 0 00-6.43 3.2V317c0 6.41 5.2 14.47 14.62 22.71 11.13 9.74 27.66 19.33 47.79 27.74C153.24 385.32 207.66 396 256 396s102.76-10.68 145.59-28.57c20.13-8.41 36.65-18 47.78-27.74C458.8 331.44 464 323.37 464 317v-29.8a4 4 0 00-6.43-3.18c-11.95 9.17-26.57 20.81-43.65 27.98z" /></svg>
                  </div>
                  <h2 className="text-gray-900 dark:text-white text-lg title-font font-medium">Custom Web Support & Maintenance Services</h2>
                </div>
                <div className="flex-grow px-6 md:my-11 lg:my-0 md:h-72 lg:h-64 lg:py-4 xl:h-52">
                <p className="dark:text-gray-400 leading-relaxed text-base">Developing a fully customized website shouldn&apos;t be the sole aim of a business owner. Maintaining an application or website timely help to keep it running smoothly and allows businesses to withstand competition. With our custom web support and maintenance services, we can help your business website stay updated as per the ongoing market trends.</p>

                  <Link href='https://www.upwork.com/services/product/development-it-website-bugs-fixes-of-react-js-wordpress-html-css-javascript-node-js-1687261986852790272?ref=project_share&tier=1' target='_blank' className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/2 ">
              <div className="flex rounded-lg h-full bg-gray-100 dark:bg-slate-800 p-8 flex-col border dark:border-gray-600 ">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full  text-white flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path d="M256 428c-52.35 0-111.39-11.61-157.93-31-17.07-7.19-31.69-18.82-43.64-28a4 4 0 00-6.43 3.18v12.58c0 28.07 23.49 53.22 66.14 70.82C152.29 471.33 202.67 480 256 480s103.7-8.67 141.86-24.42C440.51 438 464 412.83 464 384.76v-12.58a4 4 0 00-6.43-3.18c-11.95 9.17-26.57 20.81-43.65 28-46.54 19.39-105.57 31-157.92 31zM464 126.51c-.81-27.65-24.18-52.4-66-69.85C359.74 40.76 309.34 32 256 32s-103.74 8.76-141.91 24.66c-41.78 17.41-65.15 42.11-66 69.69L48 144c0 6.41 5.2 16.48 14.63 24.73 11.13 9.73 27.65 19.33 47.78 27.73C153.24 214.36 207.67 225 256 225s102.76-10.68 145.59-28.58c20.13-8.4 36.65-18 47.78-27.73C458.8 160.49 464 150.42 464 144z" /><path d="M413.92 226c-46.53 19.43-105.57 31-157.92 31s-111.39-11.57-157.93-31c-17.07-7.15-31.69-18.79-43.64-28a4 4 0 00-6.43 3.22V232c0 6.41 5.2 14.48 14.63 22.73 11.13 9.74 27.65 19.33 47.78 27.74C153.24 300.34 207.67 311 256 311s102.76-10.68 145.59-28.57c20.13-8.41 36.65-18 47.78-27.74C458.8 246.47 464 238.41 464 232v-30.78a4 4 0 00-6.43-3.18c-11.95 9.17-26.57 20.81-43.65 27.96z" /><path d="M413.92 312c-46.54 19.41-105.57 31-157.92 31s-111.39-11.59-157.93-31c-17.07-7.17-31.69-18.81-43.64-28a4 4 0 00-6.43 3.2V317c0 6.41 5.2 14.47 14.62 22.71 11.13 9.74 27.66 19.33 47.79 27.74C153.24 385.32 207.66 396 256 396s102.76-10.68 145.59-28.57c20.13-8.41 36.65-18 47.78-27.74C458.8 331.44 464 323.37 464 317v-29.8a4 4 0 00-6.43-3.18c-11.95 9.17-26.57 20.81-43.65 27.98z" /></svg>
                  </div>
                  <h2 className="text-gray-900 dark:text-white text-lg title-font font-medium">Wordpress Website Development</h2>
                </div>
                <div className="flex-grow px-6 md:my-11 lg:my-0 md:h-72 lg:h-64 lg:py-4 xl:h-52">
                  <p className="dark:text-gray-400 leading-relaxed text-base">Our team specializes in creating custom WordPress themes, plugins, and responsive designs to ensure your site stands out. We provide end-to-end solutions, including site setup, customization, performance optimization, and ongoing maintenance. Whether you need a simple blog or a complex e-commerce platform, we leverage the power of WordPress to deliver secure, scalable, and SEO-friendly websites that drive results.</p>
                  <Link href='https://www.upwork.com/services/product/development-it-wordpress-website-design-wordpress-expert-wordpress-developer-1688562410646708224?ref=fl_profile' target='_blank' className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */ }
      </section>
    </>
  )
}

export default Page