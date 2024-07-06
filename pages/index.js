import React, { useEffect } from "react";
import Image from "next/image";
import { ReactTyped } from "react-typed";
import image3 from "@/image/3.png";
import image1 from "@/image/1.png";
import image4 from "@/image/4.png";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const token = router.query.token;

  useEffect(() => {
    if (token) {
      toast.success("Logged in successfully", { autoClose: 1000 });
    }
  }, [token]);

  return (
    <>
      <style global jsx>{`
        .typed-cursor {
          color: black;
        }
        html.dark .typed-cursor {
          color: white;
        }

        @media only Screen and (max-width: 1300px) {
          .second-cont-item {
            width: 21rem !important;
            margin-right: 2rem;
            margin-left: 2rem;
          }

          .second-cont-Image {
            height: 10rem !important;
          }

          .second-cont-para {
            height: 10rem !important;
          }
        }
        @media only Screen and (max-width: 1100px) {
          .second-cont-grid {
            display: flex !important;
            flex-wrap: wrap !important;
            justify-content: center;
            gap: 3rem;
          }

          .second-cont-item {
            width: 23rem !important;
            margin-right: 0rem !important;
            margin-left: 0rem !important;
          }
        }
      `}</style>
      <Head>
        <title>Get web development services | CodeWithRafay</title>
        <meta
          name="description"
          content="Welcome to CodeWithRafay, your go-to web development agency. We create web apps, CMS, e-commerce stores, and more. Discover our services and read our latest blog posts."
        />
        <link rel="canonical" href="https://www.codewithrafay.com/" />
      </Head>
      <div className="grid grid-cols-2 place-items-center w-full h-96 xl:container hero-grid mx-auto dark:bg-gray-900">
        <div className="flex flex-col hero pl-0 md:pl-5">
          <h1 className="text-4xl font-semibold px-5 md:px-0 lg:px-0 dark:text-white">
            Welcome to
            <span className="capitalize text-purple-700 dark:text-purple-500 transition-all">
              {" "}
              <ReactTyped
                strings={["CodeWithRafay"]}
                typeSpeed={20}
                startDelay={500}
                showCursor={false}
              />
            </span>
          </h1>
          <div className="flex gap-2 text-2xl ">
            <h4 className="h-auto font-semibold mt-1 capitalize dark:text-white">
              Get
            </h4>
            <h4 className="h-auto font-semibold mt-1 capitalize text-purple-700 TypedJS dark:text-purple-600">
              <ReactTyped
                strings={[
                  "Full Stack Development",
                  "Web App Development",
                  "CMS",
                  "SEO",
                  "Maintenance",
                  "Bugs Fixing",
                  "Optimization",
                  "Deployment",
                ]}
                typeSpeed={20}
                backDelay={1400}
                backSpeed={25}
                startDelay={500}
                loop
              />
            </h4>
          </div>
          <p
            className="mt-2 dark:text-gray-400 text-md font-noraml  "
            style={{ width: "92%" }}
          >
            At CodeWithRafay, we specialize in offering comprehensive services,
            leveraging the expertise of our seasoned developers to create
            dynamic websites that not only attract more customers but also
            guarantee accelerated business growth.
          </p>
          <div className="flex mt-5 items-center hero-buttons">
            <Link href="/hire">
              <button
                type="button"
                className="inline-block rounded bg-gray-900 px-4 py-4 pb-2 pt-2.5 text-xs leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition-all hover:bg-gray-700 font-semibold  dark:bg-white dark:hover:bg-gray-300 dark:text-black"
              >
                GET A QUOTE
              </button>
            </Link>
            <Link href="/blog">
              <button
                type="button"
                className="inline-block uppercase rounded px-6 pb-2 pt-2.5 text-xs  leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition-all mx-3 hover:bg-slate-300 bg-gray-300 font-semibold"
              >
                Explore Blog
              </button>
            </Link>
          </div>
        </div>
        <div className="object-cover h-full w-full z-10 div-Image">
          <div
            className="Image h-96 z-10"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80')",
              width: "100%",
              clipPath: "polygon(10% 0px, 100% 0%, 100% 100%, 0px 100%)",
              filter: "brightness(0.8)",
            }}
          ></div>
        </div>
      </div>

      <div className="my-10 w-full xl:container mx-auto flex justify-center items-center flex-col">
        <h2 className="capitalize text-3xl text-center text-purple-700 font-semibold dark:text-purple-500">
        Our Latest Work
        </h2>
        <div className="w-full second-cont-grid grid grid-cols-3 justify-items-center items-center mt-8">
          <div
            className="second-cont-item w-96 flex flex-col flex-wrap md:mx-7 bg-white shadow-lg shadow-gray-300 rounded-2xl text-md dark:bg-slate-800 dark:shadow-black dark:shadow-sm"
            style={{ height: "100%" }}
          >
            <div className="relative second-cont-Image h-48 w-full overflow-hidden">
              <Image
                className="absolute inset-0 w-full h-full border-t-2 dark:border-none"
                src={image1}
                alt="img codewithrafay course-image"
                layout="responsive"
                width={100}
                height={100}
                style={{ borderRadius: "1rem 1rem 0 0" }}
              />
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="uppercase font-medium text-xs tracking-widest dark:text-gray-400">
              PORTFOLIO

              </span>
              <h3 className="font-medium text-lg overflow-hidden overflow-ellipsis whitespace-nowrap dark:text-white">
                Portfolio Website
              </h3>
              <p className="mt-3 h-32 dark:text-gray-400 second-cont-para">
              Discover Personal portfolio website, showcasing our work built with HTML, CSS, and JavaScript. Reflecting our skills, creativity, and dedication to web development. Journey through our innovative and passionate creations!
              </p>
              <div className="mt-6">
                <a href={`https://codewithrafay-heroportfolio.netlify.app/`} target="_blank">
                  <button
                    type="button"
                    className="text-white bg-purple-700 transition-all hover:bg-purple-800 font-semibold rounded-full text-sm px-4 py-2.5 text-center mb-2"
                  >
                    Live Preview
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div
            className="second-cont-item w-96 md:mx-7 bg-white shadow-lg shadow-gray-300 rounded-2xl text-md dark:bg-slate-800 dark:shadow-black dark:shadow-sm"
            style={{ height: "100%" }}
          >
            <div className="relative second-cont-Image h-48 w-full overflow-hidden">
              <Image
                className="absolute inset-0 w-full h-full border-t-2 dark:border-none"
                src={image4}
                alt="img codewithrafay course-image"
                layout="responsive"
                width={100}
                height={100}
                style={{ borderRadius: "1rem 1rem 0 0" }}
              />
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="uppercase font-medium text-xs tracking-widest dark:text-gray-400">
              MUSIC LISTENER
              </span>
              <h3 className="font-medium text-lg overflow-hidden overflow-ellipsis whitespace-nowrap dark:text-white">
              Ultimate Music Listener
              </h3>
              <p className="mt-3 h-32 dark:text-gray-400 second-cont-para">
                Music Listener is an all-encompassing music app designed with
                JavaScript to provide an unparalleled music listening
                experience. It combines intuitive design with powerful features
                to offer users a seamless journey.
              </p>
              <div className="mt-6">
                <a href={'https://music-app-projects.netlify.app/'}  target="_blank">
                  <button
                    type="button"
                    className="text-white  bg-purple-700 transition-all hover:bg-purple-800 font-semibold rounded-full text-sm px-4 py-2.5 text-center mb-2"
                  >
                    Live Preview
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div
            className="second-cont-item w-96 bg-white shadow-lg shadow-gray-300 rounded-2xl text-md dark:bg-slate-800 dark:shadow-black dark:shadow-sm"
            style={{ height: "100%" }}
          >
            <div className="relative second-cont-Image h-48 w-full overflow-hidden">
              <Image
                className="absolute inset-0 w-full h-full border-t-2 dark:border-none"
                src={image3}
                alt="img codewithrafay course-image"
                layout="responsive"
                width={100}
                height={100}
                style={{ borderRadius: "1rem 1rem 0 0" }}
              />
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="uppercase font-medium text-xs tracking-widest dark:text-gray-400">
              COSMETICS SHOP
              </span>
              <h3 className="font-medium text-lg overflow-hidden overflow-ellipsis whitespace-nowrap dark:text-white">
              Glory Cosmetics Shop
              </h3>
              <p className="mt-3 h-32 dark:text-gray-400 second-cont-para">
              Discover our cosmetics shop, offering a wide range of beauty products with amazing features. From skincare to makeup, find everything you need to enhance your beauty. Shop now and experience the difference!
              </p>
              <div className="mt-6">
                <a href={'https://cosmetics-shop.netlify.app/'} target="_blank">
                  <button
                    type="button"
                    className="text-white  bg-purple-700 transition-all hover:bg-purple-800 font-semibold rounded-full text-sm px-4 py-2.5 text-center mb-2"
                  >
                    Live Preview
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full container mx-auto flex justify-center items-center flex-col mb-16 ">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-15 mx-auto">
            <h1 className="capitalize text-3xl text-center text-purple-700 font-semibold dark:text-purple-500 mb-12">
              Testimonials
            </h1>
            <div className="flex flex-wrap -m-4">
              <div className="p-4 md:w-1/2 w-full">
                <div className="h-full bg-gray-100 p-8 rounded dark:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="block w-5 h-5 text-gray-400 mb-4"
                    viewBox="0 0 975.036 975.036"
                  >
                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                  </svg>
                  <p className="leading-relaxed mb-6 dark:text-gray-300">
                  I needed a website for my business, and they developed it using the latest technologies. The user interaction and features are fantastic. I&apos;m really impressed by their expertise and hard work. I will definitely consider them for future projects. Highly recommended for everyone!
                  </p>
                  <div className="inline-flex items-center">
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font font-medium text-gray-900 dark:text-white">
                      Jane Smith
                      </span>
                      <span className="text-gray-500 text-sm dark:text-gray-400">
                      Business Owner
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 md:w-1/2 w-full">
                <div className="h-full bg-gray-100 p-8 rounded dark:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="block w-5 h-5 text-gray-400 mb-4"
                    viewBox="0 0 975.036 975.036"
                  >
                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                  </svg>
                  <p className="leading-relaxed mb-6 dark:text-gray-300">
                  Working with them was amazing. They created an advanced e-commerce platform using the latest technology, making sure it&apso;s easy to use. I appreciate their focus on quality and customer satisfaction in everything they do. I am greatly impressed by their quality work.
                  </p>
                  <div className="inline-flex items-center">
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font font-medium text-gray-900 dark:text-white">
                        Umair Zafar
                      </span>
                      <span className="text-gray-500 text-sm dark:text-gray-400">
                      E-commerce Entrepreneur
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
