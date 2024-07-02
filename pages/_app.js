import { useEffect, useState } from "react";
import { Poppins } from 'next/font/google';
import Navbar from "@/components/navbar";
import Footer from '@/components/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "@/components/ThemeContext";
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from "next/router";
import { GoogleOAuthProvider } from "@react-oauth/google"
import '@/styles/globals.css'
import 'prismjs/themes/prism.css';
import Head from 'next/head';
import { AuthProvider } from '@/components/AuthContext';
import Script from "next/script";

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
    <AuthProvider>
      <GoogleOAuthProvider clientId={'771878262256-uec5aead2i9dlg5i2pjuv27vjvgk0c19.apps.googleusercontent.com'}>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Get Web Development Services | CodeWithRafay</title>
          <meta name="description" content="Welcome to CodeWithRafay! We specialize in creating websites, content management systems (CMS), online stores, and more. Explore our services, check out our latest blog posts, our amazing tools, and see our recent projects. We're here to provide top-notch web development services." />
          <link rel="canonical" href="https://www.codewithrafay.com" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
          <meta property="og:type" content="website" />
          <meta property="og:title" content="CodeWithRafay" />
          <meta property="og:description" content="Welcome to CodeWithRafay! We specialize in creating websites, content management systems (CMS), online stores, and more. Explore our services, check out our latest blog posts, our amazing tools, and see our recent projects. We're here to provide top-notch web development services." />
          <meta property="og:url" content="https://www.codewithrafay.com" />
          <meta property="og:image" content="/graph.png" />
          <meta name="twitter:title" content="CodeWithRafay" />
          <meta name="twitter:description" content="Welcome to CodeWithRafay! We specialize in creating websites, content management systems (CMS), online stores, and more. Explore our services, check out our latest blog posts, our amazing tools, and see our recent projects. We're here to provide top-notch web development services." />
          <meta name="twitter:image" content="/graph.png" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Abdul Rafay" />
          <meta name="keywords" content="codewithrafay, web development, web development agency, CMS, WordPress, e-commerce, web apps, website bug fixes, coding articles, web development blog, word counter, text editor" />
          <Script async defer src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4737568640496329"
            crossorigin="anonymous"></Script>
        </Head>
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
    </AuthProvider>
  )
}
