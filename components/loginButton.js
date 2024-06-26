import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import googleOneTap from 'google-one-tap';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const LoginButton = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push(`/`);
    }
  }, [session,router]);

  useEffect(() => {
    const options = {
      client_id: '771878262256-uec5aead2i9dlg5i2pjuv27vjvgk0c19.apps.googleusercontent.com', // Replace with your Google client ID
      auto_select: true,
      cancel_on_tap_outside: false,
      context: 'signin',
    };

    googleOneTap(options, async (response) => {
      if (response) {
        try {
          await signIn('google', { callbackUrl: '/', redirect: false });
          toast('Successfully Logged In', { type: 'success', autoClose: 1000 });
        } catch (error) {
          toast('Login Failed', { type: 'error', autoClose: 2000 });
        }
      }
    });
  }, []); // Ensure this effect runs only once

  return (
    <div className='text-center'>
      <GoogleLogin
        onSuccess={async (response) => {
          try {
            await signIn('google', { callbackUrl: '/', redirect: false });
            toast('Successfully Logged In', { type: 'success', autoClose: 1000 });
          } catch (error) {
            toast('Login Failed', { type: 'error', autoClose: 2000 });
          }
        }}
        onError={() => {
          toast('Login Failed', { type: 'error', autoClose: 2000 });
        }}
      />
    </div>
  );
};

export default LoginButton;
