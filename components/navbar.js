import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeContext from './ThemeContext';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Navbar()
{
  const { data: session } = useSession();
  const [menuVisible, setMenuVisible] = useState(false);
  const { themeMode, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();

  const handleMenuClick = () =>
  {
    setMenuVisible(prevMenuVisible => !prevMenuVisible);
  };

  const closeMenu = () =>
  {
    setMenuVisible(false);
  };

  const handleSignOut = async () =>
  {
    await signOut({ redirect: false });
    router.push('/login');
  };

  useEffect(() =>
  {
    const handleRouteChange = () =>
    {
      setMenuVisible(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () =>
    {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  return (

    <>
      <style global jsx>{`
          *{
            margin:0;
          }

          html{
            transition: all 0.3s ease;
          }

     
      `}</style>
      <div className='navbar real-navbar w-full z-50 sticky bg-white top-0 border-b border-grey-light shadow-md dark:bg-gray-800 dark:border-black'>
        <div className="w-full flex flex-wrap items-center lg:justify-between py-3 pl-3 pr-3 first-nav ">
          <div className='flex items-center justify-between w-full text-center'>
            <div className='flex'>
              <Link href="/" className='flex'>
                <button className="flex title-font font-semibold items-center text-gray-900 ">
                  <span className="cursor-pointer ml-3 text-xl text-purple-700 dark:text-purple-300"><b className='font-semibold'>&lt;/&gt;</b> CodeWithRafay</span>
                </button>
              </Link>
              <span className="title-font ml-3 font-semibold text-lg items-center text-purple-600 hidden menu cursor-progress" onClick={handleMenuClick} >
                <span >Menu</span><svg className='h-5 font-bold dark:text-purple-300' xmlns="http://www.w3.org/2000/svg ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M112 184l144 144 144-144" /></svg>
              </span>
            </div>
            <div className='flex justify-center items-center'>
              <nav className="md:ml-auto flex flex-wrap items-center text-base font-normal justify-end text-black text-pretty nav dark:text-white">
                <Link href="/" className="nav-link cursor-pointer mr-5 text-black  dark:text-white hover:border-b-2  hover:border-purple-800 capitalize dark:hover:border-purple-600" >Home</Link>
                <Link href="/services" className="nav-link cursor-pointer mr-5 text-black  dark:text-white hover:border-b-2  hover:border-purple-800 capitalize dark:hover:border-purple-600" >Services</Link>
                <Link href="/tools" className="nav-link cursor-pointer mr-5 text-black  dark:text-white hover:border-b-2 hover:border-purple-800 capitalize dark:hover:border-purple-600" >Tools</Link>
                <Link href="/blog" className="nav-link cursor-pointer mr-5 text-black  dark:text-white hover:border-b-2 hover:border-purple-800 capitalize dark:hover:border-purple-600" >Blog</Link>
                <Link href="/work" className="nav-link cursor-pointer mr-5 hover:border-b-2 text-black dark:text-white  hover:border-purple-800 capitalize dark:hover:border-purple-600" >Our Work</Link>
                <Link href="/contact" className="nav-link cursor-pointer mr-5 text-black  dark:text-white hover:border-b-2 hover:border-purple-800 capitalize dark:hover:border-purple-600" >Contact</Link>
                <Link href="/hire" className="nav-link cursor-pointer mr-5 text-black  dark:text-white hover:border-b-2 hover:border-purple-800 capitalize" >Hire us</Link>

              </nav>
              <svg onClick={toggleTheme} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="dark:text-white mr-3 dark-svg md:block text-purple-700 mt-1 cursor-pointer " id="themeToggleBtn" height="28" width="28" xmlns="http://www.w3.org/2000/svg"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path><path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"></path></svg>
              <div className='buttons md:ml-auto mb-3'>
                {

                  session ? (
                    <button
                      onClick={handleSignOut}
                      className="inline-flex items-center bg-purple-700 dark:bg-purple-500 text-white border-0 py-2 px-3 focus:outline-none hover:bg-purple-800 rounded-lg text-sm mt-4"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link href="/login">
                        <button className="inline-flex items-center bg-purple-700 dark:bg-purple-500 text-white border-0 py-2 px-3 focus:outline-none hover:bg-purple-800 rounded-lg text-sm mt-4 font-normal">
                          Login
                        </button>
                      </Link>
                      <Link href="/signup">
                        <button className="mx-2 inline-flex items-center bg-purple-700 dark:bg-purple-500 text-white border-0 py-2 px-3 focus:outline-none hover:bg-purple-800 rounded-lg text-sm mt-4 button-signup font-normal">
                          Signup
                        </button>
                      </Link>
                    </>
                  )}

              </div>

            </div>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-500"></hr>
        <div className='max-h-[6vh] min-h-[40px] flex items-center ml-3 mr-3 md:ml-10 md:mr-10 my-1 justify-center '>
          <Link aria-label="Navigate to home" href="/" className="text-center m-auto text-purple-700 text-xl cursor-pointer absolute left-10 dark:text-purple-300" ><svg stroke="currentColor" fill="currentColor" w="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"></path></svg></Link>
          <div className='hidden uppercase md:flex lg:flex xl:flex'>
            <div className=''>
              <Link href={`https://www.upwork.com/services/product/development-it-frontend-developer-html-css-js-reactjs-responsive-websites-1680389869907181568?ref=project_share&tier=1`} className='font-semibold text-md text-purple-600 cursor-pointer hover:border-b-2 hover:border-purple-700 mr-10 dark:text-purple-300' target='_codewithrafay'>Frontend</Link>
              <Link href={`https://www.upwork.com/services/product/development-it-backend-development-in-nodejs-api-integration-1690009455252983808?ref=project_share&tier=1`} className='font-semibold text-md text-purple-600 cursor-pointer hover:border-b-2 hover:border-purple-700 mr-10 dark:text-purple-300' target='_codewithrafay'>Backend</Link>
              <Link href={`https://www.upwork.com/services/product/development-it-wordpress-website-design-wordpress-expert-wordpress-developer-1688562410646708224?ref=fl_profile`} className='font-semibold text-md text-purple-600 cursor-pointer hover:border-b-2 hover:border-purple-700 mr-10 dark:text-purple-300' target='_codewithrafay'>CMS</Link>
              <Link href={`https://www.upwork.com/services/product/development-it-full-stack-web-developer-mern-stack-node-js-react-js-mongodb-1687021157238132736?ref=project_share`} className='font-semibold text-md text-purple-600 cursor-pointer hover:border-b-2 hover:border-purple-700 mr-10 dark:text-purple-300' target='_codewithrafay'>Web App</Link>
              <Link href={`https://www.upwork.com/services/product/development-it-website-bugs-fixes-of-react-js-wordpress-html-css-javascript-node-js-1687261986852790272?ref=project_share&tier=1`} className='font-semibold text-md text-purple-600 cursor-pointer hover:border-b-2 hover:border-purple-700 mr-10 dark:text-purple-300' target='_codewithrafay'>Bugs Fixing</Link>
              <Link href={`https://www.upwork.com/services/product/design-website-website-designer-a-ux-ui-designer-and-a-mobile-designer-1664966290870108160?ref=project_share&tier=1`} className='font-semibold text-md text-purple-600 cursor-pointer hover:border-b-2 hover:border-purple-700 mr-10 dark:text-purple-300' target='_codewithrafay'>UI/UX</Link>
            </div>
          </div>

        </div>

        <div className={`absolute z-50 block mt-1 w-full invisible md:ml-auto flex-col gap-5 py-5 font-bold text-purple-500 bg-purple-100 flex-wrap items-center text-xl justify-end text-pretty shadow-md shadow-gray-200 menu-nav ${menuVisible ? 'flex' : "hidden"} dark:bg-gray-800 dark:shadow-black dark:shadow-sm`}>
          <Link href="/" className="cursor-pointer mr-5 text-purple-500 font-semibold" >Home</Link>
          <Link href="/services" className="cursor-pointer mr-5 text-purple-500 font-semibold" >Services</Link>
          <Link href="/tools" className="cursor-pointer mr-5 text-purple-500 font-semibold" >Tools</Link>
          <Link href="/blog" className="cursor-pointer mr-5 text-purple-500 font-semibold" >Blog</Link>
          <Link href="/work" className="cursor-pointer mr-5 text-purple-500 font-semibold" >Our Work</Link>
          <Link href="/contact" className="cursor-pointer mr-5 text-purple-500 font-semibold" >Contact</Link>
          <Link href="/hire" className="cursor-pointer mr-5 text-purple-500 font-semibold" >Hire US</Link>

        </div>
      </div >
    </>

  )

}
