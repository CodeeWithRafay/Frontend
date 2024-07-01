import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { account } from '@/pages/api/appwrite';
import { v4 as uuidv4 } from 'uuid';

const LoginButton = () =>
{ 
  return (
    <div className='text-center'>
      <GoogleLogin
        onSuccess={async (response) =>
          {   
          account.createOAuth2Session(
            'google',
            `https://www.codewithrafay.com/?token=${uuidv4()}`,
            'https://www.codewithrafay.com/')
        }}
        onError={() =>
        {
          toast('Something went Wrong! Try again later', { type: 'error', autoClose: 2000 });
        }}
        useOneTap
      />
    </div>
  );
};

export default LoginButton;
