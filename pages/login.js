import { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import LoginButton from '@/components/loginButton';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import logo from '@/image/logo.png';
import { HandleLogin } from './api/post';
import AuthContext from '@/components/AuthContext';
import { v4 as uuidv4 } from 'uuid';


const LoginPage = () =>
{
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [email, setEmail] = useState('');
  const { session, setSession } = useContext(AuthContext);
  const router = useRouter()

  useEffect(() =>
  {
    if (session) {
      router.push('/')
    }
  }, [session, router])


  const handleEmailChange = (e) =>
  {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) =>
  {
    setPassword(e.target.value);
  };

  const handleRecaptchaChange = (value) =>
  {
    setRecaptchaValue(value);
  };

  const handleSubmit = async (e) =>
  {
    e.preventDefault();

    if (!recaptchaValue) {
      toast.error('Invalid reCaptcha');
      return;
    }

    try {
      const response = await HandleLogin(email, password);

      if (response) {
        window.location.reload()
        window.location.href = `/?token=${uuidv4()}`
      }
    } catch (error) {
      toast.error('Something Went Wrong! Try again later', { autoClose: 2000 });
    }
  };

  const hideSvg = (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 12S4.5 4 12 4s11 8 11 8-3.5 8-11 8S1 12 1 12Z"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15a3 3 0 100-6 3 3 0 000 6Z"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 2l20 20"
        stroke="#000"
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
        d="M1 12S4.5 4 12 4s11 8 11 8-3.5 8-11 8S1 12 1 12Z"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15a3 3 0 100-6 3 3 0 000 6Z"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <>
      <Head>
        <title>Login | CodeWithRafay</title>
        <meta
          name="description"
          content="Login to your CodeWithRafay account to access our web development services and tools. Secure and easy login process."
        />
        <link rel="canonical" href="https://www.codewithrafay.com/login" />
        <meta name="keywords" content="user login, account registration, web development login, CodeWithRafay login"/>
        <meta
          property="og:title"
          content="Login | CodeWithRafay"
        />
        <meta
          property="og:description"
          content="Login to your CodeWithRafay account to access our web development services and tools. Secure and easy login process."
        />
        <meta property="og:url" content="https://www.codewithrafay.com/login" />
        <meta name="twitter:title" content="Login | CodeWithRafay" />
        <meta
          name="twitter:description"
          content="Login to your CodeWithRafay account to access our web development services and tools. Secure and easy login process."
        />
      </Head>
      <div className='min-h-screen'>
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
              alt="CodeWithRafay Logo"
            />
          </div>
          <h2 className="text-center font-semibold text-2xl mt-1 dark:text-white">
            CodeWithRafay.com
          </h2>
          <span className="text-center text-xl dark:text-gray-100">Welcome back!</span>
          <div className="my-1 flex text-center justify-center items-center">
            <div className="mx-auto mt-1">
              <LoginButton />
            </div>
          </div>
          <div className="flex justify-between items-center my-4">
            <span className="w-1/5 lg:w-1/4 border-b dark:border-gray-500"></span>
            <h4 className="uppercase text-xs dark:text-gray-400">OR Login With Email</h4>
            <span className="w-1/5 lg:w-1/4 border-b dark:border-gray-500"></span>
          </div>
          <form onSubmit={handleSubmit}>
            <label className="text-sm font-semibold dark:text-gray-400" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none mt-2"
            />

            <div className="flex justify-between mt-5">
              <span className="text-sm font-semibold dark:text-gray-400">Password</span>
              <Link href="/activate"
                className="text-xs dark:text-gray-400">Forgot Password?
              </Link>
            </div>
            <div className="relative w-full">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
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

            <div className="mt-4">
              <ReCAPTCHA
                sitekey="6Ld2cGspAAAAABeeefHgheLz2fHX-nSWdtRKZSTx" // Replace with your actual sitekey
                onChange={handleRecaptchaChange}
              />
            </div>
            <div>
              <button type="submit" className="group relative flex justify-center border border-transparent text-base bg-purple-800  hover:bg-purple-700 transition-all text-white mt-4 font-semibold py-2 px-4 w-full rounded "><span className="absolute left-0 inset-y-0 flex items-center pl-3"><svg className="h-5 w-5 text-purple-500 group-hover:text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg></span>Login</button>
            </div>
          </form>
          <p className="mt-4 text-base text-center text-gray-700 dark:text-gray-400">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-purple-500 hover:text-purple-600">
              Sign up
            </Link>
          </p>

        </div>
      </div>
      </div>
    </>
  );
};

export default LoginPage;