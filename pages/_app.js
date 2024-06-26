import { useEffect, useState } from "react";
import { Poppins } from 'next/font/google';
import Navbar from "@/components/navbar";
import Footer from '@/components/footer';
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "@/components/ThemeContext";
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from "next/router";
import { GoogleOAuthProvider } from "@react-oauth/google"
import '@/styles/globals.css'
import 'prismjs/themes/prism.css';
import Head from 'next/head';



const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});


export default function App({ Component, pageProps })
{
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() =>
  {
    router.events.on('routeChangeStart', () =>
    {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () =>
    {
      setProgress(100)
    })


  }, [router.events])


  return (
    <SessionProvider>
      <Head>
        <title>Web Development Agency - CodeWithRafay</title>
        <meta name="description" content="CodeWithRafay provides top-notch web development services, including web apps, CMS, e-commerce stores, and website bug fixes. Explore our blog for coding articles and tools like word counters and text editors." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="canonical" content="https://www.codewithrafay.com" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="CodeWithRafay" />
        <meta name="keywords" content="codewithrafay,web development,web development agency, CMS, WordPress, e-commerce, web apps, website bug fixes, coding articles, web development blog, word counter, text editor" />
      </Head>
      <GoogleOAuthProvider clientId={'771878262256-uec5aead2i9dlg5i2pjuv27vjvgk0c19.apps.googleusercontent.com'}>
        <ThemeProvider>
          <div className={[poppins.className, "dark:bg-gray-900"].join(" ")}>
            <LoadingBar
              color='purple'
              progress={progress}
              onLoaderFinished={() => setProgress(0)}
              waitingTime={600}
              transitionTime={400}
            />
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </div>
          <ToastContainer />
        </ThemeProvider>
      </GoogleOAuthProvider>
    </SessionProvider>
  )
}
