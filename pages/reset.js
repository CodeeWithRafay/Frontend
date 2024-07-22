import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { Client, Account, ID } from 'appwrite';
import logo from '@/image/logo.png';

const Reset = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const router = useRouter();
  const { userId, secret } = router.query;

  const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  const account = new Account(client);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      await account.updateRecovery(userId, secret, password, confirmPassword);
      toast.success('Password has been changed successfully.');
      router.push('/login');
    } catch (error) {
      toast.error('Something went wrong! Please try again later.');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Add your password validation logic here
    const isValid = newPassword.length >= 8 &&
      /[A-Z]/.test(newPassword) &&
      /[a-z]/.test(newPassword) &&
      /[0-9]/.test(newPassword) &&
      /[^A-Za-z0-9]/.test(newPassword);

    setIsPasswordValid(isValid);
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
          <div className="text-center">
            <hr class="mt-2 mb-1 dark:border-gray-500"/>
              <h4 className="text-xl text-center font-semibold dark:text-gray-300 mt-2">New Password</h4>
          </div>

          <form onSubmit={handleSubmit}>
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
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none mt-2"
              />
              <span
                className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer passwordSvg"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? showSvg : hideSvg}
              </span>
            </div>

            <div className="flex justify-between mt-5">
              <span className="text-sm font-semibold dark:text-gray-400">Confirm Password</span>
            </div>
            <div className="relative w-full">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

            <div
              className={`overflow-hidden transition-height duration-300 ease-in-out ${
                password ? 'max-h-40' : 'max-h-0'
              }`}
            >
              {!isPasswordValid && (
                <div className="text-red-600 text-sm mt-2">
                  Password must be between 8 and 256 characters long and should contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                </div>
              )}
            </div>

            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="group relative flex justify-center border border-transparent text-base bg-purple-800 hover:bg-purple-700 transition-all text-white mt-4 font-semibold py-2 px-4 w-full rounded"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-purple-500 group-hover:text-purple-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
               Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
