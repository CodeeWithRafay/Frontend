import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import ThemeContext from "./ThemeContext";
import { useRouter } from "next/router";
import { HandleLogout } from "@/pages/api/post";
import AuthContext from "@/components/AuthContext";

export default function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { themeMode, toggleTheme } = useContext(ThemeContext);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [SearchInputText, setSearchInputText] = useState("");
  const { session, setSession } = useContext(AuthContext);
  const router = useRouter();


  const handleSignOut = async () => {
    const userLogout = await HandleLogout();
    if (userLogout) {
      setSession(null);
      router.push("/login");
    }
  };

  const toggleInputVisibility = () => {
    setIsInputVisible(!isInputVisible);
  };

  const handleMenuClick = () => {
    setMenuVisible((prevMenuVisible) => !prevMenuVisible);
  };

  const HandleSearch = (e) => {
    e.preventDefault();
    if (SearchInputText.trim()) {
      router.push(`/search?query=${encodeURIComponent(SearchInputText)}`);
    }
  };

  useEffect(() => {
 
    setIsInputVisible(false); // Reset search input text
  }, [router.query]); // Reset when query changes

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setMenuVisible(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, isInputVisible]);

  return (
    <>
      <div className="navbar real-navbar w-full z-50 sticky bg-white top-0 border-b border-grey-light shadow-md dark:bg-gray-800 dark:border-black">
        <div className="w-full flex flex-wrap items-center lg:justify-between py-3 pl-3 pr-3 first-nav ">
          <div className="flex items-center justify-between w-full text-center">
            <div className="flex">
              <Link href="/" className="flex">
                <button className="flex title-font font-semibold items-center text-gray-900 ">
                  <span className="cursor-pointer ml-3 text-xl text-purple-700 dark:text-purple-300">
                    <b className="font-semibold">&lt;/&gt;</b> CodeWithRafay
                  </span>
                </button>
              </Link>
              <span
                className="title-font ml-3 font-semibold text-lg items-center text-purple-600 hidden menu cursor-progress"
                onClick={handleMenuClick}
              >
                <span>Menu</span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  className="text-purple-700 mt-1"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                </svg>
              </span>
            </div>
            <div className="flex justify-center items-center">
              <nav className="md:ml-auto flex flex-wrap items-center text-base font-normal justify-end text-black text-pretty nav dark:text-white">
                <Link
                  href="/"
                  scroll={false}
                  className="nav-link cursor-pointer mr-4 text-black  dark:text-white hover:border-b-2  hover:border-purple-800 capitalize dark:hover:border-purple-600"
                >
                  Home
                </Link>
                <Link
                  href="/services/"
                  scroll={false}
                  className="nav-link cursor-pointer mr-4 text-black  dark:text-white hover:border-b-2  hover:border-purple-800 capitalize dark:hover:border-purple-600"
                >
                  Services
                </Link>
                <Link
                  href="/videos/"
                  scroll={false}
                  className="nav-link cursor-pointer mr-4 text-black  dark:text-white hover:border-b-2  hover:border-purple-800 capitalize dark:hover:border-purple-600"
                >
                  videos
                </Link>

                <Link
                  href="/tools/"
                  scroll={false}
                  className="nav-link cursor-pointer mr-4 text-black  dark:text-white hover:border-b-2 hover:border-purple-800 capitalize dark:hover:border-purple-600"
                >
                  Tools
                </Link>
                <Link
                  href="/blog/"
                  scroll={false}
                  className="nav-link cursor-pointer mr-4 text-black  dark:text-white hover:border-b-2 hover:border-purple-800 capitalize dark:hover:border-purple-600"
                >
                  Blog
                </Link>
                <Link
                  href="/portfolio/"
                  scroll={false}
                  className="nav-link cursor-pointer mr-4 hover:border-b-2 text-black dark:text-white  hover:border-purple-800 capitalize dark:hover:border-purple-600"
                >
                  Portfolio
                </Link>
                <Link
                  href="/contact/"
                  scroll={false}
                  className="nav-link cursor-pointer mr-4 text-black  dark:text-white hover:border-b-2 hover:border-purple-800 capitalize dark:hover:border-purple-600"
                >
                  Contact
                </Link>
                <Link
                  href="/hire/"
                  scroll={false}
                  className="nav-link cursor-pointer mr-5 text-black  dark:text-white hover:border-b-2 hover:border-purple-800"
                >
                  Hire Us
                </Link>
              </nav>
              <svg
                onClick={toggleTheme}
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="dark:text-white mr-3 dark-svg md:block text-purple-700 mt-1 cursor-pointer "
                id="themeToggleBtn"
                height="28"
                width="28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path>
                <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"></path>
              </svg>
              <div className="buttons md:ml-auto mb-3">
                {session ? (
                  <button
                    onClick={handleSignOut}
                    className="inline-flex items-center bg-purple-700 dark:bg-purple-600 text-white border-0 py-2 px-3 hover:bg-purple-800 rounded-lg text-sm mt-4 font-medium focus:outline-purple-500 focus:outline dark:hover:bg-purple-700 text-pretty"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link href="/login">
                      <button className="inline-flex items-center bg-purple-700 dark:bg-purple-600 text-white border-0 py-2 px-3  hover:bg-purple-800 focus:outline-purple-500 focus:outline dark:hover:bg-purple-700 rounded-lg text-sm mt-4 font-medium text-pretty">
                        Login
                      </button>
                    </Link>
                    <Link href="/signup">
                      <button className="mx-2 inline-flex items-center bg-purple-700 dark:bg-purple-600 text-white border-0 py-2 px-3 focus:outline-purple-500 focus:outline hover:bg-purple-800 rounded-lg dark:hover:bg-purple-700 text-sm mt-4 button-signup font-medium">
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
        <div className="max-h-[6vh] min-h-[40px] flex items-center ml-3 mr-3 md:ml-10 md:mr-10 my-1 justify-between ">
          <div className="flex justify-center items-center text-center">
            <Link
              aria-label="Navigate to home"
              href="/"
              className="text-center m-auto text-purple-700 text-xl cursor-pointer absolute left-10 dark:text-purple-300"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                w="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"></path>
              </svg>
            </Link>
          </div>
          <div className="hidden uppercase md:flex lg:flex xl:flex">
            <div className="">
              <Link
                href={`https://www.upwork.com/services/product/development-it-frontend-developer-html-css-js-reactjs-responsive-websites-1680389869907181568?ref=project_share&tier=1`}
                className="font-semibold text-md text-purple-600 cursor-pointer hover:border-b-2 hover:border-purple-700 mr-10 dark:text-purple-300"
                target="_codewithrafay"
              >
                Frontend
              </Link>
              <Link
                href={`https://www.upwork.com/services/product/development-it-backend-development-in-nodejs-api-integration-1690009455252983808?ref=project_share&tier=1`}
                className="font-semibold text-md text-purple-600 cursor-pointer hover:border-b-2 hover:border-purple-700 mr-10 dark:text-purple-300"
                target="_codewithrafay"
              >
                Backend
              </Link>
              <Link
                href={`https://www.upwork.com/services/product/development-it-wordpress-website-design-wordpress-expert-wordpress-developer-1688562410646708224?ref=fl_profile`}
                className="font-semibold text-md text-purple-600 cursor-pointer hover:border-b-2 hover:border-purple-700 mr-10 dark:text-purple-300"
                target="_codewithrafay"
              >
                CMS
              </Link>
              <Link
                href={`https://www.upwork.com/services/product/development-it-full-stack-web-developer-mern-stack-node-js-react-js-mongodb-1687021157238132736?ref=project_share`}
                className="font-semibold text-md text-purple-600 cursor-pointer hover:border-b-2 hover:border-purple-700 mr-10 dark:text-purple-300"
                target="_codewithrafay"
              >
                Web App
              </Link>
              <Link
                href={`https://www.upwork.com/services/product/development-it-website-bugs-fixes-of-react-js-wordpress-html-css-javascript-node-js-1687261986852790272?ref=project_share&tier=1`}
                className="font-semibold text-md text-purple-600 cursor-pointer hover:border-b-2 hover:border-purple-700 mr-10 dark:text-purple-300"
                target="_codewithrafay"
              >
                Bugs Fixing
              </Link>
              <Link
                href={`https://www.upwork.com/services/product/design-website-website-designer-a-ux-ui-designer-and-a-mobile-designer-1664966290870108160?ref=project_share&tier=1`}
                className="font-semibold text-md text-purple-600 cursor-pointer hover:border-b-2 hover:border-purple-700 mr-10 dark:text-purple-300"
                target="_codewithrafay"
              >
                UI/UX
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <form onSubmit={HandleSearch}>
              <div className="flex justify-center items-center">
                {isInputVisible && (
                  <input
                    type="search"
                    placeholder="Search..."
                    onChange={(e) => setSearchInputText(e.target.value)}
                    className="block right-10 md:right-10 absolute w-48 md:w-60 h-8 bg-white rounded border-2 border-purple-500 focus:border-purple-700 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-gray-500 dark:text-gray-200 "
                  />
                )}

                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  className="text-purple-700 dark:text-purple-300 cursor-pointer text-2xl absolute right-3 md:right-12"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={toggleInputVisibility}
                >
                  <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                </svg>
              </div>
            </form>
          </div>
        </div>

        <div
          className={`transition-all absolute z-50 block mt-1 w-full invisible md:ml-auto flex-col gap-5 py-5 font-bold text-purple-500 bg-purple-100 flex-wrap items-center text-xl justify-end text-pretty shadow-md shadow-gray-200 menu-nav ${
            menuVisible ? "flex" : "hidden"
          } dark:bg-gray-800 dark:shadow-black dark:shadow-sm`}
        >
          <Link
            href="/"
            scroll={false}
            className="cursor-pointer mr-5 text-purple-500 font-semibold"
          >
            Home
          </Link>
          <Link
            href="/services"
            scroll={false}
            className="cursor-pointer mr-5 text-purple-500 font-semibold"
          >
            Services
          </Link>

          <Link
            href="/videos"
            scroll={false}
            className="cursor-pointer mr-5 text-purple-500 font-semibold"
          >
            videos
          </Link>
          <Link
            href="/tools"
            scroll={false}
            className="cursor-pointer mr-5 text-purple-500 font-semibold"
          >
            Tools
          </Link>
          <Link
            href="/blog"
            scroll={false}
            className="cursor-pointer mr-5 text-purple-500 font-semibold"
          >
            Blog
          </Link>
          <Link
            href="/portfolio"
            scroll={false}
            className="cursor-pointer mr-5 text-purple-500 font-semibold"
          >
            Portfolio
          </Link>
          <Link
            href="/contact"
            scroll={false}
            className="cursor-pointer mr-5 text-purple-500 font-semibold"
          >
            Contact
          </Link>
          <Link
            href="/hire"
            scroll={false}
            className="cursor-pointer mr-5 text-purple-500 font-semibold"
          >
            Hire Us
          </Link>
        </div>
      </div>
    </>
  );
}
