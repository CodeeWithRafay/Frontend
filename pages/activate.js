import React, { useState } from 'react'
import Image from 'next/image'
import logo from '@/image/logo.png';
import { HandleResetPassword } from './api/post';

const Activate = () =>
{

  const [email, setEmail] = useState('');

  const handleEmailChange = (e) =>
  {
    setEmail(e.target.value);
  };


  const handleSubmit = async (e) =>
  {
    e.preventDefault();


    try {
      await HandleResetPassword(email);
    } catch (error) {
      toast.error('Something Went Wrong! Try again later', { autoClose: 2000 });
    }
  };
  return (
    <div className='min-h-screen'>
      <div className="mx-auto flex w-full h-full md:my-20 max-w-md sm:max-w-xl my-3 sm:my-14 md:max-w-4xl dark:bg-slate-800 ">
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
          <div className="my-1 flex text-center justify-center items-center">
            <div className="mx-auto mt-1">
            </div>
          </div>
          <div className="text-center">
            <hr class="mt-2 mb-1 dark:border-gray-500"/>
              <h4 className="text-xl text-center font-semibold dark:text-gray-300 mt-2">Reset Password</h4>
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
            <div>
              <button onClick={handleSubmit} type="submit" className="group relative flex justify-center border border-transparent text-base bg-purple-800  hover:bg-purple-700 transition-all text-white mt-4 font-semibold py-2 px-4 w-full rounded "><span className="absolute left-0 inset-y-0 flex items-center pl-3"><svg className="h-5 w-5 text-purple-500 group-hover:text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg></span>Submit</button>
            </div>
          </form>
      

        </div>
      </div>
    </div>
  )
}

export default Activate