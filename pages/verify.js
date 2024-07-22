import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Client, Account } from 'appwrite';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

const Verify = () =>
{
  const router = useRouter();
  const { userId, secret } = router.query;
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');

  useEffect(() =>
  {
    if (userId && secret) {
      const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

      const account = new Account(client);

      const verifyUser = async () =>
      {
        try {
          await account.updateVerification(userId, secret);
          setVerificationStatus('Email Verified');
          toast.success('Your email has been verified successfully.');
        } catch (error) {
          if (error.code === 400 && error.message === 'Verification link expired') {
            setVerificationStatus('Verification Link Expired');
          } else {
            setVerificationStatus('Verification Failed');
          }
          toast.error('Failed to verify email. Please try again later.');
        }
      };

      verifyUser();
    }
  }, [userId, secret]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <h1 className={`text-3xl font-bold text-center mb-4 ${verificationStatus === 'Email Verified' ? 'text-green-600' : 'text-black'
          } dark:text-white`}>
          {verificationStatus === 'Email Verified' ? 'Email Verified' : verificationStatus}
        </h1>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-8">
          {verificationStatus === 'Email Verified'
            ? 'Thank you. Your email has been verified.'
            : verificationStatus === 'Verification Link Expired'
              ? 'The verification link has expired. Please request a new one.'
              : 'Something went wrong while verifying your email. Please try again later.'}
        </p>
        <div className="text-center">
          <Link href={`/?token=${uuidv4()}`}
            className={`bg-purple-800 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-bold ${verificationStatus === 'Email Verified' ? '' : 'hidden'
              }`}>
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Verify;
