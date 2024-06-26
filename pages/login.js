
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import logo from '@/image/logo.png';
import { useSession } from 'next-auth/react';
import LoginButton from '@/components/loginButton'
import Head from 'next/head';

const Page = () =>
{
  const { data: session } = useSession();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  const handleEmailChange = (e) =>
  {
    setEmail(e.target.value);
  };
  const handlePasswordchange = (e) =>
  {
    setPassword(e.target.value);
  };

  const handleRecaptchaChange = (value) =>
  {
    setRecaptchaValue(value);
  };

  if (session) {

  }

  const hideSvg = (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const showSvg = (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <>
      <style global jsx>{`
        * {
          margin: 0;
        }
      `}</style>

      <Head>
        <title>Login | CodeWithRafay</title>
        <meta name="description" content="Login to your CodeWithRafay account to access our web development services and tools. Secure and easy login process." />
      </Head>

      <div className="">
        <div className="mx-auto flex w-full h-full md:my-20 max-w-md sm:max-w-xl my-3 sm:my-14 md:max-w-4xl dark:bg-slate-800">
          <div
            className="w-full bg-cover h-auto rounded-s-md hidden sm:hidden md:block lg:block xl:block"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=667&amp;q=80")',
            }}
          ></div>
          <div className="flex flex-col w-full p-8 rounded-md shadow-md">
            <div className="flex justify-center items-center">
              <Image
                width={60}
                height={60}
                className="rounded-full text-center"
                src={logo}
                alt='img'
              />
            </div>
            <h2 className="text-center font-semibold text-2xl mt-1 dark:text-white">
              CodeWithRafay.com
            </h2>
            <span className="text-center text-xl dark:text-gray-100">Welcome back!</span>
            <div className='my-1 flex text-center justify-center items-center'>
              <div className='mx-auto mt-1'>
                {LoginButton()}
              </div>
            </div>
            <div className="flex justify-between items-center my-4">
              <span className="w-1/5 lg:w-1/4 border-b"></span>
              <h4 className="uppercase text-xs dark:text-gray-400">OR Login With Email</h4>
              <span className="w-1/5 lg:w-1/4 border-b"></span>
            </div>
            <form action="" method="POST" >
              <label className="text-sm font-semibold dark:text-gray-400" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleEmailChange}
                value={Email}
                required
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none mt-2"
              />

              <div className="flex justify-between mt-5">
                <span className="text-sm font-semibold dark:text-gray-400">Password</span>
                <Link href={"/reset"}><span className="text-xs dark:text-gray-400">Forgot Password?</span></Link>
              </div>
              <div className="relative w-full">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  onChange={handlePasswordchange}
                  value={Password}
                  required
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none mt-2"
                />
                <span
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer passwordSvg"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? showSvg : hideSvg}
                </span>
              </div>

              <div className='mt-8'>
                <ReCAPTCHA
                  sitekey="6Ld2cGspAAAAABeeefHgheLz2fHX-nSWdtRKZSTx"
                  onChange={handleRecaptchaChange}
                />
              </div>
              <button
                type="submit"

                className="bg-gray-700 text-white mt-8 font-bold py-2 px-4 w-full rounded hover:bg-gray-600 disabled:opacity-50 dark:bg-slate-600 dark:hover:bg-slate-900"
              >
                Login
              </button>
              <div className="flex justify-between items-center my-4">
                <span className="w-1/5 lg:w-1/4 border-b"></span>
                <Link href="/signup">
                  <h4 className="uppercase text-xs dark:text-gray-400">or Signup</h4>
                </Link>
                <span className="w-1/5 lg:w-1/4 border-b"></span>
              </div>
            </form>
          </div>
        </div>
      </div>



    </>
  );
};

export default Page;
