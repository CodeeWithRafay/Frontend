/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
      },
      {
        hostname: 'codewithrafay.com',
      },
      {
        hostname: 'res.cloudinary.com',
      },
      {
        hostname: 'cloud.appwrite.io',
      },
    ],
  },
};

export default nextConfig;
