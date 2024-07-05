import { Html, Head, Main, NextScript } from "next/document";


export default function Document() {
  return (
    <Html lang="en">
      <Head>
          {/* Google AdSense */}
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7750828024106929"
            crossOrigin="anonymous"
          ></script>

         
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3SCPZBWQNR"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-3SCPZBWQNR');
</script>
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
