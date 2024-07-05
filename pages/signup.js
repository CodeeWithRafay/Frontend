import { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import Head from 'next/head';
import logo from '@/image/logo.png';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import LoginButton from '@/components/loginButton'; 
import { HandleSignup } from './api/post';
import AuthContext from '@/components/AuthContext';
import { useRouter } from 'next/router';

const SignupPage = () =>
{
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
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
    setIsPasswordValid(isStrongPassword(e.target.value));
  };

  const handleRecaptchaChange = (value) =>
  {
    setRecaptchaValue(value);
  };

  function isStrongPassword(password)
  {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return passwordRegex.test(password);
  }

  const handleSubmit = async (e) =>
  {
    e.preventDefault();

    // Check if reCAPTCHA value exists
    if (!recaptchaValue) {
      toast.error('Invalid reCaptcha');
      return;
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
      setIsPasswordValid(false);
      return;
    }

    try {
      await HandleSignup(email, password);

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
        <title>Signup | CodeWithRafay</title>
        <meta
          name="description"
          content="Create a new account on CodeWithRafay to start using our web development services and tools. Join our community today."
        />
        <link rel="canonical" href="https://www.codewithrafay.com/signup" />
        <meta name="keywords" content="user signup, account registration, web development signup, CodeWithRafay signup"/>
        <meta property="og:title" content="Signup | CodeWithRafay" />
        <meta
          property="og:description"
          content="Create a new account on CodeWithRafay to start using our web development services and tools. Join our community today."
        />
        <meta property="og:url" content="https://www.codewithrafay.com/signup" />
        <meta name="twitter:title" content="Signup | CodeWithRafay" />
        <meta
          name="twitter:description"
          content="Create a new account on CodeWithRafay to start using our web development services and tools. Join our community today."
        />
      </Head>

      <div className="">
        <div className="mx-auto flex w-full h-full md:my-20 max-w-md sm:max-w-xl my-3 sm:my-14 md:max-w-4xl dark:bg-slate-800">
          <div
            className="w-full bg-cover h-auto rounded-s-md hidden sm:hidden md:block lg:block xl:block"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80")',
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
            <span className="text-center text-xl dark:text-slate-300">
              Create an Account!
            </span>

            <div className="mx-auto mt-2">{LoginButton()}</div>

            <div className="flex justify-between items-center my-4">
              <span className="w-1/5 lg:w-1/4 border-b dark:border-gray-500"></span>
              <h4 className="uppercase text-xs dark:text-gray-400">
                OR Sign up With Email
              </h4>
              <span className="w-1/5 lg:w-1/4 border-b dark:border-gray-500"></span>
            </div>
            <form onSubmit={handleSubmit}>
              <label
                className="text-sm font-semibold dark:text-gray-400"
                htmlFor="email"
              >
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

              <div>
                <div className="flex justify-between mt-5">
                  <span className="text-sm font-semibold dark:text-gray-400">Password</span>
                </div>
                <div className="relative w-full">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    className={`bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none mt-2 ${!isPasswordValid ? 'border-red-500' : ''}`}
                  />
                  <span
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer passwordSvg"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? showSvg : hideSvg}
                  </span>
                </div>
                <div className="relative max-h-0 overflow-hidden transition-all duration-500 ease-in-out" style={{ maxHeight: password ? '500px' : '0px' }}>
                  <div className={`mt-2 ${isPasswordValid ? 'text-green-600' : 'text-red-600'} text-sm`}>
                    {isPasswordValid
                      ? 'Strong Password'
                      : 'Password must be between 8 and 265 characters long and should contain at least one uppercase letter, one lowercase letter, one number, and one special character.'}
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-4 mb-4 justify-between">
                <label htmlFor="accept-terms" className="flex items-center text-sm text-gray-700 dark:text-gray-400">
                  <input
                    type="checkbox"
                    name="accept-terms"
                    id="accept-terms"
                    className="mr-2 h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    required
                  />
                  <span>
                    I accept the{' '}
                    <Link href="/terms" target='_codewithrafay' className="text-purple-600 hover:underline">
                      terms and conditions
                    </Link>
                  </span>
                </label>
              </div>

              <ReCAPTCHA
                sitekey="6Ld2cGspAAAAABeeefHgheLz2fHX-nSWdtRKZSTx" 
                onChange={handleRecaptchaChange}
                className="mb-4"
              />
              <div>
                <button type="submit" className="group relative flex justify-center border border-transparent text-base bg-purple-800  hover:bg-purple-700 transition-all text-white mt-4 font-bold py-2 px-4 w-full rounded "><span className="absolute left-0 inset-y-0 flex items-center pl-3"><svg className="h-5 w-5 text-purple-500 group-hover:text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg></span>Create an Account</button>
              </div>
            </form>
            <p className="mt-4 text-base text-center text-gray-700 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/login"
                className="text-purple-600 font-medium">Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
